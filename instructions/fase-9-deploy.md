# Fase 9: Deploy

> **Bloqueada até zero `<<A CONFIRMAR>>`.** A página não vai ao ar com marcador à mostra.

```
Prepare o projeto para produção.

1. PENDÊNCIAS
   Substitua todos os <<A CONFIRMAR>> pelos valores reais (vou te passar).
   Rode um grep final: nenhum pode sobreviver ao deploy.
   Confirme especialmente:
   - número de WhatsApp preenchido e os seis links abrindo com a mensagem CERTA de cada origem
   - cidade em title, description, hero, footer e JSON-LD
   - h1 com "Criando", e a linha de fechamento de "Nossa história" coerente com ele

2. SEÇÕES CONDICIONAIS
   Decida o estado final de FaixaClientes e Resultados.
   exibir: false é um estado final LEGÍTIMO se a autorização não chegou. Seção desligada
   por falta de dado é honesta; número sem autorização não é.

3. LIMPEZA
   Remova ou proteja a rota /styleguide.
   Rode o build de produção e corrija todo warning.

4. VERCEL
   Deploy apontando para a main. Instruções de DNS para <<A CONFIRMAR: domínio>>.
   >>> LIGUE A INDEXAÇÃO junto com o domínio. É o esquecimento mais comum do deploy:
   >>> a página fica no ar com noindex e ninguém percebe por semanas.
   Adicione Vercel Analytics.

5. CHECKLIST FINAL
   [ ] Preview de link real no WhatsApp, MANDE PARA VOCÊ MESMO. É o canal onde a página
       mais circula, e og:image errado só aparece assim
   [ ] Preview no Instagram
   [ ] Favicon e apple-touch-icon
   [ ] JSON-LD validado no Rich Results Test com a URL final
   [ ] robots liberado e canonical apontando para o domínio real
   [ ] Todos os CTAs abrindo a conversa com a mensagem certa, testados no celular
   [ ] Lighthouse mobile: me mostre as quatro pontuações

6. ENTREGA À CLIENTE
   Me prepare um resumo curto para a Andressa com:
   - a decisão tipográfica e POR QUE (se houve substituição de fonte, ela vai abrir o site
     ao lado do manual e comparar, descobrir a diferença sozinha é muito pior do que ser
     avisada)
   - o que ficou desligado e o que falta para ligar
   - a expectativa realista de SEO: a página ranqueia em primeiro para "Alando Digital" e
     ajuda em busca local via FAQ, mas não ranqueia sozinha para termos competitivos.
     Se SEO virar prioridade, o caminho é Google Business Profile + conteúdo recorrente,
     e isso é fase 2 e outro orçamento. Dizer isso agora evita a conversa ruim no terceiro mês
```

**Pronto quando:** no ar, Lighthouse mobile Performance ≥ 95, preview de link correto no WhatsApp,
todos os CTAs abrindo com a mensagem certa, **zero `<<A CONFIRMAR>>`**.
