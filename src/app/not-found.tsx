import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { larguraDoMonograma, marca } from "@/config/brand";
import { content } from "@/config/content";
import { partirNoItalico } from "@/lib/italico";

/**
 * O 404, no estilo da marca.
 *
 * ── Por que ele não tem Header nem Footer ────────────────────────────────────
 *
 * Porque as duas coisas que o `Header` e o `Footer` oferecem não servem aqui: as
 * âncoras (`#servicos`, `#processo`) apontam para seções que não existem nesta
 * rota, e o CTA de WhatsApp mandaria a pessoa abrir uma conversa a partir de um
 * erro. O trabalho desta página é um só: dizer o que houve e devolver a pessoa
 * para `/`.
 *
 * ── Por que ele é `noindex` ──────────────────────────────────────────────────
 *
 * O Next já responde 404 no cabeçalho HTTP, que é o sinal que vale. O `noindex`
 * é o cinto: página de erro que entra no índice aparece em busca por marca, e é
 * o pior primeiro contato possível com a Alando.
 *
 * O `<h1>` daqui não conflita com a regra do "um `h1` só": a regra é por
 * documento, e esta é outra rota.
 */
export const metadata: Metadata = {
  title: `${content.naoEncontrada.titulo} ${content.footer.nome}`,
  robots: { index: false, follow: false },
};

export default function NaoEncontrada() {
  const partes = partirNoItalico(
    content.naoEncontrada.titulo,
    content.naoEncontrada.palavraItalica,
  );

  return (
    <main className="bg-papel flex min-h-svh items-center">
      <div className="container-lp">
        <div className="flex max-w-2xl flex-col items-start gap-8">
          {/* Decorativo: o nome da marca não é o assunto desta página, e o link
              de volta já diz para onde se vai. */}
          <Image
            src={marca.monograma.escuro}
            alt=""
            aria-hidden="true"
            width={larguraDoMonograma(marca.alturas.footer)}
            height={marca.alturas.footer}
            className="h-10 w-auto"
          />

          <h1 className="display-lg text-ancora">
            {partes ? (
              <>
                {partes[0]}
                <span className="editorial">{partes[1]}</span>
                {partes[2]}
              </>
            ) : (
              content.naoEncontrada.titulo
            )}
          </h1>

          <p className="body-lg text-tinta medida">
            {content.naoEncontrada.texto}
          </p>

          {/* CTA secundário da §10: borda 1px `ancora`, texto `ancora`, fundo
              transparente. O primário é do WhatsApp, e aqui não se converte.

              As classes repetem a anatomia do `WhatsappCta` de propósito, e não
              reusam o componente: ele é `"use client"`, dispara
              `trackCtaWhatsapp` e monta um `wa.me`. Nada disso vale para um link
              interno numa página de erro. O anel de foco vem do
              `:focus-visible` global. */}
          <Link
            href="/"
            className="font-ui border-ancora text-ancora hover:bg-ancora/5 active:bg-ancora/10 inline-flex min-h-11 items-center justify-center rounded-md border px-6 py-3 font-semibold tracking-wide transition-all"
          >
            {content.naoEncontrada.voltar}
          </Link>
        </div>
      </div>
    </main>
  );
}
