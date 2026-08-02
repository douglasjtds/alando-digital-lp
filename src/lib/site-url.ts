import { site } from "@/config/brand";

/**
 * De onde sai a URL canônica da página, e por que a ordem é esta.
 *
 * `NEXT_PUBLIC_SITE_URL` → `brand.site.url` → `VERCEL_PROJECT_PRODUCTION_URL` →
 * `localhost`. A variável de ambiente vem primeiro porque é o que permite subir
 * um ambiente de homologação com URL própria sem editar código; o `brand.ts`
 * vem em seguida porque é a fronteira white-label (landing-page-structure.md §3).
 *
 * ── O que este arquivo realmente decide ──────────────────────────────────────
 *
 * Não é só o `metadataBase`. É o `noindex`.
 *
 * As duas últimas fontes são provisórias por natureza: a URL da Vercel muda a cada
 * projeto e o localhost não é público. Enquanto a URL vier de uma delas,
 * `canonicalPendente` é `true`, o `layout.tsx` pede `noindex` e o `robots.ts`
 * devolve `Disallow: /`.
 *
 * O motivo é concreto: preview de Vercel indexado compete no índice do Google com
 * o domínio real, e tirar uma URL do índice depois é bem mais trabalhoso do que
 * nunca deixar entrar.
 *
 * ⚠️ **Ligar a indexação é preencher `site.url` em `brand.ts`.** É o esquecimento
 * mais comum do deploy, e por isso não existe nenhum outro interruptor: uma flag
 * separada seria uma segunda coisa para lembrar.
 */

/** Sem barra final: quem concatena caminho espera que ela não esteja aí. */
function semBarraFinal(url: string): string {
  return url.replace(/\/+$/, "");
}

function resolver(): { url: string; pendente: boolean } {
  const doAmbiente = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (doAmbiente) {
    return { url: semBarraFinal(doAmbiente), pendente: false };
  }

  if (site.url) {
    return { url: semBarraFinal(site.url), pendente: false };
  }

  /* A Vercel expõe o host SEM protocolo ("meu-projeto.vercel.app"). Sem o
     `https://` na frente, o `new URL()` do `metadataBase` estoura no build. */
  const daVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (daVercel) {
    return { url: `https://${semBarraFinal(daVercel)}`, pendente: true };
  }

  return { url: "http://localhost:3000", pendente: true };
}

const resolvido = resolver();

/** A origem canônica, sem barra final. */
export const siteUrl = resolvido.url;

/**
 * `true` enquanto a URL for provisória. Liga o `noindex` e o `Disallow`.
 * Ver o comentário do topo: é o interruptor único da indexação.
 */
export const canonicalPendente = resolvido.pendente;

/** URL absoluta a partir de um caminho de `public/`. */
export function urlAbsoluta(caminho: string): string {
  return `${siteUrl}${caminho.startsWith("/") ? caminho : `/${caminho}`}`;
}
