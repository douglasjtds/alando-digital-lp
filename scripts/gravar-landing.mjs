/**
 * Grava a landing page de uma cliente rolando, para a prova do serviço Landing Pages.
 *
 * Registro do recorte aplicado, não parte do build: rode à mão com
 * `node scripts/gravar-landing.mjs` sempre que a página-fonte mudar. Mesma razão
 * do `processar-fotos.mjs`: ter isto versionado é o que permite refazer o vídeo
 * meses depois sem tentar lembrar de largura, duração, curva e qualidade.
 *
 * ⚠️ MATERIAL DE TERCEIRO. A página é de uma cliente, e o vídeo só entra em
 * `public/` porque a autorização escrita existe, confirmada pelo Douglas em
 * 03/09. É a mesma linha que liberou o `servico-estruturacao.jpg` em 02/09.
 *
 * ── Por que vídeo, e onde isso está registrado ───────────────────────────────
 *
 * É o SEGUNDO desvio da DESIGN-GUIDELINES.md §8, decidido pelo Douglas em 03/09
 * com o texto do primeiro na mesa. O argumento e as contenções estão escritos lá.
 * Não trate como precedente: leia a §8 antes de propor um terceiro.
 *
 * ── As cinco decisões do pipeline ────────────────────────────────────────────
 *
 * 1. **Captura fatiada, não `fullPage`.** A página tem ~8580 CSS px e a 2x isso
 *    dá ~17160 px de altura, acima do limite de textura do Chrome (16384). Uma
 *    captura de página inteira ali sai truncada, e sai em silêncio. Então a
 *    imagem alta é montada de fatias de no máximo 4000 CSS px.
 *
 * 2. **`prefers-reduced-motion: reduce` emulado, e é obrigatório.** A página-fonte
 *    usa reveal por scroll. Sem isso, a captura pega títulos a meia opacidade e
 *    blocos ainda invisíveis, porque nada disparou o observer deles. Com a
 *    preferência ligada ela renderiza estática e 100% visível, que é a regra que
 *    aquela página segue.
 *
 * 3. **Elementos fixos são neutralizados.** Cabeçalho fixo apareceria uma vez por
 *    fatia, ou seja, sete vezes no meio da imagem alta. O cabeçalho vira
 *    `absolute` no topo (é onde ele está quando alguém chega na página) e o resto
 *    do que é `fixed` sai. Sem isso o vídeo mostra a barra flutuando no meio do
 *    conteúdo, que é defeito de captura, não a página da cliente.
 *
 * 4. **A imagem alta é fatiada a partir de um buffer CRU, não do PNG.** São ~190
 *    quadros: reabrir e decodificar um PNG de 44 Mpx a cada um deles levaria
 *    minutos. Decodificado uma vez para RGB cru, cada recorte vira cópia de
 *    memória.
 *
 * 5. **O CRF é escolhido por medição, não por chute.** O script encoda numa
 *    escada de qualidade e fica com o melhor que couber no orçamento, imprimindo
 *    todos. Se nenhum couber, ele diz, e a decisão volta para o Douglas.
 *
 * `sharp` vem junto com o Next. `puppeteer-core` e `ffmpeg-static` são
 * devDependencies de ferramenta local: nenhum dos três vai para o bundle.
 */

