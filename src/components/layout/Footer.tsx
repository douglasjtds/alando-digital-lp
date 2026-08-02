import Image from "next/image";

import { marca, larguraDoMonograma, redes } from "@/config/brand";
import { content } from "@/config/content";
import { renderizarPendencia } from "@/lib/pendencia";

/**
 * Rodapé em `ancora-quente`, seguindo o `CtaFinal`: os dois formam o bloco
 * escuro quente que fecha a página. A hairline em `decor` marca a fronteira sem
 * quebrar a continuidade da cor.
 *
 * Texto `papel` (11,54:1) e apoio em `superficie-2` (6,10:1). O monograma vai na
 * versão NEGATIVA, que existe: as oito cores do material incluem branco
 * (AUDITORIA-FASE-0.md §3).
 *
 * ── A cidade não é detalhe de rodapé ─────────────────────────────────────────
 *
 * ✅ Confirmada na Fase 6: Indaiatuba, SP. Ela pesa em busca local e aparece em
 * cinco lugares (aqui, no eyebrow do herói, no `title`, na `description` e no
 * `PostalAddress` do JSON-LD), então mora em `brand.local` e não em cinco
 * literais. Um lugar só resolvido não resolve.
 *
 * ── O crédito de desenvolvimento ─────────────────────────────────────────────
 *
 * ⚠️ Marcador de propósito. Se o crédito aparece, com que nome e com que link é
 * decisão da cliente sobre o rodapé dela. Preencher isso sozinho seria assinar
 * um trabalho no site de outra pessoa sem perguntar.
 *
 * O ano do copyright sai do relógio do BUILD, não do visitante: a página é
 * estática, e um `new Date()` no cliente custaria hidratação para exibir quatro
 * dígitos. Todo deploy o atualiza.
 */
export function Footer() {
  const alturaMonograma = marca.alturas.footer;
  const larguraMonograma = larguraDoMonograma(alturaMonograma);

  const ano = new Date().getFullYear();

  return (
    <footer className="bg-ancora-quente border-t border-decor/20">
      {/* ⚠️ `pb-32` no mobile é folga para o `StickyMobileCta`, não respiro de
          layout. A barra é `fixed` e mede 76px medidos em 390px: com o `pb-16`
          simétrico, ela cobria a última linha do rodapé (o crédito) justamente
          no fim do documento, onde não há mais scroll para escapar dela. Acima
          de 768px a barra não existe e o padding volta a ser simétrico. */}
      <div className="container-lp pt-16 pb-32 md:py-24">
        <div className="grid gap-12 md:grid-cols-[auto_1fr] md:items-start md:gap-16">
          <div className="flex flex-col gap-4">
            {/* Decorativo: o nome da marca vem escrito logo abaixo, e um `alt`
                aqui faria o leitor de tela ouvir "Alando Digital" duas vezes.

                ⚠️ `self-start` não é alinhamento, é o que impede a marca de ser
                ESTICADA. Num flex-col, o padrão é `align-items: stretch`, então
                `w-auto` com altura fixa devolvia 335px de largura em 390px de
                tela: o monograma virava um borrão horizontal. Medido no
                navegador, não inferido da classe. */}
            <Image
              src={marca.monograma.claro}
              alt=""
              aria-hidden="true"
              width={larguraMonograma}
              height={alturaMonograma}
              className="h-10 w-auto self-start"
            />
            <p className="lead-tracked text-papel">{content.footer.nome}</p>
          </div>

          <div className="flex flex-col gap-3 md:items-end md:text-right">
            {/* O texto visível é só o handle. Sem `aria-label`, quem usa leitor
                de tela ouve "@alandodigital, link" e não sabe de que rede é. */}
            <a
              href={redes.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={content.footer.instagramRotulo}
              className="body text-papel underline decoration-acento underline-offset-4 transition-colors hover:decoration-superficie-2"
            >
              {content.footer.instagram}
            </a>

            <p className="body text-papel">
              {renderizarPendencia(content.footer.cidade, "escuro")}
            </p>

            <p className="caption text-superficie-2">
              {renderizarPendencia(content.footer.cnpj, "escuro")}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-decor/20 pt-8 md:mt-16 md:flex-row md:items-center md:justify-between">
          <p className="caption text-superficie-2">
            © {ano} {content.footer.nome}. {content.footer.direitos}
          </p>

          <p className="caption text-superficie-2">
            {renderizarPendencia(content.footer.credito, "escuro")}
          </p>
        </div>
      </div>
    </footer>
  );
}
