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
  /**
   * O tempo que cada quadro da sequência de Captação fica parado antes de a
   * crista trazer o próximo. Ver `SequenciaDeQuadros.tsx` e o desvio registrado
   * na DESIGN-GUIDELINES.md §8.
   *
   * ⚠️ ESTE É O QUINTO VALOR, e o comentário acima diz que um sexto significa
   * que o vocabulário abriu. Ou seja: é o último que cabe aqui. O próximo pedido
   * de movimento na página não tem mais essa folga e precisa reusar um destes.
   *
   * 2200 ms mais os 900 da varredura dão 3,1 s por quadro. Longo o bastante para
   * a foto ser lida como foto, e não como frame de um efeito.
   *
   * Duas reduções, as duas em 04/09 e as duas com o Douglas vendo o bloco rodar:
   * 3400 caiu para 3200, e como o corte de 0,2 s não se notou, 3200 caiu para
   * 2200. Não é tempo novo no vocabulário: é o mesmo campo, com outro valor.
   */
  permanencia: 2200,
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
