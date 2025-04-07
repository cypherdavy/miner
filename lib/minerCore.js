
const puppeteer = require('puppeteer');
const fs = require('fs');
const https = require('https');
const path = require('path');

async function extractAssets(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
  );

  console.log("[*] Navigating to:", url);
  await page.goto(url, { waitUntil: 'networkidle0' });

  console.log("[*] Extracting asset URLs...");
  const assets = await page.evaluate(() => {
    const scripts = Array.from(document.querySelectorAll("script[src]")).map(el => el.src);
    const styles = Array.from(document.querySelectorAll("link[rel='stylesheet']")).map(el => el.href);
    return [...scripts, ...styles];
  });

  await browser.close();
  return assets;
}

function downloadFile(fileUrl) {
  return new Promise((resolve, reject) => {
    const filename = path.basename(new URL(fileUrl).pathname);
    const file = fs.createWriteStream(filename);

    https.get(fileUrl, (res) => {
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", (err) => {
      fs.unlinkSync(filename);
      console.error(`[-] Error downloading ${fileUrl}: ${err.message}`);
      reject(err);
    });
  });
}

async function runMiner(targetUrl) {
  if (!targetUrl) {
    console.error("Usage: miner <URL>");
    process.exit(1);
  }

  console.log("[*] Launching miner...");
  const assets = await extractAssets(targetUrl);

  if (!assets.length) {
    console.log("[!] No downloadable assets found.");
    return;
  }

  console.log(`[+] Found ${assets.length} assets:`);
  for (const asset of assets) {
    console.log("   ->", asset);
  }

  console.log("[*] Downloading files...");
  for (const url of assets) {
    await downloadFile(url);
  }

  console.log("[✓] Done!");
}

module.exports = { runMiner };
