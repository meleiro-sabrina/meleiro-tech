import { $, $$, hasFinePointer, prefersReducedMotion } from "../core/dom.js";

const PARALLAX_STRENGTH = 18;
const EASING = 0.08;

export function initHero() {
  if (hasFinePointer && !prefersReducedMotion) initMouseParallax();
  if (!prefersReducedMotion) initParticles($("#particles"));
}

/** Floating UI cards follow the cursor, each by its own `data-depth`. */
function initMouseParallax() {
  const hero = $(".hero");
  const layers = $$("[data-depth]", $("#heroVisual"));
  let targetX = 0,
    targetY = 0,
    x = 0,
    y = 0,
    frame = null;

  const tick = () => {
    x += (targetX - x) * EASING;
    y += (targetY - y) * EASING;
    layers.forEach((el) => {
      const depth = parseFloat(el.dataset.depth) * PARALLAX_STRENGTH;
      el.style.translate = `${(x * depth).toFixed(2)}px ${(y * depth).toFixed(2)}px`;
    });
    frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.001 ? requestAnimationFrame(tick) : null;
  };
  const start = () => frame || (frame = requestAnimationFrame(tick));

  hero.addEventListener("mousemove", (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    start();
  });
  hero.addEventListener("mouseleave", () => {
    targetX = targetY = 0;
    start();
  });
}

/** Drifting particles with faint links; paused while off-screen. */
function initParticles(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const count = window.matchMedia("(max-width: 679px)").matches ? 26 : 48;
  const LINK_DISTANCE_SQ = 80 * 80;
  let w,
    h,
    particles = [],
    running = false;

  const resize = (width, height) => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = width;
    h = height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const spawn = (initial) => ({
    x: Math.random() * w,
    y: initial ? Math.random() * h : h + 10,
    r: Math.random() * 1.4 + 0.4,
    vy: -(Math.random() * 0.25 + 0.08),
    vx: (Math.random() - 0.5) * 0.12,
    lime: Math.random() < 0.45,
    a: Math.random() * 0.5 + 0.2,
  });

  const draw = () => {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) particles[i] = spawn(false);

      const fade = Math.min(1, p.y / (h * 0.25), (h - p.y) / (h * 0.25));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.lime ? `rgba(215,243,0,${p.a * fade})` : `rgba(143,166,214,${p.a * fade * 0.8})`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dist = (p.x - q.x) ** 2 + (p.y - q.y) ** 2;
        if (dist >= LINK_DISTANCE_SQ) continue;
        ctx.strokeStyle = `rgba(215,243,0,${(1 - dist / LINK_DISTANCE_SQ) * 0.12 * fade})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    }
    requestAnimationFrame(draw);
  };

  let visible = false;
  const update = () => {
    const wasRunning = running;
    running = visible && !document.hidden && particles.length > 0;
    if (running && !wasRunning) requestAnimationFrame(draw);
  };

  // ResizeObserver reports the size after layout, so startup never forces a synchronous reflow.
  new ResizeObserver(([entry]) => {
    const { width, height } = entry.contentRect;
    resize(width, height);
    if (!particles.length) particles = Array.from({ length: count }, () => spawn(true));
    update();
  }).observe(canvas);

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    update();
  }).observe(canvas);
}
