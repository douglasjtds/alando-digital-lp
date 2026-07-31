/**
 * A palavra em Playfair itálico dentro da linha display.
 *
 * É a gramática de ênfase da marca (DESIGN-GUIDELINES.md §6): no deck,
 * *construir*, *juntos?* e *números* aparecem em itálico serifado enquanto o
 * resto da linha é outra coisa.
 *
 * ⚠️ EXATAMENTE UMA palavra por título display, e é a que carrega o peso do
 * argumento. Uma só; duas viram decoração. Qual palavra é decidido em
 * `content.ts` (Fase 4), nunca no componente.
 *
 * Mora em `lib/` e não dentro da `FaixaRepetida` porque a mesma regra vale para
 * o `h1` do herói na Fase 5A. Regra reimplementada em dois lugares é regra que
 * diverge.
 */

/** As três partes do título: o que vem antes, a palavra, e o que vem depois. */
export type PartesDoTitulo = readonly [
  antes: string,
  palavra: string,
  depois: string,
];

/** Escapa o que for metacaractere de regex, para a palavra ser tratada literal. */
function escaparParaRegex(texto: string): string {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Parte o texto na PRIMEIRA ocorrência da palavra, respeitando fronteira de
 * palavra.
 *
 * A fronteira não é preciosismo: sem ela, marcar "arte" em "de forma artesanal"
 * italizaria quatro letras no meio de outra palavra, e o defeito passaria batido
 * em revisão porque a linha continua parecendo certa de longe. `\b` do
 * JavaScript não serve aqui, ele considera "ã" e "ç" fronteira; daí o
 * lookaround com classes Unicode.
 *
 * Devolve `null` quando não há palavra a marcar, ou quando a palavra não está no
 * texto. O componente renderiza o título limpo nesse caso: título sem itálico é
 * um defeito visível e barato; título quebrado, não.
 */
export function partirNoItalico(
  texto: string,
  palavra?: string,
): PartesDoTitulo | null {
  if (!palavra) return null;

  const busca = new RegExp(
    `(?<![\\p{L}\\p{N}])${escaparParaRegex(palavra)}(?![\\p{L}\\p{N}])`,
    "u",
  );
  const encontrada = busca.exec(texto);
  if (!encontrada) return null;

  const inicio = encontrada.index;
  const fim = inicio + encontrada[0].length;

  return [texto.slice(0, inicio), encontrada[0], texto.slice(fim)];
}
