import Image from "next/image";
import { content } from "@/config/content";
import { CampoMarca } from "@/components/ui/CampoMarca";
import { FaixaRepetida } from "@/components/ui/FaixaRepetida";
import { Revelar } from "@/components/motion/Revelar";
import { renderizarProsa } from "@/lib/prosa";

/**
 * "Sobre": humanizar. A proximidade tem que ser SENTIDA, não afirmada.
 *
 * Dois movimentos, na ordem da copy: "Nossa história" e "Quem está por trás da
 * Alando" (landing-page-structure.md §5.8).
 *
 * ── As imagens trocaram de lugar em 09/09 ────────────────────────────────────
 *
 * Decisão do Douglas. O retrato da Andressa estava em "Nossa história" e passou
 * para "Quem está por trás da Alando", que é o movimento que a nomeia em texto. A
 * foto de captação que ocupava esse slot SAIU da página, e "Nossa história" ficou
 * com o campo da marca até ele escolher a foto definitiva.
 *
 * ⚠️ Isto contraria o que a DESIGN-GUIDELINES.md §9 dizia, e o registro importa.
 * A regra de lá ("se esta seção trouxer só o rosto da fundadora, a imagem
 * contradiz o texto ao lado dela") foi escrita contra uma frase específica da
 * copy, "nunca foi construída para depender de uma única pessoa". **Essa frase
 * não está mais na página:** a copy de `sobre.equipe` foi reescrita e hoje afirma
 * a equipe em outras palavras ("hoje a Alando é formada por profissionais
 * especializados em diferentes áreas da comunicação").
 *
 * O custo não é zero, e fica dito: o retrato da fundadora passa a ser a única
 * imagem de gente na seção, ao lado de um parágrafo que fala de equipe. O que
 * caiu foi a contradição literal, não o desconforto inteiro. A §9 foi atualizada
 * com a decisão em vez de continuar dizendo o contrário.
 *
 * ── A máscara viaja com a FOTO, não fica no slot ─────────────────────────────
 *
 * ⚠️ O ponto mais fácil de errar nesta troca. A `crista-serra` estava no
 * movimento b e tem a crista no TOPO, de propósito: o `OrganicClipPaths.tsx` diz
 * "aqui não há cabeça a proteger", porque ali era foto de captação. Deixá-la no
 * slot e passar o retrato por baixo cortaria o alto do rosto.
 *
 * Então o retrato desce com a `crista-vale`, que é a máscara desenhada para ele
 * (topo quase reto, degrau à esquerda), e a `crista-serra` sobe para emoldurar a
 * marca, onde a crista no topo não atropela nada.
 *
 * ⚠️ O literal `[clip-path:url(#crista-vale)]` precisa continuar escrito por
 * extenso neste arquivo. O comentário de `CampoProva.tsx` explica: o Tailwind só
 * gera a classe arbitrária porque alguém escreve o literal inteiro em algum
 * lugar, e apagá-lo daqui apagaria a máscara da prova larga de `Servicos` SEM
 * ERRO NENHUM. O da `crista-serra` mudou de endereço em 09/09 e hoje mora no
 * `CampoMarca.tsx`, que é o único lugar onde ele aparece.
 *
 * ── O campo da marca ─────────────────────────────────────────────────────────
 *
 * Ele virou componente em 09/09, quando "Identidade Visual" ganhou o mesmo slot
 * vago: o porquê da moldura, os dois números medidos, a legenda de pendência e o
 * literal da máscara estão todos no `CampoMarca.tsx`. Aqui fica só a coluna.
 *
 * ── Layout ───────────────────────────────────────────────────────────────────
 *
 * 5/7 invertendo o herói, nos dois eixos: o herói põe o texto à esquerda em 45% e
 * a imagem à direita em 55%; aqui a imagem vem à ESQUERDA em 5/12 e o texto à
 * direita em 7/12. O segundo movimento inverte de novo (texto à esquerda, foto à
 * direita) em 7/4, com a coluna vazia sobrando: larguras desiguais, nunca 50/50.
 *
 * ── Semântica ────────────────────────────────────────────────────────────────
 *
 * Um `<h2>` só, carregado pela faixa ("Nossa história"), e o segundo movimento em
 * `<h3>`. Duas faixas na mesma seção deixariam a coluna visualmente pesada de
 * cima, e o `<h2>` da página inteira já é um por seção.
 */
export function Sobre() {
  const paragrafosDaHistoria = content.sobre.historia.corpo.flatMap((bloco) =>
    bloco.split("\n\n"),
  );
  const paragrafosDaEquipe = content.sobre.equipe.corpo.flatMap((bloco) =>
    bloco.split("\n\n"),
  );

  return (
    <section
      id="sobre"
      className="bg-papel secao-y scroll-mt-24"
      aria-labelledby="faixa-sobre"
    >
      <div className="container-lp">
        <Revelar className="mb-12 md:mb-16">
          <FaixaRepetida
            id="faixa-sobre"
            texto={content.sobre.historia.titulo}
            palavraItalica={content.sobre.historia.palavraItalica}
            repeticoes={content.sobre.sobreFaixaRepeticoes}
            direcao="direita"
          />
        </Revelar>

        {/* Movimento a: Nossa história. Campo da marca à esquerda, 5/12. */}
        <Revelar className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            {/* O campo da marca saiu daqui para o `CampoMarca` em 09/09, quando
                "Identidade Visual" ganhou o mesmo slot vago. O `sizes` continua
                sendo o desta coluna: a marca ocupa 56% da caixa, e a coluna é
                5/12 do container. */}
            <CampoMarca
              pendencia={content.sobre.historia.fotoPendencia}
              sizes="(max-width: 768px) 56vw, (max-width: 1200px) 24vw, 17vw"
            />
          </div>

          <div className="space-y-6 md:col-span-7">
            {paragrafosDaHistoria.map((paragrafo) => (
              <p key={paragrafo} className="body text-tinta medida">
                {renderizarProsa(paragrafo)}
              </p>
            ))}
          </div>
        </Revelar>

        {/* Movimento b: Quem está por trás da Alando. Inverte o lado, e a foto
            encolhe para 4/12: a coluna que sobra é o que impede a seção de ler
            como dois blocos espelhados. */}
        <Revelar className="mt-16 md:mt-24">
          <h3 className="display-md text-ancora mb-8">
            {content.sobre.equipe.titulo}
          </h3>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
            <div className="space-y-6 md:col-span-7">
              {paragrafosDaEquipe.map((paragrafo) => (
                <p key={paragrafo} className="body text-tinta medida">
                  {renderizarProsa(paragrafo)}
                </p>
              ))}
            </div>

            <div className="md:col-span-4 md:col-start-9">
              {/* O `clip-path` mora no wrapper, que é quem publica a linha do
                  tempo do parallax. A imagem consome. Ver §8, armadilha nº 1. */}
              <div className="foto-textura [clip-path:url(#crista-vale)]">
                <Image
                  src="/images/retrato-sobre.jpg"
                  alt={content.sobre.equipe.fotoAlt}
                  width={1023}
                  height={1537}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 34vw, 24vw"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