import {
  mkdir,
  readFile,
  readdir,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { execFile } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import ffmpeg from "ffmpeg-static";
import puppeteer from "puppeteer-core";
import sharp from "sharp";

const executar = promisify(execFile);
const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/* ── Configuração ──────────────────────────────────────────────────────────── */

const URL_FONTE = "https://bruna-magalhaes.vercel.app/";

/**
 * O quadro do vídeo, em CSS px, e ele é DUAS coisas ao mesmo tempo: a largura de
 * captura (a página-fonte é diagramada nesta largura) e a largura de saída.
 *
 * ── Por que 964, e não 1284 ──────────────────────────────────────────────────
 *
 * O campo da prova dá 642 CSS px em desktop (76% do container de 1056), então
 * 1284 seria o 2x exato. Medi as duas larguras com o mesmo ritmo e os mesmos
 * keyframes, e 1284 não coube:
 *
 *   1284×800   crf 34   528 KB   crf 36   447 KB   ← nem no pior degrau cabe
 *    964×600   crf 34   359 KB                     ← escolhida
 *
 * A 964 a densidade cai de 2,0x para 1,5x, e a perda é menor do que o número
 * sugere por dois motivos: vídeo já é mais macio que imagem, e a página-fonte
 * passa a ser diagramada em 964, o que deixa o texto dela PROPORCIONALMENTE
 * maior dentro do quadro. Conferido em quadro extraído do MP4 final, não no
 * número.
 *
 * `QUADRO=1284x800 node scripts/gravar-landing.mjs` refaz a comparação.
 */
const QUADRO = process.env.QUADRO
  ? {
      largura: Number(process.env.QUADRO.split("x")[0]),
      altura: Number(process.env.QUADRO.split("x")[1]),
    }
  : { largura: 964, altura: 600 };
const ESCALA = 2;

/** 24 quadros por segundo. Cinema, e 20% menos bytes que 30 sem perda percebida
    num movimento de translação. */
const FPS = 24;

/**
 * ⚠️ O RITMO É PARADA E AVANÇO, NÃO ROLAGEM CONTÍNUA, e a decisão veio de medir.
 *
 * A primeira versão descia a página inteira em translação uniforme por 7s. Todo
 * pixel se move em todo quadro, que é o pior caso possível para um codec de
 * vídeo: a escada inteira de CRF estourou o orçamento, e o pior degrau dela (36,
 * que já é qualidade ruim) ainda dava 688 KB contra teto de 400.
 *
 * Parando em cada seção o custo desaba, porque quadro idêntico ao anterior é
 * quase de graça em H.264. E o ganho não é só de bytes: a pessoa VÊ cada seção
 * em vez de ver a página passar. O movimento vira visita guiada, que é o que a
 * prova precisa mostrar.
 */
const PARADO = 0.7;
const AVANCO = 0.5;

/** Teto do orçamento novo aberto na §8. Medido, não estimado. */
const ORCAMENTO_VIDEO = 400 * 1024;
const ORCAMENTO_POSTER = 200 * 1024;

/** Do melhor para o pior. O primeiro que couber no orçamento vence. */
const ESCADA_CRF = [26, 28, 30, 32, 34, 36];

/** Fatia de captura, em CSS px. 4000 × 2 = 8000, com folga larga sobre 16384. */
const ALTURA_DA_FATIA = 4000;

const ORIGINAL = "drive-files/landing pages/bruna-pagina-inteira.png";
/** As paradas medidas na captura, ao lado do PNG, para o reaproveitamento abaixo. */
const ORIGINAL_META = "drive-files/landing pages/bruna-pagina-inteira.json";
const VIDEO = "public/video/servico-landing-page.mp4";
const POSTER = "public/images/servico-landing-page.jpg";

/**
 * Os navegadores aceitos, em ordem de preferência. O script imprime qual usou:
 * versão de motor muda rasterização, e saber com qual o arquivo foi gerado é
 * parte do registro.
 */
const NAVEGADORES = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  `${process.env.HOME}/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`,
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
];

/* ── Utilidades ────────────────────────────────────────────────────────────── */

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;
const noProjeto = (nome) => resolve(raiz, nome);

async function peso(caminho) {
  return (await stat(caminho)).size;
}

/**
 * A curva do movimento. Suave nas duas pontas, e a diferença é visível: com
 * translação linear a página entra e sai do quadro em velocidade cheia, o que lê
 * como esteira. Com ease-in-out ela parte parada, cruza e chega parada.
 */
