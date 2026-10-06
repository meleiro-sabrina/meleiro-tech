export const CONTACT = {
  email: "meleiro.tech@gmail.com",
  whatsapp: "5583993041956",
};

/** FormSubmit relays form posts to the inbox above (activated once via e-mail). */
export const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT.email}`;

export const DEFAULT_LANG = "pt";
export const LANG_STORAGE_KEY = "mt-lang";
