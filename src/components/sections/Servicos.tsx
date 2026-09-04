import { content } from "@/config/content";
import { FaixaRepetida } from "@/components/ui/FaixaRepetida";
import { WhatsappCta } from "@/components/ui/WhatsappCta";
import { Revelar } from "@/components/motion/Revelar";
import { SequenciaDeQuadros } from "@/components/motion/SequenciaDeQuadros";
import { CampoProva } from "@/components/ui/CampoProva";

type Servico = (typeof content.servicos)[number];

/**
 * As duas apresentações do campo de prova.
 *
 * Isto é PRESENTATION, e é por isso que não está no `content.ts`: lá vive o que
 * a prova É (caminho do arquivo, `alt`), aqui vive como ela ocupa a página.
 * Largura e altura nativas entram porque são fato do arquivo, e é delas que o
 * `next/image` tira a caixa reservada, o que mantém o CLS em zero.
 *
 * ── Os `sizes`, medidos e não arredondados ──────────────────────────────────
 *
 * O container trava em 1056 px (`max-w-6xl` menos os dois paddings de 48), o
 * campo é 76% dele (802,6 px) e o artefato ocupa dentro do campo o que os
 * paddings do `globals.css` deixam: 80% no retrato e 81% no largo.
 *
 *   retrato   802,6 × 0,80 = 642 px   fonte 1290   densidade 2,01x
 *   largo     802,6 × 0,81 = 650 px   fonte  964   densidade 1,48x
 *
 * Em mobile o campo é 100% do container, que é 90vw (100 menos os dois 5vw do
 * `container-lp`), então o artefato dá 72vw e 73vw respectivamente.
 *
 * A densidade menor do largo é decisão medida, não descuido: 1284 de largura
 * não coube no orçamento de 400 KB em nenhum degrau de qualidade. A conta está
 * no cabeçalho do `scripts/gravar-landing.mjs`.
 *
 * ⚠️ `classeDaMascara` guarda a CLASSE INTEIRA e não o `id`, e é aqui que ela
 * precisa estar escrita por extenso: o Tailwind gera classe arbitrária varrendo o
 * código atrás do literal, e um `[clip-path:url(#${id})]` montado por template
 * string não é encontrado. A regra some do CSS sem erro nenhum, e a máscara
 * simplesmente não aplica. O porquê está no `CampoProva`.
 */
const APRESENTACAO = {
  retrato: {
    largura: 1290,
    altura: 1644,
    classeDaMascara: "[clip-path:url(#crista-retrato)]",
    moldura: "campo-prova",
    sizes: "(max-width: 768px) 72vw, (max-width: 1248px) 55vw, 642px",
  },
  largo: {
    largura: 964,
    altura: 600,
    classeDaMascara: "[clip-path:url(#crista-vale)]",
    moldura: "campo-prova-largo",
    sizes: "(max-width: 768px) 73vw, (max-width: 1248px) 55vw, 650px",
  },
} as const;