function suavizar(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

async function acharNavegador() {
  for (const caminho of NAVEGADORES) {
    try {
      await stat(caminho);
      return caminho;
    } catch {
      /* próximo */
    }
  }
  console.error(
    "\n  Nenhum navegador Chromium encontrado. Procurei em:\n" +
      NAVEGADORES.map((c) => `    ${c}`).join("\n") +
      "\n",
  );
  process.exit(1);
}

/* ── 1. Captura ────────────────────────────────────────────────────────────── */

/**
 * Devolve o PNG alto da página inteira, em `ESCALA`x, montado de fatias.
 */
async function capturar() {
  const executavel = await acharNavegador();
  console.log(`  navegador   ${executavel.split("/").pop()}`);

  const navegador = await puppeteer.launch({
    executablePath: executavel,
    headless: true,
    args: ["--hide-scrollbars", "--force-color-profile=srgb"],
    /* As fatias de 1284×4000 a 2x são capturas grandes, e o padrão de 30s do
       puppeteer é apertado para elas em máquina ocupada. */
    protocolTimeout: 180_000,
  });

  try {
    const pagina = await navegador.newPage();
    await pagina.setViewport({
      width: QUADRO.largura,
      height: 900,
      deviceScaleFactor: ESCALA,
    });
    /* Decisão 2 do cabeçalho. Sem isto a captura sai com metade do texto a meia
       opacidade. */
    await pagina.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);

    await pagina.goto(URL_FONTE, {
      waitUntil: "networkidle0",
      timeout: 90_000,
    });

    /* ⚠️ A VARREDURA DE SCROLL VEM ANTES DE TUDO, e ela não é otimização.
       As imagens da página-fonte são lazy: fora da viewport elas nunca começam
       a carregar, `img.complete` fica falso para sempre, e uma espera por todas
       elas trava até o `protocolTimeout` estourar. Foi exatamente assim que
       este script falhou duas vezes. Descer a página desperta o lazy-loading,
       e depois disso a espera termina.

       Com `prefers-reduced-motion` emulado, descer aqui não dispara animação
       nenhuma: só o carregamento. */
    await pagina.evaluate(async () => {
      const passo = window.innerHeight;
      for (let y = 0; y < document.documentElement.scrollHeight; y += passo) {
        window.scrollTo(0, y);
        await new Promise((segue) => setTimeout(segue, 120));
      }
      window.scrollTo(0, 0);
      await new Promise((segue) => setTimeout(segue, 300));
      return true;
    });

    /* Teto de 5s por imagem. Uma imagem que não chega não pode derrubar a
       gravação inteira: melhor um quadro com um buraco, que aparece na revisão,
       do que um script pendurado sem dizer por quê. */
    await pagina.evaluate(async () => {
      const espera = (img) =>
        new Promise((pronto) => {
          if (img.complete) return pronto();
          const fim = () => pronto();
          img.addEventListener("load", fim, { once: true });
          img.addEventListener("error", fim, { once: true });
          setTimeout(fim, 5000);
        });
      await Promise.all([...document.images].map(espera));
      return true;
    });

    /* `.then(() => true)` não é enfeite: `document.fonts.ready` resolve com o
       próprio `FontFaceSet`, que o puppeteer tenta serializar e onde ele trava
       com `Runtime.callFunctionOn timed out`. Devolver um booleano encerra a
       espera sem pedir a travessia de um objeto do DOM. */
    await pagina.evaluate(() => document.fonts.ready.then(() => true));

    /* Decisão 3 do cabeçalho. Depois da varredura, porque o cabeçalho precisa
       estar no estado final dele (a página troca o fundo dele depois de 40px de
       scroll) e porque esconder elemento antes muda a altura medida. */
    const neutralizados = await pagina.evaluate(() => {
      const fixos = [...document.querySelectorAll("body *")].filter((el) =>
        ["fixed", "sticky"].includes(getComputedStyle(el).position),
      );

      let cabecalho = 0;
      let removidos = 0;

      for (const el of fixos) {
        if (el.tagName === "HEADER" && cabecalho === 0) {
          /* O cabeçalho pertence ao topo da página: é onde ele está quando
             alguém chega. Vira absoluto para aparecer uma vez só. */
          el.style.position = "absolute";
          el.style.top = "0";
          cabecalho += 1;
        } else {
          el.style.display = "none";
          removidos += 1;
        }
      }

      return { cabecalho, removidos };
    });

    /* As paradas do vídeo saem da própria estrutura da página, e não de uma
       lista escrita à mão aqui: se a cliente publicar uma seção nova, a visita
       guiada passa a incluí-la sozinha. O 0 entra explícito porque a primeira
       parada é o topo, que não é o topo de nenhuma `<section>`. */
    const { altura, paradas } = await pagina.evaluate(() => ({
      altura: document.documentElement.scrollHeight,
      paradas: [
        0,
        ...[...document.querySelectorAll("section")].map((el) =>
          Math.round(el.getBoundingClientRect().top + window.scrollY),
        ),
      ],
    }));

    console.log(
      `  página      ${QUADRO.largura}×${altura} CSS px, ${neutralizados.cabecalho} cabeçalho fixado no topo, ${neutralizados.removidos} elemento(s) fixo(s) removido(s)`,
    );

    /* Decisão 1 do cabeçalho: fatias, porque `fullPage` estouraria o limite de
       textura e truncaria em silêncio. */
    const fatias = [];
    for (let y = 0; y < altura; y += ALTURA_DA_FATIA) {
      const alturaDaFatia = Math.min(ALTURA_DA_FATIA, altura - y);
      fatias.push({
        y,
        dados: await pagina.screenshot({
          type: "png",
          captureBeyondViewport: true,
          clip: {
            x: 0,
            y,
            width: QUADRO.largura,
            height: alturaDaFatia,
          },
        }),
      });
    }

    const composicao = await Promise.all(
      fatias.map(async ({ y, dados }) => ({
        input: dados,
        left: 0,
        top: y * ESCALA,
      })),
    );

    const inteira = await sharp({
      create: {
        width: QUADRO.largura * ESCALA,
        height: altura * ESCALA,
        channels: 3,
        background: "#ffffff",
      },
    })
      .composite(composicao)
      .png({ compressionLevel: 9 })
      .toBuffer();

    console.log(
      `  captura     ${fatias.length} fatias, ${QUADRO.largura * ESCALA}×${altura * ESCALA} px, ${kb(inteira.length)}`,
    );

    return { png: inteira, paradas };
  } finally {
    await navegador.close();
  }
}

