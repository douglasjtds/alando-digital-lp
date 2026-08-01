"use client";

import { trackCtaWhatsapp } from "@/lib/analytics";
import { linkDoCta } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { type CtaOrigem } from "@/config/content";

type Variante =
  | "primario"
  | "secundario"
  | "compacto"
  | "invertido"
  | "sage";

const ESTILOS: Record<Variante, string> = {
  primario:
    "bg-ancora text-papel hover:bg-ancora-quente hover:translate-y-[-1px] active:translate-y-[0px]",
  secundario:
    "border border-ancora text-ancora hover:bg-ancora/5 active:bg-ancora/10",
  compacto:
    "bg-ancora text-papel hover:bg-ancora-quente hover:translate-y-[-1px] active:translate-y-[0px] px-3 py-2 text-sm",
  invertido:
    "bg-papel text-ancora hover:bg-papel/90 active:bg-papel/80",
  /**
   * O CTA das superfícies ESCURAS que não são o `CtaFinal`.
   *
   * Existe porque `primario` fica ilegível ali: `ancora` sobre `tinta` dá
   * 1,60:1, então o botão desaparece dentro do fundo da seção. E `invertido`
   * (fundo `papel`) está reservado ao `CtaFinal` pela §10, que o define como o
   * único botão claro da página.
   *
   * O par vem da §3, que já o especifica para fundo escuro: fundo
   * `superficie-2` + texto `ancora`, 7,02:1 dentro do botão e 4,39:1 na
   * fronteira com `tinta`. Sage é hex do manual, e o `CtaFinal` continua sendo
   * o único botão em `papel`.
   */
  sage: "bg-superficie-2 text-ancora hover:bg-superficie-2/90 hover:translate-y-[-1px] active:translate-y-[0px]",
};

interface WhatsappCtaProps {
  origem: CtaOrigem;
  label: string;
  variante?: Variante;
  className?: string;
}

export function WhatsappCta({
  origem,
  label,
  variante = "primario",
  className,
}: WhatsappCtaProps) {
  const link = linkDoCta(origem);
  const isDisabled = !link;

  const handleClick = () => {
    if (!isDisabled) {
      trackCtaWhatsapp(origem);
    }
  };

  const baseClasses = cn(
    "inline-flex items-center justify-center",
    /* ⚠️ Dois defeitos da Fase 5A corrigidos aqui, e os dois eram silenciosos.
       `font-600` não é utilitário do Tailwind (os pesos são `font-semibold` e
       companhia, ou `font-[600]`), então a classe não gerava CSS nenhum e todo
       CTA da página vinha em Montserrat 400 em vez de 600. E não havia padding
       horizontal em nenhuma variante fora da `compacto`: o botão ficava colado
       no próprio rótulo, sustentado só pelo `min-w-11`. */
    "font-ui font-semibold tracking-wide",
    "px-6 py-3",
    "rounded-md transition-all",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-acento-texto",
    "min-h-11 min-w-11",
    ESTILOS[variante],
    isDisabled && "opacity-60 cursor-not-allowed",
    className
  );

  if (isDisabled) {
    return (
      <button
        disabled
        className={baseClasses}
        title="Número de WhatsApp pendente"
        aria-label={`${label} (indisponível)`}
      >
        {label}
      </button>
    );
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={baseClasses}
      aria-label={`${label} (abre WhatsApp)`}
      onClick={handleClick}
    >
      {label}
    </a>
  );
}
