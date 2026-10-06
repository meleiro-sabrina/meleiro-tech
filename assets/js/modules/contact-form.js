import { $, $$ } from "../core/dom.js";
import { getLang, t } from "../core/i18n.js";
import { toast } from "../core/toast.js";
import { CONTACT, FORM_ENDPOINT } from "../config.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function initContactForm() {
  const form = $("#contactForm");
  if (!form) return;
  const submitBtn = $("#submitBtn");
  const protocol = $("#formId");

  const newProtocol = () => (protocol.textContent = String(Math.floor(1000 + Math.random() * 9000)));
  newProtocol();

  clearErrorsOnInput(form);
  maskBrazilianPhone(form.elements.phone);

  const failValidation = () => {
    toast(t("toast.error"), "error");
    $(".is-invalid input, .is-invalid textarea", form)?.focus({ preventScroll: false });
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validate(form)) return failValidation();
    if (form.elements._honey.value) return;

    submitBtn.classList.add("is-loading");
    submitBtn.disabled = true;
    const data = readForm(form);

    try {
      await sendToInbox(data, `#MT-${protocol.textContent}`);
      $("#waAfter").href = whatsappUrl(data);
      form.classList.add("is-sent");
      toast(t("toast.sent"));
    } catch (err) {
      console.warn("Form submit failed:", err);
      toast(t("toast.fail"), "error");
    } finally {
      submitBtn.classList.remove("is-loading");
      submitBtn.disabled = false;
    }
  });

  $("#waBtn").addEventListener("click", () => {
    if (!validate(form)) return failValidation();
    window.open(whatsappUrl(readForm(form)), "_blank", "noopener");
  });

  $("#formReset").addEventListener("click", () => {
    form.reset();
    form.classList.remove("is-sent");
    newProtocol();
  });
}

function validate(form) {
  const { name, email, message } = form.elements;
  let valid = true;
  const mark = (holder, invalid) => {
    holder.classList.toggle("is-invalid", invalid);
    if (invalid) valid = false;
  };
  mark(name.closest(".field"), !name.value.trim());
  mark(email.closest(".field"), !EMAIL_PATTERN.test(email.value.trim()));
  mark(message.closest(".field"), !message.value.trim());
  mark($(".needs", form), !form.querySelector('input[name="need"]:checked'));
  return valid;
}

function clearErrorsOnInput(form) {
  $$("input, textarea", form).forEach((el) =>
    el.addEventListener("input", () => {
      (el.closest(".field") || el.closest(".needs"))?.classList.remove("is-invalid");
    })
  );
}

/** Formats as (83) 99999-9999 while typing; only applied in Portuguese. */
function maskBrazilianPhone(input) {
  input.addEventListener("input", () => {
    if (getLang() !== "pt") return;
    const d = input.value.replace(/\D/g, "").slice(0, 11);
    let out = d;
    if (d.length > 2) out = `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length > 7) out = `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
    input.value = out;
  });
}

function readForm(form) {
  const value = (name) => form.elements[name].value.trim();
  const need = form.querySelector('input[name="need"]:checked');
  return {
    name: value("name"),
    company: value("company"),
    email: value("email"),
    phone: value("phone"),
    need: need ? need.nextElementSibling.textContent.trim() : "",
    message: value("message"),
  };
}

async function sendToInbox(d, protocol) {
  const res = await fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      _subject: `Novo projeto pelo site — ${d.name}${d.company ? ` (${d.company})` : ""}`,
      _template: "table",
      _captcha: "false",
      _replyto: d.email,
      Nome: d.name,
      Empresa: d.company || "—",
      "E-mail": d.email,
      Telefone: d.phone || "—",
      "O que precisa": d.need,
      Projeto: d.message,
      Idioma: getLang().toUpperCase(),
      Protocolo: protocol,
    }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || String(body.success) !== "true") throw new Error(body.message || res.status);
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
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
}
