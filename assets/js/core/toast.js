import { $ } from "./dom.js";

const DURATION = 2800;
let timer;

export function toast(message, type = "") {
  const el = $("#toast");
  el.textContent = message;
  el.className = "toast is-visible" + (type ? ` is-${type}` : "");
  clearTimeout(timer);
  timer = setTimeout(() => el.classList.remove("is-visible"), DURATION);
}
