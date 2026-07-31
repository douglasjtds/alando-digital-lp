import { content } from "@/config/content";
import { FaixaRepetida } from "@/components/ui/FaixaRepetida";
import { partirNoItalico } from "@/lib/italico";

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
        <FaixaRepetida
          id="faixa-manifesto"
          texto={content.manifesto.h2}
          repeticoes={content.manifesto.faixaRepeticoes}
          variante="escuro"
          className="mb-12 md:mb-16"
        />

        <div className="max-w-prose-tight mx-auto mb-8">
          <p className="body-lg text-superficie-2 mb-6">
            {content.manifesto.corpo[0]}
          </p>

          <p className="body-lg text-superficie-2 mb-6">
            {content.manifesto.corpo[1]}
          </p>

          <p className="body-lg text-superficie-2 mb-8">
            {content.manifesto.corpo[2]}
          </p>

          <p className="text-center text-superficie-2 text-lg mb-12">
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

          <p className="text-center text-superficie-2 text-sm leading-relaxed">
            {content.manifesto.fecha}
          </p>
        </div>
      </div>
    </section>
  );
}
