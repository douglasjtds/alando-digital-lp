import { content } from "@/config/content";
import { FaixaRepetida } from "@/components/ui/FaixaRepetida";
import { WhatsappCta } from "@/components/ui/WhatsappCta";
import { Revelar } from "@/components/motion/Revelar";
import { TravessiaDeCor } from "@/components/motion/TravessiaDeCor";
import { renderizarPendencia } from "@/lib/pendencia";

/**
 * "Como funciona": eliminar a incerteza de "o que acontece se eu mandar essa
 * mensagem?".
 *
 * ── O único 01/02/03 da página ───────────────────────────────────────────────
 *
 * `<ol>` de verdade, porque o conteúdo é de fato uma sequência. Em qualquer
 * outra seção a numeração seria decoração, e é por isso que ela não aparece em
 * `Momentos` nem em `Servicos`, onde a tentação existe.
 *
 * O número visível é `aria-hidden`: o `<ol>` já comunica ordem ao leitor de
 * tela, e sem isso ele ouviria "item 1, 01, ...". É a mesma disciplina das
 * repetições da `FaixaRepetida`.
 *
 * ── A copy chegou, e ela tem título por etapa ────────────────────────────────
 *
 * ✅ Quatro etapas com as palavras da Andressa, trazidas pelo Douglas em 08/09.
 * `etapas` deixou de ser uma lista de parágrafos e passou a ser
 * `{ titulo, texto }`, então cada item ganhou um `<h3>`.
 *
 * O `<h3>` é `display-md`, que é o mesmo papel tipográfico dos blocos de
 * `Momentos`: subtítulo de seção já tem gramática nesta página e ela não muda
 * aqui. Cor `papel` (8,29:1 sobre `tinta`, 11,54:1 no fim da travessia), e não
 * `superficie-2`, que só passaria por ser texto grande.
 *
 * ⚠️ A linha de prazos SAIU, e a ausência é decisão. Ela era
 * `<<A CONFIRMAR: prazos reais de cada etapa>>`, e a Andressa disse como quer a
 * seção sem citar prazo nenhum. Prazo é promessa contratual: a página não
 * carrega marcador para um dado que ninguém pediu para exibir. Se um dia ela
 * mandar prazos, a linha volta; estimar aqui, nunca.
 *
 * ── A superfície ─────────────────────────────────────────────────────────────
 *
 * Fundo `tinta`, escolhido pelo Douglas em 31/07. Com `FaixaClientes`
 * e `Resultados` nascendo desligadas, o miolo da página corria oito seções sem
 * nenhuma quebra de superfície entre o `Manifesto` (escuro) e o `CtaFinal`, e o
 * `tinta` é a superfície média quente que a §3 já aprovou para esse papel.
 *
 * ⚠️ Sobre `tinta`, TODO texto de corpo é `papel` (8,29:1). O `superficie-2` dá
 * 4,39:1, que só passa em texto grande, então ele fica restrito aos números das
 * etapas, que são `display-md`. E o CTA vai na variante `sage`, porque o
 * `primario` (`ancora`) sobre `tinta` dá 1,60:1 e desapareceria no fundo.
 *
 * ── A travessia da banda escura (Fase 7) ─────────────────────────────────────
 *
 * A superfície atravessa de `tinta` para `ancora-quente` ao longo da passagem da
 * seção, que é o "tinta -> ancora-quente embaixo" da §8. Nenhuma cor de texto
 * mudou por causa disso, e é o motivo de esta ter sido escolhida: `papel` passa
 * nas duas pontas (8,29 e 11,54) e melhora no caminho. Os números em
 * `superficie-2` também: 4,39 vira 6,10.
 *
 * O efeito narrativo é o arco de cor da §3 acontecendo dentro de uma seção: a
 * página desce do frio para o quente, e é aqui que ela vira.
 */
export function Processo() {
  return (
    <TravessiaDeCor de="tinta" para="ancora-quente">
      <section
        id="processo"
        className="secao-y scroll-mt-24"
        aria-labelledby="faixa-processo"
      >
        <div className="container-lp">
          <Revelar className="mb-12 md:mb-16">
            <FaixaRepetida
              id="faixa-processo"
              texto={content.processo.titulo}
              palavraItalica={content.processo.tituloPalavraItalica}
              repeticoes={content.processo.faixaRepeticoes}
              direcao="esquerda"
              variante="escuro"
            />
          </Revelar>

          <Revelar as="ol" como="lista" className="mb-12 space-y-8 md:space-y-12">
            {content.processo.etapas.map((etapa, i) => (
              <li
                key={etapa.titulo}
                className="grid grid-cols-[auto_1fr] items-baseline gap-4 md:gap-8"
              >
                <span
                  aria-hidden="true"
                  className="display-md text-superficie-2 tabular-nums"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="display-md text-papel mb-3">
                    {renderizarPendencia(etapa.titulo, "escuro")}
                  </h3>
                  <p className="body-lg text-papel medida">
                    {renderizarPendencia(etapa.texto, "escuro")}
                  </p>
                </div>
              </li>
            ))}
          </Revelar>

          <Revelar>
            <WhatsappCta
              origem="processo"
              label={content.processo.processoCTA}
              variante="sage"
            />
          </Revelar>
        </div>
      </section>
    </TravessiaDeCor>
  );
}
