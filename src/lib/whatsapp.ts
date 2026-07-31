import { whatsapp } from "@/config/brand";
import { mensagensWhatsapp, type CtaOrigem } from "@/config/content";

export function linkDoCta(origem: CtaOrigem): string | null {
  if (!whatsapp.phone) return null;

  const mensagem = mensagensWhatsapp[origem];
  const encoded = encodeURIComponent(mensagem);

  return `https://wa.me/${whatsapp.phone}?text=${encoded}`;
}
