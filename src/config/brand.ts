/**
 * Fonte de verdade dos hexes da marca e das famílias de fonte.
 *
 * ⚠️ Este arquivo e `src/app/globals.css` são os DOIS ÚNICOS lugares do projeto onde
 * pode existir um valor hex. Nada de `text-[#102F15]` em componente.
 * Auditável com: grep -rE '#[0-9a-fA-F]{3,8}' src/ --include=*.tsx --include=*.ts
 *
 * A paleta está FECHADA em nove tokens, e oito são hexes literais do manual da
 * Andressa (conferidos duas vezes na Fase 0: no PNG "Paleta de cores" e nos PNGs do
 * monograma). O único derivado é o `papel`. Se faltar uma cor, a resposta não é um
 * décimo token: é perguntar. Ver DESIGN-GUIDELINES.md §3.
 *
 * Os nomes são de PAPEL, não de cor. `ancora` não vira `verde-900`: o dia em que a
 * marca trocar de verde, o nome continua certo.
 */

/**
 * Os nove tokens.
 *
 * O formato deste bloco não é livre: `scripts/contraste.mjs` lê exatamente
 * `export const colors = { ... } as const;` para calcular a tabela de contraste.
 */
export const colors = {
  /** Cor âncora. Títulos sobre claro, CTA primário, faixa escura, footer. */
  ancora: "#102F15",
  /** Segundo escuro, quente. Hover do CTA, superfície do CtaFinal e do rodapé. */
  "ancora-quente": "#4C2B08",
  /** Superfície clara alternada, e texto de apoio sobre `ancora`. */
  "superficie-2": "#B3B793",
  /**
   * Alias de `superficie-2`, MESMO HEX, usado a 6-12% de opacidade.
   * Blobs, faixas de repetição, bordas. Nunca cor de texto, em nenhuma opacidade.
   * O alias existe para o código ficar legível sem a marca ganhar cor nenhuma.
   */
  decor: "#B3B793",
  /** Sublinhado, borda, marcador, número em display. Nunca texto normal, nunca botão. */
  acento: "#AB7743",
  /**
   * Texto de acento e anel de foco. Mesmo hex de `ancora-quente`, e isso não é atalho:
   * o caramelo está em 30,0° de matiz e este marrom em 30,9°. É o acento escurecido.
   */
  "acento-texto": "#4C2B08",
  /** Corpo de texto sobre `papel`, e superfície média quente de `Resultados`. */
  tinta: "#544635",
  /** Legendas e apoio sobre `papel`. O oliva do manual, que estava sobrando. */
  "tinta-suave": "#676127",
  /** ÚNICO DERIVADO: `#AB7743` a 8% sobre branco. O manual não tem neutro. */
  papel: "#F7F4EC",
} as const;

export type TokenDeCor = keyof typeof colors;

/**
 * O papel de cada token, em uma linha, para o `/styleguide` renderizar.
 *
 * Fica aqui e não no componente porque é informação de marca: trocar de cliente
 * deveria tocar `brand.ts`, `content.ts`, `globals.css` e mais nada. Um styleguide
 * que descreve a paleta com texto próprio vira documentação paralela, e documentação
 * paralela diverge.
 */
export const papeis: Record<TokenDeCor, string> = {
  ancora: "Títulos sobre claro, CTA primário, faixa escura, footer.",
  "ancora-quente":
    "Hover do CTA, e superfície escura quente do CtaFinal e do rodapé.",
  "superficie-2": "Superfície clara alternada, e texto de apoio sobre ancora.",
  decor:
    "Mesmo hex de superficie-2, a 6-12% de opacidade. Blobs, faixas, bordas. Nunca texto.",
  acento:
    "Sublinhado, borda, marcador, número em display. Nunca texto normal, nunca botão.",
  "acento-texto": "Texto de acento e anel de foco. É o acento escurecido.",
  tinta: "Corpo de texto sobre papel, e superfície média de Resultados.",
  "tinta-suave": "Legendas e apoio sobre papel.",
  papel: "Superfície base. Único derivado da paleta.",
};

