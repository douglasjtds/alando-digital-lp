/**
 * O lado PURO do negrito inline: só o padrão e o que se faz com ele fora do JSX.
 *
 * Par com `negrito.tsx`? Não: com `prosa.tsx`, que é quem renderiza. A separação
 * é a mesma de `pendencias.ts` (puro) e `pendencia.tsx` (JSX), e existe pelo
 * mesmo motivo: o `schema.ts` precisa do padrão e não pode importar React.
 *
 * ⚠️ A notação NÃO foi inventada aqui. O `ref-files/Landing Page copy.md` é
 * markdown e já traz negrito inline, na linha 41:
 * `**Ideal para empresas que estão começando ou passando por um reposicionamento.**`
 * A página descartava isso em silêncio. Ler o marcador é ser mais fiel à fonte
 * de verdade, não menos.
 *
 * A gramática de ênfase da marca continua sendo a da DESIGN-GUIDELINES.md §6, e
 * são DUAS coisas diferentes que não se misturam:
 *
 * - Itálico Playfair: UMA palavra, só em título display. `lib/italico.ts`.
 * - Negrito 600: trecho curto, só em corpo de texto, nunca em título. Aqui.
 */

/**
 * O trecho entre `**`.
 *
 * `[^*]+` e não `.+?` de propósito. Proibir asterisco DENTRO do trecho mata de
 * uma vez o aninhamento ambíguo e o `***texto***`, que em markdown de verdade
 * significa negrito e itálico juntos e aqui não significa nada. Sem essa classe,
 * `***x***` casaria com um asterisco sobrando de um lado e o defeito só
 * apareceria na tela, tarde. Nenhuma copy atual tem asterisco literal.
 */
export const PADRAO_NEGRITO = "\\*\\*([^*]+)\\*\\*";

/**
 * Instância NOVA a cada chamada, com `g`, para varrer um texto inteiro.
 *
 * Pelo mesmo motivo já registrado em `pendencias.ts`: regex global guarda
 * `lastIndex` entre execuções, e um regex compartilhado no escopo do módulo
 * passaria a pular trechos a partir da segunda chamada, sem nada acusar.
 */
export function negritoGlobal(): RegExp {
  return new RegExp(PADRAO_NEGRITO, "g");
}

/**
 * Tira os `**` e devolve só o texto.
 *
 * É o que o JSON-LD e qualquer consumidor de máquina precisam. Asterisco
 * literal num `description` de Schema.org é lixo publicado para o crawler, e é
 * a mesma classe de erro que o `<<A CONFIRMAR>>` existe para evitar: o grafo
 * aceita ausência, não aceita sujeira.
 *
 * Mora aqui, e não no `schema.ts`, para o que a página MOSTRA e o que o crawler
 * LÊ saírem do mesmo padrão. Duas definições de "o que é negrito" divergem, e a
 * que diverge é sempre a que ninguém está olhando.
 */
export function semNegrito(texto: string): string {
  return texto.replace(negritoGlobal(), "$1");
}
