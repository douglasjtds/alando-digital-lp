import React from "react";

import { negritoGlobal } from "@/lib/negrito";
import { renderizarPendencia, type Variante } from "@/lib/pendencia";

/**
 * O renderizador de CORPO DE TEXTO da página.
 *
 * Uma chamada só, e ela resolve as duas coisas que podem aparecer dentro de um
 * parágrafo vindo do `content.ts`: o negrito `**assim**` e o marcador de
 * pendência `<<A CONFIRMAR: ...>>`.
 *
 * ⚠️ O ponto todo da função está no laço abaixo: CADA segmento, em negrito ou
 * não, é repassado a `renderizarPendencia`. Sem isso, um `<<A CONFIRMAR>>` que
 * caísse dentro de um trecho em negrito (ou depois dele) sairia como texto
 * cru, e a pendência sumiria justamente do parágrafo que alguém está editando.
 * As duas camadas compõem em vez de competir.
 *
 * `renderizarPendencia` NÃO foi alterada: ela continua servindo eyebrow, rótulo
 * de botão e faixa de título, onde negrito não faz sentido nenhum. Quem tem
 * prosa chama esta; quem tem rótulo chama aquela.
 *
 * Onde usar: `Servicos` (corpo, fechamento e `maisQueContratar`), `Manifesto`,
 * `Sobre` e as respostas do `Faq`. Nunca em título display, que é território do
 * itálico Playfair (`lib/italico.ts`, DESIGN-GUIDELINES.md §6).
 */
export function renderizarProsa(
  texto: string,
  variante: Variante = "claro",
): React.ReactNode {
  const regex = negritoGlobal();
  const partes: React.ReactNode[] = [];
  let ultimoIndice = 0;
  let encontrou = false;

  let match;
  while ((match = regex.exec(texto)) !== null) {
    encontrou = true;

    if (match.index > ultimoIndice) {
      partes.push(
        <React.Fragment key={`texto-${ultimoIndice}`}>
          {renderizarPendencia(texto.slice(ultimoIndice, match.index), variante)}
        </React.Fragment>,
      );
    }

    /* Sem `className`, e é decisão, não esquecimento. O peso vem do
       `strong, b { font-weight: 600 }` do `globals.css`, e a cor vem por
       herança do `<p>` em volta. Assim o negrito funciona igual sobre `papel` e
       sobre `ancora-quente` sem uma linha de cor aqui, e a regra dura de
       "nenhum hex fora de globals.css e brand.ts" fica satisfeita de graça.

       `<strong>` e nunca `<b>`: é ênfase semântica, não peso visual solto. */
    /* `?? ""` só por causa do `noUncheckedIndexedAccess` do tsconfig: o grupo 1
       do padrão é `([^*]+)`, que exige ao menos um caractere, então em execução
       ele nunca é `undefined`. O `tsc` não sabe disso, e mentir com `!` seria
       pior que a linha honesta. */
    const trecho = match[1] ?? "";

    partes.push(
      <strong key={`negrito-${match.index}`}>
        {renderizarPendencia(trecho, variante)}
      </strong>,
    );

    ultimoIndice = regex.lastIndex;
  }

  /* Nenhum `**` no texto: devolve o que a `renderizarPendencia` devolveria, que
     é a string original quando também não há marcador. Chamar esta função em
     qualquer texto é sempre seguro. */
  if (!encontrou) return renderizarPendencia(texto, variante);

  if (ultimoIndice < texto.length) {
    partes.push(
      <React.Fragment key={`texto-${ultimoIndice}`}>
        {renderizarPendencia(texto.slice(ultimoIndice), variante)}
      </React.Fragment>,
    );
  }

  return partes;
}
