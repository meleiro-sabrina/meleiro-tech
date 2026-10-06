import { $, $$, prefersReducedMotion } from "../core/dom.js";

const SVG_NS = "http://www.w3.org/2000/svg";
const CENTER = 500;
const ORBIT_RADIUS = 300;
const CYCLE_MS = 1700;

/** Draws lines from the mascot core to each capability node and cycles a highlight. */
export function initConstellation() {
  const root = $("#constellation");
  if (!root) return;
  const group = $("#cLines");
  const nodes = $$(".cnode", root);
  const flows = [];

  group.appendChild(svg("circle", { cx: CENTER, cy: CENTER, r: ORBIT_RADIUS, class: "orbit" }));

  nodes.forEach((node) => {
    // Node positions are percentages; the SVG viewBox is 1000×1000.
    const x2 = parseFloat(node.style.getPropertyValue("--x")) * 10;
    const y2 = parseFloat(node.style.getPropertyValue("--y")) * 10;
    const coords = { x1: CENTER, y1: CENTER, x2, y2 };
    group.appendChild(svg("line", coords));
    const flow = group.appendChild(svg("line", coords));
    flow.style.opacity = "0";
    flow.style.transition = "opacity .5s";
    flow.classList.add("flow");
    flows.push(flow);
  });

  let index = 0;
  const light = (i) => {
    const opposite = (i + nodes.length / 2) % nodes.length;
    nodes.forEach((n, k) => n.classList.toggle("is-lit", k === i));
    flows.forEach((f, k) => (f.style.opacity = k === i || k === opposite ? ".8" : "0"));
  };

  nodes.forEach((node, i) =>
    node.addEventListener("mouseenter", () => {
      index = i;
      light(i);
    })
  );

  if (prefersReducedMotion) return;
  let timer = null;
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !timer) {
      light(index);
      timer = setInterval(() => light((index = (index + 1) % nodes.length)), CYCLE_MS);
    } else if (!entry.isIntersecting && timer) {
      clearInterval(timer);
      timer = null;
    }
  }).observe(root);
}

function svg(tag, attrs) {
  const el = document.createElementNS(SVG_NS, tag);
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
  return el;
}
