(() => {
  const nav = document.querySelector(".nav");
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = document.querySelectorAll(".reveal");
  if (reduce) {
    reveals.forEach((el) => el.classList.add("is-in"));
  } else if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );
    reveals.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 5) * 0.05}s`;
      io.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  const track = document.getElementById("caseTrack");
  const prev = document.getElementById("casePrev");
  const next = document.getElementById("caseNext");
  const scrollByCard = (dir) => {
    if (!track) return;
    const card = track.querySelector(".case");
    const delta = (card ? card.getBoundingClientRect().width : 320) + 18;
    track.scrollBy({ left: dir * delta, behavior: reduce ? "auto" : "smooth" });
  };
  prev?.addEventListener("click", () => scrollByCard(-1));
  next?.addEventListener("click", () => scrollByCard(1));
})();
