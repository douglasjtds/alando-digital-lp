import Image from "next/image";
import { cn } from "@/lib/cn";
import { content } from "@/config/content";
import { partirNoItalico } from "@/lib/italico";
import { renderizarPendencia } from "@/lib/pendencia";
import { WhatsappCta } from "@/components/ui/WhatsappCta";
import { TravessiaDeCor } from "@/components/motion/TravessiaDeCor";

/**
 * O herói, e as duas coisas que a Fase 7 NÃO fez aqui.
 *
 * Não há revelação por máscara nesta seção: ela contém o elemento de LCP, e a
 * regra 1 da §8 diz que nada no herói começa escondido. E não há parallax na
 * foto: textura não vale uma camada composta em cima do LCP.
 *
 * ── O que a travessia de cor obrigou a mudar ─────────────────────────────────
 *
 * ⚠️ O fundo atravessa `papel` -> `superficie-2`, então o texto TEM que passar
 * nas duas pontas. Duas cores caíram por causa disso, e o cálculo é o da §3:
 *
 *   subtítulo  `tinta`        8,29 sobre papel, mas 4,39 sobre sage  -> `ancora`
 *   eyebrow    `tinta-suave`  5,76 sobre papel, mas 3,05 sobre sage  -> `acento-texto`
 *
 * `ancora` dá 13,27 e 7,02; `acento-texto` dá 11,54 e 6,10. Os dois passam nas
 * duas superfícies e em tudo que existe entre elas.
 */
export function Hero() {
  const partes = partirNoItalico(content.hero.h1, content.hero.h1PalavraItalica);

  /* `id="inicio"` é o alvo do IntersectionObserver do `StickyMobileCta`
     (§5.12), e não decoração de âncora: sem ele a barra nunca aparece. Ele fica
     na <section>, não no wrapper da travessia. */
  return (
    <TravessiaDeCor
      de="papel"
      para="superficie-2"
      ancoragem="topo-da-pagina"
    >
      <section id="inicio" className="pt-20 pb-12 md:pt-32 md:pb-20">
        <div className="container-lp">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.222fr] gap-8 md:gap-12 lg:gap-16 items-start">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <div className="eyebrow text-acento-texto">
                  {renderizarPendencia(content.hero.eyebrow)}
                </div>

                <h1 className="display-xl text-ancora">
                  {partes ? (
                    <>
                      {partes[0]}
                      <span className="editorial">{partes[1]}</span>
                      {partes[2]}
                    </>
                  ) : (
                    content.hero.h1
                  )}
                </h1>

                <p className="body-lg text-ancora medida">
                  {content.hero.subtitulo}
                </p>
              </div>

              <WhatsappCta
                origem="hero"
                label={content.hero.ctaLabel}
                variante="primario"
              />
            </div>

            <div className="relative w-full">
              <Image
                src="/images/captacao-hero.jpg"
                alt={content.hero.fotoAlt}
                width={1200}
                height={1800}
                priority
                className={cn(
                  "w-full h-auto object-cover",
                  "[clip-path:url(#crista-retrato)]"
                )}
                sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 45vw"
              />
            </div>
          </div>
        </div>
      </section>
    </TravessiaDeCor>
  );
}
