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
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-papel transition-all",
        hasScroll && "backdrop-blur-md shadow-sm border-b border-decor/20"
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
