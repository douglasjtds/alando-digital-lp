import React from "react";
import { cn } from "@/lib/cn";
import { marcadorGlobal } from "@/lib/pendencias";

/**
 * A superfície onde o marcador é aplicado.
 *
 * ⚠️ A variante escura não é conveniência, é correção de contraste. O marcador
 * original pinta o texto em `acento-texto`, que sobre `papel` dá
 * 11,54:1, mas sobre `tinta` dá **1,39:1** e sobre `ancora-quente` **1,00:1**:
 * ou seja, invisível justamente nas duas seções que são feitas quase só de
 * marcador (`Processo` e `Resultados`). Pendência que ninguém consegue ler
 * derrota o propósito inteiro do marcador, que é alguém ver e substituir.
 *
 * No escuro o texto passa a `papel`, que rende 8,29:1 sobre `tinta` e 11,54:1
 * sobre `ancora-quente`, e o `acento` fica só no fundo e no sublinhado, papéis
 * decorativos onde contraste de texto não se aplica.
 */
type Variante = "claro" | "escuro";

const ESTILOS: Record<Variante, string> = {
  claro: "text-acento-texto bg-acento/15",
  escuro: "text-papel bg-acento/30",
};

export function renderizarPendencia(
  texto: string,
  variante: Variante = "claro",
): React.ReactNode {
  /* O padrão vem do `pendencias.ts`, que é o lado puro da mesma regra: o que
     conta como marcador aqui tem que ser exatamente o que é omitido do JSON-LD.
     Instância nova a cada chamada, porque regex global guarda `lastIndex`. */
  const regex = marcadorGlobal();
  const partes: (string | React.ReactNode)[] = [];
  let ultimoIndice = 0;
  let encontrou = false;

  let match;
  while ((match = regex.exec(texto)) !== null) {
    encontrou = true;

    if (match.index > ultimoIndice) {
      partes.push(texto.slice(ultimoIndice, match.index));
    }

    const pendencia = match[1];
    partes.push(
      <span
        key={`pendencia-${match.index}`}
        className={cn(
          "font-medium underline decoration-dashed",
          ESTILOS[variante],
          "px-1"
        )}
        title={pendencia}
      >
        {`<<${pendencia}>>`}
      </span>
    );

    ultimoIndice = regex.lastIndex;
  }

  if (!encontrou) return texto;

  if (ultimoIndice < texto.length) {
    partes.push(texto.slice(ultimoIndice));
  }

  return partes;
}
