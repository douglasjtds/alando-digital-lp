"use client";

import { trackCtaWhatsapp } from "@/lib/analytics";
import { linkDoCta } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { renderizarPendencia } from "@/lib/pendencia";
import { type CtaOrigem } from "@/config/content";

type Variante = "primario" | "secundario" | "compacto" | "sage";

const ESTILOS: Record<Variante, string> = {
  primario:
    "bg-ancora text-papel hover:bg-ancora-quente hover:translate-y-[-1px] active:translate-y-[0px]",
  secundario:
    "border border-ancora text-ancora hover:bg-ancora/5 active:bg-ancora/10",
  compacto:
    "bg-ancora text-papel hover:bg-ancora-quente hover:translate-y-[-1px] active:translate-y-[0px] px-3 py-2 text-sm",
  /**
   * O CTA de TODA superfície escura, `Processo` e `CtaFinal` inclusive.
   *
   * Existe porque `primario` fica ilegível ali: `ancora` sobre `tinta` dá
   * 1,60:1, então o botão desaparece dentro do fundo da seção.
   *
   * O par vem da §3: fundo `superficie-2` + texto `ancora`, 7,02:1 dentro do
   * botão, 4,39:1 na fronteira com `tinta` e 6,10:1 na fronteira com
   * `ancora-quente`. Sage é hex do manual.
   *
   * ⚠️ A variante `invertido` (fundo `papel`) saiu na Fase 5D. Ela existia só
   * para o `CtaFinal`, e o Douglas decidiu em 01/08 que ali vai sage, seguindo
   * a revisão de 29/07 da §3. Botão claro sem dono é convite para alguém usar e
   * gastar o efeito que a §10 protegia.
   */
  sage: "bg-superficie-2 text-ancora hover:bg-superficie-2/90 hover:translate-y-[-1px] active:translate-y-[0px]",
};

/**
 * A superfície do BOTÃO, para o marcador de pendência ser legível dentro dele.
 *
 * ⚠️ Rótulo pendente existe: o `CtaFinal` tem
 * `<<A CONFIRMAR: rótulo do botão diferente do herói>>`. Sem passar por
 * `renderizarPendencia`, ele saía como texto normal dentro do botão, e era o
 * único marcador da página inteira sem realce, ou seja, o mais fácil de chegar
 * em produção sem ninguém ver. Como o telefone já está confirmado, o portão do
 * "estado pendente" da §6 não pega este caso: ele cobre destinatário faltando,
 * não copy faltando.
 */
const SUPERFICIE_DO_MARCADOR: Record<Variante, "claro" | "escuro"> = {
  primario: "escuro",
  compacto: "escuro",
  secundario: "claro",
  sage: "claro",
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

  /* `label` continua `string`: o `aria-label` precisa de texto, e um marcador
     no nome acessível é honesto, some junto com a copy. O que muda é só o que
     aparece dentro do botão. */
  const rotulo = renderizarPendencia(label, SUPERFICIE_DO_MARCADOR[variante]);

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
        {rotulo}
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
      {rotulo}
    </a>
  );
}
