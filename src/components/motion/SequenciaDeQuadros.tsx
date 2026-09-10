"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { CURVA, TEMPO, carregarAnime } from "./anime";

/**
 * A sequência de quadros de "Captação e edição de vídeos", e desde 10/09 também
 * a de "Identidade Visual" (ver o bloco do segundo slot, mais abaixo).
 *
 * ⚠️ ESTE MOVIMENTO NÃO É PRESO AO SCROLL, e isso é desvio declarado da
 * DESIGN-GUIDELINES.md §8, registrado lá e aqui. Em Captação o argumento,
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
 * ── Bytes: só se monta o que já tocou, mais os dois seguintes ────────────────
 *
 * Onze quadros empilhados no HTML seriam ~1 MB baixado de uma vez, num bloco
 * só, numa página cujo canal principal é link na bio do Instagram. Então o DOM
 * cresce com a sequência: quem passa rolando pela seção em quatro segundos baixa
 * três fotos, não onze. O próximo quadro é montado com um de antecedência, para
 * chegar carregado na hora de a crista passar por ele. Quadro já montado fica
 * montado: a volta do laço não refaz requisição.
 *
 * A terceira foto é a placa de trás da PILHA (abaixo), e ela sai de graça duas
 * vezes: mostra `n+2` e, de quebra, já deixa esse quadro baixado antes da vez
 * dele. As placas repetem o `sizes` da foto da frente de propósito, então placa
 * e empilhamento pedem a MESMA URL do `/_next/image`, que é uma requisição só.
 *
 * ── A PILHA: as outras fotos aparecendo atrás da atual ───────────────────────
 *
 * Duas placas atrás da foto, em leque, com os próximos dois quadros da
 * sequência. Pedido do Douglas em 04/09: o contador diz em texto que existem
 * outras dez, e a pilha diz o mesmo em imagem, antes de qualquer movimento.
 *
 * ⚠️ Não é chrome de carrossel. As placas ficam ATRÁS e nunca por cima (§9),
 * usam a MESMA `crista-faixa` da foto da frente (nenhum `border-radius`) e são
 * ESTÁTICAS: nenhum tempo novo entrou no vocabulário de movimento. A geometria
 * do leque, e por que ele cabe dentro da coluna em vez de sangrar para fora,
 * está no bloco `.pilha-de-quadros` do `globals.css`.
 *
 * Elas viram no COMEÇO da varredura, junto com a foto da frente, e não junto com
 * o contador: a base delas é o quadro que ENTRA. O porquê está no `baseDaPilha`,
 * mais abaixo. E somem inteiras com `prefers-reduced-motion`, pela mesma razão
 * do contador: prometer em imagem dez fotos que não chegam é o erro que o
 * `/ 11` cometeria.
 *
 * ── Acessibilidade da sequência ──────────────────────────────────────────────
 *
 * O quadro em repouso carrega o `alt` real; os dez são `alt=""` e
 * `aria-hidden`. É a mesma regra da `FaixaRepetida` ("uma instância semântica
 * só"), pelo mesmo motivo: onze descrições de mãos segurando câmera enfileiradas
 * dentro de um bloco de serviço são ruído, não informação.
 *
 * ── O DOM é ditado pelo parallax que já existia ──────────────────────────────
 *
 * ⚠️ `.foto-textura > img` é seletor de FILHO DIRETO. Embrulhar cada quadro numa
 * div mataria a textura de scroll em silêncio, sem erro nenhum. Por isso todos os
 * quadros usam `fill`, que é o que faz o `next/image` renderizar um `<img>` como
 * filho direto do wrapper.
 *
 * ── ⚠️ O SEGUNDO SLOT, E ELE É O TERCEIRO DESVIO (10/09) ──────────────────────
 *
 * "Identidade Visual" usa este mesmo componente, e desde 10/09 também anda
 * sozinha, no mesmo relógio e com as mesmas quatro contenções de cima.
 *
 * A história importa mais que o código. Em 09/09 o slot nasceu MANUAL, e este
 * bloco explicava por que isso não era desvio: sem relógio não há movimento
 * autônomo, e clique não é animação. A versão autônoma foi recusada naquele dia
 * por ser o TERCEIRO desvio da DESIGN-GUIDELINES.md §8 e o "carrossel de
 * template" da §2.5. Em 10/09 o Douglas pediu o timer, com esse texto e duas
 * alternativas sem desvio na mesa (troca presa ao scroll, manter o manual).
 *
 * ⚠️ O argumento da Captação ("a seção vende imagem em movimento") NÃO vale lá.
 * O desvio se apoia na decisão, não num argumento de marca, e está registrado
 * na §8 assim para ninguém usá-lo como precedente.
 *
 * ── O MODO MANUAL, que virou o modo de RESERVA ───────────────────────────────
 *
 * O controle automático aceita `reduzido` (os rótulos de Anterior/Próxima). Com
 * ele, `prefers-reduced-motion` não para no quadro em repouso: a sequência vira
 * manual. É o que Identidade Visual usa; a Captação não passa `reduzido`. Lá
 * sobrar o repouso é o certo, e aqui sobraria uma identidade de seis. O modo
 * `manual` puro continua na união, sem nenhum slot usando.
 *
 * As diferenças do modo manual (puro ou de reserva), e cada uma tem motivo:
 *
 * 1. **Sem relógio, e portanto sem botão de pausa.** A WCAG 2.2.2 pede um jeito
 *    de parar o que anda sozinho; aqui nada anda sozinho.
 * 2. **`prefers-reduced-motion` NÃO desliga o modo manual.** Em Captação
 *    desligar é o certo, porque o que se desliga é movimento autônomo e sobra a
 *    foto em repouso. Aqui desligar ESCONDERIA fotos de quem pediu menos
 *    movimento, que é o pior desfecho segundo a §9 ("estática E 100% visível").
 *    Então os botões, o contador e a pilha continuam, e a troca é SECA, sem a
 *    varredura da crista.
 * 3. **"Anterior" fica desabilitado no primeiro quadro.** É engenharia de bytes
 *    e não gosto: `montados` só cresce e é um PREFIXO, então dar a volta do 01
 *    para o último montaria a sequência inteira de uma vez, que é o burst que o
 *    bloco sobre bytes, acima, existe para evitar. "Próxima" volta ao 01 no fim
 *    sem custo nenhum, porque o 01 já está montado desde o HTML do servidor.
 *
 * ✅ A pendência de acessibilidade que ficava aqui foi resolvida em 10/09, junto
 * com as fotos de "Identidade Visual". No automático os quadros além do repouso
 * continuam `alt=""` e `aria-hidden`, porque dez descrições enfileiradas num
 * bloco que anda sozinho são ruído. Num carrossel que a PESSOA opera o
 * argumento se inverte: quem clica em "Próxima" tem que receber a descrição do
 * que chegou. Então no manual cada quadro tem `alt` próprio, o quadro NA TELA é
 * o único fora do `aria-hidden`, e uma região `aria-live="polite"` fala o `alt`
 * do quadro que chegou. Ela só fala depois do primeiro clique: anunciar o
 * repouso no carregamento repetiria o que o `<img>` já diz.
 */

