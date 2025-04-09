![Secure Headers Icon](./src/assets/secure-headers-image.jpeg)

# 🔐 Secure Headers Analyzer Chrome Extension

**A Chrome Extension to analyze security-related HTTP headers of the active tab, following best practices from the [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/). Built with React, TypeScript, and Vite.**

---

## 📦 Features

- 🚀 Built using **React + TypeScript + Vite** for lightning-fast development.
- 🛡️ Scans the HTTP response headers of the active tab.
- 📊 Generates a report based on [OWASP Secure Headers Recommendations](https://owasp.org/www-project-secure-headers/).
- ✅ Identifies missing or misconfigured security headers.
- ❌ Flags unnecessary or potentially sensitive headers that should be removed.

---

## 📂 Project Structure

- `public/content.js`: Content script that sends a `HEAD` request to the current tab's URL and collects headers.
- `src/App.tsx`: React UI for displaying headers and security recommendations.
- `public/manifest.json`: Chrome Extension manifest (v3), with permissions and script declarations.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/secure-headers-analyzer.git
cd secure-headers-analyzer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build the Extension

```bash
npm run build
```

This will output files into the `dist` folder.

### 4. Load the Extension in Chrome

1. Go to `chrome://extensions/`
2. Enable **Developer Mode**
3. Click **Load unpacked**
4. Select the `dist` folder

---

## 🔍 Usage

1. Visit any webpage.
2. Click on the extension icon.
3. The popup will display:
   - The URL being analyzed
   - The response headers returned from the site
   - A list of security recommendations (missing/misconfigured/unnecessary headers)

---

## ✅ Current Status

- Fully working MVP
- Headers fetched via content script and analyzed on popup render
- Static OWASP-based checklist implemented in `App.tsx`

---

## 🛠 Existing Checklist

The following security headers are analyzed:

- `Cache-Control`
- `Clear-Site-Data`
- `Content-Security-Policy`
- `Cross-Origin-Embedder-Policy`
- `Cross-Origin-Opener-Policy`
- `Cross-Origin-Resource-Policy`
- `Permissions-Policy`
- `Referrer-Policy`
- `Strict-Transport-Security`
- `X-Content-Type-Options`
- `X-Frame-Options`
- `X-Permitted-Cross-Domain-Policies`

It also flags known **unnecessary headers** such as `X-Powered-By`, `Server`, and many others.

---

## 🧭 Roadmap

Here’s what’s planned next:

- 🍪 **Cookie Analysis**
  - Analyze cookies for security flags like `HttpOnly`, `Secure`, and `SameSite`.
  - Flag insecure or overly permissive cookies.

- 🌐 **Dynamic Header Checklist**
  - Fetch latest header guidelines dynamically from the OWASP project or maintained config.
  - Allow users to update header recommendations without needing to rebuild the extension.

- 💡 **Exportable Reports**
  - Export results as Markdown, JSON, or PDF for sharing or audits.

- 🧪 **Unit Tests & CI**
  - Add basic test coverage and linting in CI pipeline.

---

## 🧰 Tech Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Chrome Extension Manifest v3](https://developer.chrome.com/docs/extensions/mv3/intro/)

---

## 🤝 Contributing

Got ideas to improve this tool? Found a bug? Open a [Pull Request](https://github.com/shabbir-ciklum/my-secure-headers-analyzer/pulls) or [Issue](https://github.com/yourusername/my-secure-headers-analyzer/issues)!

---

## 📜 License

MIT © [Syed Shabbir](https://github.com/shabbir-ciklum)