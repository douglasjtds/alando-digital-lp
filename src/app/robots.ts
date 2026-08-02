import type { MetadataRoute } from "next";

import { canonicalPendente, siteUrl } from "@/lib/site-url";

/**
 * `robots.ts`, e não um `robots.txt` estático.
 *
 * O motivo é este arquivo inteiro: o robots precisa **saber** se a indexação está
 * liberada. Um `.txt` no `public/` diria sempre a mesma coisa, e a mesma coisa
 * está errada em um dos dois estados: ou libera o preview da Vercel para o índice
 * do Google, ou bloqueia o domínio real no dia do lançamento.
 *
 * Enquanto `canonicalPendente`, `Disallow: /` no site inteiro, e nenhum `sitemap`
 * anunciado. Apontar um sitemap num site que pede para não ser indexado é dar
 * endereço e mandar não entrar.
 *
 * ⚠️ Isto e o `noindex` do `layout.tsx` são dois sinais, mas um interruptor só:
 * `brand.site.url`. Ver `lib/site-url.ts`.
 */
export default function robots(): MetadataRoute.Robots {
  if (canonicalPendente) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