export function Servicos() {
  const servicoDestaque = content.servicos.find((s) => s.destaque);
  const servicosNormais = content.servicos.filter(
    (s) => !s.destaque,
  ) as readonly Servico[];

  return (
    <section
      id="servicos"
      className="bg-papel secao-y scroll-mt-24"
      aria-labelledby="faixa-servicos"
    >
      <div className="container-lp">
        <Revelar className="mb-12 md:mb-16">
          <FaixaRepetida
            id="faixa-servicos"
            texto={content.servicosTitulo}
            repeticoes={content.servicosFaixaRepeticoes}
            direcao="direita"
          />
        </Revelar>

        <div className="mb-16 space-y-12 md:space-y-16">
          {/* Bloco dominante: Gestão de Redes Sociais. A copy diz que é "o
              coração da Alando", então ele leva largura cheia, o texto mais
              longo e a única superfície colorida da seção. */}
          {servicoDestaque && (
            <Revelar
              as="article"
              className="bg-superficie-2 border-decor border p-8 md:p-12"
            >
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
              {/* O fechamento do bloco dominante vai em `body-lg`, e não no
                  `caption` dos outros quatro: aqui a frase é ênfase do próprio
                  argumento, não etiqueta de rodapé, então muda o peso e não o
                  tamanho de leitura. */}
              {servicoDestaque.fechamento && (
                <p className="body-lg text-ancora medida mt-6 font-semibold">
                  {servicoDestaque.fechamento}
                </p>
              )}
            </Revelar>
          )}

          {/* Os quatro em órbita: alternam de lado, larguras desiguais, e só um
              deles tem foto. A lacuna é o que impede a leitura em grade.

              A lista é mais alta que uma tela, então cada bloco abre quando
              chega a sua vez, em vez de os quatro escalonarem de uma vez com os
              dois últimos abrindo longe da viewport. Quem decide isso é o
              próprio `Revelar`, pela altura medida. */}
          <Revelar como="lista" className="space-y-8 md:space-y-12">
            {servicosNormais.map((servico, idx) => {
              const textoNaEsquerda = idx % 2 === 0;

              return (
                <article
                  key={servico.titulo}
                  className="grid grid-cols-1 items-start gap-6 md:grid-cols-3 md:gap-8"
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
                      <p className="caption text-tinta-suave medida mt-4 font-semibold">
                        {servico.fechamento}
                      </p>
                    )}
                  </div>

                  {/* A foto ocupa a coluna que o texto deixou, do lado oposto a
                      ele. `crista-faixa` é a quarta máscara e a única ainda não
                      usada na página: o herói tem `crista-retrato` e o `Sobre`
                      tem `crista-vale` e `crista-serra`.

                      Desde 02/09 o slot é uma SEQUÊNCIA de quadros, não uma foto
                      só. O `clip-path` e o `foto-textura` mudaram de arquivo e
                      não de valor: eles moram dentro do `SequenciaDeQuadros`
                      porque é lá que os quadros precisam ser filhos DIRETOS do
                      wrapper, que é o que mantém o parallax vivo. O componente
                      atende os dois casos, e um serviço sem `quadros` continua
                      renderizando uma imagem estática só. */}
                  {servico.foto && (
                    <div
                      className={
                        textoNaEsquerda
                          ? "md:col-start-3 md:row-start-1"
                          : "md:col-start-1 md:row-start-1"
                      }
                    >
                      <SequenciaDeQuadros
                        foto={servico.foto}
                        fotoAlt={servico.fotoAlt}
                        quadros={servico.quadros}
                        /* 24vw, medido: a coluna dá 331 CSS px em 1440, e 30vw
                           pedia o candidato de 432 sem precisar. */
                        sizes="(max-width: 768px) 100vw, 24vw"
                        rotulos={content.quadrosRotulos}
                      />
                    </div>
                  )}

                  {/* A PROVA, e ela se renderiza diferente da `foto` de propósito.

                      A §5.5 da estrutura já apontava para cá por nome ("o material
                      de drive-files vai anexado ao serviço que ele comprova"), e o
                      que ela pede é evidência ao lado da afirmação. Só que este
                      print é ARTEFATO, não fotografia: cada aresta dele carrega
                      conteúdo, então ele não pode sangrar até a borda da máscara
                      como as fotos fazem. O `campo-prova` inverte o papel, a máscara
                      emoldura em vez de recortar, e os quatro paddings medidos estão
                      no `globals.css`.

                      Duas consequências de layout:

                      1. Ele ocupa a LINHA inteira e não uma coluna. A coluna estreita
                         dá 331 CSS px, e o print de 1290 encolhido para lá vira
                         borrão justamente nos destaques e nas legendas, que são o
                         que a imagem existe para mostrar. Em 76% do container ele sai
                         a 642 px, ou seja, 2,01x de densidade.
                      2. Ele se desloca para o lado OPOSTO ao do texto, mesma regra da
                         `foto`. Com o texto no alto de um lado e o print embaixo do
                         outro, o bloco lê como diagonal e não como pilha, que é o que
                         o separa visualmente do serviço de vídeo logo abaixo.

                      Sem `foto-textura`: o parallax cortaria o print. Ver o aviso no
                      fim do bloco do `campo-prova` no `globals.css`.

                      Desde 03/09 o slot atende DOIS artefatos, e quem escolhe
                      entre eles é a presença de `prova.video`. As duas
                      apresentações estão em `APRESENTACAO`, no topo do arquivo.
                      O comportamento (interseção, autoplay, botão, movimento
                      reduzido) mora no `CampoProva`. */}
                  {servico.prova.imagem && (
                    <div
                      className={
                        textoNaEsquerda
                          ? "w-full md:col-span-3 md:row-start-2 md:ml-auto md:w-[76%]"
                          : "w-full md:col-span-3 md:row-start-2 md:mr-auto md:w-[76%]"
                      }
                    >
                      <CampoProva
                        imagem={servico.prova.imagem}
                        video={servico.prova.video}
                        alt={servico.prova.alt}
                        rotulos={content.provaRotulos}
                        {...(servico.prova.video
                          ? APRESENTACAO.largo
                          : APRESENTACAO.retrato)}
                      />
                    </div>
                  )}
                </article>
              );
            })}
          </Revelar>
        </div>

        {/* Fechamento: é o diferencial, e é onde a tese volta. */}
        <Revelar className="bg-ancora-quente border-decor border p-8 md:p-12">
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
        </Revelar>

        {/* O CTA da seção, que a Fase 5B não montou: `content.servicosCTA` e a
            mensagem de origem `servicos` já existiam desde a Fase 4, sem
            ninguém consumindo. */}
        <Revelar className="mt-12">
          <WhatsappCta
            origem="servicos"
            label={content.servicosCTA}
            variante="primario"
          />
        </Revelar>
      </div>
    </section>
  );
}
