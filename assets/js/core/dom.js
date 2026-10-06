export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

export const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/** Restarts a CSS animation class on an element. */
export function replayClass(el, className) {
  el.classList.remove(className);
  void el.offsetWidth;
  el.classList.add(className);
}
