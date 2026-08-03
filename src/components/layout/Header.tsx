"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/cn";
import { marca, larguraDoMonograma } from "@/config/brand";
import { content } from "@/config/content";
import { WhatsappCta } from "@/components/ui/WhatsappCta";

export function Header() {
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScroll(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const monoHeight = marca.alturas.header;
  const monoWidth = larguraDoMonograma(monoHeight);

  return (
    /* ⚠️ Defeito corrigido na Fase 7: o `backdrop-blur-md` estava por cima de um
       `bg-papel` OPACO, e blur atrás de fundo opaco não faz absolutamente nada.
       A §5.0 pede "fundo papel com blur após 40px de scroll", então faltava a
       translucidez. Ela também resolve o encontro com a travessia de cor do
       herói: em vez de uma barra `papel` chapada em cima de um fundo que está
       virando sage, o header deixa a superfície passar por baixo.

       ⚠️ ISTO VALE PARA A PÁGINA INTEIRA, não só para o herói. O header é
       `sticky`, então ele passa por cima das cinco superfícies, e a barra deixa
       de ser `papel` chapado em todas elas. É decisão de identidade, e está
       marcada no relatório da Fase 7 para o Douglas: reverter é tirar uma
       classe (e aí o `backdrop-blur-md` volta a ser código morto).

       Os 85% são medidos, e o pior caso NÃO é o sage: é o `ancora` do
       Manifesto. Efetivo por trás do texto, com o nav em `tinta`:

         sobre papel           8,29    sobre ancora-quente   6,31
         sobre superficie-2    7,60    sobre tinta           6,53
         sobre ancora          6,22  <- o piso

       Todos passam AA com folga. O número que estava aqui antes apontava o sage
       como pior caso, e estava errado: achado no review. */
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-papel transition-all",
        hasScroll &&
          "bg-papel/85 backdrop-blur-md shadow-sm border-b border-decor/20"
      )}
    >
      <div className="container-lp flex items-center justify-between py-4">
        <Link href="/" className="flex items-center focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-acento-texto rounded">
          <Image
            src={marca.monograma.escuro}
            alt="Alando Digital"
            width={monoWidth}
            height={monoHeight}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { href: "#servicos", label: content.header.nav.servicos },
            { href: "#processo", label: content.header.nav.processo },
            { href: "#sobre", label: content.header.nav.sobre },
            { href: "#duvidas", label: content.header.nav.duvidas },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-tinta hover:text-ancora transition-colors focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-acento-texto rounded"
            >
              {label}
            </a>
          ))}
        </nav>

        <WhatsappCta
          origem="header"
          label={content.hero.ctaLabel}
          variante="compacto"
        />
      </div>
    </header>
  );
}
