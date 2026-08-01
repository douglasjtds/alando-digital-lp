import { cn } from "@/lib/cn";
import { partirNoItalico } from "@/lib/italico";
import { renderizarPendencia } from "@/lib/pendencia";

/**
 * O COMPONENTE-ASSINATURA da página.
 *
 * Não é ornamento: é o sistema de titulação da Alando. No deck dela o título de
 * seção aparece repetido horizontalmente e cortado pela borda da página
 * (páginas 2, 3, 9-11, 16, 17-19, 21, 22, 23, 24). É assim que a marca escreve
 * um <h2>, e é o elemento que satisfaz o critério mais duro do anti-template:
 * uma estrutura que só ESTA marca teria, atravessando a página inteira em vez de
 * decorar uma seção. Ver DESIGN-GUIDELINES.md §6 e AUDITORIA-ETAPA-1.md §5.3.
 *
 * Server component. Zero JS no cliente: a deriva é `animation-timeline` puro,
 * em `globals.css`. Sem listener, sem rAF, sem biblioteca.
 *
 * ⚠️ Nenhum texto vive aqui. `texto`, `repeticoes` e `palavraItalica` vêm do
 * `content.ts` (Fase 4). Um componente que conhece a copy da cliente quebra a
 * fronteira white-label da landing-page-structure.md §3.
 */

type Direcao = "esquerda" | "direita";

/**
 * A superfície onde a faixa é aplicada.
 *
 * `escuro` cobre as três superfícies escuras da página, e o legível passa em
 * todas: `papel` sobre `ancora` 13,27:1, sobre `ancora-quente` 11,54:1, sobre
 * `tinta` 8,29:1.
 *
 * A superfície sage NÃO tem variante, e isso é deliberado: a §6 não define esse
 * caso, sage decorativo sobre fundo sage é invisível, e a única seção com fundo
 * sage é `FaixaClientes`, que nasce `exibir: false`. Inventar a combinação aqui
 * seria decidir cor sem manual. Está na lista de pendências da Fase 2.
 */
type Variante = "claro" | "escuro";

type Props = {
  /** Alvo do `aria-labelledby` da seção. A seção nomeia; a faixa titula. */
  id: string;
  /** O título de seção. Vem do `content.ts`. */
  texto: string;
  /**
   * Quantas cópias na linha, incluindo a legível. Vem do `content.ts`.
   *
   * Escolha N para a linha passar de 1440px: a faixa precisa ser CORTADA pela
   * borda da página, senão ela lê como um título repetido que acabou, não como
   * textura. Cópia sobrando não custa nada (é `aria-hidden`, e o `clip` corta).
   */
  repeticoes: number;
  /** EXATAMENTE UMA palavra, e é a que carrega o peso do argumento. */
  palavraItalica?: string;
  /** Alterna a cada seção. É o que impede a deriva de virar tique. */
  direcao?: Direcao;
  variante?: Variante;
  className?: string;
};

/**
 * As cores, e as duas regras da §6 que elas obedecem.
 *
 * ⚠️ `decor` como cor de glifo: a §3 diz "decor nunca como cor de TEXTO, em
 * nenhuma opacidade" e a §6 diz "cópias em decor sobre fundo claro". Não é
 * contradição, são regras sobre coisas diferentes. A regra da §3 protege texto
 * que alguém vai LER, e exige contraste. Estas cópias são textura `aria-hidden`
 * a 10%, que ninguém lê, nenhum leitor de tela alcança, e que existem
 * justamente para NÃO competir com a instância legível ao lado. Se um dia
 * alguém subir essa opacidade a ponto de dar vontade de ler, a regra da §3
 * volta a valer e a alteração está errada.
 */
const CORES: Record<Variante, { legivel: string; copia: string }> = {
  claro: { legivel: "text-ancora", copia: "text-decor/10" },
  escuro: { legivel: "text-papel", copia: "text-superficie-2/15" },
};

/** O sentido do `translate3d` nos keyframes. Ver `globals.css`. */
const SENTIDO: Record<Direcao, number> = { direita: 1, esquerda: -1 };

export function FaixaRepetida({
  id,
  texto,
  repeticoes,
  palavraItalica,
  direcao = "direita",
  variante = "claro",
  className,
}: Props) {
  const cores = CORES[variante];
  const partes = partirNoItalico(texto, palavraItalica);

  /* As cópias decorativas saem SEM o itálico. A 10% de opacidade a diferença é
     imperceptível, e o itálico é a ênfase do título, não da textura. */
  const decorativas = Array.from({ length: Math.max(0, repeticoes - 1) });

  return (
    <div className={cn("faixa", className)}>
      <div
        className="faixa-trilho"
        style={{ "--faixa-sentido": SENTIDO[direcao] } as React.CSSProperties}
      >
        {/* A ÚNICA instância semântica. Um <h2> de verdade, dentro da linha.
            É o que impede a accessibility tree de ouvir "quem somos quem somos
            quem somos quem somos", que é falha grave e não estética.

            ⚠️ A instância legível passa por `renderizarPendencia`, porque
            título de seção também pode ser pendência: o `CtaFinal` é feito só
            disso hoje, e sem isto o marcador saía como texto cru, contra a
            regra do CLAUDE.md de que ele apareça REALÇADO. Não é um caminho
            alternativo: em título confirmado a função devolve a própria string.
            As variantes das duas funções têm os mesmos dois nomes de propósito,
            então a superfície escura leva o marcador legível junto. As cópias
            decorativas seguem com o texto cru: a 10-15% de opacidade e
            `aria-hidden`, ninguém as lê. */}
        <h2 id={id} className={cn("display-lg", cores.legivel)}>
          {partes ? (
            <>
              {partes[0]}
              <span className="editorial">{partes[1]}</span>
              {partes[2]}
            </>
          ) : (
            renderizarPendencia(texto, variante)
          )}
        </h2>

        {decorativas.map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={cn("display-lg", cores.copia)}
          >
            {texto}
          </span>
        ))}
      </div>
    </div>
  );
}
