import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site-url";

/**
 * Uma rota, e é isso mesmo.
 *
 * A página é one-page por decisão de arquitetura: `/` e mais nada (o
 * `/styleguide` é ferramenta de desenvolvimento e não entra). Âncoras como
 * `#servicos` NÃO viram entradas: sitemap lista documentos, e fragmento não é
 * documento. Listá-los faria o Google ver seis URLs com o mesmo conteúdo.
 *
 * `lastModified` sai do relógio do BUILD, que é a data em que o conteúdo de fato
 * mudou pela última vez. Um `new Date()` avaliado por requisição diria que a
 * página muda toda hora, e o crawler aprende rápido a não acreditar.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
