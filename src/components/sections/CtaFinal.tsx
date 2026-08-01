import { content } from "@/config/content";
import { FaixaRepetida } from "@/components/ui/FaixaRepetida";
import { WhatsappCta } from "@/components/ui/WhatsappCta";

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
 * ── O título ─────────────────────────────────────────────────────────────────
 *
 * ⚠️ Copy inexistente, e `faixaRepeticoes` está em 1: hoje a `FaixaRepetida`
 * rende só a instância legível, com o marcador realçado, sem cópias
 * decorativas. Repetir `<<A CONFIRMAR>>` seis vezes numa faixa full-bleed seria
 * ruído, não pendência.
 *
 * **Quando o título real chegar, subir `faixaRepeticoes` para 6 devolve a
 * titulação da marca**, que é como o próprio deck fecha (p. 22, "Solicite seu
 * orçamento!" ×3; p. 24, "juntos?juntos?juntos?"). É a única mudança
 * necessária: um número.
 *
 * O rótulo do botão também é marcador, e tem que ser DIFERENTE do herói: lá a
 * pessoa está decidindo se vale a pena, aqui ela já decidiu e está começando.
 */
export function CtaFinal() {
  return (
    <section
      className="bg-ancora-quente secao-y"
      aria-labelledby="faixa-cta-final"
    >
      <div className="container-lp">
        <FaixaRepetida
          id="faixa-cta-final"
          texto={content.ctaFinal.titulo}
          repeticoes={content.ctaFinal.faixaRepeticoes}
          direcao="direita"
          variante="escuro"
          className="mb-12 md:mb-16"
        />

        <WhatsappCta
          origem="cta-final"
          label={content.ctaFinal.ctaLabel}
          variante="sage"
        />
      </div>
    </section>
  );
}
