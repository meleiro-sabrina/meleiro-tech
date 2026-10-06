const handlers = [];
let ticking = false;

/** Runs every read phase before any write phase so a frame triggers at most one layout. */
function run() {
  const writes = handlers.map((read) => read());
  writes.forEach((write) => write?.());
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
window.addEventListener("resize", () => requestAnimationFrame(run));

let scheduled = false;

/**
 * Registers a handler on a single rAF-throttled scroll/resize loop.
 * The handler should only measure the page and return a function that applies DOM changes.
 * The first run is deferred to the next frame to avoid forcing a synchronous layout at startup.
 */
export function onScroll(read) {
  handlers.push(read);
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    run();
  });
}