/**
 * Um quadro da sequência. Texto puro é só o caminho, e é o que o modo automático
 * usa: lá os quadros além do repouso não são descritos, e escrever `alt: ""` dez
 * vezes no `content.ts` seria ruído. O objeto é o do modo manual, em que cada
 * quadro é descrito para quem o abre.
 */
export type Quadro = string | { src: string; alt: string };

type Base = {
  /** O quadro em repouso: o único no HTML do servidor. */
  foto: string;
  fotoAlt: string;
  /** Os demais quadros, na ordem em que entram. Vazio desliga a sequência. */
  quadros: readonly Quadro[];
  sizes: string;
};

type RotulosAutomaticos = {
  pausar: string;
  retomar: string;
  pausarDescricao: string;
  retomarDescricao: string;
};

type RotulosManuais = {
  anterior: string;
  proxima: string;
  anteriorDescricao: string;
  proximaDescricao: string;
};

/**
 * Quem avança a sequência, e com que rótulos.
 *
 * É UMA UNIÃO DISCRIMINADA pelo `modo`, e os rótulos moram DENTRO dela, num
 * objeto só, em vez de virem como prop irmã: é a união que impede alguém passar
 * "Pausar" para um slot que não pausa nada, ou "Próxima" para um que anda
 * sozinho.
 *
 * `reduzido` é o modo de RESERVA do automático (10/09): com ele, movimento
 * reduzido vira manual em vez de parar no repouso. Ver o bloco do segundo slot
 * no cabeçalho. Sem ele, o automático se comporta como sempre.
 */
