/**
 * Fonte de verdade de TODA a copy da página.
 *
 * ⚠️ Nenhuma palavra alterada sem aprovação. Nenhum dado inventado. Onde faltar
 * dado, usar <<A CONFIRMAR: descrição>> literal, que aparece na página e ativa
 * o marcador visual de pendência.
 *
 * Original em `ref-files/Landing Page copy.md`. Estrutura de seções em
 * `instructions/landing-page-structure.md` §5. Regras de voz em
 * `instructions/DESIGN-GUIDELINES.md` §11. Nenhum travessão longo em lugar
 * nenhum: preferir vírgula, dois-pontos, parênteses, ponto e vírgula ou duas
 * frases.
 *
 * Excepção autorizada (29/07): em `sobre.historia`, a linha final troca
 * "cuidamos" por "criamos", porque a frase cita o slogan explicitamente.
 * Nenhuma outra ocorrência de "cuidar" muda. Registrado em
 * `landing-page-structure.md` §5.8.
 *
 * A cidade NÃO é escrita aqui: ela vem de `brand.local`, porque aparece também no
 * `title`, na `description` e no `PostalAddress` do JSON-LD, que não são copy.
 * Ver o comentário de `local` em `brand.ts`.
 */

import { local } from "./brand";

export const content = {
  /**
   * O texto que aparece FORA da página: aba do navegador, resultado de busca,
   * card de link no WhatsApp e no Instagram, e o `description` do JSON-LD.
   *
   * Mora aqui e não no `layout.tsx` pelo mesmo motivo de todo o resto: é texto na
   * tela de alguém, e a fronteira white-label diz que texto vive no `content.ts`.
   *
   * ⚠️ NÃO SAIU DIRETO DO `Landing Page copy.md`, e por isso vai para o bloco de
   * aprovação do Douglas. As duas metades são palavras dela, mas a junção é
   * minha:
   *
   * - `descricao` começa na linha da capa do deck ("Estratégia, posicionamento e
   *   comunicação para marcas que desejam ser lembradas") e termina no slogan
   *   confirmado, mais a cidade. 158 caracteres, dentro da faixa de 150-160.
   * - `titulo` tem 52 caracteres, teto de 60.
   *
   * ⚠️ A cidade entra por interpolação, e o marcador NÃO entra aqui mesmo quando
   * ela estiver pendente. Decisão do Douglas em 02/08: `title` e `og:title` são
   * consumidos por máquina e pelo card de link, mesma natureza do JSON-LD, onde a
   * regra assimétrica já manda omitir. O marcador continua visível no corpo.
   *
   * `ogAlt` é `alt` de imagem, obrigação de acessibilidade, não copy da cliente.
   */
  seo: {
    titulo: `Alando Digital, Branding e comunicação em ${local.cidade}`,
    descricao: `Estratégia, posicionamento e comunicação para marcas que desejam ser lembradas. A Alando Digital cria e gerencia marcas de forma artesanal, em ${local.cidadeUf}.`,
    /** O `description` do nó `Organization`. É a bio da marca, literal. */
    bio: "Estratégia, posicionamento e comunicação para marcas que desejam ser lembradas.",
    ogAlt: "Alando Digital, criando e gerenciando marcas de forma artesanal.",
  },

  header: {
    pularParaConteudo: "Pular para o conteúdo",
    nav: {
      servicos: "Serviços",
      processo: "Processo",
      sobre: "Sobre",
      duvidas: "Dúvidas",
    },
  },

  hero: {
    eyebrow: `Branding e comunicação · ${local.cidadeUf}`,
    h1: "Criando e gerenciando marcas de forma artesanal.",
    h1PalavraItalica: "artesanal",
    subtitulo:
      "Porque nenhuma marca deveria ser tratada como só mais um cliente.",
    ctaLabel: "Quero conversar com a Alando",
    /**
     * ⚠️ Trocado em 26/08 junto com a foto do herói, que deixou de ser o retrato
     * da Andressa e passou a ser o bastidor da captação. `alt` é obrigação de
     * acessibilidade, não copy da cliente: mesma convenção do `seo.ogAlt`.
     */
    fotoAlt:
      "Mão segurando um celular na tela de publicação de story do Instagram, com um notebook exibindo a paleta de cores da marca ao fundo.",
  },

  /**
   * Marcas que confiam em nós. Nasce desligada porque não há logos de clientes
   * autorizados em SVG. Ver landing-page-structure.md §5.2 e AUDITORIA-FASE-0.md
   * §5 para contexto completo.
   */
  faixaClientes: {
    exibir: false,
    titulo: "Marcas que confiam em nós",
    faixaRepeticoes: 6,
  },

  manifesto: {
    h2: "Antes de falar sobre redes sociais…",
    resolveParte1: "…queremos falar sobre",
    resolvePalavraItalica: "pessoas",
    resolveParte2: ".",
    corpo: [
      "Acreditamos que um bom posicionamento começa quando imergimos na história e objetivos de quem está por trás da marca. Só depois disso criamos estratégias que fazem sentido, porque sabemos que comunicar uma empresa sem entendê-la é como tentar contar a história de alguém que você acabou de conhecer.",
      "Toda marca tem uma história, valores e um jeito único de fazer as coisas. Seguir tendências ou copiar o que funciona para outra empresa chama atenção por segundos, mas não constrói memória.",
    ],
    fecha: "Por isso, antes de conteúdo, pensamos em identidade.",
    faixaRepeticoes: 6,
  },

  /**
   * Momentos (= ParaQuem).
   *
   * ⚠️⚠️ `titulo` NÃO É COPY DA ANDRESSA, e isto precisa de decisão do Douglas.
   *
   * O `ref-files/Landing Page copy.md` traz, na linha 25, um título para este
   * trecho: `# **Como podemos cuidar da sua marca**`. Ele vem imediatamente antes
   * de "Cada empresa chega até nós em um momento diferente" e cobre os três
   * momentos. A palavra "Momentos" é o nome da SEÇÃO na arquitetura
   * (`landing-page-structure.md` §5.4), não um título que a cliente escreveu, e
   * entrou como `<h2>` visível na Fase 5B.
   *
   * Não troquei: a regra 3 do CLAUDE.md diz que quem decide copy é o Douglas, e
   * substituir invenção por texto da copy continua sendo alterar o que a página
   * mostra. O valor está aqui para a troca ser uma linha.
   */
  momentos: {
    titulo: "Momentos",
    intro: "Cada empresa chega até nós em um momento diferente.",
    blocos: [
      {
        titulo: "Está dando os primeiros passos",
        texto: "precisa construir uma identidade forte",
      },
      {
        titulo: "Já tem marca consolidada",
        texto: "mas a comunicação deixou de representar quem realmente é",
      },
      {
        titulo: "Quer crescer e vender mais",
        texto: "fortalecer o posicionamento no digital",
      },
    ],
    fecha:
      "Independentemente do momento, nosso objetivo é o mesmo: cuidar da sua marca com estratégia, atenção aos detalhes e uma comunicação construída a partir da sua essência.",
    faixaRepeticoes: 6,
  },

  /**
   * Os cinco serviços literais da copy. "Gestão de Redes Sociais" recebe
   * destaque: true (é o coração da Alando, segundo a copy). Nenhum dado foi
   * inventado do PDF; pendência aberta sobre qual portfólio é atual.
   *
   * `fechamento` existe nos CINCO, mesmo vazio: com a chave faltando em um deles,
   * o tipo da união deixa de ter a propriedade e o componente precisa de `as any`
   * para ler, que foi o que aconteceu na Fase 5B.
   *
   * `foto` só em UM, e a lacuna é de propósito: a §5.5 pede "foto em alguns, não
   * em todos", porque foto em todos devolve o ritmo de grade que a hierarquia
   * existe para quebrar.
   *
   * `prova` é chave SEPARADA de `foto`, e não uma flag dentro dela, porque as duas
   * se renderizam diferente: `foto` é coluna estreita ao lado do texto, `prova` é
   * campo largo emoldurado abaixo dele. Um booleano em `foto` faria o componente
   * ler o mesmo dado de dois jeitos, que é como nasce o `as any` da próxima fase.
   * Pela mesma razão do `fechamento`, ela existe nos CINCO, vazia em quatro.
   *
   * `fotoPendencia` entrou em 09/09 e é o SLOT VAGO: com ela preenchida e `foto`
   * vazia, o serviço mostra o campo da marca com o marcador embaixo, igual a
   * "Nossa história" no `Sobre`. Hoje só "Identidade Visual" a usa. Ela existe
   * nos CINCO pela mesma regra do `fechamento` e da `prova`: chave presente em um
   * só quebra o tipo da união (o `as const` sem `satisfies` do fim deste arquivo)
   * e obriga o componente a `as any`, que foi o que aconteceu na Fase 5B.
   *
   * ⚠️ O bloco DOMINANTE (Gestão) deveria ter foto pela §5.5 e não tem, e o
   * motivo é falta de material, não escolha de layout. Das cinco imagens de
   * `public/images/`, `servico-gestao.jpg` é a única que resolve o parágrafo da
   * equipe no `Sobre` (2 pessoas, nenhum rosto identificável) e foi para lá;
   * `captacao-um.jpg` tem rostos identificáveis e depende de autorização de
   * imagem; e as duas de 310×552 só servem de thumbnail pequeno.
   */
  servicos: [
    {
      titulo: "Identidade Visual",
      corpo:
        "Criamos identidades visuais que traduzem a essência da sua marca e ajudam a construir uma presença mais forte, coerente e memorável.",
      fechamento:
        "Ideal para marcas que estão começando ou passando por um reposicionamento.",
      destaque: false,
      /* ── O SLOT VAGO, ocupado pela marca (09/09) ────────────────────────────
         Pedido do Douglas: o mesmo tratamento que "Nossa história" recebeu no
         `Sobre`, porque as fotos deste serviço ainda não foram escolhidas.
         Enquanto `foto` estiver vazia e a pendência preenchida, o slot
         renderiza o `CampoMarca` com o marcador embaixo.

         Quando as fotos chegarem, a troca é SÓ AQUI: preencher `foto`,
         `fotoAlt` e `quadros`, e esvaziar a pendência. O `Servicos.tsx` decide
         pela presença dos campos e não muda uma linha.

         ⚠️ O marcador NÃO cita a autorização de cada cliente, por decisão do
         Douglas em 09/09, e a pendência continua existindo: a
         `landing-page-structure.md` §5.5 e a §10 da auditoria listam
         "autorização de cada cliente cujo material de identidade visual vire
         thumbnail" como BLOQUEANTE, e é lá que ela é cobrada. O marcador da tela
         pergunta uma coisa só, que é a que ele resolve: qual foto entra. */
      foto: "",
      fotoAlt: "",
      fotoPendencia:
        "<<A CONFIRMAR: quais fotos entram em Identidade Visual. Por enquanto o slot é ocupado pela marca>>",
      quadros: [],
      prova: { imagem: "", video: "", alt: "" },
    },
    {
      titulo: "Estruturação de Perfil",
      corpo:
        "Estruturamos seu Instagram para comunicar com clareza quem é a sua marca, o que ela oferece e seus diferenciais, cuidando da bio, destaques, identidade e conteúdos iniciais.",
      fechamento:
        "Ideal para marcas que estão começando no digital ou precisam profissionalizar sua presença.",
      destaque: false,
      foto: "",
      fotoAlt: "",
      fotoPendencia: "",
      /* A prova do serviço, e a §5.5 da estrutura já a tinha previsto por nome:
         "o material de drive-files vai anexado ao serviço que ele comprova:
         Identidade Visual e Estruturação de Perfil".

         ⚠️ `alt` é texto do projeto, não copy da Andressa, mesma convenção do
         `seo.ogAlt` e do `hero.fotoAlt`. Ele descreve só o que está no quadro e
         não afirma resultado nenhum, porque a §11 proíbe promessa numérica e a
         imagem é de uma cliente real, publicada com autorização escrita. */
      quadros: [],
      prova: {
        imagem: "/images/servico-estruturacao.jpg",
        video: "",
        alt: "Perfil de Instagram de uma cliente, estruturado pela Alando: três destaques nomeados e um feed com identidade visual consistente.",
      },
    },
    {
      titulo: "Gestão de Redes Sociais",
      corpo:
        "O coração da Alando. Mergulhamos na sua marca para criar uma comunicação com personalidade, estratégia e posicionamento, cuidando de todo o processo: do planejamento à produção, publicação e análise de resultados.",
      fechamento:
        "Ideal para marcas que querem construir uma presença digital estratégica, consistente e memorável.",
      destaque: true,
      foto: "",
      fotoAlt: "",
      fotoPendencia: "",
      quadros: [],
      prova: { imagem: "", video: "", alt: "" },
    },
    {
      titulo: "Captação e edição de vídeos",
      corpo:
        "Cuidamos da produção dos seus vídeos do roteiro à edição, com uma captação leve e direcionada para criar conteúdos naturais, estratégicos e alinhados à essência da sua marca.",
      fechamento:
        "Ideal para marcas que querem se posicionar através de vídeos profissionais sem perder a naturalidade.",
      destaque: false,
      /* A foto que casa com o serviço que ela mostra: literalmente uma câmera
         enquadrando a cena. É o QUADRO EM REPOUSO de uma sequência de onze, e
         continua sendo a única que sai no HTML do servidor, a única que quem tem
         `prefers-reduced-motion` vê e a única que carrega `alt` de verdade. `alt`
         descritivo, escrito aqui, não é copy da cliente.

         Desde 10/09, a pedido do Douglas, a foto é a do escritório (câmera no
         tripé gravando uma cliente à mesa). A da mesa posta, que era o repouso
         desde 02/09, virou o primeiro dos `quadros` abaixo. */
      foto: "/images/servico-video.jpg",
      fotoAlt:
        "Câmera no tripé com a tela mostrando a mulher sentada à mesa que está sendo gravada, um dos bastidores de captação da Alando.",
      fotoPendencia: "",
      /* ── A SEQUÊNCIA DE QUADROS ────────────────────────────────────────────
         Os dez que se revezam com a foto acima, no mesmo slot, trocando no
         tempo. Mecanismo em `SequenciaDeQuadros.tsx`; o desvio de movimento que
         ele representa está registrado na DESIGN-GUIDELINES.md §8.

         ⚠️ A ORDEM É DELIBERADA e não é a do sistema de arquivos: quadros de
         contexto parecido (os dois de salão, os dois de mesa) ficam separados
         por pelo menos dois outros, porque quem para de rolar no meio da
         sequência tem que ver duas fotos DIFERENTES em seguida.

         ⚠️ Nenhum `alt` aqui, e é decisão, não esquecimento: os dez são
         `alt=""` e `aria-hidden`, pela mesma regra da `FaixaRepetida` (uma
         instância semântica só). Onze descrições de mãos segurando câmera
         enfileiradas dentro de um bloco de serviço são ruído, não informação. */
      quadros: [
        "/images/video-quadro-00.jpg",
        "/images/video-quadro-01.jpg",
        "/images/video-quadro-02.jpg",
        "/images/video-quadro-03.jpg",
        "/images/video-quadro-04.jpg",
        "/images/video-quadro-05.jpg",
        "/images/video-quadro-06.jpg",
        "/images/video-quadro-07.jpg",
        "/images/video-quadro-08.jpg",
        "/images/video-quadro-09.jpg",
      ],
      prova: { imagem: "", video: "", alt: "" },
    },
    {
      titulo: "Landing Pages",
      corpo:
        "Criamos páginas estratégicas e personalizadas para apresentar sua marca, valorizar sua oferta e conduzir o visitante até a ação desejada, sempre respeitando sua identidade e posicionamento.",
      fechamento:
        "Ideal para campanhas, lançamentos, vendas de serviços e geração de leads.",
      destaque: false,
      foto: "",
      fotoAlt: "",
      fotoPendencia: "",
      quadros: [],
      /* A prova do serviço, e a única da página que é VÍDEO.

         A página é de uma cliente real e só entra em `public/` porque a
         autorização escrita existe, confirmada pelo Douglas em 03/09: mesma
         linha que liberou o print de Estruturação de Perfil em 02/09.

         ⚠️ Vídeo é o SEGUNDO desvio da DESIGN-GUIDELINES.md §8, e ele está
         registrado lá com o argumento inteiro. Não é precedente para um
         terceiro. O mecanismo, com as cinco contenções, está no `CampoProva`.

         ⚠️ `alt` é texto do projeto, não copy da Andressa, mesma convenção do
         `seo.ogAlt` e do `hero.fotoAlt`. Ele descreve o que está no quadro e não
         afirma resultado nenhum, porque a §11 proíbe promessa numérica. E não
         nomeia a cliente: a autorização é para publicar a página, não para
         transformar o nome dela em legenda no site de outra marca. */
      prova: {
        imagem: "/images/servico-landing-page.jpg",
        video: "/video/servico-landing-page.mp4",
        alt: "Landing page de uma cliente nutricionista, construída pela Alando: título, botão de agendamento por WhatsApp e as seções de método, processo e dúvidas.",
      },
    },
  ],

  /**
   * ⚠️⚠️ `servicosTitulo` NÃO É COPY DA ANDRESSA, e precisa de decisão do Douglas.
   *
   * E o caso é pior que o do `momentos.titulo`: a copy **não tem título nenhum**
   * para os cinco serviços. Eles aparecem depois de um `---`, cada um com o
   * próprio `##`, sob o mesmo `# **Como podemos cuidar da sua marca**` que
   * encabeça os momentos. A arquitetura separou os dois em seções distintas
   * (`landing-page-structure.md` §5.4 e §5.5), e cada seção precisa de um `<h2>`,
   * então "Serviços" entrou na Fase 5B para preencher o buraco.
   *
   * Três saídas possíveis, e nenhuma é minha: pedir o título à Andressa, dar o
   * "Como podemos cuidar da sua marca" a esta seção em vez de à de Momentos, ou
   * confirmar "Serviços" como decisão consciente.
   *
   * `maisQueContratarTitulo` é o único dos três que tem origem na copy, na linha
   * 89: `## **Mais do que contratar um serviço...**`. Está aqui SEM a reticência,
   * exatamente como a Fase 5B renderizou, para eu não alterar o que a página
   * mostra. A Fase 4 normalizou "..." para "…" no `manifesto.h2`, então o valor
   * fiel à copy seria "Mais do que contratar um serviço…".
   */
  servicosTitulo: "Serviços",
  maisQueContratarTitulo: "Mais do que contratar um serviço",
  maisQueContratar:
    "Você passa a contar com uma equipe que busca **entender sua empresa de verdade**. **Mergulhamos na essência da sua marca** para descobrir o que a torna única e transformar isso em uma **comunicação estratégica, autêntica e coerente com quem você é.**",
  servicosCTA: "Quero conhecer o processo",
  servicosFaixaRepeticoes: 6,

  /**
   * Os rótulos do controle da sequência de quadros.
   *
   * ⚠️ TEXTO DO PROJETO, não copy da Andressa, mesma convenção já registrada
   * para `fotoAlt` e `seo.ogAlt`. Entram na lista do relatório da fase.
   *
   * O botão existe por exigência da WCAG 2.2.2: conteúdo que anda sozinho por
   * mais de cinco segundos precisa de um jeito de parar. E são DOIS pares de
   * rótulo, não um: o visível é curto porque fica embaixo de uma foto estreita,
   * e o de leitor de tela diz o que o botão controla, coisa que "Pausar"
   * sozinho não diz. O visível é prefixo do descritivo de propósito, que é o
   * que a WCAG 2.5.3 (Label in Name) pede.
   */
  quadrosRotulos: {
    pausar: "Pausar",
    retomar: "Retomar",
    pausarDescricao: "Pausar a sequência de bastidores de captação",
    retomarDescricao: "Retomar a sequência de bastidores de captação",
  },

  /**
   * Os rótulos do controle da sequência de "Identidade Visual", que avança PELA
   * PESSOA e não sozinha.
   *
   * ⚠️ TEXTO DO PROJETO, não copy da Andressa, igual aos de cima. Entram na
   * lista do relatório da fase.
   *
   * São um objeto separado do `quadrosRotulos`, e não quatro chaves a mais nele,
   * por duas razões. A primeira é que os DESCRITIVOS são específicos do slot
   * ("bastidores de captação" não descreve foto de identidade visual), e um
   * descritivo genérico deixaria de dizer o que o botão controla, que é a razão
   * de ele existir. A segunda é que o tipo do `SequenciaDeQuadros` é uma união
   * discriminada pelo `modo`: o modo automático pede pausar/retomar e o manual
   * pede anterior/próxima, e um objeto só com as oito chaves aceitaria a
   * combinação errada sem reclamar.
   *
   * Sem WCAG 2.2.2 aqui: nada anda sozinho neste slot, então não há o que pausar.
   * O que os dois pares de rótulo mantêm é a regra 2.5.3 (Label in Name), com o
   * visível sendo prefixo do descritivo.
   */
  identidadeQuadrosRotulos: {
    anterior: "Anterior",
    proxima: "Próxima",
    anteriorDescricao: "Ver a foto anterior de identidade visual",
    proximaDescricao: "Ver a próxima foto de identidade visual",
  },

  /**
   * Os rótulos do controle do vídeo da prova de Landing Pages.
   *
   * ⚠️ TEXTO DO PROJETO, não copy da Andressa, igual aos de cima. Entram na
   * lista do relatório da fase.
   *
   * Por que "Repetir" e não "Tocar": o vídeo toca sozinho ao entrar na tela e
   * para no fim, então quando o botão está no estado de partida o que ele faz é
   * rodar de novo. "Tocar" prometeria uma primeira vez que já aconteceu.
   *
   * Mesmos dois pares de rótulo da sequência de quadros, e pelo mesmo motivo: o
   * visível é curto, o descritivo diz o que o botão controla, e o visível é
   * prefixo do descritivo, que é o que a WCAG 2.5.3 (Label in Name) pede.
   */
  provaRotulos: {
    repetir: "Repetir",
    pausar: "Pausar",
    repetirDescricao: "Repetir o vídeo da landing page de uma cliente",
    pausarDescricao: "Pausar o vídeo da landing page de uma cliente",
  },

  /**
   * Resultados. Nasce desligada porque os dados do deck não têm autorização de
   * cada cliente para publicação. Ver landing-page-structure.md §5.6 e
   * AUDITORIA-ETAPA-0.md §8 para material disponível.
   *
   * ⚠️ Os números moram em `resultadosDeCaso`, no fim deste arquivo, e a lista
   * está VAZIA de propósito. Dois portões, não um: a seção só renderiza com
   * `exibir: true` E com item na lista. Ligar o booleano sozinho não publica uma
   * faixa de credibilidade vazia, que é o efeito oposto do pretendido.
   */
  resultados: {
    exibir: false,
    titulo: "Já funcionou antes",
    tituloPalavraItalica: "funcionou",
    /**
     * A linha que enquadra os números. Não é ornamento: número de caso
     * apresentado como expectativa é promessa de resultado, e a redação tem que
     * deixar claro que é história do que aconteceu com um cliente.
     */
    enquadramento:
      "<<A CONFIRMAR: a linha que enquadra os números como história de um cliente, não como previsão>>",
    faixaRepeticoes: 6,
  },

  /**
   * Processo. ✅ Copy da Andressa, trazida pelo Douglas em 08/09. Eram dois
   * marcadores (o passo a passo e os prazos) e agora não há nenhum.
   *
   * As quatro etapas estão transcritas sem uma palavra alterada. O `01.` do
   * texto original dela NÃO entra no `titulo`: a numeração é o
   * `String(i + 1).padStart(2, "0")` que o `Processo` deriva do índice do
   * `<ol>`, e digitá-la aqui duplicaria o número na tela.
   *
   * ⚠️ NÃO existe prazo nesta seção, e a ausência é decisão, não esquecimento.
   * A Andressa disse como quer a seção e não citou nenhum; prazo e duração são
   * promessa contratual, então a página não carrega marcador para um dado que
   * ninguém pediu para exibir. Se um dia ela mandar prazos, eles voltam como
   * campo novo, nunca estimados aqui. Ver landing-page-structure.md §5.7.
   *
   * É o ÚNICO lugar da página onde 01/02/03 se justifica, porque o conteúdo é de
   * fato uma sequência, e por isso vem em `<ol>`. Em qualquer outra seção a
   * numeração é decoração.
   */
  processo: {
    titulo: "Como funciona",
    tituloPalavraItalica: "funciona",
    etapas: [
      {
        titulo: "Fale com a gente",
        texto:
          "Clique no link e conte um pouco sobre sua marca e o que você está buscando. Esse primeiro contato acontece pelo WhatsApp.",
      },
      {
        titulo: "Vamos nos conhecer",
        texto:
          "Marcamos uma reunião para ouvir mais sobre sua marca, entender seu momento e apresentar a Alando, nossa forma de trabalhar e nossos serviços.",
      },
      {
        titulo: "Encontramos o melhor caminho",
        texto:
          "Depois de entendermos juntos o que sua marca precisa, preparamos uma proposta personalizada para o projeto.",
      },
      {
        titulo: "Começamos a imersão",
        texto:
          "Com o contrato fechado, iniciamos com nossa reunião de imersão: o momento de mergulhar na sua marca, entender sua essência e dar início ao trabalho.",
      },
    ],
    processoCTA: "Quero começar agora",
    processoCTAOrigem: "processo",
    faixaRepeticoes: 6,
  },

  /**
   * Sobre, em dois movimentos, na ordem da copy.
   *
   * ⚠️ AS DUAS IMAGENS TROCARAM DE LUGAR EM 09/09, por decisão do Douglas. O
   * retrato da Andressa estava em "Nossa história" e passou para "Quem está por
   * trás da Alando", que é o movimento que a nomeia em texto. A foto de captação
   * que estava ali saiu da página, e o slot de "Nossa história" passou a ser
   * ocupado pela marca até ele escolher a foto definitiva.
   *
   * ⚠️ `fotoAlt` é texto DESCRITIVO escrito aqui, não copy da Andressa: `alt`
   * descreve o que a foto mostra e é obrigação de acessibilidade. Ele desceu
   * junto com o retrato, porque `alt` pertence à imagem e não ao slot.
   *
   * `historia.fotoPendencia` é a legenda do slot vago. Ela existe pela regra 1 do
   * CLAUDE.md: placeholder sem marcador é o tipo de coisa que chega em produção
   * sem ninguém notar. Sai numa linha quando a foto chegar.
   */
  sobre: {
    historia: {
      titulo: "Nossa história",
      palavraItalica: "história",
      fotoPendencia:
        "<<A CONFIRMAR: qual foto entra em Nossa história. Por enquanto o slot é ocupado pela marca>>",
      corpo: [
        "A Alando nasceu oficialmente em 2022, mas nossa história com marcas começou em 2017. Ao longo desses anos, percebemos que muitas empresas investiam em conteúdo, mas poucas realmente construíam uma marca.\n\nFoi dessa inquietação que nasceu nossa forma de trabalhar: antes de criar, buscamos entender. Queremos conhecer a essência da marca, seus diferenciais, sua história e como ela deseja ser lembrada.\n\nHoje, esse continua sendo o ponto de partida de cada projeto. **Criamos e gerenciamos marcas de forma artesanal**, com atenção, intenção e cuidado com os detalhes que tornam cada negócio único.",
      ],
    },
    equipe: {
      titulo: "Quem está por trás da Alando",
      fotoAlt:
        "Andressa Lando, fundadora da Alando Digital, de pé em frente a uma estante com plantas.",
      corpo: [
        "Fundada por **Andressa Lando, estrategista de marketing e especialista em Branding com MBA pela ESPM**, hoje a Alando é formada por profissionais especializados em diferentes áreas da comunicação.\n\nSomos uma equipe próxima, humana e que acredita na troca. Gostamos de ouvir, entender e construir junto com cada cliente, porque quanto mais conhecemos uma marca, mais conseguimos cuidar da sua comunicação com verdade e intenção.",
      ],
    },
    sobreFaixaRepeticoes: 6,
  },

  /**
   * FAQ. ✅ Copy da Andressa, trazida pelo Douglas em 09/09. Eram DOIS
   * marcadores num par só de pergunta/resposta, e agora são SETE pares reais,
   * sem marcador nenhum. Com isso o nó `FAQPage` do grafo passa a ser emitido
   * pela primeira vez (ver `lib/schema.ts`).
   *
   * As sete estão transcritas sem uma palavra alterada. A única higiene foi
   * tirar o espaço à esquerda que cada resposta trazia da quebra de linha do
   * WhatsApp: nenhuma letra do texto dela mudou.
   *
   * ⚠️ Nenhum `**` aqui, e é decisão. O texto dela não tem ênfase nenhuma, e a
   * DESIGN-GUIDELINES.md §6 é avara com negrito de propósito: acrescentar seria
   * inventar entonação que ela não escreveu.
   *
   * ⚠️ As perguntas e o JSON-LD `FAQPage` precisam bater PALAVRA POR PALAVRA, e
   * batem porque o `schema.ts` lê ESTE array, não uma segunda cópia. Se um dia
   * alguém duplicar a lista, o Google detecta a divergência e passa a ignorar o
   * markup inteiro (landing-page-structure.md §7).
   *
   * ⚠️ Desvio de spec registrado: a §5.9 pede respostas "em prosa real, 2 a 4
   * frases", e as dela têm de 1 a 3. É copy da cliente, então quem cede é a
   * spec, não o texto. A contagem de perguntas (7) está no teto da §5.9.
   *
   * ✅ `titulo` PASSOU A SER COPY DELA. Era o terceiro caso do arquivo que não
   * era, junto com `momentos.titulo` e `servicosTitulo`: "Dúvidas" tinha vindo
   * da âncora `#duvidas` da estrutura (§7). A mensagem de 09/09 intitula o
   * bloco de "Dúvidas frequentes", e é isso que a faixa passa a repetir. O
   * rótulo do header continua "Dúvidas" (`header.nav.duvidas`), porque ali é
   * navegação e não título de seção.
   */
  faq: {
    titulo: "Dúvidas frequentes",
    tituloPalavraItalica: "frequentes",
    perguntas: [
      {
        pergunta: "Vocês atendem apenas empresas de Indaiatuba?",
        resposta:
          "Não. Atendemos marcas de todo o Brasil de forma online e, presencialmente, Indaiatuba, Campinas e região.",
      },
      {
        pergunta: "Como sei qual serviço é ideal para a minha marca?",
        resposta:
          "Você não precisa chegar com isso definido. No nosso primeiro contato, entendemos seu momento, objetivos e necessidades para, juntos, encontrarmos o melhor caminho.",
      },
      {
        pergunta: "A Alando atende qualquer segmento?",
        resposta:
          "Atendemos marcas de diferentes segmentos, desde que exista alinhamento com a nossa forma de trabalhar. Antes de qualquer proposta, fazemos questão de conhecer sua empresa e entender se podemos contribuir de verdade.",
      },
      {
        pergunta: "Vocês trabalham com pacotes prontos?",
        resposta:
          "Temos escopos definidos para nossos serviços, mas entendemos as necessidades de cada marca antes de indicar uma solução. Não acreditamos em encaixar empresas diferentes na mesma fórmula.",
      },
      {
        /* ⚠️ Os nomes de serviço aqui divergem em caixa e número dos da seção
           `Servicos` ("Captação e edição de vídeos", "Landing Pages"). É a
           transcrição literal dela, mantida por decisão do Douglas em 09/09:
           uniformizar seria alterar copy, e isso é decisão dele, não daqui. */
        pergunta: "Preciso contratar a gestão completa?",
        resposta:
          "Não. Você pode contratar serviços como Identidade Visual, Estruturação de Perfil, Captação e Edição de Vídeos ou Landing Page separadamente, de acordo com o momento da sua marca.",
      },
      {
        pergunta: "Como funciona a contratação?",
        resposta:
          "O primeiro contato acontece pelo WhatsApp. Depois, marcamos uma reunião para conhecer sua marca e apresentar a Alando. A partir dessa conversa, enviamos uma proposta e, com o contrato fechado, iniciamos o projeto com nossa imersão.",
      },
      {
        pergunta: "Quanto custa trabalhar com a Alando?",
        resposta:
          "O investimento varia de acordo com o serviço e o escopo do projeto. Depois de entendermos o que sua marca precisa, apresentamos a proposta mais adequada.",
      },
    ],
    faixaRepeticoes: 6,
  },

  /**
   * CTA Final.
   *
   * ✅ **A copy chegou em 09/09**, com as palavras da Andressa, trazida pelo
   * Douglas. Era a última seção da página feita SÓ de marcador, e agora não tem
   * nenhum. `faixaRepeticoes` sobe de 1 para 6 junto: ele estava travado em 1
   * porque repetir um `<<A CONFIRMAR>>` seis vezes numa faixa full-bleed seria
   * ruído, não pendência.
   *
   * ── Por que o título dela virou DUAS chaves ──────────────────────────────
   *
   * Ela mandou o título em duas frases: *"Sua marca tem uma história. Vamos
   * cuidar de como ela será lembrada?"*, 67 caracteres somados. **Nenhuma
   * palavra mudou**, o que mudou foi o papel tipográfico de cada frase.
   *
   * O motivo é mecânico e está medido: o `.faixa-trilho > h2` do `globals.css`
   * deixa a instância legível quebrar linha, e o comentário de lá registra o
   * efeito colateral, título em duas linhas empurra as cópias decorativas para
   * fora da tela e A TEXTURA DA FAIXA SOME. Com as duas frases juntas no `<h2>`
   * isso aconteceria em toda largura, inclusive 1440px, e o fechamento seria a
   * única seção da página sem a assinatura da marca. Justamente onde o deck
   * dela fecha com `juntos?juntos?juntos?` (p. 24).
   *
   * **Decidido pelo Douglas em 09/09: a pergunta é que repete.** A afirmação
   * vira `lead`, na linha de lead com tracking largo que é traço do deck
   * (§4, utilitário `lead-tracked`, que fora daqui só o `Footer` usa).
   *
   * `tituloPalavraItalica` é **lembrada**, e é a palavra da bio da marca
   * ("para marcas que desejam ser lembradas"). "história" não serviria: já é a
   * `palavraItalica` de "Nossa história", em `sobre`, e a §6 é avara com ênfase.
   *
   * ── O rótulo do botão ────────────────────────────────────────────────────
   *
   * "Quero apresentar minha marca para a Alando", diferente do herói ("Quero
   * conversar com a Alando"), que é a exigência da §11: no herói a pessoa
   * decide se vale a pena, aqui ela já decidiu e está começando.
   *
   * `mensagens["cta-final"]` NÃO acompanhou o rótulo, e é de propósito: ela
   * existe para revelar a ORIGEM no celular da Andressa, não para ecoar o
   * botão, e continua distinguível das outras cinco (§6 da estrutura).
   */
  ctaFinal: {
    lead: "Sua marca tem uma história.",
    titulo: "Vamos cuidar de como ela será lembrada?",
    tituloPalavraItalica: "lembrada",
    texto:
      "Se você busca uma equipe que queira entender sua empresa antes de começar a se comunicar por ela, queremos conhecer sua marca. Conte um pouco sobre o seu momento e vamos descobrir juntos qual é o melhor caminho.",
    ctaLabel: "Quero apresentar minha marca para a Alando",
    ctaOrigem: "cta-final",
    faixaRepeticoes: 6,
  },

  /**
   * Footer.
   *
   * `nome` é o nome da marca, que o lockup já traz impresso, e `instagram` é o
   * perfil confirmado. O resto é pendência, incluindo o crédito de
   * desenvolvimento: colocar nome e link de quem fez o site é decisão da cliente
   * sobre o rodapé dela, não do desenvolvedor sobre si mesmo.
   *
   * ⚠️ `direitos` é fórmula jurídica padrão de rodapé, não copy da Andressa.
   * Não é dado da cliente (não é prazo, preço nem depoimento), mas também não
   * saiu do documento dela: se ela quiser outra formulação, ou nenhuma, é uma
   * linha.
   *
   * `instagramRotulo` é nome acessível, não copy: o texto visível é só
   * "@alandodigital", e quem usa leitor de tela não tem como saber de que rede
   * é o link. Mesma natureza dos `fotoAlt` deste arquivo.
   */
  /**
   * A página 404.
   *
   * ⚠️ TEXTO QUE EU ESCREVI, não copy da Andressa, e por isso vai para o bloco de
   * aprovação junto com o `seo` acima. É da mesma natureza dos `fotoAlt` e do
   * `direitos` deste arquivo: texto de interface que a página precisa ter e que o
   * documento dela não cobre.
   *
   * Escrito curto e sem piada de propósito. "Ops!", "parece que você se perdeu" e
   * o 404 gigante em display são o clichê de 404 que a §2.5 proíbe em outro
   * contexto e que não fica melhor aqui. A página diz o que houve e devolve a
   * pessoa para o único lugar que existe.
   */
  naoEncontrada: {
    titulo: "Esta página não existe.",
    palavraItalica: "não",
    texto:
      "O endereço pode ter mudado, ou o link que trouxe você até aqui pode estar incompleto.",
    voltar: "Voltar para o início",
  },

  footer: {
    nome: "Alando Digital",
    cidade: local.cidadeUf,
    instagram: "@alandodigital",
    instagramRotulo: "Alando Digital no Instagram",
    cnpj: "<<A CONFIRMAR: CNPJ, se ela quiser exibir>>",
    direitos: "Todos os direitos reservados.",
    credito: "<<A CONFIRMAR: crédito do desenvolvimento, nome e link>>",
  },
} as const;

