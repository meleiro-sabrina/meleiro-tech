import { $ } from "./core/dom.js";
import { initI18n } from "./core/i18n.js";
import { initContactForm } from "./modules/contact-form.js";
import { initImmersive } from "./modules/immersive.js";
import { initSocialProof } from "./social-proof.js";

/*
 * Homepage entry. GSAP, ScrollTrigger and Lenis stay as classic deferred
 * scripts (see index.html) instead of being pulled into this bundle: they are
 * UMD globals, the approved prototype loads them the same way, and the app
 * bundle stays limited to behavior we own. esbuild still emits this file to
 * assets/dist/js/main.js. Service pages keep assets/js/page.js.
 */

initSocialProof();
initI18n();
initContactForm();
initImmersive();

const year = $("#year");
if (year) year.textContent = String(new Date().getFullYear());
