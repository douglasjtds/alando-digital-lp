import { content, resultadosDeCaso } from "@/config/content";
import { FaixaRepetida } from "@/components/ui/FaixaRepetida";
import { renderizarPendencia } from "@/lib/pendencia";

/**
 * "Já funcionou antes": mostrar que funcionou, sem prometer que vai funcionar.
 *
 * Substitui `Depoimentos` do catálogo, porque não há depoimento autorizado e há
 * dado de performance real, que é mais forte para B2B (AUDITORIA-ETAPA-1.md §6).
 *
 * ── Por que ela não renderiza hoje ───────────────────────────────────────────
 *
 * DOIS portões, e é de propósito: `exibir` E lista não vazia. Faixa de
 * credibilidade montada com `<<A CONFIRMAR>>` no lugar dos números produz o
 * efeito oposto do pretendido, então aqui o marcador NÃO vale: a seção
 * simplesmente não existe até a autorização chegar. **Seção desligada é estado
 * final legítimo; número inventado não é** (AUDITORIA-ETAPA-1.md §8).
 *
 * ── A superfície mudou, e o motivo é contraste ───────────────────────────────
 *
 * ⚠️ A §5.6 e o prompt da Fase 5C especificam fundo `tinta` com os
 * números em `acento`. Esse par dá **2,37:1**, que reprova até em
 * tamanho display (o mínimo é 3:1), e a própria tabela da §3 já o marca como
 * reprovado: os dois documentos se contradizem.
 *
 * Decisão do Douglas em 31/07: fica o número em `acento`, e a SUPERFÍCIE passa
 * para `ancora-quente`, onde o mesmo caramelo rende **3,29:1** e passa
 * em display. Continua superfície escura quente e hex do manual, então o arco de
 * cor da §3 (a página abre fria e fecha quente) sobrevive intacto.
 *
 *   fundo   ancora-quente
 *   número  acento          3,29:1  ✓ só display, e é display
 *   texto   papel          11,54:1  ✓ AAA
 *
 * ⚠️ O `acento` aqui só é legal em tamanho display. Se algum dia o número
 * encolher para tamanho de corpo, o par volta a reprovar.
 *
 * ⚠️ Ao LIGAR esta seção, inverter a direção da faixa em `Processo` e `Sobre`:
 * a alternância hoje é Servicos(direita) → Processo(esquerda) → Sobre(direita),
 * e esta entra em `esquerda` entre as duas primeiras.
 */
export function Resultados() {
  if (!content.resultados.exibir || resultadosDeCaso.length === 0) return null;

  return (
    <section
      id="resultados"
      className="bg-ancora-quente secao-y"
      aria-labelledby="faixa-resultados"
    >
      <div className="container-lp">
        <FaixaRepetida
          id="faixa-resultados"
          texto={content.resultados.titulo}
          palavraItalica={content.resultados.tituloPalavraItalica}
          repeticoes={content.resultados.faixaRepeticoes}
          direcao="esquerda"
          variante="escuro"
          className="mb-12 md:mb-16"
        />

        {/* O enquadramento vem ANTES dos números, e não é gentileza editorial:
            número de caso lido como expectativa é promessa de resultado. */}
        <p className="body-lg text-papel medida mb-12 md:mb-16">
          {renderizarPendencia(content.resultados.enquadramento, "escuro")}
        </p>

        {/* Larguras desiguais de propósito: a grade de números iguais é o
            clichê da seção. Sem aspas decorativas, sem avatar, sem seta de
            crescimento, sem ícone de gráfico. */}
        <dl className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:gap-16">
          {resultadosDeCaso.map((resultado) => (
            <div key={resultado.contexto}>
              <dt className="display-lg text-acento">{resultado.valor}</dt>
              <dd className="body text-papel medida mt-2">
                {resultado.contexto}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
