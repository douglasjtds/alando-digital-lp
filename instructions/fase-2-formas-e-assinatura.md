# Fase 2: Formas orgânicas e a assinatura estrutural

> Esta fase constrói o elemento que dá identidade à página inteira. Leia
> `DESIGN-GUIDELINES.md` §6 completa antes de começar.

```
Adapte formas e assinatura a ESTA marca, seguindo DESIGN-GUIDELINES.md §5 e §6.

1. FaixaRepetida, O COMPONENTE-ASSINATURA
   É o sistema de titulação da Alando: no deck dela, o título de seção aparece repetido
   horizontalmente, cortado pela borda da página (páginas 2, 3, 9-11, 16, 17-19, 21, 22,
   23, 24). Não é ornamento, é como a marca escreve um <h2>.

   Requisitos:
   - Texto repetido N vezes numa linha, white-space: nowrap, cortado pela viewport,
     sangrando além do container (full-bleed)
   - Cópias em `decor` sobre fundo claro, `superficie-2` sobre `ancora`. NUNCA em `tinta`
   - UMA instância legível em `ancora` carrega o <h2> semântico
   - TODAS as repetições com aria-hidden="true"

     >>> Regra de acessibilidade não negociável: um <h2> que soa "quem somos quem somos
     >>> quem somos quem somos" no leitor de tela é falha grave. Uma instância semântica,
     >>> o resto aria-hidden.

   - Deriva lateral com animation-timeline: scroll(), direção ALTERNANDO a cada seção,
     amplitude modesta (o objetivo é textura, não corrida)
   - Zero JS. Sem listener, sem rAF, sem biblioteca
   - Atrás de @supports: onde animation-timeline não existir, a faixa fica parada.
     Degradação silenciosa, de propósito
   - Em prefers-reduced-motion: animation: none. NÃO basta zerar a duração, em
     scroll-timeline, duração zero cola o elemento no último keyframe e a faixa ficaria
     deslocada para sempre

   O número de repetições e o texto vêm de content.ts, nunca hardcoded.

2. A PALAVRA EM ITÁLICO
   No deck, uma palavra por título aparece em Playfair itálico enquanto o resto é outra
   coisa ("construir", "juntos?", "números"). É a gramática de ênfase da marca.

   Regra: EXATAMENTE UMA palavra por título display leva o itálico, e é a palavra que
   carrega o peso do argumento. Uma só, duas viram decoração.
   Qual palavra é definido em content.ts, nunca no componente.

3. OrganicClipPaths.tsx, as máscaras
   As quatro máscaras do template são genéricas. Redesenhe na linguagem DESTA marca.

   A linguagem vem de duas fontes concretas do material (DESIGN-GUIDELINES §2.2):
   (a) os retângulos de amostra da paleta, que se sobrepõem em colunas de larguras
       desiguais → a lógica de FAIXA VERTICAL DESLOCADA
   (b) a linha de crista das montanhas na foto de fundo da paleta → a CURVA ORGÂNICA,
       longa e assimétrica, sem vértice agudo

   Máscara = crista de montanha aplicada a uma faixa deslocada.

   Requisitos:
   - assimétricas, sem vértice agudo, sem autointerseção
   - distinguíveis de longe umas das outras
   - nenhuma pode parecer border-radius
   - as que cobrem retrato precisam de borda superior limpa: é onde está a cabeça

4. ÍCONES, conforme o que a Fase 0 encontrou
   SE existirem ícones proprietários: traçar seguindo a LINHA DE CENTRO de cada gesto,
   stroke nunca fill, um path por gesto contínuo, viewBox quadrado e igual para todos,
   cada path com data-drawable. Salve também em public/brand/icone-*.svg.

   SE NÃO existirem: me diga, e NÃO invente um conjunto. Ícone genérico é exatamente o
   clichê que DESIGN-GUIDELINES §2.5 proíbe. A seção Servicos fica sem ícone e a
   assinatura de movimento continua sendo a entrada do Manifesto, como já está previsto.

   Ícones de INTERFACE (chevron do FAQ, WhatsApp, seta) são outra coisa: Lucide,
   peso 1.5px, nunca no mesmo bloco visual que os da marca.

5. MONOGRAMA
   public/brand/, versão clara e escura. Header 32px, footer 40px.

Renderize FaixaRepetida, as quatro máscaras e o monograma no /styleguide para eu validar.
Me mande screenshot em 390px e em 1440px.
```

**Pronto quando:** as máscaras são claramente orgânicas e distintas entre si; a `FaixaRepetida`
deriva com o scroll, para com `reduced-motion`, e só uma instância é semântica.
