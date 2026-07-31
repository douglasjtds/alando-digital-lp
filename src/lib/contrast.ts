/**
 * Contraste WCAG 2.1, calculado.
 *
 * Mesma matemática de `scripts/contraste.mjs`, que é o script que roda no terminal e
 * decide a tabela do DESIGN-GUIDELINES.md §3. Esta versão existe para o `/styleguide`
 * exibir o ratio ao lado de cada par: número escrito à mão na página envelhece na
 * primeira vez que alguém mexe num hex, e envelhece em silêncio.
 */

/** Espera `#rrggbb`. É o formato dos nove tokens em `brand.ts`. */
function luminanciaRelativa(hex: string): number {
  const canais = [1, 3, 5].map((i) => {
    const canal = parseInt(hex.slice(i, i + 2), 16) / 255;
    return canal <= 0.03928
      ? canal / 12.92
      : Math.pow((canal + 0.055) / 1.055, 2.4);
  }) as [number, number, number];

  return 0.2126 * canais[0] + 0.7152 * canais[1] + 0.0722 * canais[2];
}

/** Simétrica: a ordem das cores não muda o resultado. */
export function razaoDeContraste(a: string, b: string): number {
  const x = luminanciaRelativa(a);
  const y = luminanciaRelativa(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

export type Nivel = "AAA" | "AA" | "grande" | "reprovado";

export type Veredito = {
  nivel: Nivel;
  rotulo: string;
  icone: string;
  /** Passa em TEXTO NORMAL, que é o único caso que interessa para parágrafo. */
  passaEmTextoNormal: boolean;
};

/** Veredito para texto normal: abaixo de 24px, ou abaixo de 18,66px em bold. */
export function veredito(razao: number): Veredito {
  if (razao >= 7)
    return {
      nivel: "AAA",
      rotulo: "AAA",
      icone: "✅",
      passaEmTextoNormal: true,
    };
  if (razao >= 4.5)
    return { nivel: "AA", rotulo: "AA", icone: "✅", passaEmTextoNormal: true };
  if (razao >= 3)
    return {
      nivel: "grande",
      rotulo: "só texto grande",
      icone: "⚠️",
      passaEmTextoNormal: false,
    };
  return {
    nivel: "reprovado",
    rotulo: "reprovado",
    icone: "❌",
    passaEmTextoNormal: false,
  };
}

/** Duas casas, sempre, para a coluna alinhar: `4.39:1` e não `4.4:1`. */
export function formatarRazao(razao: number): string {
  return `${razao.toFixed(2)}:1`;
}
