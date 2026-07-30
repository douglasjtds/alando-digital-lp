# Fase 6: SEO técnico

```
Complete o SEO conforme landing-page-structure.md §7.

1. METADATA (app/layout.tsx)
   title:       Alando Digital, Branding e comunicação em <<A CONFIRMAR: cidade>>  (≤60 chars)
   description: 150-160 chars, com base na linha da capa do deck ("Estratégia,
                posicionamento e comunicação para marcas que desejam ser lembradas")
                mais a região
   openGraph:   locale pt_BR, og-image.jpg 1200x630
   twitter:     summary_large_image
   alternates.canonical + metadataBase

2. NOINDEX ENQUANTO NÃO HÁ DOMÍNIO
   Confirme a ordem em lib/site-url.ts: NEXT_PUBLIC_SITE_URL → brand.site.url →
   VERCEL_PROJECT_PRODUCTION_URL → localhost.
   Enquanto a URL for provisória, canonicalPendente = true e a página pede noindex.
   Preview de Vercel indexado compete com o domínio real e é trabalhoso de tirar depois.

3. JSON-LD: um @graph único, quatro nós
   Grafo único, não nós soltos: é o que permite cruzar por @id e o Google entender que a
   Person é founder do negócio, em vez de tratar os dois como entidades sem relação.

   a) TIPO_NEGOCIO = "AdvertisingAgency"
      É o subtipo de LocalBusiness mais específico para agência de comunicação.
      Desvio DELIBERADO do catálogo da skill, que manda ProfessionalService para
      "qualquer outra", AdvertisingAgency existe em schema.org e diz muito mais.
      Campos: name, alternateName, description, url, logo, image, foundingDate (2022),
      areaServed, sameAs (Instagram), telephone, address

   b) Person, Andressa Lando. jobTitle, alumniOf (ESPM), sameAs.
      Ligada ao nó do negócio por founder / @id

   c) OfferCatalog com um Service por serviço da §5.5
      Extensão em relação ao catálogo da skill, que assume um serviço só.
      Para agência é ganho real de SEO e descreve o negócio com honestidade

   d) FAQPage, espelha EXATAMENTE o accordion.
      Só entram perguntas com resposta confirmada. Se nenhuma qualificar, o nó não é
      emitido: FAQPage com mainEntity vazio é inválido

4. A REGRA ASSIMÉTRICA DOS MARCADORES, a mais importante desta fase
   Na PÁGINA, <<A CONFIRMAR>> aparece. No JSON-LD, o campo é OMITIDO.

   Na página o marcador é útil: alguém vê e substitui. No JSON-LD ele é dado falso
   publicado em formato legível por máquina, reprova no Rich Results Test e pode ser
   indexado como se fosse o telefone dela.

   Schema.org aceita ausência. Não aceita mentira.

   Confirme que lib/pendencias.ts → confirmado() devolve undefined (não null, não "",
   undefined é o único valor que JSON.stringify remove da saída) e que TODO campo do
   grafo passa por lá.

5. TÉCNICO
   - Âncoras: #servicos, #processo, #sobre, #duvidas
   - Auditoria de headings: UM h1 só, hierarquia sem pular nível.
     Confirme com grep, não com leitura
   - lang="pt-BR" no <html>
   - sitemap.ts + robots.ts (não robots.txt estático, o robots precisa saber se a
     indexação está liberada)
   - not-found.tsx no estilo da marca
   - >>> CONFIRME que a repetição visual da FaixaRepetida NÃO chega repetida ao HTML
     >>> semântico. Uma instância real; o resto aria-hidden="true".
     >>> Rode um leitor de tela ou inspecione a accessibility tree

Ao final, rode pendenciasDoSchema() e me diga o que falta para o JSON-LD ficar válido.
```

**Pronto quando:** JSON-LD passa no Rich Results Test, metadata completa, um `h1` só confirmado por
grep, `pendenciasDoSchema()` sem itens bloqueantes.
