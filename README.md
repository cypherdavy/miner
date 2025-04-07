

### 📄 `README.md`


# Miner 🕵️‍♂️  
![License](https://img.shields.io/github/license/cypherdavy/miner?color=blue)  
![Issues](https://img.shields.io/github/issues/cypherdavy/miner)  
![Stars](https://img.shields.io/github/stars/cypherdavy/miner?style=social)  

> Headless static asset extractor built for ethical hackers, researchers & developers.

**Miner** is a command-line tool that automates the extraction of JavaScript files and static resources from websites using a headless browser. It simulates a real browser environment, waits for all network activity to settle, and then mines script and static asset URLs—perfect for recon, bug bounty, or forensic investigations.

---

## ⚙️ Features

- ✅ Headless Chromium browser support (via Puppeteer)
- ✅ Waits for full network load (mimics real browsing behavior)
- ✅ Extracts `<script src="">` and other static resources
- ✅ Custom headers support
- ✅ File download support (JS/CSS/JSON/etc.)
- ✅ Clean CLI output and logging
- ✅ Easily extendable



## 📦 Installation

```bash
git clone https://github.com/cypherdavy/miner.git
cd miner
npm install
npm link
```

Now you can run `miner` globally.

---

## 🚀 Usage

```bash
miner <url> [options]
```

### 🔍 Examples

```bash
miner https://targetsite.com
miner https://targetsite.com -o script.js
miner https://targetsite.com --all
miner https://targetsite.com -h headers.json
```

---

## 🎛️ CLI Options

| Option             | Description                                 |
|--------------------|---------------------------------------------|
| `-o, --output`     | Save script to a custom file                |
| `--all`            | Download all static assets (scripts/images) |
| `-h, --headers`    | Load custom headers from JSON file          |
| `--debug`          | Enable debug logging                        |

---

## 📁 Project Structure

```
miner/
├── bin/
│   └── miner.js         # CLI entry point
├── lib/
│   └── minerCore.js     # Core logic (Puppeteer scripts & downloader)
├── package.json
├── LICENSE
└── README.md
```

---

## 🧠 Use Cases

- Reconnaissance for bug bounty programs
- Gathering JS files for static/dynamic analysis
- Forensics or incident response
- Asset discovery for pentesting

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## ✨ Author

Created and maintained by [@davycipher](https://github.com/cypherdavy)  




> _“Curiosity is the compass that guides every ethical hacker.”_ – **Davycipher**


