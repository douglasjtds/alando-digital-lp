/**
 * Processa o ensaio bruto da cliente para `public/images/`.
 *
 * Registro do tratamento aplicado, não parte do build: copie para `scripts/` do
 * projeto, edite a tabela `FOTOS` e rode à mão com `node scripts/processar-fotos.mjs`
 * sempre que as fotos-fonte mudarem. Ter isto versionado é o que permite refazer o
 * ensaio inteiro meses depois sem tentar lembrar quais ajustes foram aplicados.
 *
 * Três decisões guiam o script:
 *
 * 1. **Saída em JPEG, não AVIF/WebP.** O `next/image` já converte para AVIF/WebP na
 *    borda (next.config.ts → images.formats). O que fica no repositório é o original
 *    de trabalho, e JPEG é o que a otimização do Next aceita melhor.
 *
 * 2. **Tratamento cromático unificado.** Ensaios de sessões diferentes chegam com
 *    temperaturas incompatíveis (interno quente, externo em sol pleno, luz de janela).
 *    Sem puxar as fotos para uma paleta comum, as externas leem como um segundo site
 *    colado no primeiro. A regra prática: dessature na direção da cor DECORATIVA da
 *    paleta e aqueça levemente. Ajuste olhando a página montada, não a foto isolada,
 *    o que decide o valor é a foto ao lado da outra.
 *
 *    ⚠️ **Duas exceções, e as duas são NOMEADAS, não uma abertura geral.** A regra
 *    existe para domar cor que é RUÍDO, ensaios que brigam entre si por temperatura.
 *    Onde a cor é o ASSUNTO, ela se inverte e passa a destruir o que a foto existe
 *    para mostrar:
 *
 *      `captacao-hero.jpg` (26/08)         o coral da caneca e o rosa da tela são o
 *                                          que a dessaturação come primeiro, e são
 *                                          o motivo daquela foto estar ali.
 *
 *      `servico-estruturacao.jpg` (02/09)  o print prova um trabalho de IDENTIDADE
 *                                          VISUAL. Os círculos terracota dos
 *                                          destaques e o feed em tons de terra são
 *                                          a entrega sendo mostrada, não ruído de
 *                                          temperatura. Média RGB medida do original:
 *                                          146,132,119, um neutro quente que já está
 *                                          dentro da família da paleta.
 *
 *    As cinco restantes continuam tratadas. (Os dois retratos também não levam os
 *    campos, mas por outro motivo, e não são exceção a nada: eles já vêm de parede
 *    clara com luz quente e não pedem ajuste nenhum.)
 *
 * 3. **Nomes semânticos.** `DSC03330.JPG` não diz nada seis meses depois;
 *    `retrato-hero.jpg` diz. O nome é o papel da foto na página.
 *
 * `sharp` vem junto com o Next; deliberadamente não está no package.json.
 */

import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import sharp from "sharp";

const execArquivo = promisify(execFile);

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Base dos originais: a raiz do projeto.
 *
 * Neste projeto as fontes estão espalhadas em três pastas (`drive-files/Dêssa/`,
 * `drive-files/Fotos captações/` e `ref-files/`), então cada entrada `de:` carrega o
 * caminho relativo completo em vez de a base apontar para uma pasta só.
 *
 * ⚠️ Os `.heic` NÃO são lidos direto: o `sharp` do projeto entende o cabeçalho HEIF
 * mas não decodifica HEVC. Quem resolve é o `decodificar()`, mais abaixo, e o
 * porquê está no bloco de comentário em cima dele.
 */
const PASTA_ORIGEM = ".";

const origem = (nome) => resolve(raiz, PASTA_ORIGEM, nome);
const destino = (nome) => resolve(raiz, "public", nome);

/**
 * EDITE ESTA TABELA. Uma linha por foto, do original ao destino.
 *
 * - `largura`/`altura`: sem `altura`, o redimensionamento é proporcional (`inside`).
 *   Com as duas, vira corte (`cover`), use `posicao` para escolher o que sobrevive.
 * - `saturacao` < 1 e `brilho`: só nas fotos que estão fora da paleta do conjunto.
 *   Mexer nas que já estão dentro só degrada a pele.
 * - `qualidade`: o padrão é 82 e ele vale para toda imagem que a pessoa OLHA. Só
 *   desça dele onde a imagem é textura passageira, e diga por quê na linha.
 * - Nenhuma imagem deve passar de ~200KB na maior variante. O script imprime o peso.
 */
