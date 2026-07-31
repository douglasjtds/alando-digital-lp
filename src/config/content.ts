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
 */

export const content = {
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
    eyebrow: "Branding e comunicação · <<A CONFIRMAR: cidade>>",
    h1: "Criando e gerenciando marcas de forma artesanal.",
    h1PalavraItalica: "artesanal",
    subtitulo:
      "Porque nenhuma marca deveria ser tratada como só mais um cliente.",
    ctaLabel: "Quero conversar com a Alando",
    fotoAlt:
      "Andressa Lando, fundadora e estrategista de marketing da Alando Digital.",
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
      "Na Alando, acreditamos que um bom posicionamento começa muito antes do primeiro post, mas sim conhecendo a história, os valores, os objetivos e a essência de quem está por trás da marca. Só depois disso criamos estratégias que fazem sentido, porque sabemos que comunicar uma empresa sem entendê-la primeiro é como tentar contar a história de alguém que você acabou de conhecer.",
      "Toda empresa nasce de um sonho. Existe uma história por trás dela, valores que guiam as decisões e um jeito único de fazer as coisas. É justamente isso que torna uma marca diferente de todas as outras, e, na nossa visão, a comunicação precisa carregar essa essência em cada detalhe.",
      "Quando uma marca deixa de mostrar quem realmente é para seguir tendências ou copiar o que está funcionando para outra empresa, ela pode até chamar atenção por alguns segundos. Mas dificilmente será lembrada pelas pessoas certas.",
    ],
    fecha: "É por isso que, antes de pensar em conteúdo, pensamos em identidade.",
    faixaRepeticoes: 6,
  },

  momentos: {
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
   */
  servicos: [
    {
      titulo: "Identidade Visual",
      corpo: "A identidade visual é muito mais do que um logotipo bonito. Ela é a primeira impressão que as pessoas terão sobre a sua empresa.\n\nPor isso, antes de pensar em cores, tipografia ou símbolos, buscamos entender quem é a sua marca, quais sensações ela deve transmitir e como deseja ser lembrada. O resultado é uma identidade que representa sua essência e acompanha o crescimento do seu negócio.",
      fechamento: "Ideal para empresas que estão começando ou passando por um reposicionamento",
      destaque: false,
    },
    {
      titulo: "Estruturação de Perfil",
      corpo: "Antes de publicar conteúdo, existe um perfil inteiro que precisa comunicar confiança.\n\nAnalisamos cada detalhe do seu Instagram para que ele deixe claro quem é a sua empresa, o que ela faz e por que alguém deveria escolher você. Ajustamos biografia, destaques, identidade visual, organização das informações e toda a experiência de quem chega ao seu perfil pela primeira vez.\n\nPorque, muitas vezes, o cliente decide se continua navegando ou fecha o Instagram em poucos segundos.",
      fechamento: "",
      destaque: false,
    },
    {
      titulo: "Gestão de Redes Sociais",
      corpo: "Esse é o coração da Alando.\n\nNossa gestão vai muito além de criar artes e escrever legendas. Nós mergulhamos na sua marca para construir uma comunicação que tenha personalidade, gere conexão e fortaleça o seu posicionamento.\n\nTudo começa com um diagnóstico profundo do seu negócio. A partir dele, desenvolvemos o planejamento estratégico, criamos os roteiros, produzimos os conteúdos, acompanhamos os resultados e ajustamos a comunicação conforme sua empresa evolui.\n\nVocê deixa de apenas alimentar um perfil e passa a construir uma marca que as pessoas reconhecem e lembram.",
      destaque: true,
    },
    {
      titulo: "Captação e edição de vídeos",
      corpo: "Sabemos que aparecer na câmera nem sempre é fácil.\n\nPor isso, nossa equipe conduz toda a gravação de forma leve e natural, criando um ambiente em que você se sinta confortável para falar sobre aquilo que faz todos os dias.\n\nTambém pensamos em cada cena, enquadramento e roteiro para que os vídeos reflitam a essência da sua marca, e não apenas acompanhem tendências.\n\nDepois da gravação, todo o material passa pela edição para transformar boas imagens em conteúdos estratégicos.",
      fechamento: "",
      destaque: false,
    },
    {
      titulo: "Landing Pages",
      corpo: "Uma boa campanha merece uma página que continue a conversa iniciada no anúncio.\n\nDesenvolvemos landing pages pensadas para apresentar sua empresa, transmitir confiança e conduzir o visitante até a ação que realmente importa, seja solicitar um orçamento, preencher um formulário ou realizar uma compra.\n\nAssim como todo o nosso trabalho, cada página é construída de forma personalizada, respeitando a identidade e o posicionamento da sua marca.",
      fechamento: "",
      destaque: false,
    },
  ],
  maisQueContratar:
    "Você passa a contar com uma equipe que se preocupa em entender sua empresa como ela realmente é.\n\nPorque acreditamos que nenhuma estratégia funciona quando tenta encaixar todas as marcas na mesma fórmula.\n\nNosso trabalho é justamente o contrário: descobrir o que torna o seu negócio único e transformar isso em uma comunicação que faça sentido para você e para quem está do outro lado da tela.",
  servicosCTA: "Quero conhecer o processo",
  servicosFaixaRepeticoes: 6,

  /**
   * Resultados. Nasce desligada porque os dados do deck não têm autorização de
   * cada cliente para publicação. Ver landing-page-structure.md §5.6 e
   * AUDITORIA-ETAPA-0.md §8 para material disponível.
   */
  resultados: {
    exibir: false,
    titulo: "Já funcionou antes",
    faixaRepeticoes: 6,
  },

  /**
   * Processo. Copy inexistente, apenas marcadores de pendência. Prazo é
   * promessa contratual: nunca inventar, sempre confirmar com a cliente.
   */
  processo: {
    titulo: "Como funciona",
    etapas: [
      "<<A CONFIRMAR: o processo real, passo a passo, com as palavras dela>>",
    ],
    prazos: "<<A CONFIRMAR: prazos reais de cada etapa>>",
    processoCTA: "Quero começar agora",
    processoCTAOrigem: "processo",
    faixaRepeticoes: 6,
  },

  sobre: {
    historia: {
      titulo: "Nossa história",
      corpo: [
        "A Alando nasceu oficialmente em 2022, mas a nossa história com marcas começou muito antes.\n\nDesde 2017, cuidamos da comunicação de empresas que acreditavam que marketing poderia ser mais do que apenas estar presente nas redes sociais. Ao longo desses anos, percebemos algo que mudaria completamente a nossa forma de trabalhar: muitas empresas investiam em conteúdo, mas poucas realmente construíam uma marca.\n\nFoi dessa inquietação que nasceu a Alando.\n\nCriamos uma agência que escolheu fazer diferente. Em vez de começar perguntando quantos posts o cliente queria publicar por mês, passamos a fazer perguntas muito mais importantes: qual é a essência da sua marca? O que faz sua empresa ser única? Como você quer ser lembrado pelas pessoas?\n\nPorque acreditamos que uma comunicação forte não nasce de tendências. Ela nasce de entendimento.\n\nHoje, esse continua sendo o ponto de partida de todos os nossos projetos. Antes de pensar em estratégias, campanhas ou conteúdos, mergulhamos na história de cada empresa para construir uma comunicação que realmente faça sentido para quem ela é.\n\nÉ por isso que dizemos que criamos e gerenciamos marcas de forma artesanal. Não porque fazemos menos, mas porque fazemos com atenção, intenção e respeito aos detalhes que tornam cada negócio único.",
      ],
    },
    equipe: {
      titulo: "Quem está por trás da Alando",
      corpo: [
        "A Alando foi fundada por Andressa Lando, estrategista de marketing e especialista em Branding, com MBA pela ESPM.",
        "Mas, embora a Alando tenha começado com um sonho individual, ela nunca foi construída para depender de uma única pessoa.\n\nHoje somos uma equipe composta por profissionais experientes em cada setor, que acreditam que boas ideias nascem da troca, da proximidade e da vontade genuína de entender cada cliente. Gostamos de relações leves, reuniões em que as pessoas se sintam à vontade para compartilhar suas ideias e de acompanhar de perto o crescimento de cada marca que passa por aqui.\n\nAfinal, quando conhecemos verdadeiramente uma empresa, deixamos de produzir conteúdo para ela e passamos a cuidar da sua comunicação.",
      ],
    },
    sobreFaixaRepeticoes: 6,
  },

  /**
   * FAQ. Copy inexistente. As objeções são conhecimento tácito da Andressa e
   * são melhores que qualquer lista genérica.
   */
  faq: {
    titulo: "Dúvidas",
    perguntas: [
      {
        pergunta:
          "<<A CONFIRMAR: as 5-7 objeções que a Andressa mais ouve>>",
        resposta: "",
      },
    ],
    faixaRepeticoes: 6,
  },

  /**
   * CTA Final. Copy do título e rótulo do botão pendentes. O rótulo deve ser
   * diferente do herói: no herói a pessoa decide se vale a pena; aqui ela já
   * decidiu.
   */
  ctaFinal: {
    titulo: "<<A CONFIRMAR: copy do fechamento>>",
    ctaLabel: "<<A CONFIRMAR: rótulo do botão diferente do herói>>",
    ctaOrigem: "cta-final",
  },

  footer: {
    cidade: "<<A CONFIRMAR: cidade>>",
    instagram: "@alandodigital",
  },
} as const;

/**
 * Mensagens de WhatsApp. Voz de quem visita (é a pessoa quem envia). Cada uma
 * distinguível da outra, seis mensagens quase iguais não rastreiam nada.
 *
 * Fonte: landing-page-structure.md §6. Um Record completo é obrigatório;
 * adicionar uma origem sem mensagem quebra o build.
 */
export type CtaOrigem =
  | "header"
  | "hero"
  | "servicos"
  | "processo"
  | "cta-final"
  | "sticky-mobile";

export const mensagensWhatsapp: Record<CtaOrigem, string> = {
  header: "Oi! Vim pelo site da Alando e quero falar com vocês.",
  hero: "Oi! Quero conversar sobre a comunicação da minha marca.",
  servicos:
    "Oi! Vi os serviços de vocês e quero entender qual faz sentido pra minha empresa.",
  processo:
    "Oi! Vi como vocês trabalham e queria entender como começar.",
  "cta-final":
    "Oi! Li a página inteira e quero começar uma conversa sobre a minha marca.",
  "sticky-mobile": "Oi! Quero falar com a Alando sobre a minha marca.",
} as const;
