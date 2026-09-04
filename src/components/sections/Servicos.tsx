import { content } from "@/config/content";
import { FaixaRepetida } from "@/components/ui/FaixaRepetida";
import { WhatsappCta } from "@/components/ui/WhatsappCta";
import { Revelar } from "@/components/motion/Revelar";
import { SequenciaDeQuadros } from "@/components/motion/SequenciaDeQuadros";
import { CampoProva } from "@/components/ui/CampoProva";
import { cn } from "@/lib/cn";

type Servico = (typeof content.servicos)[number];

/**
 * As duas apresentações do campo de prova.
 *
 * Isto é PRESENTATION, e é por isso que não está no `content.ts`: lá vive o que
 * a prova É (caminho do arquivo, `alt`), aqui vive como ela ocupa a página.
 * Largura e altura nativas entram porque são fato do arquivo, e é delas que o
 * `next/image` tira a caixa reservada, o que mantém o CLS em zero.
 *
 * ── A grade lateral, e por que ela é espelhada ───────────────────────────────
 *
 * Acima do breakpoint `largo` os dois campos ficam AO LADO do texto, e cada um
 * pede uma divisão diferente, porque um é deitado e o outro é em pé:
 *
 *   retrato   `1fr / 1,4fr`   print na coluna ESTREITA, texto na larga
 *   largo     `1,4fr / 1fr`   vídeo na coluna LARGA, texto na estreita
 *
 * O vídeo entrou nisso em 04/09, o print no mesmo dia, algumas horas depois, e a
 * escolha da coluna estreita para ele é do Douglas, tomada com o custo na mesa.
 * Ele está registrado no bloco grande da prova, mais abaixo.
 *
 * A grade vive AQUI e não no `<article>` pela mesma razão da `classeDaMascara`:
 * o Tailwind varre o código atrás do literal, e um template string não é
 * encontrado. As duas classes precisam estar escritas por extenso.
 *
 * ── Os `sizes`, medidos e não arredondados ──────────────────────────────────
 *
 * O container trava em 1056 px (`max-w-6xl` menos os dois paddings de 48) e o
 * gap é de 32 px (`md:gap-8`), então as colunas dividem 1024 px. O artefato ocupa
 * dentro do campo o que os paddings do `globals.css` deixam: 80% no retrato e 81%
 * no largo.
 *
 *   retrato   coluna lateral de 1fr, 427 px
 *             427 × 0,80 = 342 px   fonte 1290   densidade 3,77x
 *   largo     coluna lateral de 1,4fr, 597 px
 *             597 × 0,81 = 484 px   fonte 964   densidade 1,99x
 *
 * Entre 768 e 1151 os dois ainda são a linha inteira a 76%, que é a caixa antiga,
 * e é de onde vem o degrau de 55vw nos dois. Em mobile os dois campos são 100% do
 * container, que é 90vw (100 menos os dois 5vw do `container-lp`), então o
 * artefato dá 72vw e 73vw respectivamente.
 *
 * ⚠️ O `sizes` do largo governa só o `<Image>`, ou seja, o caso
 * `prefers-reduced-motion`: o `<video>` aponta o `poster=` para o JPEG cru, sem
 * `srcset`. É justamente o caso que não pode baixar o candidato errado, porque é
 * ele que fica na tela.
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
    grade: "largo:grid-cols-[1fr_1.4fr]",
    sizes: "(max-width: 768px) 72vw, (max-width: 1151px) 55vw, 342px",
  },
  largo: {
    largura: 964,
    altura: 600,
    classeDaMascara: "[clip-path:url(#crista-vale)]",
    moldura: "campo-prova-largo",
    grade: "largo:grid-cols-[1.4fr_1fr]",
    sizes: "(max-width: 768px) 73vw, (max-width: 1151px) 55vw, 484px",
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
              /* Qual das duas apresentações a prova deste serviço usa, e é ela
                 que carrega a grade lateral. Serviço sem prova não tem nenhuma,
                 e aí a grade de três colunas do `md` vale até o fim. */
              const apresentacao = servico.prova.imagem
                ? servico.prova.video
                  ? APRESENTACAO.largo
                  : APRESENTACAO.retrato
                : null;

              return (
                <article
                  key={servico.titulo}
                  className={cn(
                    "grid grid-cols-1 items-start gap-6 md:grid-cols-3 md:gap-8",
                    apresentacao?.grade,
                  )}
                >
                  <div
                    className={cn(
                      textoNaEsquerda
                        ? "md:col-span-2 md:col-start-1"
                        : "md:col-span-2 md:col-start-2",
                      apresentacao &&
                        "largo:col-span-1 largo:col-start-2 largo:row-start-1",
                    )}
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

                      Duas consequências de layout, e a primeira vale de 768 a 1151
                      px, porque acima disso o print também vai para o lado (ver o
                      bloco de 04/09 mais abaixo):

                      1. Ele ocupa a LINHA inteira e não uma das três colunas do `md`.
                         A coluna estreita de lá dá 331 CSS px, e o print de 1290
                         encolhido para ali vira borrão justamente nos destaques e nas
                         legendas, que são o que a imagem existe para mostrar. Em 76%
                         do container ele sai a 642 px, ou seja, 2,01x de densidade.
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
                      reduzido) mora no `CampoProva`.

                      ── E desde 04/09 AS DUAS PROVAS VÃO PARA O LADO ────────────

                      Acima de 1152px a prova deixa a linha de baixo e vira uma das duas
                      colunas de um grid, com o texto na outra. Quem liga isso é a
                      presença de `prova.imagem`, e quem escolhe a divisão é a
                      `APRESENTACAO`, no topo do arquivo. **As duas grades são
                      espelhadas**, porque um artefato é deitado e o outro é em pé:

                        vídeo   `1,4fr / 1fr`   597 px de coluna, texto em 427
                        print   `1fr / 1,4fr`   427 px de coluna, texto em 597

                      O ponto de virada é o mesmo, e é uma medida e não um gosto: **o
                      breakpoint `largo`, 1152px, e não `lg`.** É exatamente onde o
                      `max-w-6xl` para de crescer e o container trava em 1056 px de
                      conteúdo, então a divisão lateral sempre renderiza nas mesmas
                      medidas. Em 1024px o container ainda tem 928, e a coluna estreita
                      cairia para 374 px. Ele é um breakpoint REGISTRADO no
                      `globals.css`, e não um `min-[1152px]:` arbitrário: o porquê está
                      escrito lá, e custou um passe visual.

                      **O vídeo na coluna larga**, e a conta melhora: os 597 deixam
                      484 px de conteúdo (81%, o padding do `.campo-prova-largo`), e o
                      arquivo de 964 sai a 1,99x, ACIMA dos 1,48x que ele tinha na linha
                      inteira. O campo perde tamanho de tela e ganha nitidez. A coluna
                      do texto dá de 39 a 51 caracteres por linha, medido linha a linha,
                      abaixo dos 60-72 que a §4 mira. É deliberado: o checklist proíbe
                      passar de 72, e coluna curta ao lado de imagem é composição
                      editorial, não erro de medida.

                      **O print na coluna estreita, e aqui a conta PIORA de propósito.**
                      Escolha do Douglas em 04/09, tomada com o custo na mesa, e ela
                      fica escrita porque contraria o argumento 1 lá em cima. Os 427 px
                      deixam 342 px de conteúdo (80%, o padding do `.campo-prova`).
                      Densidade sobre o arquivo sobra, 3,77x de 1290, mas densidade não
                      é o que está em jogo num artefato: o print é a captura de uma tela
                      de 430 px lógicos, então em 342 px a interface do Instagram
                      renderiza a **0,80x**, ou seja, MENOR do que num celular real. Na
                      linha inteira ela saía a 1,49x. Medido no navegador em 1440px:
                      os nomes dos destaques e a consistência do feed, que são o que o
                      `alt` afirma, continuam legíveis a 1x; as legendas DENTRO de cada
                      post não. O que se compra em troca: a coluna do texto vai a 597 px,
                      e as linhas caem para 66-75 caracteres, contra até 79 nos blocos
                      que seguem em linha inteira (contado linha a linha por `Range`, não
                      estimado por `ch`). E as alturas passam a casar, 520 px de campo
                      contra 336 de texto, em vez de o bloco medir 1318 px empilhado.

                      ⚠️ Os 75 ainda passam dos 72 da §4, e isso é PRÉ-EXISTENTE e da
                      seção inteira, não desta mudança: o `medida` é `62ch`, e em
                      Montserrat 1ch é 10,6 px, então 62ch dá 657 px e rende até 79
                      caracteres. Este bloco é o que mais se aproximou da regra.

                      As duas provas ficam à ESQUERDA porque a regra do lado oposto não
                      mudou: "Estruturação de Perfil" é o índice 1 e "Landing Pages" o
                      índice 3 dos quatro em órbita, os dois ímpares, então nos dois o
                      texto está à direita. Entre eles fica "Captação", índice 2, com a
                      foto à direita, e é isso que mantém a seção alternando em diagonal
                      em vez de encostar as duas provas na mesma borda. E a ordem no DOM
                      continua texto e depois prova, que é o que o leitor de tela ouve. */}
                  {apresentacao && (
                    <div
                      className={cn(
                        textoNaEsquerda
                          ? "w-full md:col-span-3 md:row-start-2 md:ml-auto md:w-[76%]"
                          : "w-full md:col-span-3 md:row-start-2 md:mr-auto md:w-[76%]",
                        "largo:col-span-1 largo:col-start-1 largo:row-start-1 largo:mx-0 largo:w-full",
                      )}
                    >
                      {/* Prop a prop, e não `{...apresentacao}`: a `grade` mora no
                          mesmo objeto e é do `<article>`, não do campo. */}
                      <CampoProva
                        imagem={servico.prova.imagem}
                        video={servico.prova.video}
                        alt={servico.prova.alt}
                        rotulos={content.provaRotulos}
                        largura={apresentacao.largura}
                        altura={apresentacao.altura}
                        classeDaMascara={apresentacao.classeDaMascara}
                        moldura={apresentacao.moldura}
                        sizes={apresentacao.sizes}
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
