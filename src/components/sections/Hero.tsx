import Image from "next/image";
import { cn } from "@/lib/cn";
import { content } from "@/config/content";
import { partirNoItalico } from "@/lib/italico";
import { renderizarPendencia } from "@/lib/pendencia";
import { WhatsappCta } from "@/components/ui/WhatsappCta";

export function Hero() {
  const partes = partirNoItalico(content.hero.h1, content.hero.h1PalavraItalica);

  return (
    <section className="bg-papel pt-20 pb-12 md:pt-32 md:pb-20">
      <div className="container-lp">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.222fr] gap-8 md:gap-12 lg:gap-16 items-start">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <div className="eyebrow text-tinta-suave">
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

              <p className="body-lg text-tinta medida">
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
              src="/images/retrato-hero.jpg"
              alt={content.hero.fotoAlt}
              width={1023}
              height={1537}
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
  );
}
