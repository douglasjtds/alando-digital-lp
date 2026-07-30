# Fase 0: Auditoria de `ref-files/` e scaffold

> **Esta fase é bloqueante.** A auditoria vem antes do código de propósito: descobrir que a fonte do
> manual é demo depois da página pronta significa refazer a decisão tipográfica com tudo em cima dela.
>
> O `AUDITORIA-ETAPA-1.md` foi escrito **sem acesso a `ref-files/`**, a tipografia foi deduzida das
> fontes embutidas no PDF. Esta fase confirma ou derruba aquelas conclusões.

---

```
Leia por inteiro, antes de escrever qualquer código:
- CLAUDE.md
- DESIGN-GUIDELINES.md
- landing-page-structure.md
- AUDITORIA-ETAPA-1.md

PRIMEIRO, audite ref-files/ e me reporte. Não escreva código nenhum antes de reportar.

1. FONTES
   Abra a pasta e LEIA todo arquivo de texto que vier junto: .txt, LICENSE, README,
   "Important note", "Read me first". É literalmente ali que as fundições escrevem as
   restrições. Rode também `strings` nos .ttf/.otf procurando por: personal use, demo,
   trial, license, copyright, reserved, uicreative.

   Para cada família me diga:
   - É Google Fonts / OFL?
   - É comercial? Tem licença WEBFONT comprovada? (desktop NÃO serve, e converter
     formato não muda licença)
   - Está marcada como DEMO, PERSONAL USE ONLY ou trial?
   - Procedência incerta, a fonte que "todo mundo tem" e não está à venda?

   CONFIRME OU DERRUBE as conclusões do AUDITORIA-ETAPA-1.md §1:
   - Montserrat: OFL / Google Fonts?
   - Playfair Display: OFL / Google Fonts?
   - asimilates: Personal Use Only da UICreative?

   E responda a pergunta que decide tudo:
   >>> asimilates aparece SÓ no lettering do logo (e o logo veio como SVG com paths
   >>> vetorizados), ou ela é a fonte display prevista para os títulos?
   Se for só o logo, não precisamos carregar a fonte e não há problema de webfont.
   Se for para títulos, precisa de licença webfont ou substituição por Playfair Display.

2. ÍCONES DA MARCA
   Existem ícones proprietários? Em SVG editável ou rasterizados? São stroke ou fill?
   (Só stroke desenha. Fill não tem traçado para animar.)
   Isso decide o desenho da assinatura de movimento na Fase 7, reporte com clareza.
   Se NÃO existirem, diga isso explicitamente. NÃO invente um conjunto genérico.

3. LOGO E MONOGRAMA
   Quais variações existem (horizontal, vertical, negativo, P&B)? Em SVG?
   Existe monograma isolado, para o header e o footer?

4. FOTOS
   Quantas, de quantas sessões diferentes, e:
   - Existe ensaio da Andressa ou da equipe? (é a pendência de maior impacto do projeto)
   - Quais têm terceiros identificáveis, que precisam de autorização de imagem?
   - Resolução e peso de cada uma.

5. LOGOS DE CLIENTES
   Existem? Em SVG? Quantos?

6. drive-files/  (pasta nova, material recebido em 29/07)
   Faça o inventário SEM abrir conteúdo além do necessário para catalogar:
   - Fotos da Andressa e da equipe: quantas, e são de ensaio profissional ou
     registro de celular? (muda completamente o que dá para fazer no Hero)
   - Fotos de captação/bastidores: quantas, que situações
   - PDFs de diagnóstico de marca e identidade visual de clientes: quantos,
     de quantos clientes, e o que aparece na PRIMEIRA página de cada um
     (só logo do cliente? nome? texto estratégico legível?)

   >>> ESSES PDFs SÃO REFERÊNCIA E NÃO PODEM SER PUBLICADOS.
   >>> Nenhum deles vai para public/. Nem temporariamente, nem "só para testar".
   >>> Em Next.js tudo em public/ é servido: PDF ali é baixável por URL direta e
   >>> indexável pelo Google sem nenhum link apontando para ele.

   No .gitignore, acrescente drive-files/ junto com ref-files/ se forem pesados,
   e me diga o que decidiu.

DEPOIS de reportar os cinco itens, monte o scaffold:

- Next.js App Router + TypeScript estrito + Tailwind v4
- SEM shadcn/ui e sem biblioteca de componentes. Só o utilitário cn (clsx +
  tailwind-merge). Ver landing-page-structure.md §2.3
- anime.js v4 como dependência (usado na Fase 7). NÃO instale three.js: medido em
  127,1 KB gzip na cena mínima, contra 24 KB de orçamento. Ver DESIGN-GUIDELINES §8
- package.json com o nome do projeto
- README curto: como rodar, como buildar, onde ficam os tokens
- .gitignore: drive-files/ SEMPRE entra. Avalie ref-files/ (se os arquivos forem
  pesados) e me diga
- scripts/contraste.mjs e scripts/processar-fotos.mjs copiados da skill landing-profissional

NÃO configure output: 'export', o deploy é na Vercel e precisamos do next/image.
NÃO instale Lenis, GSAP nem qualquer biblioteca de smooth-scroll. Ver §2.2.
NÃO escreva nenhuma seção da página ainda.

Rode o build e me mostre o resultado.
```

**Pronto quando:** `npm run dev` sobe, `npm run build` passa, e existe decisão escrita sobre cada
família de fonte, sobre a existência de ícones e sobre o inventário de fotos.

**⚠️ Se a auditoria contradisser o `AUDITORIA-ETAPA-1.md`, pare e me traga**, os documentos
precisam ser atualizados antes da Fase 1.
