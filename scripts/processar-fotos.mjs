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
 * 3. **Nomes semânticos.** `DSC03330.JPG` não diz nada seis meses depois;
 *    `retrato-hero.jpg` diz. O nome é o papel da foto na página.
 *
 * `sharp` vem junto com o Next; deliberadamente não está no package.json.
 */

import { mkdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Base dos originais: a raiz do projeto.
 *
 * Neste projeto as fontes estão espalhadas em três pastas (`drive-files/Dêssa/`,
 * `drive-files/Fotos captações/` e `ref-files/`), então cada entrada `de:` carrega o
 * caminho relativo completo em vez de a base apontar para uma pasta só.
 *
 * O `sharp` aqui é 0.34.5 com entrada HEIF, então os `.heic` das fotos de captação
 * (que são as de maior resolução) são lidos direto, sem conversão prévia.
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
 * - Nenhuma imagem deve passar de ~200KB na maior variante. O script imprime o peso.
 */
const FOTOS = [
  {
    de: "drive-files/Dêssa/ChatGPT Image 30 de jul. de 2026, 11_53_02.png",
    para: "images/retrato-hero.jpg",
    largura: 1023,
    nota: "Herói, retrato da Andressa, candidata a LCP",
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

let acima = 0;

for (const foto of FOTOS) {
  const saida = destino(foto.para);
  await mkdir(dirname(saida), { recursive: true });

  let pipeline = sharp(origem(foto.de))
    /* Respeita a orientação EXIF antes de qualquer corte: sem isso, foto de celular
       sai deitada. */
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

  const { size } = await pipeline
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(saida);

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
