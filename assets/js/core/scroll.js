const handlers = [];
let ticking = false;

function run() {
  handlers.forEach((fn) => fn());
}

window.addEventListener(
  "scroll",
  () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      run();
      ticking = false;
    });
  },
  { passive: true }
);
window.addEventListener("resize", run);

/** Registers a handler on a single rAF-throttled scroll/resize loop and runs it once. */
export function onScroll(fn) {
  handlers.push(fn);
  fn();
}
