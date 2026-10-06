(() => {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ================= I18N ================= */
  const dict = window.I18N;
  let lang = localStorage.getItem("mt-lang") || "pt";
  if (!dict[lang]) lang = "pt";

  const t = (key) => (dict[lang] && dict[lang][key]) ?? dict.pt[key] ?? key;

  function applyLang(next, { animate = false } = {}) {
    lang = next;
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en-US";
    document.title = t("meta.title");
    $('meta[name="description"]').setAttribute("content", t("meta.desc"));

    $$("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
      if (animate) swap(el);
    });
    $$("[data-i18n-html]").forEach((el) => {
      el.innerHTML = t(el.dataset.i18nHtml);
      if (animate) swap(el);
    });
    $$(".lang__btn").forEach((b) => b.classList.toggle("is-active", b.dataset.lang === lang));
    localStorage.setItem("mt-lang", lang);
  }

  function swap(el) {
    el.classList.remove("i18n-swap");
    void el.offsetWidth;
    el.classList.add("i18n-swap");
  }

  $$(".lang__btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      if (btn.dataset.lang === lang) return;
      applyLang(btn.dataset.lang, { animate: true });
      toast(t("toast.lang"));
    })
  );

  applyLang(lang);

  /* ================= TOAST ================= */
  const toastEl = $("#toast");
  let toastTimer;
  function toast(msg, type = "") {
    toastEl.textContent = msg;
    toastEl.className = "toast is-visible" + (type ? " is-" + type : "");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-visible"), 2800);
  }

  /* ================= HEADER ================= */
  const header = $("#header");
  const onScrollHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
  onScrollHeader();

  const burger = $("#burger");
  const nav = $("#nav");
  function setMenu(open) {
    burger.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    header.classList.toggle("menu-open", open);
    document.body.classList.toggle("menu-open", open);
  }
  burger.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  $$("a", nav).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  header.addEventListener("click", (e) => e.target === header && setMenu(false));
  window.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
  window.addEventListener("resize", () => window.innerWidth > 960 && setMenu(false));

  const navLinks = $$(".nav__link");
  const sectionIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        navLinks.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === "#" + en.target.id));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  ["inicio", "servicos", "projetos", "sobre", "contato"].forEach((id) => {
    const s = document.getElementById(id);
    if (s) sectionIO.observe(s);
  });

  /* ================= REVEAL ================= */
  const revealIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          revealIO.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  $$(".reveal").forEach((el) => revealIO.observe(el));

  /* ================= HERO: MOUSE PARALLAX ================= */
  const heroVisual = $("#heroVisual");
  const depthEls = $$("[data-depth]", heroVisual);
  if (finePointer && !reduceMotion) {
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      depthEls.forEach((el) => {
        const d = parseFloat(el.dataset.depth);
        el.style.translate = `${(cx * d * 18).toFixed(2)}px ${(cy * d * 18).toFixed(2)}px`;
      });
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.001 ? requestAnimationFrame(loop) : null;
    };
    $(".hero").addEventListener("mousemove", (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(loop);
    });
    $(".hero").addEventListener("mouseleave", () => {
      tx = ty = 0;
      if (!raf) raf = requestAnimationFrame(loop);
    });
  }

  /* ================= HERO: PARTICLES ================= */
  const canvas = $("#particles");
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext("2d");
    let w, h, dpr, parts = [], running = false;
    const count = window.innerWidth < 680 ? 26 : 48;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
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
    resize();
    parts = Array.from({ length: count }, () => spawn(true));
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) parts[i] = spawn(false);
        const fade = Math.min(1, p.y / (h * 0.25), (h - p.y) / (h * 0.25));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.lime ? `rgba(215,243,0,${p.a * fade})` : `rgba(143,166,214,${p.a * fade * 0.8})`;
        ctx.fill();
        for (let j = i + 1; j < parts.length; j++) {
          const q = parts[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = dx * dx + dy * dy;
          if (dist < 6400) {
            ctx.strokeStyle = `rgba(215,243,0,${(1 - dist / 6400) * 0.12 * fade})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    };

    new IntersectionObserver(([en]) => {
      const was = running;
      running = en.isIntersecting && !document.hidden;
      if (running && !was) requestAnimationFrame(draw);
    }).observe(canvas);
  }

  /* ================= SCROLL-DRIVEN EFFECTS ================= */
  const pipeline = $("#pipeline");
  const steps = $$(".step", pipeline);
  const arrows = $$(".step__arrow", pipeline);
  const parallaxEls = [
    { el: $(".hero__content"), speed: 0.18, fade: true },
    { el: heroVisual, speed: 0.08 },
    { el: $(".process__mascot"), speed: -0.12 },
    { el: $(".footer__mascot"), speed: -0.08 },
  ].filter((p) => p.el);

  function onScroll() {
    onScrollHeader();
    const vh = window.innerHeight;

    if (!reduceMotion && window.innerWidth > 680) {
      parallaxEls.forEach(({ el, speed, fade }) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const offset = (r.top + r.height / 2 - vh / 2) * speed;
        if (el === heroVisual || fade) {
          const y = window.scrollY * speed;
          el.style.transform = `translate3d(0, ${y}px, 0)`;
          if (fade) el.style.opacity = String(Math.max(0, 1 - window.scrollY / (vh * 0.9)));
        } else {
          el.style.transform = `translate3d(0, ${offset}px, 0)`;
        }
      });
    }

    if (pipeline) {
      const r = pipeline.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh * 0.78 - r.top) / (r.height + vh * 0.25)));
      pipeline.style.setProperty("--p", p.toFixed(3));
      const vertical = window.innerWidth <= 960;
      steps.forEach((s, i) => {
        let on;
        if (vertical) {
          const sr = s.getBoundingClientRect();
          on = sr.top < vh * 0.8;
        } else {
          on = p >= i / (steps.length - 1) - 0.02;
        }
        s.classList.toggle("is-active", on);
        if (arrows[i]) arrows[i].classList.toggle("is-active", on);
      });
    }
  }

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
    },
    { passive: true }
  );
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ================= SERVICE CARDS: SPOTLIGHT ================= */
  if (finePointer) {
    $$(".service-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--x", `${e.clientX - r.left}px`);
        card.style.setProperty("--y", `${e.clientY - r.top}px`);
      });
    });
  }

  /* ================= PORTFOLIO FILTER ================= */
  const grid = $("#projects");
  const projects = $$(".project", grid);
  $$(".filter").forEach((btn) =>
    btn.addEventListener("click", () => {
      $$(".filter").forEach((b) => b.classList.toggle("is-active", b === btn));
      const f = btn.dataset.filter;
      grid.classList.toggle("is-filtered", f !== "all");
      projects.forEach((p, i) => {
        const show = f === "all" || p.dataset.cat === f;
        p.classList.toggle("is-hidden", !show);
        p.classList.remove("is-entering");
        if (show) {
          p.classList.add("is-visible");
          void p.offsetWidth;
          p.style.animationDelay = `${(i % 3) * 70}ms`;
          p.classList.add("is-entering");
        }
      });
    })
  );

  $$('.project__cta[href^="#"]').forEach((a) =>
    a.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toast(t("toast.soon"));
    })
  );

  /* ================= TECH CONSTELLATION ================= */
  const cons = $("#constellation");
  if (cons) {
    const g = $("#cLines");
    const NS = "http://www.w3.org/2000/svg";
    const nodes = $$(".cnode", cons);
    const flows = [];

    const orbit = document.createElementNS(NS, "circle");
    orbit.setAttribute("cx", 500);
    orbit.setAttribute("cy", 500);
    orbit.setAttribute("r", 300);
    orbit.setAttribute("class", "orbit");
    g.appendChild(orbit);

    nodes.forEach((n) => {
      const x = parseFloat(n.style.getPropertyValue("--x")) * 10;
      const y = parseFloat(n.style.getPropertyValue("--y")) * 10;
      const base = document.createElementNS(NS, "line");
      const flow = document.createElementNS(NS, "line");
      [base, flow].forEach((l) => {
        l.setAttribute("x1", 500);
        l.setAttribute("y1", 500);
        l.setAttribute("x2", x);
        l.setAttribute("y2", y);
        g.appendChild(l);
      });
      flow.style.opacity = "0";
      flow.style.transition = "opacity .5s";
      flow.classList.add("flow");
      flows.push(flow);
    });

    let idx = 0;
    const light = (i) => {
      nodes.forEach((n, k) => n.classList.toggle("is-lit", k === i));
      flows.forEach((f, k) => (f.style.opacity = k === i || k === (i + 4) % nodes.length ? ".8" : "0"));
    };
    nodes.forEach((n, i) => n.addEventListener("mouseenter", () => { idx = i; light(i); }));

    if (!reduceMotion) {
      let timer = null;
      new IntersectionObserver(([en]) => {
        if (en.isIntersecting && !timer) {
          light(idx);
          timer = setInterval(() => light((idx = (idx + 1) % nodes.length)), 1700);
        } else if (!en.isIntersecting && timer) {
          clearInterval(timer);
          timer = null;
        }
      }).observe(cons);
    }
  }

  /* ================= MAGNETIC CTA ================= */
  if (finePointer && !reduceMotion) {
    $$(".magnetic").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.18;
        const y = (e.clientY - r.top - r.height / 2) * 0.3;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener("mouseleave", () => (el.style.transform = ""));
    });
  }

  /* ================= CONTACT FORM ================= */
  const form = $("#contactForm");
  const formId = $("#formId");
  const newId = () => (formId.textContent = String(Math.floor(1000 + Math.random() * 9000)));
  newId();

  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

  function validate() {
    let ok = true;
    const mark = (el, bad) => {
      el.classList.toggle("is-invalid", bad);
      if (bad) ok = false;
    };
    mark($("#f-name").closest(".field"), !$("#f-name").value.trim());
    mark($("#f-email").closest(".field"), !emailOk($("#f-email").value.trim()));
    mark($("#f-msg").closest(".field"), !$("#f-msg").value.trim());
    mark($(".needs", form), !form.querySelector('input[name="need"]:checked'));
    return ok;
  }

  $$("input, textarea", form).forEach((el) =>
    el.addEventListener("input", () => {
      const holder = el.closest(".field") || el.closest(".needs");
      if (holder && holder.classList.contains("is-invalid")) holder.classList.remove("is-invalid");
    })
  );

  const phone = $("#f-phone");
  phone.addEventListener("input", () => {
    if (lang !== "pt") return;
    const d = phone.value.replace(/\D/g, "").slice(0, 11);
    let out = d;
    if (d.length > 2) out = `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length > 7) out = `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
    phone.value = out;
  });

  const CONTACT_EMAIL = "meleiro.tech@gmail.com";
  const WHATSAPP = "5583993051956";

  function readForm() {
    const need = form.querySelector('input[name="need"]:checked');
    const val = (n) => form.elements[n].value.trim();
    return {
      name: val("name"),
      company: val("company"),
      email: val("email"),
      phone: val("phone"),
      need: need ? need.nextElementSibling.textContent.trim() : "",
      message: val("message"),
    };
  }

  function whatsappUrl(d) {
    const lines = [t("wa.greeting"), ""];
    const add = (label, value) => value && lines.push(`*${t(label)}:* ${value}`);
    add("contact.f.name", d.name);
    add("contact.f.company", d.company);
    add("contact.f.email", d.email);
    add("contact.f.phone", d.phone);
    add("wa.need", d.need);
    if (d.message) lines.push("", `*${t("wa.project")}:*`, d.message);
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`;
  }

  function failValidation() {
    toast(t("toast.error"), "error");
    const first = $(".is-invalid input, .is-invalid textarea", form);
    if (first) first.focus({ preventScroll: false });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validate()) return failValidation();
    if (form.elements._honey.value) return;

    const btn = $("#submitBtn");
    btn.classList.add("is-loading");
    btn.disabled = true;

    const d = readForm();
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Novo projeto pelo site — ${d.name}${d.company ? " (" + d.company + ")" : ""}`,
          _template: "table",
          _captcha: "false",
          _replyto: d.email,
          Nome: d.name,
          Empresa: d.company || "—",
          "E-mail": d.email,
          Telefone: d.phone || "—",
          "O que precisa": d.need,
          Projeto: d.message,
          Idioma: lang.toUpperCase(),
          Protocolo: "#MT-" + formId.textContent,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) !== "true") throw new Error(data.message || res.status);

      $("#waAfter").href = whatsappUrl(d);
      form.classList.add("is-sent");
      toast(t("toast.sent"));
    } catch (err) {
      console.warn("Form submit failed:", err);
      toast(t("toast.fail"), "error");
    } finally {
      btn.classList.remove("is-loading");
      btn.disabled = false;
    }
  });

  $("#waBtn").addEventListener("click", () => {
    if (!validate()) return failValidation();
    window.open(whatsappUrl(readForm()), "_blank", "noopener");
  });

  $("#formReset").addEventListener("click", () => {
    form.reset();
    form.classList.remove("is-sent");
    newId();
  });

  /* ================= MISC ================= */
  $("#year").textContent = new Date().getFullYear();
})();
