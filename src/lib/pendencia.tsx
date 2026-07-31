import React from "react";
import { cn } from "@/lib/cn";

export function renderizarPendencia(texto: string): React.ReactNode {
  const regex = /<<([^>]*)>>/g;
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
          "font-medium text-acento-texto underline decoration-dashed",
          "bg-acento/15 px-1"
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
