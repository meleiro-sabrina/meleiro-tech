/**
 * Prova social da homepage.
 *
 * Mantenha `false` até existirem depoimentos e logos reais para publicar.
 * Com `false`, a seção #prova fica oculta mesmo que o HTML seja reativado.
 * O bloco comentado em index.html explica como preencher e religar.
 *
 * Não publique depoimento, logo, número ou cliente inventado.
 */
export const SHOW_SOCIAL_PROOF = false;

export function initSocialProof() {
  const section = document.querySelector("[data-social-proof]");
  if (!section) return;
  section.hidden = !SHOW_SOCIAL_PROOF;
}
