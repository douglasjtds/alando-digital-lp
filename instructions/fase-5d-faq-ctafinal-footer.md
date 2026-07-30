# Fase 5D: Faq, CtaFinal, Footer, StickyMobileCta

```
Monte as últimas seções conforme landing-page-structure.md §5.9 a §5.12.
Sem animação nenhuma ainda.

FAQ
- <details>/<summary> NATIVO. NÃO use o Accordion do shadcn/Radix.
  Motivo: acessível de graça, custa 0 KB, e o conteúdo fica no HTML para o crawler.
  Accordion em React tira o FAQ do índice, e o FAQ é a seção que mais rende cauda longa
  em busca justamente porque as perguntas são o que as pessoas digitam
- Chevron do Lucide, peso 1.5px, rotacionando por CSS no [open]
- 5 a 7 perguntas, respostas em prosa real de 2 a 4 frases
- Vai espelhar EXATAMENTE o JSON-LD FAQPage na Fase 6. Se as duas fontes divergirem, o
  Google detecta e passa a ignorar o markup inteiro
- Se a copy ainda não chegou: estrutura pronta, marcador visível, e me diga

CTAFINAL
- Faixa FULL-BLEED em `ancora`: o momento mais escuro da página, fechando o arco que
  começou no fundo claro
- CTA INVERTIDO: fundo `papel`, texto `ancora`. É o único botão claro da página inteira
- Rótulo DIFERENTE do herói: no herói a pessoa decide se vale a pena; aqui ela já decidiu
  e está começando
- Sem sombra colorida, sem gradiente, sem borda muito arredondada

FOOTER
- Fundo `ancora-quente` #4C2B08 (segue o CtaFinal), texto `papel` (11.5:1)
- Monograma, nome, Instagram @alandodigital, cidade (peso em busca local), copyright,
  crédito discreto do desenvolvimento

STICKYMOBILECTA
- Só < 768px
- Aparece quando o herói sai da viewport (IntersectionObserver em #inicio), some quando volta
- safe-area-inset-bottom respeitado, senão fica atrás da barra do iPhone
- Quando o tráfego vem de link na bio, este costuma ser o CTA mais clicado da página inteira

ESTADO PENDENTE DO CTA
Enquanto brand.whatsapp.phone estiver vazio, linkDoCta() devolve null e o WhatsappCta
renderiza DESABILITADO, com o marcador no title.
NÃO monte https://wa.me/?text=... sem destinatário: abre o WhatsApp em branco, parece que
funcionou, e chega em produção sem ninguém notar.

VALIDE EM 390px. Screenshot da página inteira, do topo ao rodapé.
```

**Pronto quando:** página completa e navegável de ponta a ponta, ainda sem animação, bonita em 390px.

**Rode um review com um segundo agente antes de seguir para a Fase 6.**
