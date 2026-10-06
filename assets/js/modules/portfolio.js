import { $, $$ } from "../core/dom.js";

const STAGGER_MS = 70;

export function initPortfolio() {
  const grid = $("#projects");
  const projects = $$(".project", grid);
  const filters = $$(".filter");

  filters.forEach((btn) =>
    btn.addEventListener("click", () => {
      const category = btn.dataset.filter;
      filters.forEach((b) => b.classList.toggle("is-active", b === btn));
      grid.classList.toggle("is-filtered", category !== "all");

      projects.forEach((project, i) => {
        const show = category === "all" || project.dataset.cat === category;
        project.classList.toggle("is-hidden", !show);
        project.classList.remove("is-entering");
        if (!show) return;
        project.classList.add("is-visible");
        void project.offsetWidth;
        project.style.animationDelay = `${(i % 3) * STAGGER_MS}ms`;
        project.classList.add("is-entering");
      });
    })
  );
}
