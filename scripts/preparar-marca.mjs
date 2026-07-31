/**
 * Prepara o monograma da Alando para `public/brand/`.
 *
 * Mesma filosofia do `processar-fotos.mjs` ao lado: o tratamento fica
 * versionado, não é passo de build, e roda à mão quando a fonte mudar.
 * `node scripts/preparar-marca.mjs`
 *
 * ── Por que é script separado, e não uma linha na tabela `FOTOS` ─────────────
 *
 * O `processar-fotos.mjs` escreve JPEG, que é o certo para fotografia e o que o
 * `next/image` otimiza melhor. O monograma precisa do CANAL ALFA: passar a marca
 * por lá a colocaria sobre um fundo preto opaco. Daí PNG, e daí arquivo próprio.
 *
 * ── O que a Fase 0 já resolveu, e este script assume ─────────────────────────
 *
 * Não existe SVG da marca, e não vamos pedir: o próprio deck da Alando coloca o
 * lockup como raster de 588×343, menor que os PNGs de 1080 que temos, então
 * `ref-files/` é a melhor fonte que existe (AUDITORIA-FASE-0.md §3.1). O
 * `next/image` gera as variantes e serve cerca de 2 KB num monograma de 32px.
 *
 * A ordem das oito cores nos arquivos numerados foi confirmada amostrando os
 * pixels de cada um: preto, BRANCO, #102F15, #544635, #B3B793, #AB7743,
 * #676127, #4C2B08. Por isso `2.png` e `3.png`.
 */

import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * `altura: 512` cobre com folga o maior uso previsto (footer a 40px em telas
 * 3x = 120px) e ainda deixa margem para a marca d'água estática, se ela for
 * usada. Guardar o 1080 original não compraria nada: o `next/image` redimensiona
 * a partir do que estiver aqui, e o arquivo grande só pesaria no repositório.
 */
const ALTURA = 512;

const MARCAS = [
  {
    de: "ref-files/Ícones /3.png",
    para: "public/brand/monograma-escuro.png",
    nota: "Tinta escura (#102F15). Para superfície clara: header, corpo da página.",
  },
  {
    de: "ref-files/Ícones /2.png",
    para: "public/brand/monograma-claro.png",
    nota: "Versão negativa (branca). Para ancora, ancora-quente e tinta.",
  },
];

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

for (const marca of MARCAS) {
  const saida = resolve(raiz, marca.para);
  await mkdir(dirname(saida), { recursive: true });

  const { width, height, size } = await sharp(resolve(raiz, marca.de))
    /* O original é 1080×1080 com o monograma ocupando 656×752 no meio. Sem o
       `trim`, um logo pedido a 32px renderiza a marca a ~22px cercada de ar, e
       ninguém entende por que o header parece torto. */
    .trim({ threshold: 1 })
    .resize({ height: ALTURA, withoutEnlargement: true })
    /* Sem `withMetadata()`: é isto que remove os metadados do arquivo de saída. */
    .png({ compressionLevel: 9, palette: true })
    .toFile(saida);

  console.log(
    `  ${marca.para.padEnd(36)} ${`${width}×${height}`.padStart(9)} ${kb(size).padStart(7)}  ${marca.nota}`,
  );
}

console.log(
  "\n  Confira as dimensões acima contra `marca.monograma` em src/config/brand.ts.\n",
);
