/* Google Analytics 4 behind a LGPD cookie consent banner.
 * Plain script (not bundled) so it also runs on the hosted demos under /projetos/. */

(() => {
  const GA_ID = "G-YLB2T1DXJ4";
  const CONSENT_KEY = "mt-cookie-consent";

  const loadAnalytics = () => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { anonymize_ip: true });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
  };

  let consent = null;
  try {
    consent = localStorage.getItem(CONSENT_KEY);
  } catch {
    return;
  }

  if (consent === "granted") return loadAnalytics();
  if (consent === "denied") return;

  const copy =
    localStorage.getItem("mt-lang") === "en"
      ? {
          text: "We use cookies to understand how visitors use the site and improve your experience.",
          accept: "Accept",
          decline: "Decline",
        }
      : {
          text: "Usamos cookies para entender como o site é usado e melhorar sua experiência.",
          accept: "Aceitar",
          decline: "Recusar",
        };

  const style = document.createElement("style");
  style.textContent = `
    .mt-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:2147483647;max-width:560px;margin:0 auto;
      display:flex;align-items:center;gap:16px;padding:16px 18px;border-radius:14px;
      background:#041639;color:#f2f5fa;border:1px solid rgba(143,166,214,.2);
      box-shadow:0 18px 50px rgba(0,8,23,.45);font:400 14px/1.5 Inter,system-ui,-apple-system,sans-serif;
      animation:mt-consent-in .4s cubic-bezier(.16,1,.3,1)}
    .mt-consent p{margin:0;flex:1;padding:0;color:inherit;font:inherit;letter-spacing:normal;text-transform:none}
    .mt-consent__actions{display:flex;gap:8px;flex-shrink:0}
    .mt-consent button{cursor:pointer;border:0;border-radius:10px;padding:9px 16px;margin:0;min-width:0;height:auto;
      font:600 14px/1 Inter,system-ui,sans-serif;letter-spacing:normal;text-transform:none;box-shadow:none}
    .mt-consent__accept{background:#d7f300;color:#000817}
    .mt-consent__accept:hover{background:#e6ff3d}
    .mt-consent__decline{background:transparent;color:#a3b0ca;border:1px solid rgba(143,166,214,.2)!important}
    .mt-consent__decline:hover{color:#f2f5fa}
    @media (max-width:520px){.mt-consent{flex-direction:column;align-items:stretch;text-align:center}
      .mt-consent__actions button{flex:1}}
    @keyframes mt-consent-in{from{opacity:0;transform:translateY(16px)}}
    @media (prefers-reduced-motion:reduce){.mt-consent{animation:none}}`;

  const banner = document.createElement("div");
  banner.className = "mt-consent";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-live", "polite");
  banner.setAttribute("aria-label", "Cookies");
  banner.innerHTML = `<p>${copy.text}</p>
    <div class="mt-consent__actions">
      <button type="button" class="mt-consent__decline">${copy.decline}</button>
      <button type="button" class="mt-consent__accept">${copy.accept}</button>
    </div>`;

  const decide = (value) => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {}
    banner.remove();
    if (value === "granted") loadAnalytics();
  };
  banner.querySelector(".mt-consent__accept").addEventListener("click", () => decide("granted"));
  banner.querySelector(".mt-consent__decline").addEventListener("click", () => decide("denied"));

  const mount = () => document.body.append(style, banner);
  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();
