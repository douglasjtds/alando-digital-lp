import { content } from "@/config/content";
import { FaixaRepetida } from "@/components/ui/FaixaRepetida";
import { WhatsappCta } from "@/components/ui/WhatsappCta";
import { Revelar } from "@/components/motion/Revelar";
import {
  SequenciaDeQuadros,
  type ControleDaSequencia,
} from "@/components/motion/SequenciaDeQuadros";
import { CampoMarca } from "@/components/ui/CampoMarca";
import { CampoProva } from "@/components/ui/CampoProva";
import { cn } from "@/lib/cn";
import { renderizarProsa } from "@/lib/prosa";

type Servico = (typeof content.servicos)[number];
type TituloDeServico = Servico["titulo"];

/**
 * QUEM AVANÇA CADA SEQUÊNCIA, e é presentation, igual à `APRESENTACAO` abaixo:
 * no `content.ts` vive o que o slot É (os caminhos das fotos), aqui vive como
 * ele se comporta na página.
 *
 * ⚠️ Os dois slots NÃO se comportam igual, e a diferença é a linha que a
 * DESIGN-GUIDELINES.md §8 protege:
 *
 *   Captação          automático   troca sozinho a cada 3,1 s, com botão de pausa
 *   Identidade Visual manual       troca quando a pessoa clica, sem relógio
 *
 * O desvio registrado da §8 é a AUTONOMIA de Captação, e ele se sustenta porque
 * a seção é a que vende imagem em movimento: "não estenda para outro serviço"
 * está escrito lá. Quando o Douglas pediu o mesmo slot em Identidade Visual, em
 * 09/09, a versão autônoma foi apresentada com esse custo na mesa (seria o
 * TERCEIRO desvio, e seria o carrossel de template que a §2.5 veta) e ele
 * escolheu o avanço manual. Clique não é animação, então nada de novo entrou no
 * vocabulário de movimento.
 *
 * ⚠️ A anotação de tipo é `Partial<Record<TituloDeServico, ...>>` de propósito,
 * e não um `satisfies`: com ela, renomear um serviço no `content.ts` quebra ESTA
 * tabela no `typecheck`, em vez de a sequência sumir da página em silêncio.
 * Serviço fora da tabela não ganha sequência nenhuma, mesmo com `foto`
 * preenchida: um modo padrão seria escolher sozinho entre os dois, e um deles é
 * uma decisão de design que não se toma por omissão.
 */
const CONTROLE_DA_SEQUENCIA: Partial<
  Record<TituloDeServico, ControleDaSequencia>
> = {
  "Identidade Visual": {
    modo: "manual",
    rotulos: content.identidadeQuadrosRotulos,
  },
  "Captação e edição de vídeos": {
    modo: "automatico",
    rotulos: content.quadrosRotulos,
  },
};

/**
 * O `sizes` do campo da marca, e ele NÃO é o da coluna: o `.campo-marca > img`
 * ocupa 56% da caixa, então quem pede imagem é a marca, não o slot.
 *
 * Medido na grade de três colunas com `md:gap-8`, mesma disciplina dos `sizes`
 * da `APRESENTACAO`:
 *
 *   até 767px     campo = container, 90vw          56% = 50,4vw   -> 56vw
 *   768 a 1151    campo = (90vw - 32px) / 3        56% de 334px em 1151, 16,3vw
 *                 334px na ponta larga da faixa                   -> 17vw
 *   1152 acima    campo = (1056 - 64) / 3 = 330,7  56% = 185,2px  -> 186px
 *
 * ⚠️ O 767 é inclusivo de propósito, pelo mesmo motivo já registrado no bloco da
 * `APRESENTACAO`: escrito 768, ele casaria com o `md:` do Tailwind e o navegador
 * usaria o valor de empilhado para um slot que já está ao lado do texto.
 */
const SIZES_DO_CAMPO_MARCA =
  "(max-width: 767px) 56vw, (max-width: 1151px) 17vw, 186px";

