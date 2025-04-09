import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState<string>('');
  const [headers, setHeaders] = useState<{ [key: string]: string }>({});
  const [report, setReport] = useState<{ headers: {}; recommendations: string[] }>({
    headers: {},
    recommendations: [],
  });

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.url) {
        setUrl(tabs[0].url);
      }
    });

    chrome.storage.local.get("headers", (data) => {
      const headers = data.headers || {};
      setHeaders(headers);
      setReport(analyzeHeaders(headers));
    });
  }, []);

  const analyzeHeaders = (headers: { [key: string]: string }) => {
    const recommendations: string[] = [];

    const securityChecklist = [
      { name: "cache-control", expected: "no-store, max-age=0", message: "Cache-Control should prevent caching sensitive data." },
      { name: "clear-site-data", expected: "\"cache\",\"cookies\",\"storage\"", message: "Clear-Site-Data should clear sensitive data when needed." },
      { name: "content-security-policy", expected: "default-src 'self'; form-action 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests; block-all-mixed-content", message: "CSP should restrict sources and prevent XSS." },
      { name: "cross-origin-embedder-policy", expected: "require-corp", message: "COEP should enforce cross-origin isolation." },
      { name: "cross-origin-opener-policy", expected: "same-origin", message: "COOP should protect against cross-origin attacks." },
      { name: "cross-origin-resource-policy", expected: "same-origin", message: "CORP should limit cross-origin resource sharing." },
      { name: "permissions-policy", expected: "accelerometer=(), autoplay=(), camera=(), cross-origin-isolated=(), display-capture=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), keyboard-map=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(self), usb=(), web-share=(), xr-spatial-tracking=(), clipboard-read=(), clipboard-write=(), gamepad=(), hid=(), idle-detection=(), interest-cohort=(), serial=(), unload=()", message: "Permissions-Policy should restrict access to features." },
      { name: "referrer-policy", expected: "no-referrer", message: "Referrer-Policy should prevent leaking referrer info." },
      { name: "strict-transport-security", expected: "max-age=31536000; includeSubDomains", message: "HSTS should enforce HTTPS across subdomains." },
      { name: "x-content-type-options", expected: "nosniff", message: "X-Content-Type-Options should prevent MIME sniffing." },
      { name: "x-frame-options", expected: "deny", message: "X-Frame-Options should prevent clickjacking." },
      { name: "x-permitted-cross-domain-policies", expected: "none", message: "X-Permitted-Cross-Domain-Policies should restrict Flash access." }
    ];

    const unnecessaryHeaders = new Set([
      "$wsep", "Host-Header", "K-Proxy-Request", "Liferay-Portal", "OracleCommerceCloud-Version",
      "Pega-Host", "Powered-By", "Product", "Server", "SourceMap", "X-AspNet-Version",
      "X-AspNetMvc-Version", "X-Atmosphere-error", "X-Atmosphere-first-request", "X-Atmosphere-tracking-id",
      "X-B3-ParentSpanId", "X-B3-Sampled", "X-B3-SpanId", "X-B3-TraceId", "X-BEServer", "X-Backside-Transport",
      "X-CF-Powered-By", "X-CMS", "X-CalculatedBETarget", "X-Cocoon-Version", "X-Content-Encoded-By",
      "X-DiagInfo", "X-Envoy-Attempt-Count", "X-Envoy-External-Address", "X-Envoy-Internal",
      "X-Envoy-Original-Dst-Host", "X-Envoy-Upstream-Service-Time", "X-FEServer", "X-Framework",
      "X-Generated-By", "X-Generator", "X-Jitsi-Release", "X-Joomla-Version",
      "X-Kubernetes-PF-FlowSchema-UI", "X-Kubernetes-PF-PriorityLevel-UID", "X-LiteSpeed-Cache",
      "X-LiteSpeed-Purge", "X-LiteSpeed-Tag", "X-LiteSpeed-Vary", "X-Litespeed-Cache-Control",
      "X-Mod-Pagespeed", "X-Nextjs-Cache", "X-Nextjs-Matched-Path", "X-Nextjs-Page", "X-Nextjs-Redirect",
      "X-OWA-Version", "X-Old-Content-Length", "X-OneAgent-JS-Injection", "X-Page-Speed", "X-Php-Version",
      "X-Powered-By", "X-Powered-By-Plesk", "X-Powered-CMS", "X-Redirect-By", "X-Server-Powered-By",
      "X-SourceFiles", "X-SourceMap", "X-Turbo-Charged-By", "X-Umbraco-Version", "X-Varnish-Backend",
      "X-Varnish-Server", "X-dtAgentId", "X-dtHealthCheck", "X-dtInjectedServlet", "X-ruxit-JS-Agent"
    ]);

    // Check for missing or misconfigured security headers
    securityChecklist.forEach(({ name, expected, message }) => {
      if (!headers[name]) {
        recommendations.push(`⚠️ Missing ${name}: ${message}`);
      } else if (headers[name] !== expected) {
        recommendations.push(`⚠️ ${name} has a weak policy. Expected: "${expected}" but found "${headers[name]}"`);
      }
    });

    // Check for unnecessary headers
    Object.keys(headers).forEach((header) => {
      if (unnecessaryHeaders.has(header.toLowerCase())) {
        recommendations.push(`❌ Remove unnecessary header: ${header}`);
      }
    });

    return { headers, recommendations };
  };

  return (
    <div>
      <h1>Secure Headers Report</h1>
      <h3>Visited URL: {url || "Loading..."}</h3>
      <h2>Current Headers</h2>
      <pre>{JSON.stringify(headers, null, 2)}</pre>
      <h2>Recommendations</h2>
      <ul>
        {report.recommendations.length > 0 ? (
          report.recommendations.map((rec, index) => <li key={index}>{rec}</li>)
        ) : (
          <li>✅ All essential security headers are correctly set!</li>
        )}
      </ul>
    </div>
  );
}

export default App;
