# Fase 5A: Header, Hero, FaixaClientes

> Sem animação nenhuma nesta fase. A página precisa ficar boa estática antes da Fase 7.

```
Monte Header, Hero e FaixaClientes conforme landing-page-structure.md §5.0, §5.1 e §5.2.

HEADER
- Monograma à esquerda; âncoras (#servicos #processo #sobre #duvidas) + CTA compacto
  à direita no desktop; só monograma + CTA no mobile
- SEM menu hambúrguer: a página é curta e o CTA vale mais que a navegação
- Fundo `papel`, blur após 40px de scroll
- CTA compacto com alvo ≥44x44px mesmo assim
- "Pular para o conteúdo" como primeiro elemento focável da página

HERO
- Layout assimétrico 55/45. NUNCA 50/50, 50/50 é o visual de template
- eyebrow / h1 / uma frase de subtítulo / UM CTA. Nada mais.
  Dois CTAs no herói é o jeito mais rápido de reduzir os dois
- A palavra "artesanal" no h1 em Playfair itálico (vem de content.ts)
- Foto com máscara orgânica do OrganicClipPaths. Nunca border-radius, nunca círculo
- USE A FOTO DO ENSAIO PROFISSIONAL da Andressa (drive-files/). Confirmado em 29/07.
  Rosto no terço superior, recorte 4:5. Nada de paisagem no herói: ela tem UMA
  aparição na página inteira, no CtaFinal.

  >>> ESSA IMAGEM É O LCP DA PÁGINA. Só ela leva priority. O `sizes` precisa estar
  >>> certo, senão o navegador baixa a versão desktop no celular. Alvo: <= 120 KB no
  >>> recorte final. Retrato profissional em alta resolução estoura isso fácil.
  >>> Me reporte o peso real do arquivo servido em 390px.

REGRA DO LCP, a mais fácil de quebrar:
  Nada aqui começa com opacity: 0 no HTML. Nenhum elemento do herói pode depender de JS
  para aparecer. Se o chunk demorar ou falhar, a dobra tem que estar completa.

FAIXACLIENTES
>>> A Fase 0 confirmou que não existe logo de cliente no material, então esta seção
>>> NASCE E FICA DESLIGADA. Monte o componente, deixe exibir: false, e siga.
- Faixa fina sobre `superficie-2` (sage)
- Logos SVG monocromáticos em `ancora` (sobre sage, `tinta` dá só 4,39:1),
  altura ÓPTICA equalizada (não por bounding
  box, logo com descendente parece menor se você igualar a caixa)
- Sem carrossel automático. Se não couberem, quebra em duas linhas
- Nasce com exibir: false. Se content.ts disser false, a seção não renderiza, e a
  decisão fica em content.ts, nunca comentando o componente em page.tsx.
  Componente comentado some do radar e nunca volta

VALIDE EM 390px ANTES de qualquer outro breakpoint. Me mande screenshot de 390px e 1440px.
```

**Pronto quando:** herói bonito e completo em 390px, um CTA só, nada dependendo de JS para aparecer.
