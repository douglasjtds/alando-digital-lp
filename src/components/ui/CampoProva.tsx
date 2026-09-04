"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * O campo da prova: a moldura orgânica que emoldura um artefato em vez de
 * recortá-lo.
 *
 * Atende os dois artefatos da seção `Servicos`, e a diferença entre eles é uma
 * prop:
 *
 *   Estruturação de Perfil   print de perfil, retrato      `.campo-prova`
 *   Landing Pages            vídeo da página rolando       `.campo-prova-largo`
 *
 * Os paddings e a escolha de máscara de cada um estão medidos e escritos nos
 * dois blocos de comentário do `globals.css`. Aqui mora só o comportamento.
 *
 * ── ⚠️ O VÍDEO É O SEGUNDO DESVIO DA §8, e ele tem dono ──────────────────────
 *
 * A DESIGN-GUIDELINES.md §8 fecha o movimento da página em três gestos presos ao
 * scroll, mais um momento coreografado. A sequência de quadros da captação foi o
 * primeiro desvio (02/09), e o texto dela diz, literalmente, "para ninguém o usar
 * como precedente". Este é o segundo, decidido pelo Douglas em 03/09 com aquele
 * texto na mesa, e está registrado na §8 com o argumento inteiro.
 *
 * Vale repetir aqui o que a §8 diz, porque é o que impede um terceiro: **este
 * desvio é maior que o primeiro.** A sequência de quadros desvia em um eixo só (o
 * gatilho) e mantém o Gesto 3 como transição. O vídeo desvia no gatilho, na mídia
 * e no gesto. Ele se sustenta porque a prova de que a Alando constrói uma página
 * é a página se comportando como página, e página é uma coisa que rola.
 *
 * ── As cinco contenções, e nenhuma é opcional ────────────────────────────────
 *
 * 1. **Toca uma vez, ao entrar na tela, e para no fim.** Não é loop. Conteúdo em
 *    loop dentro de um bloco de serviço é banner, e a §2.5 veta.
 * 2. **`preload="none"` e `src` anexado só na interseção.** 359 KB no bundle
 *    inicial de uma página cujo canal principal é link na bio do Instagram seria
 *    o maior asset do projeto, baixado por quem talvez nem chegue na seção. O
 *    `<source>` só nasce quando o bloco se aproxima.
 * 3. **Botão de repetir e pausar**, exigência da WCAG 2.2.2, ABAIXO do vídeo e
 *    nunca sobreposto: overlay é assinatura de player de template, e a §9 não
 *    deixa nada boiar por cima da imagem. Mesmo desenho do controle da sequência
 *    de quadros, para os dois lerem como o mesmo sistema.
 * 4. **`prefers-reduced-motion: reduce` não monta `<video>` nenhum.** Fica o
 *    pôster, que é o primeiro quadro: estático, inteiro e com o `alt` real.
 * 5. **Sem áudio, `muted` e `playsInline`.** Os três juntos são o que faz o
 *    autoplay não ser bloqueado no iOS, e o vídeo não tem trilha nenhuma para
 *    tocar.
 *
 * ── Por que o pôster é `<Image>` e o vídeo é `<video>` cru ───────────────────
 *
 * O pôster passa pelo `next/image` (AVIF, srcset, lazy) porque ele é imagem e é
 * o que aparece em `reduced-motion`. O atributo `poster=` do `<video>` aponta
 * para o JPEG direto, sem otimização, porque ele só existe no intervalo entre a
 * interseção e o primeiro quadro decodificado, e um `poster` que muda de URL faria
 * o navegador baixar duas vezes a mesma coisa.
 */

type Props = {
  imagem: string;
  alt: string;
  /** Vazio renderiza só a imagem, que é o caso da Estruturação de Perfil. */
  video?: string;
  sizes: string;
  /** Dimensões nativas do artefato, para o `next/image` reservar a caixa. */
  largura: number;
  altura: number;
  /**
   * A classe ARBITRÁRIA COMPLETA da máscara, não o `id` dela.
   *
   * ⚠️ Parece detalhe e não é: o Tailwind gera classe arbitrária varrendo o
   * código em busca do LITERAL. `[clip-path:url(#${id})]` montado por template
   * string não é literal nenhum, e a regra simplesmente não é gerada.
   *
   * Escrito assim, o projeto passou a depender de coincidência: a
   * `crista-retrato` só existia no CSS porque o `Hero` a escreve por extenso, e a
   * `crista-vale` porque o `Sobre` escreve. Mexer num desses dois arquivos
   * apagaria a máscara das provas SEM ERRO NENHUM, que é a pior classe de falha
   * que este projeto tem.
   *
   * Com a classe inteira vindo de `APRESENTACAO`, em `Servicos.tsx`, o literal
   * está lá para o Tailwind ver.
   */
  classeDaMascara: string;
  /** `largo` usa `.campo-prova-largo`, medido para a proporção do vídeo. */
  moldura: "campo-prova" | "campo-prova-largo";
  rotulos: {
    repetir: string;
    pausar: string;
    repetirDescricao: string;
    pausarDescricao: string;
  };
};

