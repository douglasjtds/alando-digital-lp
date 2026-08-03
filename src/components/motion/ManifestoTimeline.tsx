"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { CURVA, TEMPO, carregarAnime } from "./anime";

/**
 * O MOMENTO COREOGRAFADO: Resolução. Uma vez só, na entrada do `Manifesto`.
 *
 * "Antes de falar sobre redes sociais…" aparece, e "…queremos falar sobre
 * pessoas." resolve depois. A reticência do título fica no ar pelo tempo da
 * pausa, e é ela que faz o gesto.
 *
 * ── Não é um quarto gesto ────────────────────────────────────────────────────
 *
 * É a MESMA revelação por máscara do `Revelar`, em dois tempos, com uma pausa
 * entre eles. O vocabulário da §8 é fechado: um momento coreografado é uma
 * questão de TEMPO, não de um efeito novo. Se este componente precisasse de uma
 * propriedade que o Gesto 3 não usa, o vocabulário teria aberto.
 *
 * ── Por que aqui, e por que só aqui ──────────────────────────────────────────
 *
 * Abaixo da dobra, zero risco de LCP, e amarrado ao conceito central da marca
 * ("antes"), que é a razão de o `Manifesto` ser a seção-assinatura. Ver
 * DESIGN-GUIDELINES.md §8 e landing-page-structure.md §5.3.
 *
 * As garantias são as mesmas do `Revelar`: a classe `.revelar` vem do JS, só
 * fecha o que está abaixo da dobra, e o cleanup desfaz classe e variável à mão.
 */

type Props = {
  children: ReactNode;
  className?: string;
};

export function ManifestoTimeline({ children, className }: Props) {
  const raiz = useRef<HTMLDivElement>(null);
  const movimentoReduzido = usePrefersReducedMotion();

  useEffect(() => {
    if (movimentoReduzido) return;

    const elemento = raiz.current;
    if (!elemento) return;

    const titulo = elemento.querySelector<HTMLElement>(
      '[data-manifesto="titulo"]'
    );
    const resolucao = elemento.querySelector<HTMLElement>(
      '[data-manifesto="resolucao"]'
    );
    if (!titulo || !resolucao) return;

    /* Se a seção já está na tela quando o JS monta, o momento não acontece: o
       visitante veria o título piscar. Nada é escondido nesse caso. E aba em
       segundo plano não fecha nada: sem `requestAnimationFrame` a abertura não
       roda, e o conteúdo ficaria escondido até a aba voltar. */
    if (document.hidden) return;
    if (elemento.getBoundingClientRect().top <= window.innerHeight * 0.92)
      return;

    let vivo = true;
    let desfazer: (() => void) | null = null;
    const tempos = [titulo, resolucao];
    const desmascarar = () => {
      for (const tempo of tempos) {
        tempo.classList.remove("revelar");
        tempo.style.removeProperty("--revelacao");
      }
    };

    carregarAnime().then(({ createTimeline, onScroll, createScope }) => {
      if (!vivo) return;

      const escopo = createScope({ root: elemento }).add(() => {
        for (const tempo of tempos) {
          tempo.classList.add("revelar");
          tempo.style.setProperty("--revelacao", "0");
        }

        createTimeline({
          /* A máscara sai quando termina de abrir. Aberta ela não faz mais
             trabalho nenhum, e pendurada recortaria o anel de foco de qualquer
             interativo dentro dela: `mask-clip` é `border-box` e o anel do
             projeto fica 5px fora da borda. Mesmo motivo do `Revelar`. */
          onComplete: desmascarar,
          autoplay: onScroll({
            target: elemento,
            sync: "play",
            enter: "bottom-=8% top",
            repeat: false,
          }),
        })
          .add(titulo, {
            "--revelacao": { from: 0, to: 1 },
            duration: TEMPO.revelacao,
            ease: CURVA.revelacao,
          })
          .add(
            resolucao,
            {
              "--revelacao": { from: 0, to: 1 },
              duration: TEMPO.resolucao,
              ease: CURVA.revelacao,
            },
            `+=${TEMPO.pausa}`
          );
      });

      desfazer = () => escopo.revert();
    });

    return () => {
      vivo = false;
      desfazer?.();
      desmascarar();
    };
  }, [movimentoReduzido]);

  return (
    <div ref={raiz} className={className}>
      {children}
    </div>
  );
}
