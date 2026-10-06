import { $ } from "./core/dom.js";
import { initHeader } from "./modules/header.js";
import { initReveal } from "./modules/reveal.js";
import { initMagnetic } from "./modules/magnetic.js";

initHeader();
initReveal();
initMagnetic();

$("#year").textContent = new Date().getFullYear();
