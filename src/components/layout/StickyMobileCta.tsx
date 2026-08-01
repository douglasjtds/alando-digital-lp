"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";
import { content } from "@/config/content";
import { WhatsappCta } from "@/components/ui/WhatsappCta";

/**
 * O CTA que costuma ser o mais clicado da página inteira.
 *
 * O tráfego vem do link na bio do Instagram, ou seja, de um celular, e a pessoa
 * decide no meio da leitura. Sem esta barra, ela precisa rolar até o fim ou
 * voltar ao topo para agir.
 *
 * ── As três regras da §5.12 ─────────────────────────────────────────────────
 *
 * 1. Só abaixo de 768px (`md:hidden`). No desktop o CTA do header está sempre à
 *    vista, e a barra seria redundante.
 * 2. Aparece quando o herói sai da viewport, some quando volta. É
 *    `IntersectionObserver` em `#inicio`, não listener de scroll: o observer não
 *    roda no main thread a cada pixel.
 * 3. `safe-area-inset-bottom` respeitado, senão a barra fica atrás da barra de
 *    gestos do iPhone. ⚠️ Isso depende de `viewportFit: "cover"` no
 *    `layout.tsx`: sem ele o `env()` resolve em 0 e a regra vira decorativa.
 *
 * ── Escondida de verdade, não só invisível ──────────────────────────────────
 *
 * `inert` tira a barra escondida da ordem de tabulação. Sem ele, o visitante que
 * navega por teclado encontra um botão que ele não está vendo. `aria-hidden`
 * cuida do leitor de tela, e os dois juntos são o par certo.
 *
 * A transição é `motion-safe`: em `prefers-reduced-motion` a barra aparece
 * direto, sem deslizar, e continua 100% visível e utilizável.
 */
export function StickyMobileCta() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const heroi = document.getElementById("inicio");

    /* Sem o herói a barra simplesmente não aparece, e é o comportamento certo:
       nada quebra. Só que o sumiço silencioso do CTA de maior volume é caro
       demais para não avisar, e o acoplamento a um `id` em string não é
       verificável pelo compilador. O aviso sai do bundle de produção. */
    if (!heroi) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "[StickyMobileCta] #inicio não existe: a barra fixa não vai aparecer."
        );
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entradas) => {
        const entrada = entradas[entradas.length - 1];
        if (entrada) setVisivel(!entrada.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(heroi);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 md:hidden",
        "border-t border-decor/20 bg-papel",
        /* O padding lateral é o MESMO do container, pela variável, para o botão
           nascer alinhado com o conteúdo da página em qualquer largura. */
        "px-[var(--padding-lp)] pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]",
        "motion-safe:transition-transform motion-safe:duration-300",
        visivel ? "translate-y-0" : "translate-y-full"
      )}
      inert={!visivel}
      aria-hidden={!visivel}
    >
      {/* O rótulo é o do herói, e reusar não é preguiça: um rótulo novo aqui
          seria copy inventada. A mensagem que chega no WhatsApp, essa sim, é
          própria da origem `sticky-mobile`, e é ela que faz o rastreio. */}
      <WhatsappCta
        origem="sticky-mobile"
        label={content.hero.ctaLabel}
        variante="primario"
        className="w-full"
      />
    </div>
  );
}
