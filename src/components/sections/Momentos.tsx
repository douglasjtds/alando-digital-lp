import { content } from "@/config/content";
import { FaixaRepetida } from "@/components/ui/FaixaRepetida";
import { Revelar } from "@/components/motion/Revelar";

export function Momentos() {
  return (
    <section
      id="momentos"
      className="bg-papel secao-y"
      aria-labelledby="faixa-momentos"
    >
      <div className="container-lp">
        <Revelar className="mb-12 md:mb-16">
          <FaixaRepetida
            id="faixa-momentos"
            texto={content.momentos.titulo}
            repeticoes={content.momentos.faixaRepeticoes}
            direcao="esquerda"
          />
        </Revelar>

        <Revelar className="medida mx-auto mb-12">
          <p className="body-lg text-tinta text-center mb-12">
            {content.momentos.intro}
          </p>
        </Revelar>

        {/* Layout escalonado: três blocos com larguras alternadas. Os três
            cabem numa tela, então o escalonamento acontece entre eles. */}
        <Revelar
          como="lista"
          className="space-y-8 md:space-y-12 max-w-4xl mx-auto mb-12"
        >
          {/* Bloco 1: esquerda (2/3 em desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="md:col-span-2">
              <h3 className="display-md text-ancora mb-4">
                {content.momentos.blocos[0].titulo}
              </h3>
              <p className="body text-tinta">
                {content.momentos.blocos[0].texto}
              </p>
            </div>
          </div>

          {/* Bloco 2: direita (2/3 em desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="md:col-start-2 md:col-span-2">
              <h3 className="display-md text-ancora mb-4">
                {content.momentos.blocos[1].titulo}
              </h3>
              <p className="body text-tinta">
                {content.momentos.blocos[1].texto}
              </p>
            </div>
          </div>

          {/* Bloco 3: esquerda (1/2 em desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <h3 className="display-md text-ancora mb-4">
                {content.momentos.blocos[2].titulo}
              </h3>
              <p className="body text-tinta">
                {content.momentos.blocos[2].texto}
              </p>
            </div>
          </div>
        </Revelar>

        <Revelar className="medida mx-auto">
          <p className="text-center text-tinta-suave text-sm leading-relaxed">
            {content.momentos.fecha}
          </p>
        </Revelar>
      </div>
    </section>
  );
}
