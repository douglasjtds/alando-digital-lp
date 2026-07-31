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

export function trackCtaWhatsapp(origem: CtaOrigem): void {
  if (typeof window === "undefined") return;

  const data = { event_category: "engagement", event_label: origem };

  if (window.va?.track) {
    window.va.track("cta_whatsapp", data);
  }

  if (window.gtag) {
    window.gtag("event", "cta_whatsapp", data);
  }

  if (window.dataLayer) {
    window.dataLayer.push({ event: "cta_whatsapp", ...data });
  }
}