/**
 * As cinco superfícies da página, revisadas em 29/07 depois de a Andressa dizer que
 * estava "muito verde". As três cores quentes existiam no sistema, mas só em papéis
 * tipográficos; promover `ancora-quente` e `tinta` a fundo é a correção direta.
 *
 * O `acento` NÃO está aqui de propósito: nenhum texto normal passa nele (melhor caso
 * 3,79:1). Ele é área decorativa, número em display e aresta de animação.
 */
export const superficies = [
  "papel",
  "superficie-2",
  "ancora",
  "ancora-quente",
  "tinta",
] as const satisfies readonly TokenDeCor[];

export type Superficie = (typeof superficies)[number];

/**
 * A marca em arquivo.
 *
 * Gerados por `node scripts/preparar-marca.mjs` a partir de `ref-files/Ícones /`,
 * recortados na moldura transparente e sem metadados. **Não existe SVG**, e não
 * vamos pedir: o deck da própria Alando coloca o lockup como raster de 588×343,
 * menor que os PNGs de 1080 que temos (AUDITORIA-FASE-0.md §3.1). O `next/image`
 * gera as variantes e serve cerca de 2 KB num monograma de 32px.
 *
 * O monograma NÃO é quadrado (447×512, retrato). Quem consome dimensiona pela
 * ALTURA e deixa a largura sair da proporção: header 32px, footer 40px. Esticar
 * ou rotacionar a marca está fora, sempre.
 *
 * ⚠️ Não existem ícones proprietários. `ref-files/Ícones /` são 16 PNGs deste
 * mesmo monograma, em versão preenchida e em contorno, nas oito cores da paleta.
 * As páginas de serviço do deck usam rótulos tipográficos em caixa alta, não
 * pictogramas. Consequência registrada: `Servicos` fica SEM ícone, e nenhum
 * conjunto genérico é desenhado, que é o clichê da DESIGN-GUIDELINES.md §2.5.
 */
export const marca = {
  monograma: {
    /** Tinta escura `#102F15`. Vai sobre `papel` e sobre `superficie-2`. */
    escuro: "/brand/monograma-escuro.png",
    /** Versão negativa, branca. Vai sobre `ancora`, `ancora-quente` e `tinta`. */
    claro: "/brand/monograma-claro.png",
    /** Dimensões intrínsecas do arquivo, para o `next/image` não ter CLS. */
    largura: 447,
    altura: 512,
  },
  /** As alturas de uso, em px. Alvo de toque de 44px é do link, não da imagem. */
  alturas: { header: 32, footer: 40 },
} as const;

/** Largura correspondente a uma altura de uso, mantendo a proporção da marca. */
export function larguraDoMonograma(altura: number): number {
  const { largura, altura: alturaOriginal } = marca.monograma;
  return Math.round((altura * largura) / alturaOriginal);
}

/**
 * As famílias, e por que são estas.
 *
 * A `asimilates` do deck não foi entregue e não é o lettering do logo (Fase 0, §1.2),
 * então display e editorial ficam em Playfair Display: mesma anatomia (serifada
 * display de contraste alto), já está no material dela, é OFL.
 *
 * As custom properties existem para que a troca de família seja UMA LINHA em
 * `layout.tsx`, se a Andressa comprar a licença webfont depois. Nenhum componente
 * conhece o nome da fonte.
 */
export const fonts = {
  display: {
    familia: "Playfair Display",
    variavel: "--font-display-family",
    papel: "Somente h1 e h2. Nunca em texto corrido.",
  },
  editorial: {
    familia: "Playfair Display Italic",
    variavel: "--font-editorial-family",
    papel: "Exatamente uma palavra por título display, e pull quotes.",
  },
  ui: {
    familia: "Montserrat",
    variavel: "--font-ui-family",
    papel: "Corpo de texto, botões, nav, labels, eyebrows, FAQ, footer.",
  },
} as const;