/**
 * Um número de caso da seção `Resultados`.
 *
 * `valor` é o número em tamanho display; `contexto` é a frase curta que diz do
 * que ele é. Nenhum dos dois é opcional: número sem contexto não é prova, é
 * ornamento.
 */
export type ResultadoDeCaso = {
  readonly valor: string;
  readonly contexto: string;
};

/**
 * ⚠️ VAZIA DE PROPÓSITO, e isso é um estado final legítimo.
 *
 * O deck tem quatro conjuntos de números reais (Daoravida, NaCasa, Vizzent,
 * Luciano Fernandes), listados em `landing-page-structure.md` §5.6. Eles NÃO
 * entram aqui até existir autorização escrita de cada cliente, e não estão
 * copiados nem em comentário: dado de terceiro só circula com permissão.
 *
 * Enquanto a lista estiver vazia, `Resultados` não renderiza. Preenchê-la exige
 * decidir também se os clientes são nomeados ou anonimizados por segmento.
 *
 * `<<A CONFIRMAR: autorização escrita de cada cliente para publicação dos números>>`
 * `<<A CONFIRMAR: nomear os clientes ou anonimizar por segmento?>>`
 */
export const resultadosDeCaso: readonly ResultadoDeCaso[] = [];

/**
 * Mensagens de WhatsApp. Voz de quem visita (é a pessoa quem envia). Cada uma
 * distinguível da outra, seis mensagens quase iguais não rastreiam nada.
 *
 * Fonte: landing-page-structure.md §6. Um Record completo é obrigatório;
 * adicionar uma origem sem mensagem quebra o build.
 */
export type CtaOrigem =
  "header" | "hero" | "servicos" | "processo" | "cta-final" | "sticky-mobile";

export const mensagensWhatsapp: Record<CtaOrigem, string> = {
  header: "Oi! Vim pelo site da Alando e quero falar com vocês.",
  hero: "Oi! Quero conversar sobre a comunicação da minha marca.",
  servicos:
    "Oi! Vi os serviços de vocês e quero entender qual faz sentido pra minha empresa.",
  processo: "Oi! Vi como vocês trabalham e queria entender como começar.",
  "cta-final":
    "Oi! Li a página inteira e quero começar uma conversa sobre a minha marca.",
  "sticky-mobile": "Oi! Quero falar com a Alando sobre a minha marca.",
} as const;
