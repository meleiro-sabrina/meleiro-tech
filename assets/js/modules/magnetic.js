import { $$, hasFinePointer, prefersReducedMotion } from "../core/dom.js";

/** Elements with `.magnetic` lean slightly towards the cursor. */
export function initMagnetic() {
  if (!hasFinePointer || prefersReducedMotion) return;
  $$(".magnetic").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener("mouseleave", () => (el.style.transform = ""));
  });
}
