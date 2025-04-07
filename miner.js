
const puppeteer = require('puppeteer');
const fs = require('fs');
const https = require('https');
const path = require('path');

(async () => {
  const url = process.argv[2];
  if (!url) return console.error("Usage: node miner.js <URL>");

  console.log("[*] Launching browser...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
  );

  console.log("[*] Navigating to:", url);
  await page.goto(url, { waitUntil: 'networkidle0' });

  console.log("[*] Extracting script/static file URLs...");
  const scriptUrls = await page.evaluate(() => {
    const srcs = Array.from(document.querySelectorAll("script[src]")).map(el => el.src);
    const links = Array.from(document.querySelectorAll("link[rel='stylesheet']")).map(el => el.href);
    return [...srcs, ...links];
  });

  await browser.close();

  if (!scriptUrls.length) {
    console.log("[!] No assets found.");
    return;
  }

  console.log(`[+] Found ${scriptUrls.length} file(s):`);
  scriptUrls.forEach(url => console.log("   ->", url));

  console.log("[*] Downloading files...");

  for (const assetUrl of scriptUrls) {
    const filename = path.basename(new URL(assetUrl).pathname);
    const file = fs.createWriteStream(filename);

    https.get(assetUrl, res => {
      res.pipe(file);
      file.on("finish", () => file.close());
    }).on("error", err => {
      fs.unlinkSync(filename);
      console.error(`[-] Error downloading ${assetUrl}: ${err.message}`);
    });
  }

  console.log("[✓] Done!");
})();