/**
 * As duas apresentações do campo de prova.
 *
 * Isto é PRESENTATION, e é por isso que não está no `content.ts`: lá vive o que
 * a prova É (caminho do arquivo, `alt`), aqui vive como ela ocupa a página.
 * Largura e altura nativas entram porque são fato do arquivo, e é delas que o
 * `next/image` tira a caixa reservada, o que mantém o CLS em zero.
 *
 * ── A grade lateral, e ela tem DOIS ESTÁGIOS ─────────────────────────────────
 *
 * A partir do `md` (768px) os dois campos ficam AO LADO do texto, e só empilham
 * abaixo disso, em largura de celular. Esse ponto é o mesmo da `foto` de
 * Captação, e igualá-lo foi o pedido do Douglas em 04/09: a seção tinha dois
 * comportamentos de empilhamento para a mesma coisa, e num tablet a foto ficava
 * ao lado enquanto as duas provas caíam para baixo.
 *
 *   768 a 1151   `1fr / 1fr`     meio a meio, as duas iguais
 *   1152 acima   espelhadas      retrato `1fr / 1,4fr`, largo `1,4fr / 1fr`
 *
 * **Por que dois estágios, e não a proporção final desde 768.** Na faixa
 * apertada a divisão assimétrica não cabe: em 768px o `1fr / 1,4fr` deixaria o
 * print com 220 px de conteúdo, ou seja, a interface do Instagram a 0,51x,
 * metade de um celular real. Meio a meio ele fica com 264 px e o texto com cerca
 * de 39 caracteres por linha, que é o único arranjo em que nenhum dos dois
 * inviabiliza o outro. A assimetria entra quando há largura para ela.
 *
 * **Por que 1152 é o degrau, e não outro número.** É onde o `max-w-6xl` para de
 * crescer e o container trava em 1056 px, então a divisão assimétrica sempre
 * renderiza nas mesmas medidas em vez de atravessar uma faixa fluida. Ele é um
 * breakpoint REGISTRADO no `globals.css`, e não um `min-[1152px]:` arbitrário:
 * o porquê está escrito lá, e custou um passe visual.
 *
 * A escolha da coluna ESTREITA para o print é do Douglas, tomada duas vezes com
 * o custo na mesa. Está registrada no bloco grande da prova, mais abaixo.
 *
 * A grade vive AQUI e não no `<article>` pela mesma razão da `classeDaMascara`:
 * o Tailwind varre o código atrás do literal, e um template string não é
 * encontrado. As quatro classes precisam estar escritas por extenso.
 *
 * ── Os `sizes`, medidos e não arredondados ──────────────────────────────────
 *
 * O gap é de 32 px (`md:gap-8`) em toda a faixa lateral, e o container trava em
 * 1056 px (`max-w-6xl` menos os dois paddings de 48) a partir de 1152. O
 * artefato ocupa dentro do campo o que os paddings do `globals.css` deixam: 80%
 * no retrato e 81% no largo.
 *
 *   768 a 1151, meio a meio, cada coluna é (container - 32) / 2
 *     retrato   768: 330 → 264 px (34,3vw)   1151: 512 → 409 px (35,6vw)
 *     largo     768: 330 → 267 px (34,8vw)   1151: 512 → 414 px (36,0vw)
 *
 *   O `sizes` da faixa é o TETO dela arredondado para cima, 36vw e 37vw, e não a
 *   média: um `sizes` menor que a necessidade real faz o navegador escolher o
 *   candidato de baixo e a imagem sai borrada, sem erro nenhum. Medido nas duas
 *   pontas da faixa, e o 1151 é quem manda porque é onde ela é mais larga.
 *
 *   1152 acima, colunas fixas porque o container está travado
 *     retrato   coluna de 1fr, 427 px
 *               427 × 0,80 = 342 px   fonte 1290   densidade 3,77x
 *     largo     coluna de 1,4fr, 597 px
 *               597 × 0,81 = 484 px   fonte 964   densidade 1,99x
 *
 * Em mobile os dois campos são 100% do container, que é 90vw (100 menos
 * os dois 5vw do `container-lp`), então o artefato dá 72vw e 73vw.
 *
 * ⚠️ A primeira cláusula é `max-width: 767px`, e o 767 não é engano de digitação:
 * `max-width` é INCLUSIVO e o `md:` do Tailwind é `min-width: 768px`, também
 * inclusivo. Escrito `768`, os dois casam em 768 exatos, e ali o navegador usava
 * o valor de empilhado (72vw) para um slot que já estava lado a lado: baixava o
 * candidato de 640 para 264 px de caixa. Pego no painel de rede, não no olho.
 *
 * ⚠️ Em 1151 o print sai a 409 px e em 1152 ele ENCOLHE para 342. É o preço de
 * combinar meio a meio embaixo com coluna estreita em cima, e está reportado ao
 * Douglas com o número medido. Não é bug: é a decisão 1 encontrando a decisão 2.
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
    grade: "md:grid-cols-2 largo:grid-cols-[1fr_1.4fr]",
    sizes: "(max-width: 767px) 72vw, (max-width: 1151px) 36vw, 342px",
  },
  largo: {
    largura: 964,
    altura: 600,
    classeDaMascara: "[clip-path:url(#crista-vale)]",
    moldura: "campo-prova-largo",
    grade: "md:grid-cols-2 largo:grid-cols-[1.4fr_1fr]",
    sizes: "(max-width: 767px) 73vw, (max-width: 1151px) 37vw, 484px",
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
                    {renderizarProsa(paragrafo)}
                  </p>
                ))}
              </div>
              {/* O fechamento do bloco dominante vai em `body-lg`, e não no
                  `caption` dos outros quatro: aqui a frase é ênfase do próprio
                  argumento, não etiqueta de rodapé, então muda o peso e não o
                  tamanho de leitura. */}
              {servicoDestaque.fechamento && (
                <p className="body-lg text-ancora medida mt-6 font-semibold">
                  {renderizarProsa(servicoDestaque.fechamento)}
                </p>
              )}
            </Revelar>
          )}

          {/* Os quatro em órbita: alternam de lado e em larguras desiguais.

              ⚠️ DESDE 09/09 OS QUATRO TÊM MÍDIA, e isso contraria a §5.5, que
              pede "foto em alguns, não em todos, a lacuna quebra o ritmo de
              grade". É decisão do Douglas, tomada com o custo na mesa, e fica
              escrita porque é onde mora o clichê nº 2 do `CLAUDE.md`.

              Duas coisas seguram a seção, e nenhuma anula o custo. A lacuna não
              sumiu, ela mudou de lugar: o bloco DOMINANTE, que é o maior da
              seção, continua sem imagem nenhuma. E as quatro mídias se
              renderizam de quatro jeitos, campo da marca, print emoldurado,
              sequência com pilha e vídeo, então não é uma coluna de imagem
              repetida quatro vezes. Se em 390px a seção passar a ler como grade,
              quem sai é a mídia de Identidade Visual, não a hierarquia.

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

              /* O slot estreito ao lado do texto, e ele tem TRÊS estados: a
                 sequência quando as fotos existem, o campo da marca enquanto
                 elas não foram escolhidas, e nada quando o serviço não tem slot
                 nenhum. Quem decide é a presença dos campos no `content.ts`. */
              const controle = CONTROLE_DA_SEQUENCIA[servico.titulo];
              const temSequencia = Boolean(servico.foto && controle);
              const temSlotEstreito =
                temSequencia || Boolean(servico.fotoPendencia);

              return (
                <article
                  key={servico.titulo}
                  /* A grade base é EXCLUSIVA, e não sobreposta: com prova, o
                     `md:grid-cols-3` não é emitido, em vez de ser vencido pelo
                     `md:grid-cols-2` da apresentação. O `cn` é `twMerge` e
                     resolveria o conflito, mas confiar nisso para o layout é
                     implícito demais num arquivo que já registra uma falha
                     silenciosa de ordenação do Tailwind (ver `globals.css`). */
                  className={cn(
                    "grid grid-cols-1 items-start gap-6 md:gap-8",
                    apresentacao ? apresentacao.grade : "md:grid-cols-3",
                  )}
                >
                  <div
                    className={
                      /* Com prova a grade tem duas colunas nos dois estágios, e
                         o texto fica sempre na segunda: as duas provas são
                         índice ímpar, então `textoNaEsquerda` é falso nas duas e
                         a regra do lado oposto já as manda para a esquerda. */
                      apresentacao
                        ? "md:col-start-2 md:row-start-1"
                        : textoNaEsquerda
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
                          {renderizarProsa(paragrafo)}
                        </p>
                      ))}
                    </div>
                    {servico.fechamento && (
                      <p className="caption text-tinta-suave medida mt-4 font-semibold">
                        {renderizarProsa(servico.fechamento)}
                      </p>
                    )}
                  </div>

                  {/* O SLOT ESTREITO ocupa a coluna que o texto deixou, do lado
                      oposto a ele, e desde 09/09 ele existe em DOIS serviços.

                      "Identidade Visual" é o índice 0 dos quatro em órbita e
                      "Captação" é o 2, os dois pares, então nos dois o texto
                      está à esquerda e a mídia cai à DIREITA. As duas provas são
                      ímpares e caem à esquerda, e é isso que mantém a seção
                      alternando em diagonal: direita, esquerda, direita,
                      esquerda. Nenhuma classe de posicionamento mudou.

                      A máscara da sequência é a `crista-faixa` e a do campo da
                      marca é a `crista-serra`, as duas dentro dos respectivos
                      componentes. ⚠️ A `crista-serra` passa a aparecer duas
                      vezes na página (aqui e no `Sobre`), e é a única forma
                      repetida: são quatro máscaras para cinco slots, e a
                      repetição cai nos dois SLOTS VAGOS, onde ela lê como uma
                      convenção só em vez de duas improvisações. O registro está
                      no `CampoMarca.tsx`.

                      Desde 02/09 o slot é uma SEQUÊNCIA de quadros, não uma foto
                      só. O `clip-path` e o `foto-textura` mudaram de arquivo e
                      não de valor: eles moram dentro do `SequenciaDeQuadros`
                      porque é lá que os quadros precisam ser filhos DIRETOS do
                      wrapper, que é o que mantém o parallax vivo. O componente
                      atende os dois casos, e um serviço sem `quadros` continua
                      renderizando uma imagem estática só. */}
                  {temSlotEstreito && (
                    <div
                      className={
                        textoNaEsquerda
                          ? "md:col-start-3 md:row-start-1"
                          : "md:col-start-1 md:row-start-1"
                      }
                    >
                      {temSequencia && controle ? (
                        <SequenciaDeQuadros
                          foto={servico.foto}
                          fotoAlt={servico.fotoAlt}
                          quadros={servico.quadros}
                          /* 24vw, medido: a coluna dá 331 CSS px em 1440, e 30vw
                             pedia o candidato de 432 sem precisar. */
                          sizes="(max-width: 768px) 100vw, 24vw"
                          controle={controle}
                        />
                      ) : (
                        /* O SLOT VAGO, ocupado pela marca até as fotos serem
                           escolhidas. Mesmo tratamento de "Nossa história" no
                           `Sobre`, a pedido do Douglas em 09/09, e o marcador
                           embaixo é a regra 1 do `CLAUDE.md`: placeholder sem
                           marcador chega em produção sem ninguém notar.

                           Quando as fotos chegarem, nada muda aqui: preencher
                           `foto`, `fotoAlt` e `quadros` no `content.ts` e
                           esvaziar `fotoPendencia` faz este mesmo slot virar a
                           sequência, na mesma coluna e do mesmo lado. */
                        <CampoMarca
                          pendencia={servico.fotoPendencia}
                          sizes={SIZES_DO_CAMPO_MARCA}
                        />
                      )}
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

                      A prova se desloca para o lado OPOSTO ao do texto, mesma regra
                      da `foto`, e as duas caem à esquerda porque são índice ímpar.

                      ⚠️ **O argumento que já valeu aqui e não vale mais**, porque ele
                      é a razão de tudo que veio depois: até 04/09 a prova ocupava a
                      LINHA inteira abaixo do texto, a 76% do container, e o motivo era
                      que o print de 1290 px encolhido para uma coluna vira borrão
                      justamente nos destaques e nas legendas, que são o que a imagem
                      existe para mostrar. Em linha inteira ele saía a 642 px. Esse
                      argumento perdeu duas vezes seguidas para decisões do Douglas,
                      as duas tomadas com o custo medido na mesa, e o registro delas
                      está no bloco abaixo. Ele fica escrito porque quem for reabrir o
                      assunto precisa saber o que foi trocado por quê.

                      Sem `foto-textura`: o parallax cortaria o print. Ver o aviso no
                      fim do bloco do `campo-prova` no `globals.css`.

                      Desde 03/09 o slot atende DOIS artefatos, e quem escolhe
                      entre eles é a presença de `prova.video`. As duas
                      apresentações estão em `APRESENTACAO`, no topo do arquivo.
                      O comportamento (interseção, autoplay, botão, movimento
                      reduzido) mora no `CampoProva`.

                      ── E desde 04/09 AS DUAS PROVAS EMPILHAM SÓ NO CELULAR ─────

                      A partir de 768px a prova deixa a linha de baixo e vira uma das
                      duas colunas de um grid, com o texto na outra. Abaixo disso ela
                      empilha, e é a única faixa em que isso acontece.

                      **O ponto é 768 porque é o da `foto` de Captação**, e igualá-lo
                      foi o pedido do Douglas: a seção tinha DOIS comportamentos de
                      empilhamento para a mesma coisa, e num tablet a foto ficava ao
                      lado do texto enquanto as duas provas caíam para baixo. A `foto`
                      é quem estava certa e por isso ela não mudou nada; o que estava
                      errado era o breakpoint das provas, não a proporção delas.

                      Quem liga isso é a presença de `prova.imagem`, e quem escolhe a
                      divisão é a `APRESENTACAO`, no topo do arquivo, onde os dois
                      estágios e as contas dos dois estão escritos. Em resumo:

                        768 a 1151   `1fr / 1fr`   meio a meio, as duas iguais
                        1152 acima   espelhadas, porque um é deitado e o outro em pé
                                     vídeo   `1,4fr / 1fr`   597 de coluna, texto 427
                                     print   `1fr / 1,4fr`   427 de coluna, texto 597

                      A assimetria não desce até 768 porque ali ela não cabe: o
                      `1fr / 1,4fr` deixaria o print com 220 px, ou seja, o Instagram a
                      0,51x. E ela começa em 1152 porque é onde o container para de
                      crescer, então a divisão assimétrica sempre renderiza nas mesmas
                      medidas em vez de atravessar uma faixa fluida apertando coluna.

                      **O vídeo na coluna larga**, acima de 1152, e a conta melhora:
                      os 597 deixam 484 px de conteúdo (81%, o padding do
                      `.campo-prova-largo`), e o arquivo de 964 sai a 1,99x, ACIMA dos
                      1,48x que ele tinha na linha inteira. O campo perde tamanho de
                      tela e ganha nitidez. A coluna do texto dá de 39 a 51 caracteres
                      por linha, medido linha a linha, abaixo dos 60-72 que a §4 mira. É
                      deliberado: o checklist proíbe passar de 72, e coluna curta ao
                      lado de imagem é composição editorial, não erro de medida.

                      **O print na coluna estreita, e aqui a conta PIORA de propósito.**
                      Escolha do Douglas em 04/09, tomada com o custo na mesa, e ela
                      fica escrita porque contraria o argumento registrado lá em cima.
                      Os 427 px deixam 342 px de conteúdo (80%, o padding do
                      `.campo-prova`). Densidade sobre o arquivo sobra, 3,77x de 1290,
                      mas densidade não é o que está em jogo num artefato: o print é a
                      captura de uma tela de 430 px lógicos, então em 342 px a interface
                      do Instagram renderiza a **0,80x**, ou seja, MENOR do que num
                      celular real. Na linha inteira ela saía a 1,49x. Medido no
                      navegador em 1440px: os nomes dos destaques e a consistência do
                      feed, que são o que o `alt` afirma, continuam legíveis a 1x; as
                      legendas DENTRO de cada post não.

                      O que se compra em troca: a coluna do texto vai a 597 px, e as
                      linhas caem para 66-75 caracteres, contra até 79 nos blocos sem
                      prova (contado linha a linha por `Range`, não estimado por `ch`).
                      E as alturas passam a casar, 520 px de campo contra 336 de texto.

                      ⚠️ Os 75 ainda passam dos 72 da §4, e isso é PRÉ-EXISTENTE e da
                      seção inteira, não desta mudança: o `medida` é `62ch`, e em
                      Montserrat 1ch é 10,6 px, então 62ch dá 657 px e rende até 79
                      caracteres. Os blocos com prova são os que mais se aproximam da
                      regra, porque a coluna os corta antes do `62ch`.

                      As duas provas ficam à ESQUERDA porque a regra do lado oposto não
                      mudou: "Estruturação de Perfil" é o índice 1 e "Landing Pages" o
                      índice 3 dos quatro em órbita, os dois ímpares, então nos dois o
                      texto está à direita. Entre eles fica "Captação", índice 2, com a
                      foto à direita, e é isso que mantém a seção alternando em diagonal
                      em vez de encostar as duas provas na mesma borda. E a ordem no DOM
                      continua texto e depois prova, que é o que o leitor de tela ouve. */}
                  {apresentacao && (
                    <div className="w-full md:col-start-1 md:row-start-1">
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
                {renderizarProsa(paragrafo, "escuro")}
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
