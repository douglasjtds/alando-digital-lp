import type { Metadata } from "next";

import "./globals.css";

/**
 * As famílias de fonte (Playfair Display no display, Montserrat na UI) entram
 * aqui na Fase 1, via next/font/google com os subsets `latin` e `latin-ext`.
 * O `latin-ext` não é opcional: sem ele, ã/ç/õ/é caem no fallback e a linha
 * mistura duas fontes no meio da palavra, o que aconteceria duas vezes só no h1.
 *
 * A metadata definitiva (title, description, openGraph, canonical, noindex
 * enquanto não houver domínio) é da Fase 6. O que está aqui é o mínimo para o
 * scaffold subir sem inventar dado nenhum da cliente.
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
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
