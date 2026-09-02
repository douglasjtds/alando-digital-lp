"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { CURVA, TEMPO, carregarAnime } from "./anime";

/**
 * A sequência de quadros de "Captação e edição de vídeos".
 *
 * ⚠️ ESTE É O ÚNICO MOVIMENTO DA PÁGINA QUE NÃO É PRESO AO SCROLL, e isso é
 * desvio declarado da DESIGN-GUIDELINES.md §8, registrado lá e aqui. O argumento,
 * inteiro, é este: a única seção que anda sozinha no tempo é a que vende imagem
 * em movimento. Vídeo é quadro trocando no tempo. Aqui a autonomia é o argumento
 * da própria seção, não um efeito aplicado por cima dela.
 *
 * ── O desvio fica em UM eixo, o gatilho ──────────────────────────────────────
 *
 * O GESTO continua sendo o Gesto 3, a revelação por máscara: o quadro que entra
 * é trazido pela mesma crista de montanha que revela todo bloco da página, com a
 * mesma classe `.revelar` do `globals.css`, o mesmo `TEMPO.revelacao` e a mesma
 * `CURVA.revelacao`. Nenhum CSS novo, nenhum keyframe novo, nenhuma máscara nova.
 * O que muda é só quem dispara: um relógio, e não a posição do scroll.
 *
 * Fade fica de fora de propósito. Crossfade é a transição de qualquer carrossel,
 * e trocar a crista por ele seria desviar em dois eixos em vez de um.
 *
 * ── As quatro contenções, e nenhuma é opcional ───────────────────────────────
 *
 * 1. Só anda com o bloco na tela. IntersectionObserver: fora da viewport não há
 *    relógio, o que também é o que impede a sequência de queimar quadros (e
 *    bytes) para ninguém.
 * 2. Para com a aba oculta, no hover e no foco. `setInterval` não sabe de
 *    `document.hidden` e continuaria correndo com a aba escondida: a volta daria
 *    um salto de vários quadros de uma vez. E o `requestAnimationFrame` do
 *    anime.js NÃO roda em documento oculto, então uma varredura disparada ali
 *    ficaria pendurada no meio.
 * 3. Botão de pausa visível, exigência da WCAG 2.2.2 (conteúdo que anda sozinho
 *    por mais de cinco segundos precisa de um jeito de parar). Ele fica ABAIXO da
 *    foto, nunca sobreposto: overlay de carrossel é assinatura de template, e a
 *    §9 não deixa nada boiar por cima da imagem.
 * 4. `prefers-reduced-motion: reduce` não monta relógio nenhum. Fica o quadro em
 *    repouso, estático e inteiro, igual ao resto da página.
 *
 * ── Bytes: só se monta o que já tocou, mais o próximo ────────────────────────
 *
 * Dez quadros empilhados no HTML seriam ~840 KB baixados de uma vez, num bloco
 * só, numa página cujo canal principal é link na bio do Instagram. Então o DOM
 * cresce com a sequência: quem passa rolando pela seção em quatro segundos baixa
 * duas fotos, não dez. O próximo quadro é montado com um de antecedência, para
 * chegar carregado na hora de a crista passar por ele. Quadro já montado fica
 * montado: a volta do laço não refaz requisição.
 *
 * ── Acessibilidade da sequência ──────────────────────────────────────────────
 *
 * O quadro em repouso carrega o `alt` real; os nove são `alt=""` e
 * `aria-hidden`. É a mesma regra da `FaixaRepetida` ("uma instância semântica
 * só"), pelo mesmo motivo: dez descrições de mãos segurando câmera enfileiradas
 * dentro de um bloco de serviço são ruído, não informação.
 *
 * ── O DOM é ditado pelo parallax que já existia ──────────────────────────────
 *
 * ⚠️ `.foto-textura > img` é seletor de FILHO DIRETO. Embrulhar cada quadro numa
 * div mataria a textura de scroll em silêncio, sem erro nenhum. Por isso todos os
 * quadros usam `fill`, que é o que faz o `next/image` renderizar um `<img>` como
 * filho direto do wrapper.
 */

type Props = {
  /** O quadro em repouso: o único no HTML do servidor e o único com `alt`. */
  foto: string;
  fotoAlt: string;
  /** Os demais quadros, na ordem em que entram. Vazio desliga a sequência. */
  quadros: readonly string[];
  sizes: string;
  rotulos: {
    pausar: string;
    retomar: string;
    pausarDescricao: string;
    retomarDescricao: string;
  };
};

/**
 * A proporção do slot, fixada no wrapper para a troca de quadro não mexer na
 * altura do bloco.
 *
 * Os nove quadros são 9:16 exatos (o `servico-video.jpg` é 668×1177, 1% de
 * diferença que o `object-cover` absorve). Sem isto, cada quadro traria a própria
 * altura e a coluna pularia a cada 4,3 s.
 */