export type ControleDaSequencia =
  | {
      modo: "automatico";
      rotulos: RotulosAutomaticos;
      reduzido?: RotulosManuais;
    }
  | { modo: "manual"; rotulos: RotulosManuais };

type Props = Base & { controle: ControleDaSequencia };

/**
 * O desenho dos controles, um só para os três botões: pausar, anterior e
 * próxima. Eles pertencem ao mesmo sistema e precisam ler como o mesmo sistema,
 * e é o mesmo desenho do botão do `CampoProva`.
 *
 * O estado desabilitado tira o sublinhado e NÃO mexe na cor: `tinta-suave` sobre
 * `papel` dá 5,76:1, e apagar o texto para sinalizar "inativo" trocaria um
 * sinal por uma perda de contraste. Sem sublinhado ele deixa de ler como
 * acionável, que é o que precisava ser dito.
 */
const BOTAO =
  "inline-flex min-h-11 items-center caption font-ui text-tinta-suave " +
  "decoration-acento underline underline-offset-4 " +
  "hover:text-acento-texto transition-colors " +
  "focus-visible:outline-acento-texto focus-visible:outline-2 focus-visible:outline-offset-3 " +
  "disabled:no-underline disabled:cursor-default disabled:hover:text-tinta-suave";

/**
 * A proporção do slot, fixada no wrapper para a troca de quadro não mexer na
 * altura do bloco.
 *
 * Os quadros são 9:16 exatos, o de repouso inclusive (o `video-quadro-00.jpg` é
 * 668×1177, 1% de diferença que o `object-cover` absorve). Sem isto, cada quadro traria a própria
 * altura e a coluna pularia a cada 3,1 s.
 */
const PROPORCAO = "9 / 16";

