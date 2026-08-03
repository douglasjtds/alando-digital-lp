"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

import { carregarAnime } from "./anime";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * GESTO 2: a travessia de cor.
 *
 * O fundo atravessa entre superfícies conforme a página desce. A aritmética da
 * cor está em `globals.css`; o que mora aqui é o vínculo com o scroll.
 *
 * ── A regra que os números impõem ────────────────────────────────────────────
 *
 * ⚠️ A travessia só acontece DENTRO DE UMA BANDA DE VALOR, e a cor do texto
 * precisa passar nas duas pontas. Claro para escuro é FRONTEIRA DE SEÇÃO, nunca
 * travessia: no meio do caminho o fundo viraria tom médio, o texto também, e o
 * contraste desabaria para perto de 1:1 sem que nada acusasse erro. As duas
 * travessias da página:
 *
 *   Hero      papel  -> superficie-2    texto `ancora`  (13,27 e 7,02)
 *   Processo  tinta  -> ancora-quente   texto `papel`   (8,29 e 11,54)
 *
 * O `Manifesto` fica em `ancora` puro, sem travessia: é a única seção verde da
 * página depois da revisão de 29/07, e atravessá-la gastaria justamente isso.
 *
 * ── O que é animado é UM ESCALAR ─────────────────────────────────────────────
 *
 * `--travessia-t`, de 0 a 1. Nenhum valor de cor passa por JavaScript: as duas
 * pontas chegam como nome de token (`var(--color-*)`) e o `color-mix` do CSS faz
 * a conta. É o que mantém a regra do CLAUDE.md ("nenhum hex fora de
 * `globals.css` e `brand.ts`") auditável pelo grep de sempre.
 *
 * ── `sync: true` ─────────────────────────────────────────────────────────────
 *
 * Scrub 1:1 com o scroll, sem suavização (conferido no fonte do anime.js: com
 * `syncSmooth === 1` o `lerp` não roda). A travessia é contínua e presa ao
 * scroll, não um trecho que dispara e toca sozinho.
 */

/** As quatro superfícies que participam. `ancora` não entra: ver acima. */
type Superficie = "papel" | "superficie-2" | "tinta" | "ancora-quente";

const TOKEN: Record<Superficie, string> = {
  papel: "var(--color-papel)",
  "superficie-2": "var(--color-superficie-2)",
  tinta: "var(--color-tinta)",
  "ancora-quente": "var(--color-ancora-quente)",
};

/**
 * Onde a travessia começa e termina, em coordenadas de scroll.
 *
 * `topo-da-pagina`: começa com a página no topo e termina quando a seção sai
 * pelo alto. É o caso do herói, que já está na tela quando a pessoa chega.
 * `passagem`: a travessia inteira cabe na passagem da seção pela viewport, do
 * momento em que ela entra por baixo ao momento em que sai por cima.
 */
type Ancoragem = "topo-da-pagina" | "passagem";

const LIMITES: Record<Ancoragem, { enter: string; leave: string }> = {
  "topo-da-pagina": { enter: "start start", leave: "start end" },
  passagem: { enter: "end start", leave: "start end" },
};

type Props = {
  de: Superficie;
  para: Superficie;
  ancoragem?: Ancoragem;
  children: ReactNode;
  className?: string;
};

export function TravessiaDeCor({
  de,
  para,
  ancoragem = "passagem",
  children,
  className,
}: Props) {
  const raiz = useRef<HTMLDivElement>(null);
  const movimentoReduzido = usePrefersReducedMotion();

  useEffect(() => {
    if (movimentoReduzido) return;

    const elemento = raiz.current;
    if (!elemento) return;

    let vivo = true;
    let desfazer: (() => void) | null = null;

    carregarAnime().then(({ animate, onScroll, createScope }) => {
      if (!vivo) return;

      const escopo = createScope({ root: elemento }).add(() => {
        animate(elemento, {
          "--travessia-t": { from: 0, to: 1 },
          ease: "linear",
          autoplay: onScroll({
            target: elemento,
            sync: true,
            ...LIMITES[ancoragem],
          }),
        });
      });

      desfazer = () => escopo.revert();
    });

    return () => {
      vivo = false;
      desfazer?.();
      /* `revert()` desfaz o que o anime.js escreveu, mas a garantia de que a
         seção volta à superfície declarada não pode depender disso: sem esta
         linha, trocar a preferência de movimento com a aba aberta deixaria o
         fundo congelado no meio da travessia. */
      elemento.style.removeProperty("--travessia-t");
    };
  }, [movimentoReduzido, ancoragem]);

  return (
    <div
      ref={raiz}
      className={`travessia ${className ?? ""}`.trim()}
      style={
        {
          "--travessia-de": TOKEN[de],
          "--travessia-para": TOKEN[para],
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
