import type { Metadata, Viewport } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";

import { OrganicClipPaths } from "@/components/ui/OrganicClipPaths";
import { og } from "@/config/brand";
import { content } from "@/config/content";
import { canonicalPendente, siteUrl } from "@/lib/site-url";

import "./globals.css";

/**
 * As três famílias, e o teto é três: a quarta sempre parece indecisão.
 *
 * A `asimilates` do deck ficou fora na Fase 0 (não foi entregue, e não é o lettering
 * do logo). Display e editorial ficam em Playfair Display, que é a mesma anatomia,
 * já carrega os títulos do deck e é OFL. Se a licença webfont da `asimilates` chegar,
 * a troca é aqui, e só aqui: os componentes leem `--font-display-family`.
 *
 * `latin-ext` não é opcional. Sem ele, ã/ç/õ/é caem no fallback e a linha mistura
 * duas fontes no meio da palavra: só no h1 ("Criando e gerenciando marcas de forma
 * artesanal") isso aconteceria duas vezes.
 *
 * `next/font` faz self-host no build: o navegador do visitante nunca fala com o
 * servidor do Google, o que vale para LGPD e para latência.
 */
const display = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-display-family",
});

/**
 * Instância SEPARADA, e `preload: false` é o ponto dela.
 *
 * O itálico aparece em uma palavra por título. Precarregá-lo faria um arquivo
 * inteiro competir com o LCP para servir uma palavra abaixo da dobra.
 */
const editorial = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  style: "italic",
  display: "swap",
  preload: false,
  variable: "--font-editorial-family",
});

const ui = Montserrat({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-ui-family",
});

/**
 * `viewportFit: "cover"` existe por causa de uma linha só do `StickyMobileCta`.
 *
 * Sem ele o iOS não expõe a área segura, `env(safe-area-inset-bottom)` resolve
 * em 0, e a barra fixa fica atrás da barra de gestos do iPhone: o CTA que mais
 * converte, parcialmente coberto, sem nada acusar erro no DevTools.
 *
 * O efeito colateral, em paisagem num aparelho com recorte, é a página poder
 * chegar embaixo do notch. Quem cobre isso é o `--padding-lp` do `globals.css`,
 * que soma `env(safe-area-inset-left/right)` ao clamp: a conta do clamp sozinha
 * NÃO bastava, porque em iPhone deitado ela trava em 48px e o inset passa disso.
 */
export const viewport: Viewport = {
  viewportFit: "cover",
};

/**
 * A metadata, e os três pontos dela que não são óbvios.
 *
 * ── 1. O texto não está aqui ─────────────────────────────────────────────────
 *
 * `title` e `description` vêm de `content.seo`. São texto que alguém lê (aba do
 * navegador, resultado de busca, card de link), então valem a mesma regra do
 * resto: copy mora no `content.ts`. O comentário de lá registra que a junção das
 * duas frases é minha e precisa do aval do Douglas.
 *
 * ── 2. O marcador de pendência NÃO entra no title ────────────────────────────
 *
 * Decisão do Douglas em 02/08. A regra assimétrica da §7 diz que o marcador
 * aparece na PÁGINA e é omitido dos DADOS ESTRUTURADOS, e `title`/`og:title` são
 * do segundo grupo: aba do navegador, SERP e card de link são consumo de máquina
 * e de terceiro, não a tela onde alguém vai ver o realce e corrigir. O marcador
 * continua visível no eyebrow do herói e no rodapé.
 *
 * ── 3. `noindex` enquanto o domínio for provisório ───────────────────────────
 *
 * Não é excesso de zelo: preview de Vercel indexado compete com o domínio real no
 * índice do Google, e sair do índice depois dá muito mais trabalho do que nunca
 * entrar. O interruptor é um só, `brand.site.url`, e a razão de ser um só está no
 * `lib/site-url.ts`.
 *
 * ⚠️ **Ligar a indexação junto com o domínio é o esquecimento mais comum do
 * deploy** (landing-page-structure.md §7). A Fase 9 não fecha sem isso.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: content.seo.titulo,
  description: content.seo.descricao,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: content.footer.nome,
    title: content.seo.titulo,
    description: content.seo.descricao,
    url: "/",
    images: [
      {
        url: og.padrao,
        /* Dimensões REAIS do arquivo, não as nominais: alguns raspadores usam
           estes números para montar o card antes de baixar a imagem. Ver o
           comentário de `og` em `brand.ts`. */
        width: og.largura,
        height: og.altura,
        alt: content.seo.ogAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: content.seo.titulo,
    description: content.seo.descricao,
    images: [og.padrao],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: canonicalPendente
    ? { index: false, follow: false }
    : { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${editorial.variable} ${ui.variable}`}
    >
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-ancora focus:text-papel focus:rounded"
        >
          Pular para o conteúdo
        </a>

        {/* As quatro máscaras, definidas UMA vez e reusadas por `id` em todas as
            rotas. Fora do fluxo, `aria-hidden`, custo de render zero. */}
        <OrganicClipPaths />
        {children}
      </body>
    </html>
  );
}
