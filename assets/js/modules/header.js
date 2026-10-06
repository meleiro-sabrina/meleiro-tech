import { $, $$ } from "../core/dom.js";
import { onScroll } from "../core/scroll.js";

const SCROLLED_OFFSET = 24;
const MOBILE_BREAKPOINT = 960;
const SECTION_LINKS = {
  inicio: "#inicio",
  servicos: "#servicos",
  sobre: "#sobre",
  projetos: "#projetos",
  fundadora: "#sobre",
  contato: "#contato",
};

export function initHeader() {
  const header = $("#header");
  const burger = $("#burger");
  const nav = $("#nav");

  onScroll(() => {
    const scrolled = window.scrollY > SCROLLED_OFFSET;
    return () => header.classList.toggle("is-scrolled", scrolled);
  });

  const setMenu = (open) => {
    burger.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    header.classList.toggle("menu-open", open);
    document.body.classList.toggle("menu-open", open);
  };

  burger.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  $$("a", nav).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  header.addEventListener("click", (e) => e.target === header && setMenu(false));
  window.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
  window.addEventListener("resize", () => window.innerWidth > MOBILE_BREAKPOINT && setMenu(false));

  highlightCurrentSection();
}

function highlightCurrentSection() {
  const links = $$(".nav__link");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const href = SECTION_LINKS[entry.target.id];
        links.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === href));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  Object.keys(SECTION_LINKS)
    .map((id) => document.getElementById(id))
    .filter(Boolean)
    .forEach((section) => observer.observe(section));
}
