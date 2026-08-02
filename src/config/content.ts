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
      corpo: "A identidade visual é muito mais do que um logotipo bonito. Ela é a primeira impressão que as pessoas terão sobre a sua empresa.\n\nPor isso, antes de pensar em cores, tipografia ou símbolos, buscamos entender quem é a sua marca, quais sensações ela deve transmitir e como deseja ser lembrada. O resultado é uma identidade que representa sua essência e acompanha o crescimento do seu negócio.",
      fechamento: "Ideal para empresas que estão começando ou passando por um reposicionamento",
      destaque: false,
      foto: "",
      fotoAlt: "",
    },
    {
      titulo: "Estruturação de Perfil",
      corpo: "Antes de publicar conteúdo, existe um perfil inteiro que precisa comunicar confiança.\n\nAnalisamos cada detalhe do seu Instagram para que ele deixe claro quem é a sua empresa, o que ela faz e por que alguém deveria escolher você. Ajustamos biografia, destaques, identidade visual, organização das informações e toda a experiência de quem chega ao seu perfil pela primeira vez.\n\nPorque, muitas vezes, o cliente decide se continua navegando ou fecha o Instagram em poucos segundos.",
      fechamento: "",
      destaque: false,
      foto: "",
      fotoAlt: "",
    },
    {
      titulo: "Gestão de Redes Sociais",
      corpo: "Esse é o coração da Alando.\n\nNossa gestão vai muito além de criar artes e escrever legendas. Nós mergulhamos na sua marca para construir uma comunicação que tenha personalidade, gere conexão e fortaleça o seu posicionamento.\n\nTudo começa com um diagnóstico profundo do seu negócio. A partir dele, desenvolvemos o planejamento estratégico, criamos os roteiros, produzimos os conteúdos, acompanhamos os resultados e ajustamos a comunicação conforme sua empresa evolui.\n\nVocê deixa de apenas alimentar um perfil e passa a construir uma marca que as pessoas reconhecem e lembram.",
      fechamento: "",
      destaque: true,
      foto: "",
      fotoAlt: "",
    },
    {
      titulo: "Captação e edição de vídeos",
      corpo: "Sabemos que aparecer na câmera nem sempre é fácil.\n\nPor isso, nossa equipe conduz toda a gravação de forma leve e natural, criando um ambiente em que você se sinta confortável para falar sobre aquilo que faz todos os dias.\n\nTambém pensamos em cada cena, enquadramento e roteiro para que os vídeos reflitam a essência da sua marca, e não apenas acompanhem tendências.\n\nDepois da gravação, todo o material passa pela edição para transformar boas imagens em conteúdos estratégicos.",
      fechamento: "",
      destaque: false,
      /* A única foto da seção, e é a que casa com o serviço que ela mostra:
         literalmente uma câmera enquadrando a cena. `alt` descritivo, escrito
         aqui, não é copy da cliente. */
      foto: "/images/servico-video.jpg",
      fotoAlt:
        "Mão segurando uma câmera cuja tela mostra a mesa posta que está sendo fotografada.",
    },
    {
      titulo: "Landing Pages",
      corpo: "Uma boa campanha merece uma página que continue a conversa iniciada no anúncio.\n\nDesenvolvemos landing pages pensadas para apresentar sua empresa, transmitir confiança e conduzir o visitante até a ação que realmente importa, seja solicitar um orçamento, preencher um formulário ou realizar uma compra.\n\nAssim como todo o nosso trabalho, cada página é construída de forma personalizada, respeitando a identidade e o posicionamento da sua marca.",
      fechamento: "",
      destaque: false,
      foto: "",
      fotoAlt: "",
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
    "Você passa a contar com uma equipe que se preocupa em entender sua empresa como ela realmente é.\n\nPorque acreditamos que nenhuma estratégia funciona quando tenta encaixar todas as marcas na mesma fórmula.\n\nNosso trabalho é justamente o contrário: descobrir o que torna o seu negócio único e transformar isso em uma comunicação que faça sentido para você e para quem está do outro lado da tela.",
  servicosCTA: "Quero conhecer o processo",
  servicosFaixaRepeticoes: 6,

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
   * Processo. Copy inexistente, apenas marcadores de pendência. Prazo é
   * promessa contratual: nunca inventar, sempre confirmar com a cliente.
   *
   * É o ÚNICO lugar da página onde 01/02/03 se justifica, porque o conteúdo é de
   * fato uma sequência, e por isso vem em `<ol>`. Em qualquer outra seção a
   * numeração é decoração.
   */
  processo: {
    titulo: "Como funciona",
    tituloPalavraItalica: "funciona",
    etapas: [
      "<<A CONFIRMAR: o processo real, passo a passo, com as palavras dela>>",
    ],
    prazos: "<<A CONFIRMAR: prazos reais de cada etapa>>",
    processoCTA: "Quero começar agora",
    processoCTAOrigem: "processo",
    faixaRepeticoes: 6,
  },

  /**
   * Sobre, em dois movimentos, na ordem da copy.
   *
   * ⚠️ Os dois `fotoAlt` são texto DESCRITIVO escrito aqui, não copy da
   * Andressa: `alt` descreve o que a foto mostra e é obrigação de
   * acessibilidade. Ambos dizem só o que está no quadro. O da equipe em especial
   * NÃO afirma que as duas pessoas são da Alando, porque a foto é de uma
   * captação em cliente e não dá para saber quem é quem.
   */
  sobre: {
    historia: {
      titulo: "Nossa história",
      palavraItalica: "história",
      fotoAlt:
        "Andressa Lando, fundadora da Alando Digital, de pé em frente a uma estante com plantas.",
      corpo: [
        "A Alando nasceu oficialmente em 2022, mas a nossa história com marcas começou muito antes.\n\nDesde 2017, cuidamos da comunicação de empresas que acreditavam que marketing poderia ser mais do que apenas estar presente nas redes sociais. Ao longo desses anos, percebemos algo que mudaria completamente a nossa forma de trabalhar: muitas empresas investiam em conteúdo, mas poucas realmente construíam uma marca.\n\nFoi dessa inquietação que nasceu a Alando.\n\nCriamos uma agência que escolheu fazer diferente. Em vez de começar perguntando quantos posts o cliente queria publicar por mês, passamos a fazer perguntas muito mais importantes: qual é a essência da sua marca? O que faz sua empresa ser única? Como você quer ser lembrado pelas pessoas?\n\nPorque acreditamos que uma comunicação forte não nasce de tendências. Ela nasce de entendimento.\n\nHoje, esse continua sendo o ponto de partida de todos os nossos projetos. Antes de pensar em estratégias, campanhas ou conteúdos, mergulhamos na história de cada empresa para construir uma comunicação que realmente faça sentido para quem ela é.\n\nÉ por isso que dizemos que criamos e gerenciamos marcas de forma artesanal. Não porque fazemos menos, mas porque fazemos com atenção, intenção e respeito aos detalhes que tornam cada negócio único.",
      ],
    },
    equipe: {
      titulo: "Quem está por trás da Alando",
      fotoAlt:
        "Captação em andamento: uma pessoa organiza os doces na bancada enquanto outra enquadra a cena na câmera.",
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
   *
   * ⚠️ UM item, não cinco slots vazios. A §5.9 pede 5 a 7 perguntas, e a Fase 5D
   * montou a estrutura com o único par que existe: um marcador de pergunta e um
   * de resposta. Repetir o marcador sete vezes para "ver o layout cheio" daria
   * uma falsa impressão de seção pronta, e a §5.9 é explícita: o que falta é a
   * lista real de objeções dela.
   *
   * `resposta` deixou de ser string vazia na Fase 5D: com ela vazia, o
   * `<details>` abria em nada e a pendência sumia justamente no lugar onde
   * alguém iria procurá-la.
   *
   * ⚠️ Quando as perguntas chegarem, elas e o JSON-LD `FAQPage` da Fase 6
   * precisam bater PALAVRA POR PALAVRA. Se divergirem, o Google detecta e passa
   * a ignorar o markup inteiro (landing-page-structure.md §7).
   *
   * ⚠️⚠️ `titulo` NÃO É COPY DA ANDRESSA, e é o TERCEIRO caso do arquivo, junto
   * com `momentos.titulo` e `servicosTitulo`. A copy não tem seção de dúvidas
   * nenhuma, então "Dúvidas" veio da âncora `#duvidas` da estrutura (§7). Fica
   * na mesma lista de decisões de copy esperando o Douglas.
   */
  faq: {
    titulo: "Dúvidas",
    perguntas: [
      {
        pergunta:
          "<<A CONFIRMAR: as 5-7 objeções que a Andressa mais ouve>>",
        resposta:
          "<<A CONFIRMAR: a resposta de cada objeção, em prosa, 2 a 4 frases, com as palavras dela>>",
      },
    ],
    faixaRepeticoes: 6,
  },

  /**
   * CTA Final. Copy do título e rótulo do botão pendentes. O rótulo deve ser
   * diferente do herói: no herói a pessoa decide se vale a pena; aqui ela já
   * decidiu.
   *
   * ⚠️ O título precisa nomear a ÚLTIMA objeção, que numa agência raramente é o
   * serviço: costuma ser "será que eu preciso disso agora" ou "será que dá para
   * começar pequeno" (§5.10). Material da própria marca para inspirar, no deck
   * p. 24: "Será um prazer fazer parte da próxima fase da sua marca." e "Vamos
   * construir isso juntos?". Não transcrevi nenhuma das duas para cá: escolher
   * uma seria decidir a copy do fechamento no lugar do Douglas.
   *
   * ⚠️ `faixaRepeticoes` em 1 enquanto o título for marcador: a faixa rende só
   * a instância legível, sem cópias. **Sobe para 6 junto com o título real**, e
   * é a única mudança necessária para a seção ganhar a titulação da marca.
   */
  ctaFinal: {
    titulo: "<<A CONFIRMAR: copy do fechamento>>",
    ctaLabel: "<<A CONFIRMAR: rótulo do botão diferente do herói>>",
    ctaOrigem: "cta-final",
    faixaRepeticoes: 1,
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