const FOTOS = [
  /* ⚠️ Primeira das duas exceções de cor, e é de propósito. Ver a decisão 2 lá em
     cima. (Dizia "a ÚNICA sem `saturacao`/`brilho`" até 02/09, e isso já estava
     errado antes da segunda exceção existir: os dois retratos logo abaixo também não
     têm os campos.) Sem os dois campos o guarda mais abaixo não chama o `.modulate()`,
     e a foto sai com a cor que saiu da câmera. O `.rotate()` continua valendo para
     ela: é orientação, não cor, e é quem resolve a `EXIF orientation: 6` do arquivo
     original, que é 6000×4000 gravado deitado. Custo medido da exceção: 4 KB. */
  {
    de: "ref-files/foto lp.jpg",
    para: "images/captacao-hero.jpg",
    largura: 1200,
    nota: "Herói, bastidor da captação, candidata a LCP. Sem tratamento de cor",
  },
  {
    de: "drive-files/Dêssa/ChatGPT Image 30 de jul. de 2026, 11_53_02.png",
    para: "images/retrato-hero.jpg",
    largura: 1023,
    nota: "Retrato da Andressa, fora do herói desde 26/08, aguarda seção",
  },
  {
    de: "drive-files/Dêssa/ChatGPT Image 30 de jul. de 2026, 11_54_15.png",
    para: "images/retrato-sobre.jpg",
    largura: 1023,
    nota: "Sobre, retrato da Andressa",
  },
  {
    de: "drive-files/Fotos captações/A9B3B86F-9A66-4CB8-A311-51D5ABD3A392_1_105_c.jpeg",
    para: "images/servico-gestao.jpg",
    largura: 1100,
    saturacao: 0.72,
    brilho: 1.01,
    nota: "Serviços: Gestão de Redes Sociais",
  },
  {
    de: "drive-files/Fotos captações/AC271526-600C-4C27-8D42-D901AD22D74E_1_105_c.jpeg",
    para: "images/servico-video.jpg",
    largura: 1100,
    saturacao: 0.72,
    brilho: 1.01,
    nota: "Serviços: Produção de vídeo",
  },
  /* ── A SEQUÊNCIA DE QUADROS de Captação e edição de vídeos (02/09) ───────────
   *
   * Nove fotos que entram no MESMO slot do `servico-video.jpg` acima, trocando no
   * tempo. Ele continua sendo o quadro em repouso (o único que sai no HTML do
   * servidor), e estas nove são as posições 2 a 10 da sequência. O mecanismo está
   * em `SequenciaDeQuadros.tsx`, e o desvio de movimento que ele representa está
   * registrado na DESIGN-GUIDELINES.md §8.
   *
   * ── Por que elas LEVAM o tratamento de cor ───────────────────────────────────
   *
   * As duas exceções nomeadas acima podem sugerir que a régua afrouxou. Aqui é o
   * contrário, e por dois motivos que se somam:
   *
   *   1. Elas vêm de sessões incompatíveis entre si (loja de calçados com luz
   *      fria, cafeteria, mesa externa em sol pleno, cozinha branca, salão), que
   *      é exatamente o ruído de temperatura para o qual a regra foi escrita.
   *   2. Elas alternam com o `servico-video.jpg` NO MESMO PIXEL DA TELA. É a
   *      condição mais dura de coerência cromática que a página tem: duas fotos
   *      que se substituem no mesmo lugar não podem divergir de temperatura, ou a
   *      troca vira um salto de cor. Os `0.72`/`1.01` daqui não são cópia por
   *      inércia, são requisito: são os mesmos valores do quadro com que elas
   *      alternam.
   *
   * ── As duas que ficaram de fora ──────────────────────────────────────────────
   *
   * A pasta tem ONZE. Dois pares eram quase o mesmo quadro (`IMG_2333`/`IMG_2334`
   * e `IMG_7265`/`IMG_7266`), e no mesmo slot dois quadros iguais em sequência
   * leem como falha na troca, não como foto nova. Ficou a `2334`, onde a tela da
   * câmera está maior e legível, e a `7266`, com a expressão da cliente nítida.
   *
   * ── A ORDEM não é a do sistema de arquivos ───────────────────────────────────
   *
   * Fotos de contexto parecido ficam separadas por pelo menos duas outras (as duas
   * de salão, as duas de mesa). Quem para de rolar no meio da sequência tem que
   * ver duas fotos DIFERENTES em seguida.
   *
   * ⚠️ Sete das nove são material de TERCEIRO com pessoa identificável ou marca de
   * cliente legível, e só entram em `public/` porque a autorização escrita existe,
   * confirmada pelo Douglas em 02/09. Mesma linha que liberou o
   * `servico-estruturacao.jpg`.
   *
   * ── Por que 800 px e qualidade 76, e não os 1100/82 do resto ────────────────
   *
   * Porque aqui o peso é somado NOVE VEZES no mesmo bloco, e essa é a diferença
   * entre uma foto e uma sequência. Nos valores do `servico-video.jpg` (1100/82)
   * as nove davam **1,15 MB** numa seção só, com duas passando de 180 KB, numa
   * página cujo canal principal é link na bio do Instagram. A 800/76 elas somam
   * **766 KB**, e a mais pesada cai de 188 para 125 KB.
   *
   * O que 800 px cobre, medido: o slot dá 330 CSS px em desktop (a coluna de um
   * grid de 3 sobre um container de 1056) e ~350 px em 390. São 2,4x em desktop e
   * 2,3x num celular a DPR 2. É a mesma folga que as fotos aprovadas do `Processo`
   * têm, e estas são textura passageira: cada quadro fica 3,4 s na tela e a pessoa
   * nunca compara dois lado a lado.
   *
   * ⚠️ O `servico-video.jpg` NÃO desce junto. Ele é o quadro em repouso, o único
   * que sai no HTML do servidor e o único que quem tem `prefers-reduced-motion` vê:
   * esse é olhado de verdade, e continua em 1100/82.
   */
  {
    de: "drive-files/captação e edição de vídeo/IMG_5979.jpg",
    para: "images/video-quadro-01.jpg",
    largura: 800,
    qualidade: 76,
    saturacao: 0.72,
    brilho: 1.01,
    nota: "Quadro 01: tela mostra o bolo sendo coberto",
  },
  {
    de: "drive-files/captação e edição de vídeo/IMG_2337.heic",
    para: "images/video-quadro-02.jpg",
    largura: 800,
    qualidade: 76,
    saturacao: 0.72,
    brilho: 1.01,
    nota: "Quadro 02: câmera no tripé, cozinha",
  },
  {
    de: "drive-files/captação e edição de vídeo/IMG_1565.heic",
    para: "images/video-quadro-03.jpg",
    largura: 800,
    qualidade: 76,
    saturacao: 0.72,
    brilho: 1.01,
    nota: "Quadro 03: captação em loja de calçados",
  },
  {
    de: "drive-files/captação e edição de vídeo/IMG_2321.heic",
    para: "images/video-quadro-04.jpg",
    largura: 800,
    qualidade: 76,
    saturacao: 0.72,
    brilho: 1.01,
    nota: "Quadro 04: câmera nas mãos, balcão do café",
  },
  {
    de: "drive-files/captação e edição de vídeo/IMG_7268.HEIC",
    para: "images/video-quadro-05.jpg",
    largura: 800,
    qualidade: 76,
    saturacao: 0.72,
    brilho: 1.01,
    nota: "Quadro 05: braço erguendo a câmera, retrato no salão",
  },
  {
    de: "drive-files/captação e edição de vídeo/IMG_5913.HEIC",
    para: "images/video-quadro-06.jpg",
    largura: 800,
    qualidade: 76,
    saturacao: 0.72,
    brilho: 1.01,
    nota: "Quadro 06: gravação sobre os barris",
  },
  {
    de: "drive-files/captação e edição de vídeo/IMG_0504.jpg",
    para: "images/video-quadro-07.jpg",
    largura: 800,
    qualidade: 76,
    saturacao: 0.72,
    brilho: 1.01,
    nota: "Quadro 07: tela mostra duas pessoas na loja",
  },
  {
    de: "drive-files/captação e edição de vídeo/IMG_2334.heic",
    para: "images/video-quadro-08.jpg",
    largura: 800,
    qualidade: 76,
    saturacao: 0.72,
    brilho: 1.01,
    nota: "Quadro 08: câmera nas mãos, mesa externa",
  },
  {
    de: "drive-files/captação e edição de vídeo/IMG_7266.HEIC",
    para: "images/video-quadro-09.jpg",
    largura: 800,
    qualidade: 76,
    saturacao: 0.72,
    brilho: 1.01,
    nota: "Quadro 09: gravação diante do espelho",
  },
  /* ⚠️ SEGUNDA exceção de cor, e a única imagem da página que é ARTEFATO e não
     fotografia: uma captura do perfil de uma cliente, entregue como prova do serviço
     de Estruturação de Perfil (landing-page-structure.md §5.5). Três consequências:

     1. Sem `saturacao`/`brilho`. O motivo está na decisão 2 lá em cima.
     2. `largura: 1290` é a largura NATIVA do arquivo, então o `resize` não reduz
        nada: com `withoutEnlargement: true` ele é no-op. Está escrito assim de
        propósito, para o teto ficar explícito. Sai em 187 KB a q82, dentro do teto
        de 200 KB e a mais pesada do projeto. A 1100 px cairia para 146 KB, ao custo
        de a densidade em desktop ir de 2,01x para 1,71x.
     3. O original tem EXIF e IPTC (medidos). Sair por aqui é o que apaga os dois.

     ⚠️ É material de TERCEIRO, e só entra em `public/` porque a autorização escrita
     da cliente existe, confirmada pelo Douglas em 02/09. */
  {
    de: "drive-files/estruturação de perfil/IMG_3788.jpg",
    para: "images/servico-estruturacao.jpg",
    largura: 1290,
    nota: "Serviços: Estruturação de Perfil, print de perfil. Sem tratamento de cor",
  },
  {
    de: "drive-files/Fotos captações/2ED70A8D-1E75-48C5-8957-B161E9931D86_1_105_c.jpeg",
    para: "images/captacao-um.jpg",
    largura: 900,
    saturacao: 0.7,
    brilho: 1.02,
    nota: "Captação, uso em Processo",
  },
  {
    de: "drive-files/Fotos captações/A76CDC0F-A9BC-46A3-BEC0-24055F1B32E2_4_5005_c.jpeg",
    para: "images/captacao-dois.jpg",
    largura: 900,
    saturacao: 0.7,
    brilho: 1.02,
    nota: "Captação, uso em Processo",
  },
  {
    de: "drive-files/Fotos captações/B22CE5CA-B5AF-4E75-A526-9C62732E8B57_4_5005_c.jpeg",
    para: "images/captacao-tres.jpg",
    largura: 900,
    saturacao: 0.7,
    brilho: 1.02,
    nota: "Captação, uso em Processo",
  },
  /* ⚠️ As duas `og-image` saíram desta tabela até 02/08 e as duas estavam
     QUEBRADAS. Elas agora são montadas no bloco `OG` no fim do arquivo, com
     composição em vez de corte. O porquê está lá. */
];

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

