import { $, $$, replayClass } from "./dom.js";
import { toast } from "./toast.js";
import { DEFAULT_LANG, LANG_STORAGE_KEY } from "../config.js";
import pt from "../locales/pt.js";
import en from "../locales/en.js";

const dictionaries = { pt, en };
const htmlLang = { pt: "pt-BR", en: "en-US" };

let lang = localStorage.getItem(LANG_STORAGE_KEY);
if (!dictionaries[lang]) lang = DEFAULT_LANG;

export const getLang = () => lang;

export const t = (key) => dictionaries[lang][key] ?? dictionaries[DEFAULT_LANG][key] ?? key;

function apply(next, { animate = false } = {}) {
  lang = next;
  document.documentElement.lang = htmlLang[lang];
  document.title = t("meta.title");
  $('meta[name="description"]').setAttribute("content", t("meta.desc"));

  $$("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
    if (animate) replayClass(el, "i18n-swap");
  });
  $$("[data-i18n-html]").forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml);
    if (animate) replayClass(el, "i18n-swap");
  });
  $$(".lang__btn").forEach((btn) => btn.classList.toggle("is-active", btn.dataset.lang === lang));
  localStorage.setItem(LANG_STORAGE_KEY, lang);
}

export function initI18n() {
  $$(".lang__btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      if (btn.dataset.lang === lang) return;
      apply(btn.dataset.lang, { animate: true });
      toast(t("toast.lang"));
    })
  );
  apply(lang);
}
