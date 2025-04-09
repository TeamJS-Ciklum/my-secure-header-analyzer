chrome.webRequest.onHeadersReceived.addListener(
  (details) => {
    const securityHeaders = [
      "content-security-policy",
      "strict-transport-security",
      "x-content-type-options",
      "x-frame-options",
      "x-xss-protection",
      "referrer-policy",
      "permissions-policy"
    ];

    const headers = {};
    details.responseHeaders.forEach(header => {
      const name = header.name.toLowerCase();
      if (securityHeaders.includes(name)) {
        headers[name] = header.value;
      }
    });

    chrome.storage.local.set({ headers });
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders"]
);