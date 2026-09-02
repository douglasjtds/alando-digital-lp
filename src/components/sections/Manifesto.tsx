import { content } from "@/config/content";
import { FaixaRepetida } from "@/components/ui/FaixaRepetida";
import { ManifestoTimeline } from "@/components/motion/ManifestoTimeline";
import { Revelar } from "@/components/motion/Revelar";
import { partirNoItalico } from "@/lib/italico";

/**
 * A seção-assinatura, e a única da página com movimento coreografado.
 *
 * ⚠️ A ORDEM MUDOU NA FASE 7, e a mudança é de layout: nenhuma palavra da copy
 * foi tocada. A linha que resolve ("…queremos falar sobre pessoas.") estava
 * depois dos três parágrafos do corpo, e a `landing-page-structure.md` §5.3 a
 * especifica logo depois do `<h2>`. Com ela lá embaixo o momento coreografado
 * não existia na prática: em 390px o título e a resolução nunca aparecem juntos
 * na tela, e o gesto de "a reticência fica no ar e resolve depois" não chegava a
 * ser visto por ninguém. Aprovado pelo Douglas em 02/08.
 */
export function Manifesto() {
  const resolveParte = partirNoItalico(
    `${content.manifesto.resolveParte1} ${content.manifesto.resolvePalavraItalica}${content.manifesto.resolveParte2}`,
    content.manifesto.resolvePalavraItalica
  );

  return (
    <section
      id="manifesto"
      className="bg-ancora secao-y"
      aria-labelledby="faixa-manifesto"
    >
      <div className="container-lp">
        {/* Os dois tempos do momento coreografado. Os `data-manifesto` são o que
            a timeline procura: sem eles ela não roda, e a seção fica completa. */}
        <ManifestoTimeline className="mb-12 md:mb-16">
          <div data-manifesto="titulo">
            <FaixaRepetida
              id="faixa-manifesto"
              texto={content.manifesto.h2}
              repeticoes={content.manifesto.faixaRepeticoes}
              variante="escuro"
            />
          </div>

          {/* Playfair, e não o corpo em Montserrat: esta linha COMPLETA a frase
              do <h2>, então ela pertence à titulação. É por isso também que ela
              não é centralizada: alinha com o título, logo acima. */}
          <p
            data-manifesto="resolucao"
            className="display-md text-superficie-2 mt-6 md:mt-8"
          >
            {resolveParte ? (
              <>
                {resolveParte[0]}
                <span className="editorial">{resolveParte[1]}</span>
                {resolveParte[2]}
              </>
            ) : (
              `${content.manifesto.resolveParte1} ${content.manifesto.resolvePalavraItalica}${content.manifesto.resolveParte2}`
            )}
          </p>
        </ManifestoTimeline>

        <Revelar como="lista" className="medida mx-auto">
          {/* Percorre o `corpo` em vez de ler `[0]`, `[1]` e `[2]` à mão.

              ⚠️ Não é refatoração de estilo: a versão anterior lia `corpo[2]` num
              array que passou a ter DOIS parágrafos, e isso quebrava o
              `tsc`, ou seja, o build inteiro. Índice fixo em cima de `content.ts`
              transforma "a Andressa cortou um parágrafo" em erro de compilação
              numa seção que ninguém estava editando. Assim a seção acompanha a
              copy, e o espaço maior antes do fecho fica preso ao ÚLTIMO
              parágrafo, seja ele qual for. */}
          {content.manifesto.corpo.map((paragrafo, i) => (
            <p
              key={paragrafo}
              className={
                i === content.manifesto.corpo.length - 1
                  ? "body-lg text-superficie-2 mb-12"
                  : "body-lg text-superficie-2 mb-6"
              }
            >
              {paragrafo}
            </p>
          ))}

          <p className="text-center text-superficie-2 text-sm leading-relaxed">
            {content.manifesto.fecha}
          </p>
        </Revelar>
      </div>
    </section>
  );
}