const pendentes = FOTOS.filter((f) => f.de.startsWith("<<"));
if (pendentes.length > 0) {
  console.error(
    `\n  ${pendentes.length} de ${FOTOS.length} entradas ainda são marcadores.`,
  );
  console.error(
    "  Preencha o campo `de` de cada foto com o arquivo original.\n",
  );
  process.exit(1);
}

/* ── A entrada HEIC, e por que ela precisa de um passo a mais ─────────────────
 *
 * ⚠️ O cabeçalho deste arquivo dizia, até 02/09, que o `sharp` lia os `.heic`
 * direto. Ele não lê, e a forma como isso falha merece registro porque é
 * enganosa: o `sharp` que vem com o Next tem libheif SEM o decodificador de
 * HEVC. O cabeçalho HEIF ele entende, então `metadata()` responde certo
 * (`3213x5712`, `compression: "hevc"`) e tudo parece funcionar; quem quebra é
 * `toFile()`, na hora de decodificar os PIXELS, com um
 * `Support for this compression format has not been built in`.
 *
 * A afirmação antiga nunca tinha sido exercitada: até aqui a tabela `FOTOS` só
 * apontava para `.jpeg`, e as duas `.heic` de `Fotos captações/` estavam na
 * pasta sem serem usadas.
 *
 * A saída é decodificar por fora, com o `sips` do macOS, e entregar ao `sharp`
 * um TIFF sem perda (o `sips` preserva o perfil ICC, verificado: `srgb` com ICC
 * presente). Não é conversão de qualidade: a perda continua acontecendo uma vez
 * só, no JPEG final.
 *
 * Isto amarra o script ao macOS, e é aceitável porque ele já é ferramenta de mão
 * ("rode à mão quando as fotos-fonte mudarem"), não passo de build. Em outro
 * sistema, o equivalente é `heif-convert` (libheif-examples) ou um `sharp`
 * compilado com libde265.
 */
