import { content } from "@/config/content";
import { FaixaRepetida } from "@/components/ui/FaixaRepetida";

type Servico = (typeof content.servicos)[number];

export function Servicos() {
  const servicoDestaque = content.servicos.find((s) => s.destaque) as Servico | undefined;
  const servicosNormais = content.servicos.filter((s) => !s.destaque) as Servico[];

  return (
    <section
      id="servicos"
      className="bg-papel secao-y"
      aria-labelledby="faixa-servicos"
    >
      <div className="container-lp">
        <FaixaRepetida
          id="faixa-servicos"
          texto="Serviços"
          repeticoes={content.servicosFaixaRepeticoes}
          direcao="direita"
          className="mb-12 md:mb-16"
        />

        <div className="space-y-12 md:space-y-16 mb-16">
          {/* Bloco dominante: Gestão de Redes Sociais */}
          {servicoDestaque && (
            <article className="bg-superficie-2 p-8 md:p-12 border border-decor">
              <h3 className="display-lg text-ancora mb-6">
                {servicoDestaque.titulo}
              </h3>
              <div className="space-y-4 mb-6">
                {servicoDestaque.corpo.split("\n\n").map((paragrafo, i) => (
                  <p key={i} className="body-lg text-ancora">
                    {paragrafo}
                  </p>
                ))}
              </div>
              <p className="caption text-ancora font-semibold">
                {(servicoDestaque as any).fechamento}
              </p>
            </article>
          )}

          {/* Blocos normais com alternância de largura e lado */}
          <div className="space-y-8 md:space-y-12">
            {servicosNormais.map((servico, idx) => {
              const isEsquerda = idx % 2 === 0;
              const start = isEsquerda ? "" : "md:col-start-2";

              return (
                <article
                  key={servico.titulo}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start"
                >
                  <div className={`md:col-span-2 ${start}`}>
                    <h3 className="display-md text-ancora mb-4">
                      {servico.titulo}
                    </h3>
                    <div className="space-y-4">
                      {servico.corpo.split("\n\n").map((paragrafo, i) => (
                        <p key={i} className="body text-tinta">
                          {paragrafo}
                        </p>
                      ))}
                    </div>
                    {(servico as any).fechamento && (
                      <p className="caption text-tinta-suave font-semibold mt-4">
                        {(servico as any).fechamento}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Fechamento */}
        <div className="bg-ancora-quente p-8 md:p-12 border border-decor">
          <h3 className="display-lg text-papel mb-6">Mais do que contratar um serviço</h3>
          <div className="space-y-4">
            {content.maisQueContratar.split("\n\n").map((paragrafo, i) => (
              <p key={i} className="body-lg text-papel">
                {paragrafo}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
