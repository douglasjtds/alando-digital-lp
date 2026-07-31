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

import { mkdir } from "node:fs/promises";
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
  {
    de: "ref-files/Logos/1.png",
    para: "og-image.jpg",
    largura: 1200,
    altura: 630,
    posicao: "center",
    nota: "Open Graph versão A: monograma sobre fundo ancora",
  },
  {
    de: "drive-files/Dêssa/ChatGPT Image 30 de jul. de 2026, 11_53_02.png",
    para: "og-image-dessa.jpg",
    largura: 1200,
    altura: 630,
    posicao: "north",
    nota: "Open Graph versão B: rosto da Andressa, para WhatsApp",
  },
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