const PROPORCAO = "9 / 16";

export function SequenciaDeQuadros({
  foto,
  fotoAlt,
  quadros,
  sizes,
  rotulos,
}: Props) {
  const movimentoReduzido = usePrefersReducedMotion();

  const raiz = useRef<HTMLDivElement>(null);
  const refsDosQuadros = useRef<(HTMLImageElement | null)[]>([]);

  /** 0 é o quadro em repouso; 1 a N são os `quadros`. */
  const [indice, setIndice] = useState(0);
  /** O quadro que está sendo varrido pela crista neste momento, se houver. */
  const [entrando, setEntrando] = useState<number | null>(null);
  /**
   * Até onde o DOM já foi montado. Ver o bloco sobre bytes no cabeçalho.
   *
   * ⚠️ Só CRESCE, e quem o faz crescer são os dois callbacks que já existem (o
   * do observer e o do relógio), nunca o corpo de um efeito nem o do render.
   * Derivá-lo de `indice` seria mais curto e estaria errado: na volta do laço,
   * `indice` cai para 0 e oito quadros seriam DESMONTADOS para remontar em
   * seguida, um por vez.
   */
  const [montados, setMontados] = useState(0);

  const [naTela, setNaTela] = useState(false);
  const [pausadoPelaPessoa, setPausadoPelaPessoa] = useState(false);
  const [interagindo, setInteragindo] = useState(false);
  const [abaVisivel, setAbaVisivel] = useState(true);

  const total = quadros.length + 1;
  const sequenciaLigada = total > 1 && !movimentoReduzido;

  /* Com movimento reduzido a sequência volta ao quadro em repouso sem passar
     pelo estado: quem troca a preferência com a aba aberta não pode ficar preso
     no quadro do meio, e derivar é o que garante isso sem render em cascata. */
  const indiceVisivel = movimentoReduzido ? 0 : indice;
  const entrandoVisivel = movimentoReduzido ? null : entrando;


  /* `?? foto` nunca deveria acontecer (`montados` é limitado a `total - 1`),
     e existe para o índice ser um tipo estreito em vez de um `!`. */
  const fonteDoQuadro = (i: number) => (i === 0 ? foto : (quadros[i - 1] ?? foto));

  /* Só anda quando as quatro condições valem juntas. Nenhuma delas é a mesma
     coisa que outra: a pessoa pode ter pausado E ter saído do bloco. */
  const andando =
    sequenciaLigada &&
    naTela &&
    abaVisivel &&
    !pausadoPelaPessoa &&
    !interagindo;

  /* ── Quem está na tela ──────────────────────────────────────────────────── */

  useEffect(() => {
    if (!sequenciaLigada) return;

    const elemento = raiz.current;
    if (!elemento) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas.some((e) => e.isIntersecting);
        setNaTela(visivel);
        /* Entrou na tela: monta o quadro seguinte, que é o único jeito de ele
           chegar CARREGADO na hora de a crista passar por ele. */
        if (visivel) setMontados((atual) => Math.max(atual, 1));
      },
      { threshold: 0.25 },
    );
    observador.observe(elemento);

    return () => observador.disconnect();
  }, [sequenciaLigada]);

  /* ── A aba ──────────────────────────────────────────────────────────────── */

  useEffect(() => {
    if (!sequenciaLigada) return;

    const aoTrocar = () => setAbaVisivel(!document.hidden);
    aoTrocar();
    document.addEventListener("visibilitychange", aoTrocar);

    return () => document.removeEventListener("visibilitychange", aoTrocar);
  }, [sequenciaLigada]);

  /* ── O relógio ─────────────────────────────────────────────────────────── */

  useEffect(() => {
    if (!andando || entrando !== null) return;

    const id = window.setTimeout(() => {
      const proximo = (indice + 1) % total;
      setEntrando(proximo);
      /* Um de antecedência, pelo mesmo motivo do observer. No último quadro isto
         satura em `total - 1`, e daí em diante a sequência inteira está montada:
         a volta do laço não refaz requisição nenhuma. */
      setMontados((atual) => Math.max(atual, Math.min(proximo + 1, total - 1)));
    }, TEMPO.permanencia);

    return () => window.clearTimeout(id);
  }, [andando, entrando, indice, total]);

  /* ── A varredura, que é o Gesto 3 sem uma linha de CSS nova ─────────────── */

  useEffect(() => {
    /* `movimentoReduzido` aqui não é redundante com o `andando` do relógio: ele
       é o que DESFAZ uma varredura já em curso quando a preferência muda no meio
       dela, pelo cleanup logo abaixo. */
    if (entrando === null || movimentoReduzido) return;

    const alvo = refsDosQuadros.current[entrando];
    if (!alvo) {
      /* O quadro ainda não montou. Assume a troca seca em vez de deixar a
         sequência travada esperando por um elemento que talvez nunca venha. */
      setIndice(entrando);
      setEntrando(null);
      return;
    }

    let vivo = true;
    let animacao: { revert: () => void } | null = null;

    const encerrar = () => {
      alvo.classList.remove("revelar");
      alvo.style.removeProperty("--revelacao");
    };

    /**
     * Assume o quadro, com ou sem varredura. É chamado pelo `onComplete` do
     * anime.js e, se ele não vier, pelo PRAZO abaixo.
     */
    const assumir = () => {
      if (!vivo) return;
      vivo = false;
      window.clearTimeout(prazo);
      encerrar();
      setIndice(entrando);
      setEntrando(null);
    };

    /**
     * ⚠️ O PRAZO, e ele não é cinto de segurança teórico: sem ele a sequência
     * PARA PARA SEMPRE se a varredura não avisar que terminou, com um quadro
     * pendurado no meio da máscara. Achado no passe visual, onde a engine do
     * anime.js ficou suspensa e o estado travou em "varrendo" por catorze
     * segundos seguidos.
     *
     * As duas causas reais são independentes do bug daquele ambiente: o chunk do
     * anime.js pode simplesmente não chegar (rede), e a engine dele pausa junto
     * com o `requestAnimationFrame` quando a aba se esconde. Nos dois casos o
     * `onComplete` nunca roda.
     *
     * Repare no que acontece SEM o prazo, que é o que torna a falha silenciosa: o
     * quadro que entra fica mascarado (invisível) e o que sai continua em
     * `opacity: 1`, então a página não mostra buraco nenhum. Ninguém vê defeito,
     * a sequência só morre. Com o prazo ela troca de quadro seco e continua.
     *
     * A folga sobre `TEMPO.revelacao` é generosa de propósito: ela precisa
     * absorver o download do chunk na primeira troca, e chegar antes do prazo é o
     * caso normal, não a exceção.
     */
    const prazo = window.setTimeout(assumir, TEMPO.revelacao + 1200);

    alvo.classList.add("revelar");
    alvo.style.setProperty("--revelacao", "0");

    carregarAnime()
      .then(({ animate }) => {
        if (!vivo) return;

        animacao = animate(alvo, {
          "--revelacao": { from: 0, to: 1 },
          duration: TEMPO.revelacao,
          ease: CURVA.revelacao,
          onComplete: assumir,
        });
      })
      /* O chunk não chegou. O prazo acima é quem resolve; aqui só não se deixa
         uma rejeição sem dono. */
      .catch(() => {});

    return () => {
      vivo = false;
      window.clearTimeout(prazo);
      animacao?.revert();
      encerrar();
    };
  }, [entrando, movimentoReduzido]);

  const alternarPausa = useCallback(
    () => setPausadoPelaPessoa((atual) => !atual),
    [],
  );

  return (
    <div
      onMouseEnter={() => setInteragindo(true)}
      onMouseLeave={() => setInteragindo(false)}
      onFocus={() => setInteragindo(true)}
      onBlur={() => setInteragindo(false)}
    >
      <div
        ref={raiz}
        className="foto-textura relative [clip-path:url(#crista-faixa)]"
        style={{ aspectRatio: PROPORCAO }}
      >
        {Array.from({ length: montados + 1 }, (_, i) => (
          <Image
            key={fonteDoQuadro(i)}
            ref={(elemento) => {
              refsDosQuadros.current[i] = elemento;
            }}
            src={fonteDoQuadro(i)}
            alt={i === 0 ? fotoAlt : ""}
            aria-hidden={i === 0 ? undefined : true}
            fill
            sizes={sizes}
            className="object-cover"
            /* `opacity` e não `display`, porque um quadro escondido precisa
               continuar BAIXANDO: é ele que chega pronto na vez dele. O que
               entra fica por cima do que sai enquanto a crista passa. */
            style={{
              opacity: i === indiceVisivel || i === entrandoVisivel ? 1 : 0,
              zIndex: i === entrandoVisivel ? 2 : i === indiceVisivel ? 1 : 0,
            }}
          />
        ))}
      </div>

      {/* O controle da WCAG 2.2.2. Só existe se houver sequência para parar:
          com movimento reduzido, ou sem quadros, não há o que pausar. */}
      {sequenciaLigada && (
        <button
          type="button"
          onClick={alternarPausa}
          aria-pressed={pausadoPelaPessoa}
          aria-label={
            pausadoPelaPessoa
              ? rotulos.retomarDescricao
              : rotulos.pausarDescricao
          }
          className={cn(
            "mt-4 inline-flex min-h-11 items-center",
            "caption font-ui text-tinta-suave",
            "underline decoration-acento underline-offset-4",
            "transition-colors hover:text-acento-texto",
            "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-acento-texto",
          )}
        >
          {pausadoPelaPessoa ? rotulos.retomar : rotulos.pausar}
        </button>
      )}
    </div>
  );
}
