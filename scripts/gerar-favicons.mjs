import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const origem = (nome) => resolve(raiz, nome);
const destino = (nome) => resolve(raiz, "public", nome);

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

const FAVICONS = [
  {
    de: "ref-files/Ícones /3.png",
    para: "favicon.ico",
    tamanho: 192,
    nota: "favicon.ico 192×192, monograma escuro",
  },
  {
    de: "ref-files/Ícones /3.png",
    para: "apple-touch-icon.png",
    tamanho: 180,
    nota: "apple-touch-icon.png 180×180, monograma escuro",
  },
];

await mkdir(dirname(destino(".")), { recursive: true });

for (const icon of FAVICONS) {
  const saida = destino(icon.para);
  const { size } = await sharp(origem(icon.de))
    .trim({ threshold: 1 })
    .resize({ width: icon.tamanho, height: icon.tamanho, fit: "cover" })
    .png({ compressionLevel: 9 })
    .toFile(saida);

  console.log(
    `  ${icon.para.padEnd(30)} ${`${icon.tamanho}×${icon.tamanho}`.padStart(9)} ${kb(size).padStart(7)}  ${icon.nota}`
  );
}

console.log();
