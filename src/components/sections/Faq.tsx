import { ChevronDown } from "lucide-react";

import { content } from "@/config/content";
import { FaixaRepetida } from "@/components/ui/FaixaRepetida";
import { Revelar } from "@/components/motion/Revelar";
import { renderizarPendencia } from "@/lib/pendencia";
import { renderizarProsa } from "@/lib/prosa";

/**
 * "Dúvidas": a seção que mais rende cauda longa em busca, porque as perguntas
 * são literalmente o que as pessoas digitam.
 *
 * ── Por que `<details>` nativo, e não um accordion de biblioteca ─────────────
 *
 * Não é gosto, são três coisas de uma vez: o conteúdo fica no HTML para o
 * crawler, a acessibilidade vem de graça (foco, teclado, estado expandido) e o
 * custo é 0 KB. Accordion em React tira o FAQ do índice, que é justamente a
 * razão de o FAQ existir. Ver landing-page-structure.md §2.3 e §5.9.
 *
 * Consequência prática: esta seção é server component, sem uma linha de JS.
 * A rotação do chevron é CSS puro, via a variante `group-open`.
 *
 * ── ✅ A copy chegou em 09/09, e ela pediu exatamente isto ───────────────────
 *
 * Eram UM par pergunta/resposta e dois marcadores; agora são SETE pares reais,
 * com as palavras da Andressa. Ficam registrados os dois pontos que a próxima
 * pessoa vai querer saber:
 *
 * 1. Junto com a copy ela perguntou se "as dúvidas podem aparecer com a
 *    resposta oculta, e a pessoa clica para ver cada uma". **É o que o
 *    `<details>` acima já fazia desde a Fase 5D**, e nenhuma linha desta
 *    estrutura mudou por causa do pedido. Fica escrito para ninguém achar que
 *    falta implementar accordion: o comportamento que ela quer é o nativo, e
 *    trocá-lo por JS custaria os três ganhos do bloco anterior.
 *
 * 2. O JSON-LD `FAQPage` espelha as sete palavra por palavra, e espelha porque
 *    o `lib/schema.ts` lê o MESMO `content.faq.perguntas` que este `map`. Uma
 *    fonte só não tem como divergir; duas divergem, e o Google passa a ignorar
 *    o markup inteiro quando isso acontece.
 */
export function Faq() {
  return (
    <section
      id="duvidas"
      className="bg-papel secao-y scroll-mt-24"
      aria-labelledby="faixa-faq"
    >
      <div className="container-lp">
        <Revelar className="mb-12 md:mb-16">
          <FaixaRepetida
            id="faixa-faq"
            texto={content.faq.titulo}
            palavraItalica={content.faq.tituloPalavraItalica}
            repeticoes={content.faq.faixaRepeticoes}
            direcao="esquerda"
          />
        </Revelar>

        {/* ⚠️ Desvio registrado: `decor` está documentado para 6-12% de
            opacidade, inclusive em borda (§3, `brand.ts`, `globals.css`). Aqui
            ele vai a 100%, que sobre `papel` dá 1,89:1, uma linha de cabelo. A
            10% a divisória seria invisível, e accordion sem divisória visível
            não comunica que há mais itens. Mesmo emprego que os `border-decor`
            dos blocos de `Servicos`. Se a banda for pra valer também em borda,
            o conserto é no sistema, não aqui. */}
        <Revelar como="lista" className="border-t border-decor">
          {content.faq.perguntas.map(({ pergunta, resposta }) => (
            <details key={pergunta} className="group border-b border-decor">
              {/* `list-none` mata o triângulo do Firefox e o pseudo-elemento
                  mata o do WebKit. O alvo de toque sai dos 24px de padding
                  vertical, bem acima dos 44px exigidos. */}
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                <span className="body-lg font-semibold text-ancora">
                  {renderizarPendencia(pergunta)}
                </span>

                {/* Lucide, peso 1.5px, e é ícone de interface: nunca no mesmo
                    bloco visual que a marca (DESIGN-GUIDELINES.md §5). */}
                <ChevronDown
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="mt-1 size-6 shrink-0 text-acento-texto transition-transform group-open:rotate-180 motion-reduce:transition-none"
                />
              </summary>

              <div className="space-y-4 pb-6">
                {resposta.split("\n\n").map((paragrafo) => (
                  <p key={paragrafo} className="body text-tinta medida">
                    {renderizarProsa(paragrafo)}
                  </p>
                ))}
              </div>
            </details>
          ))}
        </Revelar>
      </div>
    </section>
  );
}