const ehHeic = (caminho) => /\.heic$/i.test(caminho);

/**
 * Devolve `{ caminho, limpar }`. Para tudo que não é HEIC, `caminho` é o próprio
 * original e `limpar` não faz nada.
 */
async function decodificar(caminho) {
  if (!ehHeic(caminho)) return { caminho, limpar: async () => {} };

  const pasta = await mkdtemp(join(tmpdir(), "alando-heic-"));
  const tiff = join(pasta, "quadro.tiff");

  try {
    await execArquivo("sips", ["-s", "format", "tiff", caminho, "--out", tiff]);
  } catch (erro) {
    await rm(pasta, { recursive: true, force: true });
    console.error(
      `\n  Não consegui decodificar ${caminho} com o \`sips\`.\n` +
        "  Este script depende dele para HEIC. Ver o bloco acima.\n",
    );
    throw erro;
  }

  return { caminho: tiff, limpar: () => rm(pasta, { recursive: true, force: true }) };
}

let acima = 0;

for (const foto of FOTOS) {
  const saida = destino(foto.para);
  await mkdir(dirname(saida), { recursive: true });

  const fonte = await decodificar(origem(foto.de));

  let size;
  try {
    let pipeline = sharp(fonte.caminho)
      /* Respeita a orientação EXIF antes de qualquer corte: sem isso, foto de celular
         sai deitada. (O TIFF que vem do `sips` já chega em pé, e aí o `.rotate()` é
         no-op: ele lê a orientação, e a do TIFF é 1.) */
      .rotate()
      .resize({
        width: foto.largura,
        height: foto.altura,
        fit: foto.altura ? "cover" : "inside",
        position: foto.posicao,
        withoutEnlargement: true,
      });

    if (foto.saturacao || foto.brilho) {
      pipeline = pipeline.modulate({
        saturation: foto.saturacao ?? 1,
        brightness: foto.brilho ?? 1,
      });
    }

    ({ size } = await pipeline
      .jpeg({ quality: foto.qualidade ?? 82, mozjpeg: true, progressive: true })
      .toFile(saida));
  } finally {
    await fonte.limpar();
  }

  if (size > 200 * 1024) acima += 1;

  console.log(
    `${size > 200 * 1024 ? "⚠️ " : "  "}${foto.para.padEnd(30)} ${kb(size).padStart(8)}  ${foto.nota}`,
  );
}