export function CampoProva({
  imagem,
  alt,
  video,
  sizes,
  largura,
  altura,
  classeDaMascara,
  moldura,
  rotulos,
}: Props) {
  const movimentoReduzido = usePrefersReducedMotion();

  /**
   * ⚠️ O VÍDEO VIVE NUM COMPONENTE SEPARADO, e isso não é organização: é o que
   * mantém o estado dele correto.
   *
   * Com tudo num componente só, `tocando` sobrevive ao desaparecimento do
   * `<video>`: quem liga `prefers-reduced-motion` com a aba aberta desmonta o
   * player, e ao desligar de novo o botão volta escrito "Pausar" apontando para
   * um vídeo parado. Corrigir isso por efeito é `setState` em corpo de efeito,
   * que é render em cascata e o lint reprova com razão.
   *
   * Separado, o estado nasce e morre junto com o player, e não existe nada a
   * sincronizar.
   */
  if (video && !movimentoReduzido) {
    return (
      <ProvaEmVideo
        imagem={imagem}
        alt={alt}
        video={video}
        largura={largura}
        altura={altura}
        classeDaMascara={classeDaMascara}
        moldura={moldura}
        rotulos={rotulos}
      />
    );
  }

  return (
    <div className={cn(moldura, "bg-decor/12", classeDaMascara)}>
      <Image
        src={imagem}
        alt={alt}
        width={largura}
        height={altura}
        sizes={sizes}
        className="h-auto w-full"
      />
    </div>
  );
}

function ProvaEmVideo({
  imagem,
  alt,
  video,
  largura,
  altura,
  classeDaMascara,
  moldura,
  rotulos,
}: Omit<Props, "sizes" | "video"> & { video: string }) {
  const raiz = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLVideoElement>(null);

  /* Nasce falso e só vira verdadeiro na interseção: é ele que anexa o `src` e,
     com isso, dispara o download. Ver contenção 2. */
  const [aproximou, setAproximou] = useState(false);
  const [tocando, setTocando] = useState(false);
  const [terminou, setTerminou] = useState(false);

  /* ── A interseção, que é quem manda baixar ──────────────────────────────── */

  useEffect(() => {
    if (aproximou) return;

    const elemento = raiz.current;
    if (!elemento) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          setAproximou(true);
          observador.disconnect();
        }
      },
      /* Uma tela de antecedência: o vídeo chega carregado quando o bloco entra,
         em vez de começar a baixar depois de já estar visível. */
      { rootMargin: "100% 0px" },
    );
    observador.observe(elemento);

    return () => observador.disconnect();
  }, [aproximou]);

  /* ── Toca uma vez, quando o bloco está de fato na tela ──────────────────── */

  useEffect(() => {
    if (!aproximou || terminou) return;

    const elemento = raiz.current;
    if (!elemento) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas.some((e) => e.isIntersecting);
        const alvo = player.current;
        if (!alvo) return;

        /* `.play()` devolve promessa e ela REJEITA quando o navegador recusa o
           autoplay. Sem o `catch`, isso vira erro não tratado no console de quem
           tem autoplay desligado, que é uma preferência legítima. O botão
           continua funcionando ali, e é por isso que a recusa não precisa de
           tratamento além de não estourar. */
        if (visivel) alvo.play().catch(() => {});
        else alvo.pause();
      },
      { threshold: 0.4 },
    );
    observador.observe(elemento);

    return () => observador.disconnect();
  }, [aproximou, terminou]);

  const alternar = useCallback(() => {
    const alvo = player.current;
    if (!alvo) return;

    if (alvo.paused) {
      /* Repetir depois do fim: volta ao começo, senão o `play()` num vídeo
         terminado não faz nada visível. */
      if (alvo.ended) alvo.currentTime = 0;
      setTerminou(false);
      alvo.play().catch(() => {});
    } else {
      alvo.pause();
    }
  }, []);

  return (
    <div ref={raiz}>
      <div className={cn(moldura, "bg-decor/12", classeDaMascara)}>
        <video
          ref={player}
          /* O `poster` cobre o intervalo entre a interseção e o primeiro quadro
             decodificado. Sem ele o campo pisca vazio. */
          poster={imagem}
          width={largura}
          height={altura}
          muted
          playsInline
          preload="none"
          /* Não é `loop`: ver contenção 1. */
          onPlay={() => setTocando(true)}
          onPause={() => setTocando(false)}
          onEnded={(evento) => {
            setTocando(false);
            setTerminou(true);
            /* ⚠️ REBOBINAR NO FIM, e isto é decisão de layout, não de player.
               Achado no passe visual: sem isto o bloco fica parado PARA SEMPRE
               no último quadro do vídeo, que é a faixa escura de fechamento da
               página da cliente. Ou seja, o estado de repouso permanente do
               bloco vira um retângulo verde escuro dentro de uma seção clara,
               que qualquer um lê como pedaço da própria página da Alando, e não
               como o site de outra marca.

               Voltando a zero, o repouso é sempre o topo da página da cliente,
               que é o mesmo quadro do `poster`. O `terminou` continua verdadeiro
               e é ele, não o `ended`, que impede a volta automática: a segunda
               execução só acontece se a pessoa pedir. */
            evento.currentTarget.currentTime = 0;
          }}
          aria-label={alt}
          className="h-auto w-full"
        >
          {aproximou && <source src={video} type="video/mp4" />}
        </video>
      </div>

      {/* A linha de controle, no mesmo desenho da sequência de quadros: sem
          `<video controls>`, que traz a barra do sistema operacional inteira,
          com cores e cantos que não são desta marca. */}
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={alternar}
          aria-label={
            tocando ? rotulos.pausarDescricao : rotulos.repetirDescricao
          }
          className={cn(
            "inline-flex min-h-11 items-center",
            "caption font-ui text-tinta-suave",
            "decoration-acento underline underline-offset-4",
            "hover:text-acento-texto transition-colors",
            "focus-visible:outline-acento-texto focus-visible:outline-2 focus-visible:outline-offset-3",
          )}
        >
          {tocando ? rotulos.pausar : rotulos.repetir}
        </button>
      </div>
    </div>
  );
}
