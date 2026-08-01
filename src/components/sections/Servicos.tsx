import Image from "next/image";
import { content } from "@/config/content";
import { FaixaRepetida } from "@/components/ui/FaixaRepetida";
import { WhatsappCta } from "@/components/ui/WhatsappCta";

type Servico = (typeof content.servicos)[number];

export function Servicos() {
  const servicoDestaque = content.servicos.find((s) => s.destaque);
  const servicosNormais = content.servicos.filter(
    (s) => !s.destaque
  ) as readonly Servico[];

  return (
    <section
      id="servicos"
      className="bg-papel secao-y scroll-mt-24"
      aria-labelledby="faixa-servicos"
    >
      <div className="container-lp">
        <FaixaRepetida
          id="faixa-servicos"
          texto={content.servicosTitulo}
          repeticoes={content.servicosFaixaRepeticoes}
          direcao="direita"
          className="mb-12 md:mb-16"
        />

        <div className="space-y-12 md:space-y-16 mb-16">
          {/* Bloco dominante: Gestão de Redes Sociais. A copy diz que é "o
              coração da Alando", então ele leva largura cheia, o texto mais
              longo e a única superfície colorida da seção. */}
          {servicoDestaque && (
            <article className="bg-superficie-2 p-8 md:p-12 border border-decor">
              <h3 className="display-lg text-ancora mb-6">
                {servicoDestaque.titulo}
              </h3>
              <div className="space-y-4">
                {servicoDestaque.corpo.split("\n\n").map((paragrafo) => (
                  <p key={paragrafo} className="body-lg text-ancora medida">
                    {paragrafo}
                  </p>
                ))}
              </div>
              {servicoDestaque.fechamento && (
                <p className="caption text-ancora font-semibold medida mt-6">
                  {servicoDestaque.fechamento}
                </p>
              )}
            </article>
          )}

          {/* Os quatro em órbita: alternam de lado, larguras desiguais, e só um
              deles tem foto. A lacuna é o que impede a leitura em grade. */}
          <div className="space-y-8 md:space-y-12">
            {servicosNormais.map((servico, idx) => {
              const textoNaEsquerda = idx % 2 === 0;

              return (
                <article
                  key={servico.titulo}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start"
                >
                  <div
                    className={
                      textoNaEsquerda
                        ? "md:col-span-2 md:col-start-1"
                        : "md:col-span-2 md:col-start-2"
                    }
                  >
                    <h3 className="display-md text-ancora mb-4">
                      {servico.titulo}
                    </h3>
                    <div className="space-y-4">
                      {servico.corpo.split("\n\n").map((paragrafo) => (
                        <p key={paragrafo} className="body text-tinta medida">
                          {paragrafo}
                        </p>
                      ))}
                    </div>
                    {servico.fechamento && (
                      <p className="caption text-tinta-suave font-semibold medida mt-4">
                        {servico.fechamento}
                      </p>
                    )}
                  </div>

                  {/* A foto ocupa a coluna que o texto deixou, do lado oposto a
                      ele. `crista-faixa` é a quarta máscara e a única ainda não
                      usada na página: o herói tem `crista-retrato` e o `Sobre`
                      tem `crista-vale` e `crista-serra`. */}
                  {servico.foto && (
                    <div
                      className={
                        textoNaEsquerda
                          ? "md:col-start-3 md:row-start-1"
                          : "md:col-start-1 md:row-start-1"
                      }
                    >
                      <Image
                        src={servico.foto}
                        alt={servico.fotoAlt}
                        width={664}
                        height={1182}
                        /* 24vw, medido: a coluna dá 331 CSS px em 1440, e 30vw
                           pedia o candidato de 432 sem precisar. */
                        sizes="(max-width: 768px) 100vw, 24vw"
                        className="h-auto w-full object-cover [clip-path:url(#crista-faixa)]"
                      />
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>

        {/* Fechamento: é o diferencial, e é onde a tese volta. */}
        <div className="bg-ancora-quente p-8 md:p-12 border border-decor">
          <h3 className="display-lg text-papel mb-6">
            {content.maisQueContratarTitulo}
          </h3>
          <div className="space-y-4">
            {content.maisQueContratar.split("\n\n").map((paragrafo) => (
              <p key={paragrafo} className="body-lg text-papel medida">
                {paragrafo}
              </p>
            ))}
          </div>
        </div>

        {/* O CTA da seção, que a Fase 5B não montou: `content.servicosCTA` e a
            mensagem de origem `servicos` já existiam desde a Fase 4, sem
            ninguém consumindo. */}
        <div className="mt-12">
          <WhatsappCta
            origem="servicos"
            label={content.servicosCTA}
            variante="primario"
          />
        </div>
      </div>
    </section>
  );
}
