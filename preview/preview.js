(() => {
  const rail = document.getElementById("rail");
  const stage = document.getElementById("stage");
  const panels = [...document.querySelectorAll(".panel")];
  const progressBar = document.getElementById("progressBar");
  const progressLabel = document.getElementById("progressLabel");
  const dotsWrap = document.getElementById("dots");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = () => window.matchMedia("(max-width: 900px)").matches;

  let index = 0;
  let locked = false;
  let touchX = 0;

  const total = panels.length;
  const pad = (n) => String(n).padStart(2, "0");

  // dots
  panels.forEach((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `Ir para painel ${i + 1}`);
    b.addEventListener("click", () => go(i));
    dotsWrap.appendChild(b);
  });
  const dots = [...dotsWrap.children];

  function setActive(i) {
    panels.forEach((p, n) => p.classList.toggle("is-active", n === i));
    dots.forEach((d, n) => d.classList.toggle("is-on", n === i));
    progressLabel.textContent = `${pad(i + 1)} / ${pad(total)}`;
    const pct = total <= 1 ? 100 : (i / (total - 1)) * 100;
    progressBar.style.width = `${pct}%`;
  }

  function go(i, instant = false) {
    if (mobile()) {
      index = Math.max(0, Math.min(total - 1, i));
      setActive(index);
      panels[index].scrollIntoView({ behavior: reduce || instant ? "auto" : "smooth", block: "start" });
      return;
    }
    if (locked && !instant) return;
    index = Math.max(0, Math.min(total - 1, i));
    setActive(index);
    if (instant || reduce) {
      rail.classList.remove("is-animating");
      rail.style.transform = `translate3d(${-index * 100}vw, 0, 0)`;
      return;
    }
    locked = true;
    rail.classList.add("is-animating");
    rail.style.transform = `translate3d(${-index * 100}vw, 0, 0)`;
    window.setTimeout(() => {
      locked = false;
    }, 900);
  }

  function onWheel(e) {
    if (mobile()) return;
    e.preventDefault();
    if (locked) return;
    const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (Math.abs(delta) < 8) return;
    go(index + (delta > 0 ? 1 : -1));
  }

  stage.addEventListener("wheel", onWheel, { passive: false });

  window.addEventListener("keydown", (e) => {
    if (mobile()) return;
    if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) {
      e.preventDefault();
      go(index + 1);
    }
    if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
      e.preventDefault();
      go(index - 1);
    }
    if (e.key === "Home") go(0);
    if (e.key === "End") go(total - 1);
  });

  stage.addEventListener(
    "touchstart",
    (e) => {
      touchX = e.changedTouches[0].clientX;
    },
    { passive: true },
  );
  stage.addEventListener(
    "touchend",
    (e) => {
      if (mobile()) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) < 40) return;
      go(index + (dx < 0 ? 1 : -1));
    },
    { passive: true },
  );

  // drag with mouse
  let dragging = false;
  let startX = 0;
  stage.addEventListener("pointerdown", (e) => {
    if (mobile() || e.button !== 0) return;
    if (e.target.closest("a,button")) return;
    dragging = true;
    startX = e.clientX;
    stage.setPointerCapture(e.pointerId);
  });
  stage.addEventListener("pointerup", (e) => {
    if (!dragging) return;
    dragging = false;
    const dx = e.clientX - startX;
    if (Math.abs(dx) < 50) return;
    go(index + (dx < 0 ? 1 : -1));
  });

  window.addEventListener("resize", () => {
    if (mobile()) {
      rail.classList.remove("is-animating");
      rail.style.transform = "";
      setActive(index);
    } else {
      go(index, true);
    }
  });

  // mobile: intersection observer for active panel
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        if (!mobile()) return;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const i = panels.indexOf(entry.target);
          if (i >= 0) {
            index = i;
            setActive(i);
          }
        });
      },
      { threshold: 0.55 },
    );
    panels.forEach((p) => io.observe(p));
  }

  go(0, true);
})();
