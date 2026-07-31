"use client";

import { trackCtaWhatsapp } from "@/lib/analytics";
import { linkDoCta } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { type CtaOrigem } from "@/config/content";

type Variante = "primario" | "secundario" | "compacto" | "invertido";

const ESTILOS: Record<Variante, string> = {
  primario:
    "bg-ancora text-papel hover:bg-ancora-quente hover:translate-y-[-1px] active:translate-y-[0px]",
  secundario:
    "border border-ancora text-ancora hover:bg-ancora/5 active:bg-ancora/10",
  compacto:
    "bg-ancora text-papel hover:bg-ancora-quente hover:translate-y-[-1px] active:translate-y-[0px] px-3 py-2 text-sm",
  invertido:
    "bg-papel text-ancora hover:bg-papel/90 active:bg-papel/80",
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
    "font-ui font-600 tracking-wide",
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