/* ── 2. Quadros ────────────────────────────────────────────────────────────── */

/**
 * Fatia a imagem alta numa janela que desce, e devolve a pasta com os JPEGs.
 *
 * Decisão 4 do cabeçalho: a imagem entra aqui como buffer CRU justamente para o
 * recorte de cada quadro ser cópia de memória, e não decodificação de PNG.
 */
async function gerarQuadros(pngInteiro, pasta, paradas) {
  await rm(pasta, { recursive: true, force: true });
  await mkdir(pasta, { recursive: true });

  const { data: cru, info } = await sharp(pngInteiro)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const janela = {
    largura: QUADRO.largura * ESCALA,
    altura: QUADRO.altura * ESCALA,
  };
  const curso = info.height - janela.altura;

  if (curso <= 0) {
    console.error(
      `\n  A página é mais curta que a janela do vídeo (${info.height} < ${janela.altura}). Não há o que rolar.\n`,
    );
    process.exit(1);
  }

  /* As paradas vêm em CSS px do topo de cada seção. Aqui elas viram px do
     documento capturado, presas ao curso possível: a última seção começa perto
     do fim da página e não há para onde descer além disso. */
  const alvos = [
    ...new Set(
      paradas.map((y) => Math.min(Math.max(Math.round(y * ESCALA), 0), curso)),
    ),
  ].sort((a, b) => a - b);

  const quadrosParado = Math.round(FPS * PARADO);
  const quadrosAvanco = Math.round(FPS * AVANCO);

  /* A linha do tempo, em posições de y. Parado repete o mesmo valor, e é essa
     repetição que o codec compra barato. */
  const linha = [];
  /* Onde cada parada começa. Vira `-force_key_frames` no encode: ver o porquê
     lá embaixo. */
  const iniciosDeParada = [];

  alvos.forEach((y, i) => {
    iniciosDeParada.push(linha.length);
    for (let k = 0; k < quadrosParado; k += 1) linha.push(y);

    const proximo = alvos[i + 1];
    if (proximo === undefined) return;

    for (let k = 1; k <= quadrosAvanco; k += 1) {
      linha.push(Math.round(y + (proximo - y) * suavizar(k / quadrosAvanco)));
    }
  });

  for (let i = 0; i < linha.length; i += 1) {
    await sharp(cru, {
      raw: { width: info.width, height: info.height, channels: info.channels },
    })
      .extract({
        left: 0,
        top: linha[i],
        width: janela.largura,
        height: janela.altura,
      })
      /* A redução de 2x para 1x aqui é o que dá o antialias do texto. Capturar
         direto em 1284 daria a mesma moldura com metade da nitidez. */
      .resize({ width: QUADRO.largura, height: QUADRO.altura })
      .jpeg({ quality: 92, mozjpeg: true })
      .toFile(join(pasta, `q-${String(i).padStart(4, "0")}.jpg`));
  }

  console.log(
    `  quadros     ${linha.length} a ${FPS} fps (${(linha.length / FPS).toFixed(1)}s), ${alvos.length} paradas, curso de ${curso} px`,
  );

  return {
    pasta,
    curso,
    paradas: alvos,
    /* Em segundos, que é o que o ffmpeg quer. */
    tempos: iniciosDeParada.map((i) => (i / FPS).toFixed(3)),
  };
}

