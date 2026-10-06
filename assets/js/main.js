import { $ } from "./core/dom.js";
import { initI18n } from "./core/i18n.js";
import { initHeader } from "./modules/header.js";
import { initReveal } from "./modules/reveal.js";
import { initHero } from "./modules/hero.js";
import { initScrollEffects } from "./modules/scroll-effects.js";
import { initServices } from "./modules/services.js";
import { initPortfolio } from "./modules/portfolio.js";
import { initConstellation } from "./modules/constellation.js";
import { initMagnetic } from "./modules/magnetic.js";
import { initContactForm } from "./modules/contact-form.js";

initI18n();
initHeader();
initReveal();
initHero();
initScrollEffects();
initServices();
initPortfolio();
initConstellation();
initMagnetic();
initContactForm();

$("#year").textContent = new Date().getFullYear();
