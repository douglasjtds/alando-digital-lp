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
   Deploy apontando para a main. Instruções de DNS para alandodigital.com.br.
   O domínio primário é SEM www, com o www redirecionando para ele: se os dois
   divergirem, o canonical aponta para uma URL que responde com redirect.
   >>> LIGUE A INDEXAÇÃO junto com o domínio. É o esquecimento mais comum do deploy:
   >>> a página fica no ar com noindex e ninguém percebe por semanas.
   >>> NÃO defina NEXT_PUBLIC_SITE_URL na Vercel. Ela vem ANTES do brand.site.url na
   >>> cascata do lib/site-url.ts (linhas 35-42): definida com o valor errado, com www
   >>> ou com barra final, ela troca o canonical em silêncio, sem ninguém tocar em src/.
   Adicione Vercel Analytics.

4b. TAG MANAGER (entrou em 17/09, pedido da pessoa de tráfego pago)
   Contêiner GTM-5CCX9PLF, instalado por @next/third-parties no layout.tsx.
   Na Vercel: NEXT_PUBLIC_GTM_ID=GTM-5CCX9PLF, marcando SÓ o escopo Production.
   >>> Sem Preview e sem Development: preview disparando as tags da campanha suja
   >>> os dados que a pessoa do tráfego usa para decidir onde gastar a verba.
   >>> E o contrário é pior: ESQUECER a variável deixa a campanha rodando sem
   >>> medição nenhuma, e nada acusa erro no build. Mesma classe do "subiu com
   >>> noindex" do passo 4.
   A conferência NÃO é no build local, que por definição não carrega: abra a URL
   real, painel de rede, e veja o gtm.js?id=GTM-5CCX9PLF sendo baixado.
   Depois, com o modo Preview do contêiner aberto, clique num CTA e confirme o
   evento `cta_whatsapp` chegando com o event_label da origem.
   Consentimento LGPD ficou de fora por decisão do Douglas, está no TODOs.md.

5. SEARCH CONSOLE
   Propriedade do tipo PREFIXO DE URL, e o prefixo é https://alandodigital.com.br,
   SEM www.
   >>> Uma propriedade com www fica quase vazia: o Google atribui impressões e cliques
   >>> à URL canônica, que é a sem www, e recusa o sitemap.xml como fora do escopo dela.
   >>> A verificação até PASSA com www, porque o redirect é seguido, e é isso que engana.
   Verificação por TAG HTML: pegue o token no GSC e me passe. Ele entra em
   metadata.verification.google no layout.tsx, junto do resto da metadata.
   Não use o método "Arquivo HTML", que o GSC recomenda primeiro: o token no layout.tsx
   fica versionado e revisável ao lado dos outros campos, enquanto um .html solto em
   public/ é um arquivo que ninguém lembra de onde veio seis meses depois.
   Verificada a propriedade, envie sitemap.xml no menu Sitemaps.
   Dê acesso de PROPRIETÁRIO ao Gmail da Andressa em Configurações > Usuários e
   permissões. Se um dia vocês se separarem, os dados históricos ficam com ela.

6. CHECKLIST FINAL
   [ ] Preview de link real no WhatsApp, MANDE PARA VOCÊ MESMO. É o canal onde a página
       mais circula, e og:image errado só aparece assim
   [ ] Preview no Instagram
   [ ] Favicon e apple-touch-icon
   [ ] JSON-LD validado no Rich Results Test com a URL final
   [ ] robots liberado e canonical apontando para o domínio real
   [ ] Propriedade no Search Console criada SEM www, verificada, sitemap enviado
   [ ] Andressa com acesso de proprietária no Search Console
   [ ] Todos os CTAs abrindo a conversa com a mensagem certa, testados no celular
   [ ] gtm.js carregando na URL real e o cta_whatsapp chegando no Preview do contêiner
   [ ] Lighthouse mobile: me mostre as quatro pontuações

7. ENTREGA À CLIENTE
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
