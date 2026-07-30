# Fase 5B: Manifesto, Momentos, Servicos

> ⚠️ **Esta é a leva de maior risco de clichê do projeto inteiro.** Leia `DESIGN-GUIDELINES.md`
> §2 antes de começar, e faça o passe visual real ao final.

```
Monte Manifesto, Momentos e Servicos conforme landing-page-structure.md §5.3, §5.4 e §5.5.
Sem animação nenhuma ainda.

MANIFESTO
- Fundo `ancora`: o primeiro momento escuro da página, e vem cedo de propósito
- h2 com FaixaRepetida em `superficie-2`
- "Antes de falar sobre redes sociais…" resolve em "…queremos falar sobre pessoas."
  A palavra "pessoas" em Playfair itálico
- Texto em `superficie-2` sobre `ancora` (8.91:1) ou `papel` (12.50:1). NUNCA `decor`
- medida (62ch) no corpo
- SEM CTA. Esta seção argumenta; não vende

MOMENTOS
- Layout ESCALONADO: larguras e colunas alternadas
- NÃO grid simétrico. NÃO ícone ao lado de cada item. NÃO três cards iguais
- O titulo é a situação de quem chega; o texto é o diagnóstico, e é no diagnóstico que
  a expertise aparece

SERVICOS, a seção que mais precisa de cuidado
- HIERARQUIA, não grade. "Gestão de Redes Sociais" tem destaque: true em content.ts:
  bloco dominante, largura cheia, o texto mais longo, com foto
- Os outros quatro orbitam em larguras DESIGUAIS, empilhados ALTERNANDO O LADO
- Foto em ALGUNS, não em todos, a lacuna quebra o ritmo de grade
- Fotos alternando orientação (retrato / paisagem)
- SEM ícone genérico em cima de cada. Se a Fase 0 não achou ícone proprietário, não há ícone
- O bloco "Mais do que contratar um serviço…" fecha a seção

>>> O QUE ESTA LEVA NÃO PODE VIRAR:
>>> - As três ideias da marca (entendimento / artesanal / ser lembrada) em três cards
>>>   com ícone. Elas são ARGUMENTO, vivem em prosa e na ordem da página
>>> - Cinco serviços em cinco cards iguais. Isso mentiria sobre o negócio dela

VALIDE EM 390px ANTES de tudo. Me mande screenshot.
```

**Pronto quando:** as três seções estão montadas, estáticas e boas em 390px.

---

## ⚠️ Passe visual obrigatório

Antes de commitar, **abra no navegador em 390px**, não confie no código.

Em mobile tudo empilha. Cinco blocos de serviço empilhados com título em cima podem ler
exatamente como cinco cards iguais, por mais que o layout de desktop esteja correto. O que salva no
desktop desaparece justamente no breakpoint que mais importa, porque o tráfego vem do link na bio.

Se em 390px `Servicos` ler como uma grade, o efeito template voltou. Diga isso, relatório
complacente aqui não serve para nada, porque dá permissão para publicar.
