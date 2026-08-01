import Image from "next/image";
import { content } from "@/config/content";
import { FaixaRepetida } from "@/components/ui/FaixaRepetida";

/**
 * "Sobre": humanizar. A proximidade tem que ser SENTIDA, não afirmada.
 *
 * Dois movimentos, na ordem da copy: "Nossa história" e "Quem está por trás da
 * Alando" (landing-page-structure.md §5.8).
 *
 * ── A foto da equipe é o ponto que decide a seção ────────────────────────────
 *
 * ⚠️ A copy afirma que a Alando "nunca foi construída para depender de uma única
 * pessoa". Se esta seção trouxer só o rosto da fundadora, **a imagem contradiz o
 * texto que está do lado dela**, e nenhum acerto de layout salva isso.
 *
 * Auditei as cinco fotos de `public/images/` uma por uma para escolher, e só
 * `servico-gestao.jpg` serve:
 *
 *   servico-gestao   cozinha, alguém de avental (DE COSTAS) + duas mãos na
 *                    câmera.  2 pessoas, nenhum rosto identificável.  664×1182
 *   captacao-um      loja, a pessoa filmada de FRENTE + pessoas ao fundo.
 *                    3+ pessoas, rostos identificáveis: autorização pendente
 *   captacao-tres    é a foto da CRIANÇA na tela da câmera. O caso mais
 *                    restritivo da lista, e só 310×552
 *   captacao-dois    só mãos, uma pessoa, e 310×552: thumbnail apenas
 *   servico-video    só mãos, uma pessoa. Não mostra trabalho a dois
 *
 * ⚠️ E o `alt` dela não afirma que as duas pessoas são da Alando: a foto é de uma
 * captação em cliente, e provavelmente uma delas é o próprio cliente. O que a
 * imagem entrega é trabalho acontecendo a mais de um par de mãos, que é o que o
 * parágrafo afirma. Afirmar mais que isso seria inventar.
 *
 * ── Layout ───────────────────────────────────────────────────────────────────
 *
 * 5/7 invertendo o herói, nos dois eixos: o herói põe o texto à esquerda em 45% e
 * a foto à direita em 55%; aqui a foto vem à ESQUERDA em 5/12 e o texto à direita
 * em 7/12. O segundo movimento inverte de novo (texto à esquerda, foto à direita)
 * em 7/4, com a coluna vazia sobrando: larguras desiguais, nunca 50/50.
 *
 * Máscaras diferentes da do herói, que usa `crista-retrato`:
 * `crista-vale` (desenhada para este retrato, degrau à esquerda e topo limpo
 * onde está a cabeça) e `crista-serra` (a de captação, a única sem degrau).
 *
 * ── Semântica ────────────────────────────────────────────────────────────────
 *
 * Um `<h2>` só, carregado pela faixa ("Nossa história"), e o segundo movimento em
 * `<h3>`. Duas faixas na mesma seção deixariam a coluna visualmente pesada de
 * cima, e o `<h2>` da página inteira já é um por seção.
 */
export function Sobre() {
  const paragrafosDaHistoria = content.sobre.historia.corpo.flatMap((bloco) =>
    bloco.split("\n\n")
  );
  const paragrafosDaEquipe = content.sobre.equipe.corpo.flatMap((bloco) =>
    bloco.split("\n\n")
  );

  return (
    <section
      id="sobre"
      className="bg-papel secao-y scroll-mt-24"
      aria-labelledby="faixa-sobre"
    >
      <div className="container-lp">
        <FaixaRepetida
          id="faixa-sobre"
          texto={content.sobre.historia.titulo}
          palavraItalica={content.sobre.historia.palavraItalica}
          repeticoes={content.sobre.sobreFaixaRepeticoes}
          direcao="direita"
          className="mb-12 md:mb-16"
        />

        {/* Movimento a: Nossa história. Foto à esquerda, 5/12. */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <Image
              src="/images/retrato-sobre.jpg"
              alt={content.sobre.historia.fotoAlt}
              width={1023}
              height={1537}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 42vw, 30vw"
              className="h-auto w-full object-cover [clip-path:url(#crista-vale)]"
            />
          </div>

          <div className="space-y-6 md:col-span-7">
            {paragrafosDaHistoria.map((paragrafo) => (
              <p key={paragrafo} className="body text-tinta medida">
                {paragrafo}
              </p>
            ))}
          </div>
        </div>

        {/* Movimento b: Quem está por trás da Alando. Inverte o lado, e a foto
            encolhe para 4/12: a coluna que sobra é o que impede a seção de ler
            como dois blocos espelhados. */}
        <div className="mt-16 md:mt-24">
          <h3 className="display-md text-ancora mb-8">
            {content.sobre.equipe.titulo}
          </h3>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
            <div className="space-y-6 md:col-span-7">
              {paragrafosDaEquipe.map((paragrafo) => (
                <p key={paragrafo} className="body text-tinta medida">
                  {paragrafo}
                </p>
              ))}
            </div>

            <div className="md:col-span-4 md:col-start-9">
              <Image
                src="/images/servico-gestao.jpg"
                alt={content.sobre.equipe.fotoAlt}
                width={664}
                height={1182}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 34vw, 24vw"
                className="h-auto w-full object-cover [clip-path:url(#crista-serra)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