if (acima > 0) {
  console.log(
    `\n  ${acima} imagem(ns) acima de 200KB. Reduza a largura ou a qualidade.\n`,
  );
}

/* ── As duas og-image ─────────────────────────────────────────────────────────
 *
 * Por que elas saíram da tabela `FOTOS`: o pipeline genérico de lá redimensiona e
 * CORTA, e as duas coisas estavam erradas aqui. O estado até 02/08:
 *
 * 1. `og-image.jpg` era um retângulo INTEIRAMENTE PRETO. A fonte era
 *    `ref-files/Logos/1.png`, e a ordem de cores confirmada no
 *    `preparar-marca.mjs` diz que o `1` é o lockup PRETO. Sobre transparência o
 *    `sharp` achata o alfa em preto ao escrever JPEG: preto sobre preto.
 *    A fonte certa é a `2.png`, o lockup NEGATIVO (branco), sobre `ancora`.
 *
 * 2. `og-image-dessa.jpg` cortava o rosto da Andressa NA ALTURA DA BOCA. Um
 *    `cover` de um retrato 1023×1537 para uma moldura deitada de 1200 de largura
 *    não tem como não decapitar: a moldura é mais larga que a foto inteira.
 *
 * 3. As duas saíam em 1080×630 e 1023×630, não 1200×630, porque
 *    `withoutEnlargement: true` impede ampliar e nenhuma fonte tem 1200 de
 *    largura.
 *
 * A correção das três é a mesma: COMPOR sobre uma moldura de 1200×630 em vez de
 * cortar uma imagem até caber nela. A moldura é criada no tamanho certo, o
 * conteúdo entra dentro dela, e nada é ampliado nem decapitado.
 *
 * Isto não é capricho de pixel. `og:image` é o card de link no WhatsApp e no
 * Instagram, que a landing-page-structure.md §7 identifica como o lugar onde esta
 * página de fato circula.
 */

/* O hex NÃO é digitado aqui. Mesma leitura que o `contraste.mjs` faz do bloco
   `colors`, pelo mesmo motivo: a regra do CLAUDE.md é que hex só existe em
   `globals.css` e `brand.ts`, e um `#102F15` copiado para um script é uma cor
   que deixa de acompanhar a marca sem ninguém perceber. */