/* ── 3. Encode ─────────────────────────────────────────────────────────────── */

async function encodar(pasta, crf, saida, tempos) {
  await executar(ffmpeg, [
    "-y",
    "-hide_banner",
    "-loglevel",
    "error",
    "-framerate",
    String(FPS),
    "-i",
    join(pasta, "q-%04d.jpg"),
    "-c:v",
    "libx264",
    "-preset",
    "slower",
    "-crf",
    String(crf),
    /* ⚠️ `merange` alto não é ajuste fino. No avanço entre seções o quadro se
       desloca ~100 px, e a busca de movimento padrão (16) não alcança isso: sem
       ampliar, o codec desiste do vetor e gasta bytes redesenhando o quadro
       inteiro, que é justamente o que a parada e o avanço existem para evitar. */
    "-x264-params",
    "me=umh:merange=64",
    /* ⚠️ UM KEYFRAME NO INÍCIO DE CADA PARADA, e isto é o que salva a
       legibilidade do texto.

       Sem ele, o primeiro quadro de uma parada é predito a partir do último
       quadro do avanço, que é o mais borrado da sequência, e o borrão fica
       pendurado ali pelos 17 quadros seguintes, porque quadro idêntico ao
       anterior não corrige nada. Ou seja: o codec economiza exatamente onde a
       pessoa está lendo.

       Com o keyframe, cada seção começa limpa e o resto da parada custa quase
       zero. É o que permitiu descer o CRF em vez de subir. */
    "-force_key_frames",
    tempos.join(","),
    /* Sem isto, players e navegadores que só aceitam 4:2:0 recusam o arquivo. */
    "-pix_fmt",
    "yuv420p",
    /* O índice vai para o começo do arquivo: o vídeo começa a tocar sem baixar
       tudo. */
    "-movflags",
    "+faststart",
    /* Sem trilha de áudio. Economiza bytes e tira do caminho o motivo mais comum
       de o autoplay ser bloqueado. */
    "-an",
    /* O análogo do `sharp` sem `withMetadata()`: nada do original sobrevive. */
    "-map_metadata",
    "-1",
    saida,
  ]);

  return peso(saida);
}

