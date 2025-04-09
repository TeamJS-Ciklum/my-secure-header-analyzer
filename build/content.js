(() => {
  const headers = {};
  
  fetch(window.location.href, { method: "HEAD" })
    .then(response => {
      response.headers.forEach((value, key) => {
        headers[key.toLowerCase()] = value;
      });

      chrome.storage.local.set({ headers });
    })
    .catch(err => console.error("Failed to fetch headers:", err));
})();
