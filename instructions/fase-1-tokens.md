# Fase 1: Tokens e base tipográfica

```
Implemente o sistema de design em código, seguindo DESIGN-GUIDELINES.md §3, §4 e §7.

1. TOKENS DE COR
   Nove tokens. OITO são hexes literais do manual da Andressa. Preencha em
   globals.css (@theme) e em src/config/brand.ts:

     ancora        #102F15   manual
     ancora-quente #4C2B08   manual
     superficie-2  #B3B793   manual
     decor         #B3B793   manual, MESMO HEX de superficie-2, usado a 6-12% de opacidade
     acento        #AB7743   manual
     acento-texto  #4C2B08   manual (mesmo hex de ancora-quente: matiz 30.9 vs 30.0 do
                             acento, é literalmente o acento escurecido)
     tinta         #544635   manual
     tinta-suave   #676127   manual
     papel         #F7F4EC   ÚNICO DERIVADO (#AB7743 a 8% sobre branco)

   Os tokens têm nome de PAPEL, não de cor. Não renomeie para verde-900 e afins.
   Crie --color-decor como alias de --color-superficie-2, para o código ficar legível
   sem a marca ganhar cor nenhuma.

   >>> A PALETA ESTÁ FECHADA. Nenhum décimo token, nenhum hex fora dessa lista.
   >>> Se você achar que falta uma cor, PARE e me pergunte.

   CINCO superfícies (revisado em 29/07): papel, superficie-2 (sage), ancora (verde
   escuro), ancora-quente (marrom escuro) e tinta (marrom médio).
   O acento #AB7743 NUNCA é fundo de bloco com parágrafo: nenhum texto normal passa
   nele (melhor caso 3.79). Ele é área decorativa, número em display e animação.
   Deixe as cinco superfícies renderizadas no /styleguide, cada uma com o texto que
   passa nela.

2. CONTRASTE
   Rode `node scripts/contraste.mjs` e cole a tabela gerada no DESIGN-GUIDELINES §3,
   substituindo a que está lá.

   As cinco exigências precisam passar E o decor precisa REPROVAR em texto (é cor
   decorativa por decreto, cor decorativa que passa vira cor de texto por acidente
   na terceira seção).

   >>> CONFIRME A REGRA QUE É MAIS FÁCIL DE ERRAR: sobre a superfície sage, o
   >>> parágrafo tem que ser ancora (7,02) ou acento-texto (6,10). O tinta dá só
   >>> 4,39:1 ali e o tinta-suave dá 3,05:1. Toda seção com fundo sage troca a cor
   >>> do parágrafo. Deixe isso explícito no /styleguide.

   Se alguma exigência falhar, PARE e me diga. A paleta precisa de ajuste antes de
   qualquer componente. Não "arredonde" 4.3 para 4.5.

3. FONTES, conforme a decisão da Fase 0
   Caso padrão (asimilates não liberada para web):
     - Display:   Playfair Display, next/font/google
     - Editorial: Playfair Display Italic, INSTÂNCIA SEPARADA com preload: false
                  (aparece em uma palavra por título e não pode competir com o LCP)
     - UI:        Montserrat, next/font/google

   Caso a Fase 0 confirme licença webfont da asimilates:
     - Display vira asimilates via next/font/local, e Playfair fica só no Editorial.

   OBRIGATÓRIO: subsets ['latin', 'latin-ext'] em todas.
   Sem latin-ext, ã/ç/õ/é caem no fallback e a linha mistura duas fontes no meio da
   palavra. Teste com: "Criando e gerenciando marcas de forma artesanal · essência ·
   posicionamento · atenção".

   Mantenha os nomes de custom property (--font-display-family etc.): é o que permite
   trocar a família sem tocar em mais nada, se ela comprar a licença depois.

   display: 'swap'. E strong { font-weight: 600 } na base, para não cair em bold sintético.

4. ESCALA E UTILITÁRIOS
   Confira contra DESIGN-GUIDELINES §4: display-xl, display-lg, display-md, body-lg,
   body, caption, eyebrow, medida (62ch), secao-y, container-lp.

   Acrescente o utilitário desta marca:
     lead-tracked   tracking 0.14em   line-height 1.9   Montserrat 400
   Ele é para LINHA CURTA DE LEAD, nunca parágrafo corrido, tracking largo em texto
   longo destrói a legibilidade. O deck usa muito esse tratamento e é um traço forte.

5. SCROLL
   scroll-behavior: smooth no html, DENTRO de
   @media (prefers-reduced-motion: no-preference).
   Nenhuma biblioteca de smooth-scroll. Ver landing-page-structure.md §2.2.

6. STYLEGUIDE
   Valide /styleguide: paleta com os ratios ao lado de cada par, e toda a escala
   tipográfica renderizada com texto em português com acentos.

Regra dura: nenhum valor hex fora de globals.css e brand.ts. Confirme com
`grep -rE '#[0-9a-fA-F]{3,8}' src/ --include=*.tsx --include=*.ts`
```

**Pronto quando:** `/styleguide` renderiza, a tabela passa nas cinco exigências e reprova o `decor`,
fontes carregam sem FOUT agressivo, acentos não caem no fallback.
