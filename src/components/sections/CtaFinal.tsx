import { content } from "@/config/content";
import { FaixaRepetida } from "@/components/ui/FaixaRepetida";
import { WhatsappCta } from "@/components/ui/WhatsappCta";
import { Revelar } from "@/components/motion/Revelar";
import { renderizarProsa } from "@/lib/prosa";

/**
 * O fechamento: faixa full-bleed em `ancora-quente`, o momento mais quente da
 * página.
 *
 * ── A cor fecha o arco ───────────────────────────────────────────────────────
 *
 * A página abre fria (`papel`, e o `Manifesto` em `ancora`) e fecha quente. Não
 * é gradação de gosto: foi a correção do "muito verde" da Andressa, em 29/07, e
 * está registrada na §3. O verde ficou só no `Manifesto`.
 *
 * ── O botão, e a contradição que ele resolveu ────────────────────────────────
 *
 * Variante `sage`: fundo `superficie-2`, texto `ancora`. 7,02:1 dentro do botão
 * e 6,10:1 contra o fundo da seção.
 *
 * ⚠️ Os documentos se contradizem aqui, e a contradição está resolvida:
 * a §10 do DESIGN-GUIDELINES, a §5.10 da estrutura e o prompt da Fase 5D pedem
 * `papel` ("o único botão claro da página"), enquanto a §3 do DESIGN-GUIDELINES
 * pede `superficie-2` e diz por quê: *"Sage é hex do manual e faz o trabalho
 * que eu tinha dado ao `papel`"*. A §3 é a revisão de 29/07, a que também trocou
 * o fundo desta seção de `ancora` para `ancora-quente`; as outras três são o
 * texto anterior, que ninguém propagou. As duas passam em contraste, então era
 * decisão de identidade.
 *
 * **Decidido pelo Douglas em 01/08: fica sage.** Os três trechos desatualizados
 * continuam desatualizados, e precisam ser corrigidos antes da Fase 8, senão o
 * mesmo debate volta na auditoria.
 *
 * ── O título, e por que ele chega em três blocos ─────────────────────────────
 *
 * ✅ **A copy chegou em 09/09**, e a seção não tem mais nenhum marcador. Ela
 * mandou o título em duas frases, e elas ocupam papéis tipográficos
 * diferentes. **Nenhuma palavra mudou.** O porquê está no `content.ts`, e é
 * mecânico: as duas juntas no `<h2>` dariam 67 caracteres, o
 * `.faixa-trilho > h2` do `globals.css` quebraria em duas linhas em toda
 * largura, e a quebra empurra as cópias decorativas para fora da tela. O
 * fechamento ficaria sendo a única seção sem a faixa, justamente onde o deck
 * fecha com `juntos?juntos?juntos?` (p. 24).
 *
 * A ordem na tela, que é também a ordem de leitura para quem usa leitor de
 * tela:
 *
 * 1. `lead`, a afirmação, em `lead-tracked`. É o traço de lead do deck (§4), e
 *    fora daqui só o `Footer` o usa. **Não é caixa alta:** o `eyebrow` é o
 *    único elemento em caixa alta da página.
 * 2. o `<h2>`, a pergunta, repetido 6 vezes, com "lembrada" em Playfair
 *    itálico. É a palavra da bio da marca.
 * 3. `texto`, o parágrafo, em `medida`. A seção não tinha corpo nenhum até
 *    agora.
 *
 * O corpo e o lead vão em `superficie-2` (6,10:1 sobre `ancora-quente`), que é
 * o mesmo par que o `Manifesto` usa. O `papel` (11,54:1) fica com o `<h2>`,
 * pela `variante="escuro"` da faixa: assim a hierarquia dos três blocos é a
 * própria diferença de contraste, sem uma cor nova.
 */
export function CtaFinal() {
  return (
    <section
      className="bg-ancora-quente secao-y"
      aria-labelledby="faixa-cta-final"
    >
      <div className="container-lp">
        <Revelar>
          {/* O lead entra no MESMO `Revelar` da faixa porque ele é a primeira
              metade da mesma frase. Revelado à parte, a afirmação apareceria
              sozinha e a pergunta chegaria depois, que é o momento coreografado
              do `Manifesto` acontecendo uma segunda vez. A §8 dá esse gesto uma
              vez só na página inteira. */}
          <p className="lead-tracked text-superficie-2 mb-4 md:mb-6">
            {content.ctaFinal.lead}
          </p>

          <FaixaRepetida
            id="faixa-cta-final"
            texto={content.ctaFinal.titulo}
            palavraItalica={content.ctaFinal.tituloPalavraItalica}
            repeticoes={content.ctaFinal.faixaRepeticoes}
            direcao="direita"
            variante="escuro"
          />
        </Revelar>

        <Revelar>
          {/* `renderizarProsa` mesmo sem `**` e sem marcador no texto de hoje:
              a função devolve a string quando não há nem um nem outro, e deixa
              a seção pronta para uma ênfase que a Andressa mande depois. */}
          <p className="body-lg text-superficie-2 medida mt-8 md:mt-12">
            {renderizarProsa(content.ctaFinal.texto, "escuro")}
          </p>
        </Revelar>

        <Revelar className="mt-12 md:mt-16">
          <WhatsappCta
            origem="cta-final"
            label={content.ctaFinal.ctaLabel}
            variante="sage"
          />
        </Revelar>
      </div>
    </section>
  );
}
