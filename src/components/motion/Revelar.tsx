"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { CURVA, TEMPO, carregarAnime } from "./anime";

/**
 * GESTO 3: a revelação por máscara.
 *
 * SUBSTITUI o `fade + translateY` na página inteira. A máscara orgânica abre ao
 * longo da curva de crista da marca; o mecanismo está em `globals.css`, e o que
 * mora aqui é só quando ela abre. Ver DESIGN-GUIDELINES.md §8.
 *
 * ── As quatro garantias de que nada fica escondido ───────────────────────────
 *
 * 1. A classe `.revelar` é aplicada PELO JS. Sem JavaScript o elemento não tem
 *    máscara nenhuma, e não existe estado inicial escondido no HTML.
 * 2. Só recebe estado fechado quem está ABAIXO DA DOBRA no momento em que o JS
 *    monta. O que já está na tela nunca é escondido, nem no primeiro paint, nem
 *    por um observer que não dispare.
 * 3. Aba em segundo plano não fecha nada. `requestAnimationFrame` não roda em
 *    documento oculto, e o anime.js pausa a engine junto: fechar ali deixaria o
 *    bloco escondido até a aba voltar. Achado no review, e medido: com a aba
 *    oculta, 20 dos 31 blocos ficavam presos em 0 ou congelados no meio.
 * 4. O cleanup desfaz a classe e a variável à mão. `scope.revert()` desfaz o que
 *    o anime.js escreveu, mas ele não sabe da classe que este componente
 *    aplicou: sem esta parte, trocar a preferência de movimento com a aba aberta
 *    deixaria o bloco congelado no meio da abertura.
 *
 * ── A máscara SAI quando termina de abrir ────────────────────────────────────
 *
 * ⚠️ Não é limpeza opcional, é correção de acessibilidade, e o review a achou:
 * `mask-clip` vale `border-box` por padrão, então tudo pintado FORA da caixa
 * some. O anel de foco do projeto é `outline: 2px` com `outline-offset: 3px`,
 * ou seja, 5px fora da borda: com a máscara pendurada para sempre, o foco de
 * teclado ficava recortado em três CTAs e em todo `<summary>` do FAQ, sem nada
 * acusar. Aberta, a máscara não faz mais nenhum trabalho (é opaca inteira), e
 * tirá-la também devolve o elemento ao React e dispensa a camada composta.
 *
 * ── Roda uma vez ─────────────────────────────────────────────────────────────
 *
 * `sync: "play"` em vez do `"play pause"` padrão do anime.js, mais
 * `repeat: false`: abre ao entrar, não pausa ao sair, e o observer se desfaz
 * sozinho quando termina. É a regra 3 da §8 ("nada anima duas vezes"), e ela
 * vence a descrição do gesto com `sync`, porque conteúdo que volta a ser cortado
 * quando a pessoa sobe a página é o defeito que a §9 chama de pior desfecho.
 */

type Props = {
  children: ReactNode;
  /**
   * `bloco` revela o wrapper inteiro, num movimento só.
   * `lista` revela os filhos diretos, escalonados.
   */
  como?: "bloco" | "lista";
  /**
   * O elemento do wrapper. Existem para o componente não quebrar a semântica
   * que a seção já tinha: `ol` na sequência do `Processo`, `article` nos blocos
   * de serviço.
   */
  as?: Extract<ElementType, "div" | "ol" | "ul" | "article">;
  className?: string;
};

/**
 * Acima disto, a lista não cabe numa tela e o escalonamento seria gasto no
 * vazio: os últimos itens abririam longe da viewport e ninguém veria. Nesse
 * caso cada item ganha o próprio observer e abre quando chega a sua vez.
 */
const ALTURA_QUE_AINDA_ESCALONA = 1.25;

/**
 * A margem de entrada, em porcentagem da viewport, e ela é UM número de
 * propósito.
 *
 * O mesmo valor decide quem é fechado na montagem e onde o observer dispara. Na
 * primeira versão eram dois (10% e 8%), e o review mostrou a consequência: um
 * bloco que caísse na faixa de 2% entre os dois era fechado e reaberto no mesmo
 * quadro, ou seja, piscava.
 */
const MARGEM_DE_ENTRADA = 8;

/**
 * Tira a máscara e a variável. Usada no fim da abertura e no cleanup, e é o que
 * devolve o anel de foco (ver o cabeçalho) e o elemento ao React.
 */
function desmascarar(alvos: HTMLElement[]) {
  for (const alvo of alvos) {
    alvo.classList.remove("revelar");
    alvo.style.removeProperty("--revelacao");
  }
}

export function Revelar({
  children,
  como = "bloco",
  as: Tag = "div",
  className,
}: Props) {
  const raiz = useRef<HTMLElement>(null);
  const movimentoReduzido = usePrefersReducedMotion();

  useEffect(() => {
    if (movimentoReduzido) return;

    const elemento = raiz.current;
    if (!elemento) return;

    let vivo = true;
    let desfazerAnime: (() => void) | null = null;
    const tocados: HTMLElement[] = [];

    carregarAnime().then(({ animate, onScroll, stagger, createScope }) => {
      if (!vivo || document.hidden) return;

      const candidatos =
        como === "lista"
          ? (Array.from(elemento.children) as HTMLElement[])
          : [elemento];

      const fechados = candidatos.filter(
        (alvo) =>
          alvo.getBoundingClientRect().top >
          window.innerHeight * (1 - MARGEM_DE_ENTRADA / 100)
      );
      if (!fechados.length) return;

      const escalona =
        fechados.length > 1 &&
        elemento.getBoundingClientRect().height <=
          window.innerHeight * ALTURA_QUE_AINDA_ESCALONA;

      const escopo = createScope({ root: elemento }).add(() => {
        for (const alvo of fechados) {
          alvo.classList.add("revelar");
          alvo.style.setProperty("--revelacao", "0");
          tocados.push(alvo);
        }

        const abrir = (alvos: HTMLElement[], gatilho: HTMLElement) =>
          animate(alvos, {
            "--revelacao": { from: 0, to: 1 },
            duration: TEMPO.revelacao,
            ease: CURVA.revelacao,
            delay:
              alvos.length > 1
                ? stagger(TEMPO.escalonamento, { ease: CURVA.escalonamento })
                : 0,
            onComplete: () => desmascarar(alvos),
            autoplay: onScroll({
              target: gatilho,
              sync: "play",
              enter: `bottom-=${MARGEM_DE_ENTRADA}% top`,
              repeat: false,
            }),
          });

        if (escalona) {
          abrir(fechados, elemento);
        } else {
          for (const alvo of fechados) abrir([alvo], alvo);
        }
      });

      desfazerAnime = () => escopo.revert();
    });

    return () => {
      vivo = false;
      desfazerAnime?.();
      desmascarar(tocados);
    };
  }, [movimentoReduzido, como]);

  return (
    <Tag ref={raiz as React.Ref<never>} className={className}>
      {children}
    </Tag>
  );
}
