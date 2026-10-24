(() => {
  const nav = document.querySelector(".nav");
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 20);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) {
    const title = document.querySelector("[data-split]");
    if (title) {
      const html = title.innerHTML;
      title.innerHTML = "";
      let delay = 0;
      html.split(/(<em>.*?<\/em>|\s+)/).filter(Boolean).forEach((chunk) => {
        if (/^\s+$/.test(chunk)) {
          title.appendChild(document.createTextNode(" "));
          return;
        }
        const span = document.createElement("span");
        span.className = "word";
        span.innerHTML = chunk;
        span.style.animationDelay = `${delay}s`;
        title.appendChild(span);
        delay += 0.06;
      });
    }
  }

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
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );
    reveals.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 0.06}s`;
      io.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  document.querySelectorAll(".svc").forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      document.querySelectorAll(".svc").forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });
})();
