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

/**
 * Registers a handler on a single rAF-throttled scroll/resize loop.
 * The first run is deferred to the next frame to avoid forcing a synchronous layout at startup.
 */
export function onScroll(fn) {
  handlers.push(fn);
  requestAnimationFrame(fn);
}