/* ── Rodada ────────────────────────────────────────────────────────────────── */

const pastaDeQuadros = resolve(raiz, "node_modules/.cache/quadros-landing");

console.log("");

/**
 * Reaproveita a captura anterior, se houver.
 *
 * Encodar é iterativo (largura, duração, CRF, keyframes) e capturar não: abrir o
 * navegador e remontar 17 mil px de página a cada tentativa de encode é um minuto
 * jogado fora por tentativa. `--recapturar` força a ida à rede, e é o que se usa
 * quando a página da cliente muda.
 */
async function obterCaptura() {
  const recapturar = process.argv.includes("--recapturar");

  if (!recapturar) {
    try {
      const [png, meta] = await Promise.all([
        readFile(noProjeto(ORIGINAL)),
        readFile(noProjeto(ORIGINAL_META), "utf8"),
      ]);
      console.log(`  reusando    ${ORIGINAL}  ${kb(png.length)}`);
      console.log("              (--recapturar para ir buscar de novo)");
      return { png, paradas: JSON.parse(meta).paradas };
    } catch {
      /* Não existe ainda: captura. */
    }
  }

  const capturado = await capturar();

  await mkdir(dirname(noProjeto(ORIGINAL)), { recursive: true });
  await writeFile(noProjeto(ORIGINAL), capturado.png);
  await writeFile(
    noProjeto(ORIGINAL_META),
    `${JSON.stringify({ url: URL_FONTE, paradas: capturado.paradas }, null, 2)}\n`,
  );
  console.log(`  original    ${ORIGINAL}  ${kb(capturado.png.length)}`);

  return capturado;
}

const { png, paradas } = await obterCaptura();

const sequencia = await gerarQuadros(png, pastaDeQuadros, paradas);

await mkdir(dirname(noProjeto(VIDEO)), { recursive: true });

console.log("");
let escolhido = null;

for (const crf of ESCADA_CRF) {
  const tamanho = await encodar(
    pastaDeQuadros,
    crf,
    noProjeto(VIDEO),
    sequencia.tempos,
  );
  const cabe = tamanho <= ORCAMENTO_VIDEO;

  console.log(
    `  ${cabe ? "✓" : " "} crf ${crf}     ${kb(tamanho).padStart(8)}  ${cabe ? "cabe" : "acima do orçamento"}`,
  );

  if (cabe) {
    escolhido = { crf, tamanho };
    break;
  }
}

if (!escolhido) {
  console.error(
    `\n  Nenhum CRF da escada coube em ${kb(ORCAMENTO_VIDEO)}.` +
      `\n  Reduza QUADRO para 964×600 ou DURACAO antes de afrouxar o orçamento.\n`,
  );
  process.exit(1);
}

/* O poster é o primeiro quadro, e ele faz três trabalhos: poster do vídeo,
   substituto em `prefers-reduced-motion` e fallback se o vídeo não carregar.
   Sai por `sharp` sem `withMetadata()`, como toda imagem do projeto. */
const tamanhoDoPoster = (
  await sharp(join(pastaDeQuadros, "q-0000.jpg"))
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(noProjeto(POSTER))
).size;

console.log("");
console.log(
  `  ${VIDEO.padEnd(38)} ${kb(escolhido.tamanho).padStart(8)}  crf ${escolhido.crf}, teto ${kb(ORCAMENTO_VIDEO)}`,
);
console.log(
  `  ${POSTER.padEnd(38)} ${kb(tamanhoDoPoster).padStart(8)}  ${tamanhoDoPoster > ORCAMENTO_POSTER ? "⚠️  ACIMA" : "teto"} de ${kb(ORCAMENTO_POSTER)}`,
);

const quantos = (await readdir(pastaDeQuadros)).length;
await rm(pastaDeQuadros, { recursive: true, force: true });
console.log(`\n  ${quantos} quadros temporários descartados.\n`);
