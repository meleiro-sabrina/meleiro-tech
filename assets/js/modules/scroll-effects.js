import { $, $$, prefersReducedMotion } from "../core/dom.js";
import { onScroll } from "../core/scroll.js";

const PARALLAX_MIN_WIDTH = 680;
const PIPELINE_VERTICAL_MAX_WIDTH = 960;

export function initScrollEffects() {
  if (!prefersReducedMotion) initParallax();
  initPipeline($("#pipeline"));
}

function initParallax() {
  const heroVisual = $("#heroVisual");
  const layers = [
    { el: $(".hero__content"), speed: 0.18, fade: true },
    { el: heroVisual, speed: 0.08 },
    { el: $(".process__mascot"), speed: -0.12 },
    { el: $(".footer__mascot"), speed: -0.08 },
  ].filter((layer) => layer.el);

  onScroll(() => {
    if (window.innerWidth <= PARALLAX_MIN_WIDTH) return;
    const vh = window.innerHeight;
    const scrollY = window.scrollY;
    const rects = layers.map(({ el }) => el.getBoundingClientRect());

    return () =>
      layers.forEach(({ el, speed, fade }, i) => {
        const rect = rects[i];
        if (rect.bottom < -200 || rect.top > vh + 200) return;

        if (el === heroVisual || fade) {
          el.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
          if (fade) el.style.opacity = String(Math.max(0, 1 - scrollY / (vh * 0.9)));
        } else {
          const offset = (rect.top + rect.height / 2 - vh / 2) * speed;
          el.style.transform = `translate3d(0, ${offset}px, 0)`;
        }
      });
  });
}

/** Fills the "problem → solution" track and lights each step as the user scrolls. */
function initPipeline(pipeline) {
  if (!pipeline) return;
  const steps = $$(".step", pipeline);
  const arrows = $$(".step__arrow", pipeline);

  onScroll(() => {
    const vh = window.innerHeight;
    const rect = pipeline.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (vh * 0.78 - rect.top) / (rect.height + vh * 0.25)));
    const vertical = window.innerWidth <= PIPELINE_VERTICAL_MAX_WIDTH;
    const active = steps.map((step, i) =>
      vertical ? step.getBoundingClientRect().top < vh * 0.8 : progress >= i / (steps.length - 1) - 0.02
    );

    return () => {
      pipeline.style.setProperty("--p", progress.toFixed(3));
      steps.forEach((step, i) => {
        step.classList.toggle("is-active", active[i]);
        arrows[i]?.classList.toggle("is-active", active[i]);
      });
    };
  });
}
