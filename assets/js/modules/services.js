import { $$, hasFinePointer } from "../core/dom.js";

/** Neon spotlight that follows the cursor across service cards. */
export function initServices() {
  if (!hasFinePointer) return;
  $$(".service-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--y", `${e.clientY - rect.top}px`);
    });
  });
}
