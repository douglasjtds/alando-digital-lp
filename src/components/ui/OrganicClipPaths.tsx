/**
 * As quatro máscaras orgânicas da marca.
 *
 * A linguagem NÃO é genérica, e não podia ser: ela sai de duas fontes concretas
 * do material da Alando (DESIGN-GUIDELINES.md §2.2 e §6).
 *
 *   (a) os retângulos de amostra da paleta, que se sobrepõem em colunas de
 *       larguras desiguais  ->  a lógica de FAIXA VERTICAL DESLOCADA;
 *   (b) a linha de crista das montanhas na foto de fundo da paleta  ->  a CURVA
 *       ORGÂNICA, longa e assimétrica, sem vértice agudo.
 *
 * Máscara = crista de montanha aplicada a uma faixa deslocada. Nunca
 * `border-radius`, nunca círculo, nunca card retangular com sombra. E ninguém
 * nesta página aparece como recorte flutuante: a pessoa fica ancorada dentro da
 * máscara.
 *
 * ── O que diferencia uma da outra ────────────────────────────────────────────
 *
 * ⚠️ Aprendido no passe visual, e vale registrar porque não era óbvio: **a
 * crista não diferencia**. A primeira volta destas quatro variava só a curva da
 * base, e o resultado foi que duas delas liam como a mesma forma de longe,
 * "retângulo com topo limpo e uma ondulação embaixo". Curva orgânica de crista
 * é sempre parecida com outra curva orgânica de crista.
 *
 * Quem diferencia é a OUTRA metade do vocabulário, a que estava faltando: **o
 * DEGRAU, onde a faixa vertical se desloca**. Cada máscara tem um, e ele é a
 * variável estrutural:
 *
 *   crista-retrato  degrau à DIREITA, a 71% da altura
 *   crista-vale     degrau à ESQUERDA, mais baixo, e o recuo é maior
 *   crista-serra    SEM degrau, largura cheia. É a exceção, e é isso que a marca
 *   crista-faixa    as duas colunas deslocadas na VERTICAL, uma contra a outra
 *
 * ── Regras que valem para as quatro ──────────────────────────────────────────
 *
 * 1. Só curvas cúbicas, e a chegada é tangente nos encontros. Nenhum vértice
 *    agudo em lugar nenhum.
 * 2. As bordas horizontais são MONÓTONAS em x, e as verticais em y (a coordenada
 *    só cresce, ou só decresce, ao longo de cada aresta). É o que garante, por
 *    construção, que nenhuma se autointersecta: não é conferido no olho.
 * 3. As que cobrem RETRATO (`crista-retrato` e `crista-vale`) têm borda superior
 *    quase reta: é onde está a cabeça. Na `crista-retrato` isso deixou de ser
 *    literal em 26/08, quando o herói trocou o retrato pela foto de bastidor:
 *    lá o topo limpo protege a borda do notebook. A regra sobrevive à troca de
 *    foto porque o que ela pede é a mesma coisa nos dois casos, não invadir o
 *    alto do quadro.
 * 4. Canto arredondado é o mínimo para não virar vértice, nunca o suficiente
 *    para lembrar `border-radius`. Na `crista-faixa`, que é a mais exposta a
 *    esse risco, o canto ocupa menos de 4% da altura.
 *
 * `clipPathUnits="objectBoundingBox"`: coordenadas de 0 a 1, então a mesma forma
 * serve a qualquer proporção. A deformação que isso causa é desejada aqui, é o
 * que faz a mesma crista ler diferente em retrato e em paisagem.
 *
 * Renderizado UMA vez em `layout.tsx`, consumido por `clip-path: url(#id)`.
 */

