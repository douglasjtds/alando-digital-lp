# Fase 7: Movimento

> **Só entre aqui com a página pronta e boa sem animação nenhuma.** Se ela precisar de movimento
> para ficar boa, o problema é de layout, e animação não conserta layout.

```
Ative o movimento conforme DESIGN-GUIDELINES.md §8. Leia a seção inteira antes.

O VOCABULÁRIO É FECHADO: três gestos e um momento. NADA fora dele, e sem
"só nessa seção aqui". Leia DESIGN-GUIDELINES.md §8 inteira antes.

1. GESTO 1: DERIVA (contínuo, CSS, 0 KB)
   Confirme que as faixas de repetição derivam com animation-timeline: scroll(),
   direção alternando por seção, e NUNCA em loop autônomo. É o gesto mais presente
   da página, e é o que não custa nada.

2. GESTO 2: TRAVESSIA DE COR (contínuo, anime.js onScroll)
   O fundo atravessa entre as três superfícies conforme a página desce:
   No topo: papel -> superficie-2 (sage) -> ancora.
   Embaixo: tinta (marrom médio) -> ancora-quente (marrom escuro).
   A METADE QUENTE DA PALETA É O MATERIAL DA SEGUNDA METADE DA PÁGINA.
   Interpole as custom properties com onScroll({ sync }).

   >>> A TRAVESSIA SÓ ACONTECE DENTRO DE UMA FAIXA DE VALOR. Esta regra não é
   >>> estética, é aritmética.
   >>> A cor do texto atravessa junto com o fundo, e precisa passar NAS DUAS PONTAS:
   >>>   claro:  papel <-> superficie-2,  texto = ancora  (13.3 e 7.0)
   >>>   escuro: ancora <-> ancora-quente, texto = papel  (13.3 e 11.5)
   >>> TRAVESSIA ENTRE CLARO E ESCURO É PROIBIDA. No meio do caminho o fundo vira
   >>> tom médio e o texto também, e o contraste desaba para perto de 1:1 sem que
   >>> nada acuse erro. Claro para escuro é FRONTEIRA DE SEÇÃO, não travessia.
   >>> TESTE amostrando 0%, 25%, 50%, 75% e 100% do progresso. Me mostre os cinco.

3. GESTO 3: REVELAÇÃO POR MÁSCARA (discreto, anime.js onScroll + stagger)
   Este SUBSTITUI o fade + translateY em toda a página. Em vez de o conteúdo surgir
   de baixo (que é o reveal de qualquer landing page), ele é revelado pela máscara
   orgânica ABRINDO ao longo da curva de crista de montanha que já define as formas
   da marca (DESIGN-GUIDELINES §2.2 e §6). Com stagger em listas, o escalonamento
   sai da mesma curva.

   É o movimento que o visitante vê quinze vezes. Trocar o reveal genérico por um
   derivado da forma da marca muda a impressão da página inteira.

4. O MOMENTO COREOGRAFADO: RESOLUÇÃO (anime.js createTimeline, uma vez só)
   A entrada do Manifesto: "Antes de falar sobre redes sociais…" aparece, e
   "…queremos falar sobre pessoas." resolve depois. Abaixo da dobra, zero risco de
   LCP, amarrado ao conceito.

   Se a Fase 0 tiver encontrado ícones proprietários, me consulte ANTES de mover
   este momento para os serviços. Não decida sozinho.

   TEXTURA, não gesto: parallax da foto dentro da máscara, CSS view(), 0 KB.
   As três armadilhas estão no fim da §8. Elas são erros SILENCIOSOS: a animação não
   falha, ela congela em 50% e parece que "só não funcionou".

4b. NÃO INSTALE three.js.
   Medido: 127,1 KB gzip na cena mínima tree-shaken, contra 24 KB de orçamento
   total. E névoa/partícula/distorção WebGL no scroll é hoje a assinatura visual das
   landing pages de agência, que é justamente o que esta página existe para não ser.
   Se o Douglas pedir explicitamente, as cinco condições estão na §8.

5. REGRAS QUE NÃO SE NEGOCIAM
   - anime.js por SUBPATH (animejs/timeline) e via dynamic import APÓS a hidratação.
     Nunca no bundle inicial
   - createScope() + scope.revert() no cleanup do useEffect, senão vaza a cada re-render
   - Estado inicial aplicado VIA JS, nunca no HTML/CSS. O HTML renderiza tudo visível; a
     timeline confirma que vai rodar, AÍ aplica opacity: 0 e anima. Se o JS nunca chegar,
     a página está completa
   - usePrefersReducedMotion com useSyncExternalStore, não useState + useEffect. O snapshot
     de servidor é true de propósito: antes da hidratação não existe matchMedia, e o padrão
     seguro nessa janela é NÃO animar

6. PREFERS-REDUCED-MOTION
   Ligue "reduzir movimento" no sistema e recarregue. A página precisa estar:
   - completamente estática
   - com 100% do conteúdo visível
   - sem nenhum loop rodando: CHECAR NO DEVTOOLS, não no olho

   Atenção ao caso desta marca: em animação de scroll-timeline, ZERAR A DURAÇÃO NÃO PARA
   O MOVIMENTO: cola o elemento no último keyframe, e a faixa ficaria deslocada para
   sempre. Só `animation: none` desfaz de verdade.

   Se algum conteúdo sumir nesse modo, o bug é grave: conteúdo escondido por causa de uma
   preferência de acessibilidade é o pior desfecho possível.

Me reporte o tamanho REAL do chunk de animação em gzip. ORÇAMENTO: 24 KB.
Gzipe e meça, não estime.
Referência já medida aqui: anime.js 4.5.0 com animate + createTimeline + onScroll +
stagger + utils + createScope dá 21,2 KB gzip. Se o seu número passar muito disso,
alguma coisa entrou no bundle que não devia.
```

**Pronto quando:** os três gestos estão aplicados com consistência e não existe movimento fora do
vocabulário, a travessia de cor mantém contraste nos cinco pontos de amostragem, `reduced-motion`
deixa a página estática **e** 100% visível (máscaras **abertas**, travessia em estado final), e o
chunk medido cabe em 24 KB.

**Passe visual real obrigatório. E rode um review com um segundo agente.**
