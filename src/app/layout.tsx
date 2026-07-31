import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";

import { OrganicClipPaths } from "@/components/ui/OrganicClipPaths";

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
 * A metadata definitiva (title com cidade, description, openGraph, canonical,
 * noindex enquanto não houver domínio) é da Fase 6. O que está aqui é o mínimo
 * para o scaffold subir sem inventar dado nenhum da cliente.
 */
export const metadata: Metadata = {
  title: "Alando Digital",
  description:
    "Estratégia, posicionamento e comunicação para marcas que desejam ser lembradas.",
  robots: { index: false, follow: false },
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