export function SequenciaDeQuadros({
  foto,
  fotoAlt,
  quadros,
  sizes,
  controle,
}: Props) {
  const movimentoReduzido = usePrefersReducedMotion();

  /* Os rótulos de Anterior/Próxima, quando a sequência é manual: no modo manual
     puro, sempre; no automático com `reduzido`, só com movimento reduzido. É
     daqui que sai o `manual`, e tudo que depende dele (relógio, repouso
     forçado, hover, descrição, anúncio) passa a valer para a reserva sem uma
     linha a mais. */
  const rotulosManuais =
    controle.modo === "manual"
      ? controle.rotulos
      : movimentoReduzido
        ? controle.reduzido
        : undefined;
  const manual = rotulosManuais !== undefined;

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
  /** Liga o anúncio do modo manual. Ver o cabeçalho, item da acessibilidade. */
  const [pessoaNavegou, setPessoaNavegou] = useState(false);

  const total = quadros.length + 1;
  /* O modo manual sobrevive ao movimento reduzido, e o cabeçalho diz por quê:
     desligá-lo esconderia fotos de quem pediu menos movimento. */
  const sequenciaLigada = total > 1 && (manual || !movimentoReduzido);

  /* Com movimento reduzido a sequência AUTOMÁTICA volta ao quadro em repouso sem
     passar pelo estado: quem troca a preferência com a aba aberta não pode ficar
     preso no quadro do meio, e derivar é o que garante isso sem render em
     cascata. No modo manual não se força nada: o quadro na tela foi escolhido
     pela pessoa, e voltá-lo ao 01 seria desfazer o clique dela. */
  const repousoForcado = movimentoReduzido && !manual;
  /* E no manual com movimento reduzido não há varredura, então o quadro que
     estava ENTRANDO já é o quadro: é isso que resolve a preferência mudando no
     meio de uma varredura sem deixar o contador e a pilha uma casa atrás. */
  const indiceVisivel = repousoForcado
    ? 0
    : movimentoReduzido
      ? (entrando ?? indice)
      : indice;
  const entrandoVisivel = repousoForcado || movimentoReduzido ? null : entrando;

  /* O `undefined` fora do 0 nunca deveria acontecer (`montados` é limitado a
     `total - 1`), e é tratado para o índice ser um tipo estreito em vez de um
     `!`: cai no quadro em repouso. */
  const quadroDe = (i: number) => (i === 0 ? undefined : quadros[i - 1]);
  const fonteDoQuadro = (i: number) => {
    const quadro = quadroDe(i);
    if (quadro === undefined) return foto;
    return typeof quadro === "string" ? quadro : quadro.src;
  };
  const altDoQuadro = (i: number) => {
    if (i === 0) return fotoAlt;
    const quadro = quadroDe(i);
    return quadro === undefined || typeof quadro === "string" ? "" : quadro.alt;
  };
  /* Quem entra na árvore de acessibilidade: no automático, só o repouso,
     sempre; no manual, o quadro na tela. Os outros ficam de fora, senão o
     leitor de tela leria a sequência inteira em fila. */
  const descrito = (i: number) => (manual ? i === indiceVisivel : i === 0);

  /**
   * As placas da pilha, e elas são os PRÓXIMOS quadros, nunca o da frente.
   * `Math.min(2, total - 1)` é o que impede uma sequência curta de pôr na placa
   * a mesma foto que já está na frente. Índice 0 é a placa de cima.
   *
   * ⚠️ A base é `entrandoVisivel ?? indiceVisivel`, e o `entrando` vindo PRIMEIRO
   * é a correção de 04/09: a pilha vira no COMEÇO da varredura, junto com a foto
   * da frente, e não no fim dela.
   *
   * Saindo só do `indiceVisivel`, as placas esperavam os 900 ms inteiros da
   * crista para virar, com a foto da frente já trocando. Lia como atraso, e era
   * atraso mesmo. Com o quadro que ENTRA mandando na pilha, a foto que estava na
   * placa de cima é a que vem para a frente no mesmo gesto, que é o que a pilha
   * promete: a de cima do monte é a próxima.
   *
   * É por isso que a pilha NÃO acompanha o contador, que vira no fim de
   * propósito. Não é incoerência: o contador ANUNCIA o quadro que chegou, e a
   * pilha mostra o monte que sobrou. As duas coisas mudam quando o que elas
   * dizem muda.
   */
  const baseDaPilha = entrandoVisivel ?? indiceVisivel;
  const placas = sequenciaLigada
    ? Array.from(
        { length: Math.min(2, total - 1) },
        (_, k) => (baseDaPilha + k + 1) % total,
      )
    : [];

  /* Só anda quando as condições valem juntas. Nenhuma delas é a mesma coisa que
     outra: a pessoa pode ter pausado E ter saído do bloco. O `!manual` é a
     primeira porque no modo manual não existe relógio nenhum para gatilhar. */
  const andando =
    sequenciaLigada &&
    !manual &&
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

  /* ── A troca de quadro, com um dono só ──────────────────────────────────── */

  /**
   * Manda a crista varrer até `proximo`. É o ÚNICO caminho para trocar de
   * quadro, e por isso ele é compartilhado pelos dois gatilhos, o relógio do
   * modo automático e os botões do manual: em duas versões, o `setMontados`
   * divergiria na primeira vez que alguém mexesse numa delas.
   *
   * Um clique durante uma varredura é ignorado (`entrando !== null`), em vez de
   * cancelar a varredura em curso: cancelar deixaria o quadro anterior a meio
   * caminho da máscara.
   */
  const irPara = useCallback(
    (proximo: number) => {
      if (proximo === indiceVisivel) return;

      /* Um de antecedência, pelo mesmo motivo do observer. No último quadro isto
         satura em `total - 1`, e daí em diante a sequência inteira está montada:
         a volta do laço não refaz requisição nenhuma. E ele nunca fica ABAIXO de
         `proximo`, que é o que garante que o quadro pedido esteja no DOM. */
      setMontados((atual) => Math.max(atual, Math.min(proximo + 1, total - 1)));

      /* Com movimento reduzido não há varredura, então o quadro é assumido no
         próprio clique. A decisão fica AQUI, no gatilho, e não num efeito que
         olha para `entrando` depois: setState síncrono dentro de efeito é
         render em cascata, e o `eslint` reprova com razão.

         O `setEntrando(null)` também destrava o caso de a preferência mudar no
         meio de uma varredura: sem ele, o guarda logo abaixo veria um `entrando`
         pendurado para sempre e o botão nunca mais responderia. */
      if (movimentoReduzido) {
        setIndice(proximo);
        setEntrando(null);
        return;
      }

      /* Um clique durante a varredura é ignorado em vez de cancelá-la: cancelar
         deixaria o quadro anterior a meio caminho da máscara. */
      setEntrando((atual) => (atual === null ? proximo : atual));
    },
    [indiceVisivel, total, movimentoReduzido],
  );

  /* ── O relógio, que só existe no modo automático ────────────────────────── */

  useEffect(() => {
    if (!andando || entrando !== null) return;

    const id = window.setTimeout(
      () => irPara((indice + 1) % total),
      TEMPO.permanencia,
    );

    return () => window.clearTimeout(id);
  }, [andando, entrando, indice, total, irPara]);

  /* ── A varredura, que é o Gesto 3 sem uma linha de CSS nova ─────────────── */

  useEffect(() => {
    /* `movimentoReduzido` aqui não é redundante com o `andando` do relógio: ele
       é o que DESFAZ uma varredura já em curso quando a preferência muda no meio
       dela, pelo cleanup logo abaixo. Quem assume o quadro nesse caso não é este
       efeito: no automático o `repousoForcado` leva a tela ao quadro em repouso,
       e no manual o `indiceVisivel` já conta o `entrando` como chegado. */
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
    /* Hover e foco param o relógio, então no modo manual eles não têm o que
       fazer: sem os `undefined`, focar um botão dispararia um render por nada. */
    <div
      onMouseEnter={manual ? undefined : () => setInteragindo(true)}
      onMouseLeave={manual ? undefined : () => setInteragindo(false)}
      onFocus={manual ? undefined : () => setInteragindo(true)}
      onBlur={manual ? undefined : () => setInteragindo(false)}
    >
      {/* A pilha. A classe do padding só entra com a sequência ligada: sem
          placas para acomodar, o leque não existe e a foto não tem por que
          encolher. Ver `.pilha-de-quadros` no `globals.css`. */}
      <div className={cn(sequenciaLigada && "pilha-de-quadros")}>
        <div className="pilha-caixa" style={{ aspectRatio: PROPORCAO }}>
          {/* Da mais distante para a mais próxima: elas pintam por ORDEM DE DOM,
              e a última precisa ser a que fica logo atrás da foto. A `key` é a
              POSIÇÃO na pilha, não a foto: assim o quadro que avança troca o
              `src` do mesmo elemento em vez de desmontar e remontar um `<img>`
              a cada 3,1 s. */}
          {placas
            .map((quadro, posicao) => ({ quadro, posicao }))
            .reverse()
            .map(({ quadro, posicao }) => (
              <div
                key={posicao}
                aria-hidden="true"
                className={cn(
                  "pilha-placa [clip-path:url(#crista-faixa)]",
                  posicao === 0 ? "pilha-placa-1" : "pilha-placa-2",
                )}
              >
                <Image
                  src={fonteDoQuadro(quadro)}
                  alt=""
                  fill
                  /* O MESMO `sizes` da foto da frente, e é ele que faz placa e
                     empilhamento caírem na mesma URL otimizada. */
                  sizes={sizes}
                  className="object-cover"
                />
              </div>
            ))}

          <div
            ref={raiz}
            className="foto-textura absolute inset-0 [clip-path:url(#crista-faixa)]"
          >
            {Array.from({ length: montados + 1 }, (_, i) => (
              <Image
                key={fonteDoQuadro(i)}
                ref={(elemento) => {
                  refsDosQuadros.current[i] = elemento;
                }}
                src={fonteDoQuadro(i)}
                alt={descrito(i) ? altDoQuadro(i) : ""}
                aria-hidden={descrito(i) ? undefined : true}
                fill
                sizes={sizes}
                className="object-cover"
                /* `opacity` e não `display`, porque um quadro escondido precisa
               continuar BAIXANDO: é ele que chega pronto na vez dele. O que
               entra fica por cima do que sai enquanto a crista passa. */
                style={{
                  opacity: i === indiceVisivel || i === entrandoVisivel ? 1 : 0,
                  zIndex:
                    i === entrandoVisivel ? 2 : i === indiceVisivel ? 1 : 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* A linha de controle. Só existe se houver sequência: com movimento
          reduzido, ou sem quadros, não há nem o que contar nem o que pausar. */}
        {sequenciaLigada && (
          <div className="mt-4 flex items-center justify-between gap-4">
            {/* ── O CONTADOR, e ele resolve um buraco real ────────────────────
              Sem ele, nos primeiros 2,2 s o bloco é indistinguível de uma foto
              estática: a única pista de que ali tem mais coisa era o botão
              "Pausar", que diz que algo se move e não diz que existem outras
              fotos. O `/ 11` diz, antes de qualquer movimento.

              ⚠️ Ele NÃO sai no HTML do servidor, e isso é correto, não defeito:
              o `usePrefersReducedMotion` devolve `true` no servidor de
              propósito, então a linha inteira só existe depois que a hidratação
              confirma que a sequência vai mesmo rodar. Sem JS não há sequência,
              e um `/ 11` ali prometeria dez fotos que nunca chegam, do mesmo
              jeito que um botão de pausa sem nada para pausar. Na prática o
              visitante nunca vê a falta: a seção está bem abaixo da dobra.

              ⚠️ NÃO são bolinhas. Fileira de pontos embaixo da imagem é A
              assinatura de carrossel, e o §2.5 proíbe justamente esse tipo de
              chrome. O que entra no lugar é o rótulo em caixa alta com tracking
              largo, que é traço registrado do deck (§4), e numeração com zero à
              esquerda, que na seção de vídeo é a convenção do próprio ofício:
              claquete numera take.

              A hierarquia dentro dos sete caracteres é o que faz ele ler como
              desenhado e não como padrão: o número corrente em `ancora`
              (13,27:1) é o valor vivo, e o total em `tinta-suave` (5,76:1) é a
              escala fixa.

              O número vira no FIM da varredura, não no começo, porque quem
              manda é o `indiceVisivel`: o contador anuncia o quadro que
              chegou, nunca o que ainda está chegando.

              `aria-hidden` pela mesma razão que os dez quadros são: anunciar
              "1 de 11" a quem tem um `alt` só é prometer dez coisas que a
              pessoa não alcança. Quem lê a página com leitor de tela recebe
              uma foto descrita, que é a verdade dela. */}
            <p aria-hidden="true" className="eyebrow text-tinta-suave">
              <span className="text-ancora">
                {String(indiceVisivel + 1).padStart(2, "0")}
              </span>
              {" / "}
              {String(total).padStart(2, "0")}
            </p>

            {/* Os controles, e são dois desenhos para dois modos.

                ⚠️ O teste é `rotulosManuais`, e não a variável `manual`, porque
                é ele que ESTREITA o tipo: um booleano derivado não estreita
                nada. Pelo mesmo motivo o ramo da pausa testa `controle.modo`.
                O modo de reserva (automático com movimento reduzido) cai no
                primeiro ramo, com os rótulos do `reduzido`. */}
            {rotulosManuais ? (
              /* Modo manual: quem avança é a pessoa, então não há o que pausar.
                 O gap de 24 mantém os dois alvos de 44px separados em 390px. */
              <div className="flex items-center gap-6">
                <button
                  type="button"
                  /* Desabilitado no primeiro quadro, e o motivo é byte e não
                     gosto: dar a volta daqui para o último montaria a sequência
                     inteira de uma vez. Ver o cabeçalho. */
                  disabled={indiceVisivel === 0}
                  onClick={() => {
                    setPessoaNavegou(true);
                    irPara(indiceVisivel - 1);
                  }}
                  aria-label={rotulosManuais.anteriorDescricao}
                  className={BOTAO}
                >
                  {rotulosManuais.anterior}
                </button>

                <button
                  type="button"
                  /* "Próxima" volta ao 01 no fim, e isso não custa nada: o
                     quadro em repouso já está montado desde o servidor. */
                  onClick={() => {
                    setPessoaNavegou(true);
                    irPara((indiceVisivel + 1) % total);
                  }}
                  aria-label={rotulosManuais.proximaDescricao}
                  className={BOTAO}
                >
                  {rotulosManuais.proxima}
                </button>

                {/* O anúncio do quadro que chegou. Sai do `indiceVisivel`, como o
                    contador, então fala no FIM da varredura: anuncia o que
                    chegou, nunca o que ainda está chegando. A região existe
                    vazia desde a hidratação, porque região viva criada já com
                    texto costuma não ser lida. */}
                <p className="sr-only" aria-live="polite">
                  {pessoaNavegou ? altDoQuadro(indiceVisivel) : ""}
                </p>
              </div>
            ) : controle.modo === "automatico" ? (
              /* Modo automático: o controle da WCAG 2.2.2. */
              <button
                type="button"
                onClick={alternarPausa}
                aria-pressed={pausadoPelaPessoa}
                aria-label={
                  pausadoPelaPessoa
                    ? controle.rotulos.retomarDescricao
                    : controle.rotulos.pausarDescricao
                }
                className={BOTAO}
              >
                {pausadoPelaPessoa
                  ? controle.rotulos.retomar
                  : controle.rotulos.pausar}
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
