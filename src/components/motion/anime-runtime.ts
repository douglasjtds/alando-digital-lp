/**
 * Os cinco subpaths do anime.js, reunidos num módulo só.
 *
 * ⚠️ ESTE ARQUIVO EXISTE POR UM MOTIVO MEDIDO, não por organização.
 *
 * A primeira versão da Fase 7 fazia cinco `import()` dinâmicos em paralelo, um
 * por subpath. O build revelou o efeito: o Turbopack emitiu **quatro chunks
 * byte a byte idênticos, de 28.613 bytes cada**, porque cada `import()`
 * dinâmico vira um ponto de entrada próprio e leva junto o núcleo compartilhado.
 * O orçamento de 24 KB gzip da §8 seria estourado por duplicação, não por
 * biblioteca.
 *
 * Com os cinco imports ESTÁTICOS aqui e UM `import()` dinâmico apontando para
 * este arquivo (em `anime.ts`), existe um ponto de entrada só, e o núcleo entra
 * uma vez.
 *
 * Continua valendo a regra de importar por subpath e nunca por `"animejs"`: o
 * índice do pacote traria draggable, text, waapi e os adapters, que a página
 * não usa. E não existe `animejs/scroll` na 4.5.0: `onScroll` mora em
 * `animejs/events`, conferido nos `.d.ts` do pacote instalado.
 */

export { animate } from "animejs/animation";
export { createTimeline } from "animejs/timeline";
export { onScroll } from "animejs/events";
export { stagger } from "animejs/utils";
export { createScope } from "animejs/scope";
