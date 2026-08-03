"use client";

import { useSyncExternalStore } from "react";

/**
 * A preferência de acessibilidade que desliga o movimento da página inteira.
 *
 * ── Por que `useSyncExternalStore`, e não `useState` + `useEffect` ────────────
 *
 * `matchMedia` é estado que vive FORA do React e muda sozinho (a pessoa troca a
 * preferência no sistema com a aba aberta). Com `useState` + `useEffect` existe
 * uma janela real entre o primeiro render e o efeito em que o componente já
 * decidiu "pode animar" com base num palpite. `useSyncExternalStore` não tem
 * essa janela: ele lê a fonte no mesmo momento em que o React renderiza.
 *
 * ── O snapshot de servidor é `true` DE PROPÓSITO ──────────────────────────────
 *
 * No servidor, e na janela anterior à hidratação, não existe `matchMedia`. O
 * padrão seguro nessa faixa é NÃO animar: se o JS nunca chegar, ou chegar tarde,
 * a página fica estática e completa, que é o desfecho certo. O contrário
 * (assumir que pode animar) esconderia conteúdo de quem pediu menos movimento,
 * que é o pior desfecho possível segundo a §9 da estrutura.
 *
 * As três funções vivem fora do componente porque `useSyncExternalStore` compara
 * as referências: declaradas dentro, cada render assinaria de novo.
 */

const CONSULTA = "(prefers-reduced-motion: reduce)";

function assinar(aoMudar: () => void) {
  const consulta = window.matchMedia(CONSULTA);
  consulta.addEventListener("change", aoMudar);
  return () => consulta.removeEventListener("change", aoMudar);
}

function lerNoCliente() {
  return window.matchMedia(CONSULTA).matches;
}

function lerNoServidor() {
  return true;
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(assinar, lerNoCliente, lerNoServidor);
}
