import { type CtaOrigem } from "@/config/content";

declare global {
  interface Window {
    va?: {
      track(event: string, data?: Record<string, unknown>): void;
    };
    gtag?: (command: string, event: string, data?: Record<string, unknown>) => void;
    dataLayer?: unknown[];
  }
}

/**
 * A porta única para o `dataLayer`, e o `??` dela é o ponto.
 *
 * Nenhum componente empurra evento direto: quem quiser mandar algo para o GTM
 * passa por aqui. É o que mantém o nome do evento e o formato do payload em um
 * lugar só, auditável por grep, em vez de espalhado por `onClick`.
 *
 * O `window.dataLayer ?? []` NÃO é redundante com o inline de
 * `beforeInteractive` do `layout.tsx`. Aquele só é renderizado quando existe
 * `NEXT_PUBLIC_GTM_ID`; este cobre o resto: dev sem a variável, preview, e a
 * fração de segundo em que o script pode ainda não ter rodado. A versão
 * anterior era `if (window.dataLayer)`, e nesses casos o evento sumia sem dizer
 * nada, que é o jeito mais caro de perder medição: parece que funciona.
 */
export function pushEvent(event: string, payload?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...payload });
}

export function trackCtaWhatsapp(origem: CtaOrigem): void {
  if (typeof window === "undefined") return;

  const data = { event_category: "engagement", event_label: origem };

  if (window.va?.track) {
    window.va.track("cta_whatsapp", data);
  }

  if (window.gtag) {
    window.gtag("event", "cta_whatsapp", data);
  }

  pushEvent("cta_whatsapp", data);
}