/**
 * A do herói.
 *
 * Topo limpo. Largura cheia até 71% da altura, e aí um DEGRAU de 12% para dentro
 * na lateral direita. A base é uma crista longa com o pico à esquerda do centro.
 *
 * ── Por que o degrau desceu de 50% para 71% ─────────────────────────────────
 *
 * ⚠️ Ele entrava na MEIA altura até 26/08, e ali era corte caro. Medindo a foto
 * que ocupa este slot (área da máscara, e detalhe por variância local numa grade
 * de 60×90), o mapa de conteúdo dela é:
 *
 *   topo 38,9%   meio 46,4%   base 14,7%   |   esq 14,5%   centro 63,5%   dir 22,0%
 *
 * A base é fundo, então a crista lá embaixo é barata. O degrau na meia altura,
 * não: era o único ponto onde a máscara atravessava OBJETO em vez de fundo.
 * Descê-lo para baixo da caneca levou a máscara de 83,0% para 90,9% de área, e de
 * 89,7% para 95,0% do detalhe da foto.
 *
 * A profundidade continua 12% de propósito. As outras três máscaras foram
 * medidas na mesma foto e nenhuma delas chegava perto (`vale` 89,2%, `serra`
 * 88,6%, `faixa` 89,5%): trocar de máscara não era a saída, e afinar o degrau
 * para 6% dava 92,9% ao custo de apagar o único traço que distingue esta forma
 * da `crista-serra`. O degrau é o vocabulário. Ele desce, não encolhe.
 *
 * Os números acima são do `captacao-hero.jpg` SEM tratamento de cor, que é o que
 * o `processar-fotos.mjs` produz desde 26/08. Refazer a conta em cima de uma
 * versão dessaturada move três deles em 0,1 ponto e não muda conclusão nenhuma.
 */
const CRISTA_RETRATO = [
  "M 0.000,0.036",
  "C 0.300,0.012 0.640,0.003 0.940,0.018" /*      topo, limpo                  */,
  "C 0.968,0.020 0.986,0.042 0.988,0.080" /*      canto superior direito       */,
  "C 0.990,0.300 0.990,0.520 0.988,0.706" /*      lateral direita, cheia       */,
  "C 0.986,0.748 0.950,0.772 0.900,0.784" /*  ←── O DEGRAU, 12% para dentro    */,
  "C 0.880,0.789 0.870,0.806 0.869,0.836" /*      lateral direita, recuada     */,
  "C 0.866,0.888 0.842,0.936 0.782,0.962" /*      crista desce                 */,
  "C 0.680,1.000 0.556,0.980 0.446,0.950" /*      crista sobe: o pico          */,
  "C 0.338,0.920 0.214,0.958 0.106,0.986" /*      crista cai para a esquerda   */,
  "C 0.056,0.998 0.012,0.984 0.005,0.940" /*      canto inferior esquerdo      */,
  "C 0.000,0.640 0.000,0.320 0.000,0.036" /*      lateral esquerda             */,
  "Z",
].join(" ");

/**
 * Retrato do Sobre.
 *
 * Topo limpo. O degrau está na lateral ESQUERDA, é maior (12%) e vem mais baixo
 * (a 40% da altura), então a forma perde largura embaixo à esquerda em vez de à
 * direita. Na base, um vale fundo à direita no lugar de um pico ao centro.
 */
const CRISTA_VALE = [
  "M 0.014,0.036",
  "C 0.320,0.010 0.660,0.000 0.972,0.018" /*      topo, limpo                  */,
  "C 0.990,0.020 1.000,0.042 1.000,0.080" /*      canto superior direito       */,
  "C 1.000,0.280 0.999,0.480 0.998,0.640" /*      lateral direita, cheia       */,
  "C 0.996,0.760 0.976,0.868 0.936,0.930" /*      entrada do vale              */,
  "C 0.900,0.986 0.856,1.000 0.812,0.992" /*      o fundo do vale, à direita   */,
  "C 0.740,0.980 0.700,0.898 0.618,0.876" /*      sobe do vale                 */,
  "C 0.516,0.850 0.412,0.898 0.306,0.892" /*      ombro longo                  */,
  "C 0.242,0.888 0.186,0.868 0.148,0.836" /*      desce para o canto           */,
  "C 0.128,0.818 0.120,0.792 0.119,0.752" /*      canto inferior esquerdo      */,
  "C 0.118,0.620 0.117,0.480 0.117,0.396" /*      lateral esquerda, recuada    */,
  "C 0.116,0.330 0.092,0.296 0.048,0.284" /*  ←── O DEGRAU, volta para fora    */,
  "C 0.028,0.278 0.016,0.256 0.015,0.220" /*      transição                    */,
  "C 0.014,0.150 0.014,0.090 0.014,0.036" /*      lateral esquerda, cheia      */,
  "Z",
].join(" ");

/**
 * Paisagem, e as fotos de captação.
 *
 * A única sem degrau: largura cheia dos dois lados, e é justamente isso que a
 * torna reconhecível ao lado das outras três. A crista vai para o TOPO, porque
 * aqui não há cabeça a proteger: dois picos desiguais com um vale fundo entre
 * eles, que é a linha de crista da foto da paleta.
 */
