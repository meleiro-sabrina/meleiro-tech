/* Scroll, pin and reveal for the homepage. Lenis + GSAP/ScrollTrigger are globals. */

export function initImmersive() {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const hasGsap = gsap && ScrollTrigger;

  if (!hasGsap || reduce) {
    root.classList.remove("anim");
    window.__mtReady = true;
    return;
  }

  window.__mtReady = true;
  gsap.registerPlugin(ScrollTrigger);

  try {
    setup(gsap, ScrollTrigger, finePointer);
  } catch (error) {
    root.classList.remove("anim");
    console.error(error);
  }
}

function setup(gsap, ScrollTrigger, finePointer) {
  /* Smooth wheel only. Touch scrolling stays native (Lenis syncTouch defaults off). */
  let lenis = null;
  if (window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const id = anchor.getAttribute("href");
      if (!id || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target || target.hidden) return;
      event.preventDefault();
      const offset = id === "#inicio" ? 0 : -96;
      if (lenis) lenis.scrollTo(target, { offset, duration: 1.4 });
      else target.scrollIntoView();
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });

  const header = document.querySelector(".header");
  if (header) {
    let lastY = 0;
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const y = self.scroll();
        header.classList.toggle("is-hidden", y > 200 && y > lastY);
        lastY = y;
      },
    });
  }

  const ease = "expo.out";
  const hero = document.querySelector(".hero");
  if (hero) {
    const heroTl = gsap.timeline({ defaults: { ease } });
    heroTl
      .to(".hero__title .line>span", { y: 0, duration: 1.1, stagger: 0.1 }, 0.05)
      .to(".hero [data-fade]", { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, 0.35)
      .from(".hero__mascot", { scale: 0.85, opacity: 0, duration: 1.4 }, 0.1);
  }

  gsap.utils.toArray("[data-lines]").forEach((heading) => {
    if (heading.closest(".hero")) return;
    gsap.to(heading.querySelectorAll(".line>span"), {
      y: 0,
      duration: 1.1,
      stagger: 0.09,
      ease,
      scrollTrigger: { trigger: heading, start: "top 85%", once: true },
    });
  });

  gsap.utils.toArray("[data-fade]").forEach((el) => {
    if (el.closest(".hero")) return;
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease,
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
  });

  gsap.utils.toArray(".step").forEach((step) => {
    ScrollTrigger.create({
      trigger: step,
      start: "top 70%",
      end: "bottom 30%",
      onToggle: (self) => {
        if (self.isActive || self.progress === 1) step.style.opacity = 1;
      },
      onEnter: () => {
        step.style.opacity = 1;
      },
    });
  });

  /* Desktop: pinned horizontal services. Mobile: the column layout, no pin. */
  const mm = gsap.matchMedia();
  mm.add("(min-width: 1024px)", () => {
    const section = document.querySelector(".services");
    const track = section?.querySelector(".services__track");
    if (!section || !track) return undefined;

    section.classList.add("is-horizontal");
    const distance = () => track.scrollWidth - window.innerWidth;
    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => "+=" + distance(),
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        snap: {
          snapTo: 1 / (track.children.length - 1),
          duration: { min: 0.3, max: 0.8 },
          delay: 0.1,
          ease: "power2.inOut",
        },
      },
    });

    section.querySelectorAll(".panel__media img").forEach((img) => {
      gsap.fromTo(
        img,
        { xPercent: 6 },
        {
          xPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: img.closest(".panel"),
            containerAnimation: tween,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        }
      );
    });

    gsap.utils.toArray(".case__media, .founder__photo").forEach((media) => {
      gsap.fromTo(
        media,
        { y: 60 },
        {
          y: -60,
          ease: "none",
          scrollTrigger: { trigger: media, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    });

    gsap.utils.toArray(".case__phone").forEach((phone) => {
      gsap.fromTo(
        phone,
        { y: 80 },
        {
          y: -40,
          ease: "none",
          scrollTrigger: { trigger: phone, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    });

    if (document.querySelector(".hero__mascot")) {
      gsap.to(".hero__mascot", {
        y: -120,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
    }

    return () => section.classList.remove("is-horizontal");
  });

  if (finePointer) {
    const cursor = document.querySelector(".cursor");
    if (cursor) {
      document.documentElement.classList.add("has-cursor");
      const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
      window.addEventListener(
        "pointermove",
        (event) => {
          if (!cursor.classList.contains("is-on")) {
            gsap.set(cursor, { x: event.clientX, y: event.clientY });
            cursor.classList.add("is-on");
          }
          xTo(event.clientX);
          yTo(event.clientY);
        },
        { passive: true }
      );
      document.addEventListener("pointerover", (event) => {
        cursor.classList.toggle("is-hover", Boolean(event.target.closest("a, button, summary")));
      });
    }
  }

  document.addEventListener("mt:lang", () => ScrollTrigger.refresh());
  window.addEventListener("load", () => ScrollTrigger.refresh());
}