const fonteBrand = await readFile(resolve(raiz, "src/config/brand.ts"), "utf8");
const blocoCores = fonteBrand.match(
  /export const colors = \{([\s\S]*?)\n\} as const;/,
);
if (!blocoCores) {
  console.error(
    "\n  Não encontrei `export const colors = { ... } as const;` em src/config/brand.ts.\n",
  );
  process.exit(1);
}
const CORES = Object.fromEntries(
  [
    ...blocoCores[1].matchAll(
      /["']?([\w-]+)["']?\s*:\s*["'](#[0-9a-fA-F]{6})["']/g,
    ),
  ].map(([, nome, hex]) => [nome, hex]),
);

/** A moldura exigida pelo Open Graph. Abaixo disso o card degrada para o formato pequeno. */
const OG = { largura: 1200, altura: 630 };

/** O lockup horizontal com tagline, versão negativa. Ver `preparar-marca.mjs`. */
const LOCKUP_NEGATIVO = "ref-files/Logos/2.png";

/**
 * O `trim` é obrigatório: o original é 1080×1080 com o lockup ocupando 964×372 no
 * meio. Sem ele, "escalar o lockup para 760px" escala 760px de moldura
 * transparente e a marca sai pequena e desalinhada dentro do card.
 */
async function lockup(largura) {
  return sharp(origem(LOCKUP_NEGATIVO))
    .trim({ threshold: 1 })
    .resize({ width: largura })
    .toBuffer({ resolveWithObject: true });
}

function moldura(cor) {
  return sharp({
    create: {
      width: OG.largura,
      height: OG.altura,
      channels: 4,
      background: cor,
    },
  });
}

async function escrever(pipeline, nome, nota) {
  const saida = destino(nome);
  const { width, height, size } = await pipeline
    .jpeg({ quality: 86, mozjpeg: true, progressive: true })
    .toFile(saida);

  console.log(
    `  ${nome.padEnd(30)} ${`${width}×${height}`.padStart(9)} ${kb(size).padStart(8)}  ${nota}`,
  );
}

console.log("");

/* ── Versão A: só a marca ──────────────────────────────────────────────────── */

{
  const marca = await lockup(760);
  await escrever(
    moldura(CORES.ancora).composite([
      {
        input: marca.data,
        left: Math.round((OG.largura - marca.info.width) / 2),
        top: Math.round((OG.altura - marca.info.height) / 2),
      },
    ]),
    "og-image.jpg",
    "OG versão A: lockup negativo sobre ancora",
  );
}

/* ── Versão B: rosto e marca ───────────────────────────────────────────────── */

/**
 * A composição que a DESIGN-GUIDELINES.md §9 pede ("vale testar o preview com
 * rosto + marca"): retrato na faixa direita, marca no campo `ancora` à esquerda.
 *
 * O recorte do retrato é calculado, não adivinhado. A faixa da foto é 540×630, e
 * o recorte na fonte tem a MESMA proporção, tirado de uma fonte de 1023 de
 * largura: 1023 × 1193. Ele começa em y=120, o que mantém a cabeça inteira com
 * respiro (no original, o topo da cabeça está por volta de y=294). É por isso que
 * este bloco não usa `fit: cover` com `position`: a posição nomeada resolve para
 * um corte que ninguém mediu, e foi exatamente assim que a boca virou a borda de
 * cima do card.
 */
{
  const FOTO = { largura: 540, altura: 630 };
  const recorte = { esquerda: 0, topo: 120, largura: 1023 };
  const recorteAltura = Math.round(
    (recorte.largura * FOTO.altura) / FOTO.largura,
  );

  const retrato = await sharp(
    origem("drive-files/Dêssa/ChatGPT Image 30 de jul. de 2026, 11_53_02.png"),
  )
    .rotate()
    .extract({
      left: recorte.esquerda,
      top: recorte.topo,
      width: recorte.largura,
      height: recorteAltura,
    })
    .resize({ width: FOTO.largura, height: FOTO.altura })
    .toBuffer();

  const campo = OG.largura - FOTO.largura;
  const marca = await lockup(Math.round(campo * 0.74));

  await escrever(
    moldura(CORES.ancora).composite([
      { input: retrato, left: campo, top: 0 },
      {
        input: marca.data,
        left: Math.round((campo - marca.info.width) / 2),
        top: Math.round((OG.altura - marca.info.height) / 2),
      },
    ]),
    "og-image-dessa.jpg",
    "OG versão B: rosto e marca, para o card de WhatsApp",
  );
}

console.log("");