const CRISTA_SERRA = [
  "M 0.000,0.238",
  "C 0.076,0.150 0.166,0.036 0.276,0.028" /*      primeiro pico               */,
  "C 0.372,0.021 0.436,0.190 0.542,0.196" /*      o vale entre os dois         */,
  "C 0.652,0.202 0.760,0.046 0.884,0.030" /*      segundo pico, mais alto      */,
  "C 0.946,0.022 0.986,0.056 0.992,0.118" /*      canto superior direito       */,
  "C 0.998,0.330 1.000,0.530 0.996,0.720" /*      lateral direita              */,
  "C 0.990,0.840 0.926,0.928 0.820,0.950" /*      corte na base direita        */,
  "C 0.560,0.996 0.300,1.000 0.086,0.972" /*      base rasa                    */,
  "C 0.030,0.964 0.002,0.918 0.000,0.848" /*      canto inferior esquerdo      */,
  "C 0.000,0.640 0.000,0.430 0.000,0.238" /*      lateral esquerda             */,
  "Z",
].join(" ");

/**
 * Bloco pequeno e thumbnail de portfólio.
 *
 * A faixa deslocada em estado puro, e o deslocamento aqui é VERTICAL: a coluna
 * da esquerda ocupa de 0.19 a 0.94 e a da direita de 0.05 a 0.63, ou seja, uma
 * está mais baixa que a outra, como os retângulos de amostra da paleta. Topo e
 * base ondulam em fases opostas. Cantos deliberadamente curtos: é a máscara com
 * mais risco de parecer `border-radius`, e o canto ocupa menos de 4% da altura.
 */
const CRISTA_FAIXA = [
  "M 0.000,0.190",
  "C 0.110,0.150 0.220,0.196 0.330,0.164" /*      topo, primeira onda          */,
  "C 0.470,0.126 0.590,0.040 0.730,0.022" /*      topo sobe forte à direita    */,
  "C 0.830,0.010 0.930,0.006 0.986,0.010" /*      topo quase reto no fim       */,
  "C 0.995,0.011 1.000,0.022 1.000,0.046" /*      canto, curto de propósito    */,
  "C 1.000,0.240 1.000,0.440 0.998,0.630" /*      coluna direita, mais ALTA    */,
  "C 0.996,0.700 0.984,0.760 0.960,0.812" /*      base começa a descer         */,
  "C 0.880,0.900 0.760,0.958 0.626,0.972" /*      base, fase oposta ao topo    */,
  "C 0.500,0.986 0.380,0.958 0.256,0.982" /*      base, segunda onda           */,
  "C 0.150,1.000 0.060,0.996 0.014,0.976" /*      base                         */,
  "C 0.004,0.972 0.000,0.960 0.000,0.936" /*      canto, curto de propósito    */,
  "C 0.000,0.740 0.000,0.440 0.000,0.190" /*      coluna esquerda, mais BAIXA  */,
  "Z",
].join(" ");

/**
 * O catálogo, exportado para o `/styleguide` renderizar as quatro sem repetir
 * os `id` à mão. `nota` diz onde cada uma entra e por quê.
 */
export const MASCARAS = [
  {
    id: "crista-retrato",
    d: CRISTA_RETRATO,
    nota: "Herói. Topo limpo, degrau à direita a 71% da altura, pico ao centro da base.",
  },
  {
    id: "crista-vale",
    d: CRISTA_VALE,
    nota: "Sobre. Topo limpo, degrau à esquerda e mais baixo, vale fundo à direita.",
  },
  {
    id: "crista-serra",
    d: CRISTA_SERRA,
    nota: "Paisagem e captação. A única sem degrau, e a crista vai para o topo.",
  },
  {
    id: "crista-faixa",
    d: CRISTA_FAIXA,
    nota: "Bloco pequeno. Colunas deslocadas na vertical, uma mais baixa que a outra.",
  },
] as const;

export type IdDeMascara = (typeof MASCARAS)[number]["id"];

/**
 * O `<svg>` só existe para hospedar os `<clipPath>`.
 *
 * `position:absolute; width:0; height:0` e não `display:none`: elemento fora do
 * fluxo de render continua sendo alvo válido de `url(#id)` em todo navegador, e
 * `display:none` já teve histórico de quebrar a referência. Custa nada manter o
 * jeito seguro.
 */
export function OrganicClipPaths() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        {MASCARAS.map(({ id, d }) => (
          <clipPath key={id} id={id} clipPathUnits="objectBoundingBox">
            <path d={d} />
          </clipPath>
        ))}
      </defs>
    </svg>
  );
}
