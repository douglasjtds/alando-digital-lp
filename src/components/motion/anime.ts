"use client";

/**
 * A porta de entrada do anime.js na página, e o único `import()` dele.
 *
 * ── Por que `import()` dinâmico ──────────────────────────────────────────────
 *
 * Chamado dentro de `useEffect`, ou seja, DEPOIS da hidratação. O bundler fica
 * obrigado a pôr a biblioteca num chunk separado, que só é baixado quando a
 * primeira seção animada monta. O caminho crítico do LCP não vê um byte disso.
 *
 * ── Por que UM import, e não cinco ───────────────────────────────────────────
 *
 * ⚠️ Medido: cinco `import()` paralelos (um por subpath) fizeram o Turbopack
 * duplicar o núcleo do anime.js em quatro chunks idênticos. O motivo e o número
 * estão em `anime-runtime.ts`, que é onde os cinco subpaths viraram imports
 * estáticos.
 *
 * A promessa é memoizada: as ~15 instâncias de `Revelar` chamam esta função
 * quase ao mesmo tempo, e sem o memo cada uma criaria a própria.
 */

export type Anime = typeof import("./anime-runtime");

let carregando: Promise<Anime> | null = null;

export function carregarAnime(): Promise<Anime> {
  carregando ??= import("./anime-runtime");
  return carregando;
}

/**
 * O vocabulário de movimento em números, num lugar só.
 *
 * A §8 exige que todo o movimento da página caiba em uma frase. Estes valores
 * são essa frase em milissegundos: se alguém precisar de um sexto valor aqui, o
 * vocabulário abriu e a regra foi quebrada.
 */
export const TEMPO = {
  /** Abertura da máscara (Gesto 3). Lento o bastante para ser percebido. */
  revelacao: 900,
  /** Abertura do segundo tempo do momento coreografado, mais demorada. */
  resolucao: 1200,
  /** A pausa entre os dois tempos do Manifesto. É ela que faz a reticência. */
  pausa: 380,
  /** Escalonamento entre itens de uma lista. */
  escalonamento: 110,
} as const;

/**
 * As curvas. `out(3)` desacelera cedo e chega devagar, que é o oposto de
 * "efeito": o movimento termina antes de o olho pedir que termine.
 */
export const CURVA = {
  revelacao: "out(3)",
  /** O escalonamento sai de uma curva, como a crista, não de um intervalo fixo. */
  escalonamento: "inOut(2)",
} as const;
