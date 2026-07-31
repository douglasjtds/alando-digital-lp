# Fase 4: Conteúdo

> ⚠️ **`Landing Page copy.md` é a fonte de verdade do texto.** Nenhuma palavra alterada sem
> aprovação do Douglas. Onde faltar copy, marque e pare, não escreva.

```
Preencha src/config/content.ts com TODA a copy da página, seguindo landing-page-structure.md
§5 e as regras de voz do DESIGN-GUIDELINES.md §11.

REGRA ZERO: a copy vem de Landing Page copy.md, LITERAL. Não reescreva, não "melhore",
não corrija gramática, não encurte por conta própria. Se algo parecer errado, REPORTE.

REGRA UM: não invente dado. Telefone, cidade, domínio, prazo, preço, número de clientes,
resultado de caso, depoimento: se não veio dela, use <<A CONFIRMAR: descrição>>.

O QUE ENTRA, seção por seção:

1. Hero
   eyebrow:  Branding e comunicação · <<A CONFIRMAR: cidade>>
   h1:       Criando e gerenciando marcas de forma artesanal.
             CONFIRMADO. O documento Landing Page copy.md diz "Cuidando" em dois pontos e
             está DESATUALIZADO ali. Use "Criando", que é o que está no lockup do logo.
   palavra em itálico do h1: "artesanal"
   subtítulo: Porque nenhuma marca deveria ser tratada como só mais um cliente.
   CTA:      Quero conversar com a Alando

   NÃO inclua o parágrafo longo ("Na Alando, acreditamos que um bom posicionamento começa
   muito antes do primeiro post…"). Ele vai para o Manifesto, palavra por palavra, sem
   alteração. <<A CONFIRMAR com o Douglas: aprovada a mudança de posição?>>

2. FaixaClientes, exibir: false até os logos chegarem
   titulo: Marcas que confiam em nós
   A Fase 0 confirmou que NÃO existe logo de cliente no material, e que as capas dos
   PDFs de drive-files/ não servem de fonte: não há arte vetorial nelas.
   <<A CONFIRMAR: logos de clientes autorizados, em SVG exportado do Canva>>

3. Manifesto
   h2:      Antes de falar sobre redes sociais…
   resolve: …queremos falar sobre pessoas.   (palavra em itálico: "pessoas")
   corpo:   os dois parágrafos da copy + o parágrafo migrado do herói
   fecha:   É por isso que, antes de pensar em conteúdo, pensamos em identidade.
   SEM CTA. Esta seção argumenta; não vende.

4. Momentos
   intro:  Cada empresa chega até nós em um momento diferente.
   três blocos (titulo = a situação, texto = o diagnóstico), extraídos do parágrafo da copy
   fecha:  o parágrafo "Independentemente do momento…"
   <<A CONFIRMAR com o Douglas: separar o parágrafo corrido em três blocos é reorganização
   de layout, sem alterar palavras. Aprovado?>>

5. Servicos: os cinco, com HIERARQUIA declarada no dado
   Marque "Gestão de Redes Sociais" com destaque: true. Os outros quatro, false.
   A própria copy diz: "Esse é o coração da Alando."
   Mantenha a linha de fechamento de cada serviço quando existir.
   Ao fim: o bloco "Mais do que contratar um serviço…"
   <<A CONFIRMAR: a copy lista 5 serviços; o PDF lista outros. Qual é o portfólio atual?>>

6. Resultados, exibir: false
   Os dados do deck (Daoravida, NaCasa, Vizzent, Luciano) estão em
   landing-page-structure.md §5.6. NÃO os coloque sem autorização.
   <<A CONFIRMAR: autorização escrita de cada cliente>>
   <<A CONFIRMAR: nomear ou anonimizar por segmento?>>
   A redação, quando liberada, tem que deixar claro que é história, não previsão.

7. Processo: <<A CONFIRMAR: o processo real, com as palavras dela, e os prazos reais>>
   NÃO escreva as etapas a partir do PDF. Prazo e duração são promessa contratual.
   Deixe a estrutura pronta e vazia, com o marcador.

8. Sobre: dois movimentos, literais da copy
   a) Nossa história
   b) Quem está por trás da Alando

   >>> UMA ÚNICA ALTERAÇÃO AUTORIZADA NA COPY, aprovada pelo Douglas em 29/07:
   >>> no fechamento de "Nossa história", trocar "cuidamos" por "criamos":
   >>>   "É por isso que dizemos que CRIAMOS e gerenciamos marcas de forma artesanal."
   >>> Motivo: a frase cita o slogan explicitamente, e o slogan é "Criando".
   >>> É UMA palavra. Nenhuma outra ocorrência de "cuidar" na copy muda, e são cinco.

9. Faq, <<A CONFIRMAR: as 5-7 objeções que a Andressa mais ouve>>
   NÃO invente perguntas genéricas. É a seção que mais rende cauda longa em busca
   justamente porque as perguntas são o que as pessoas digitam de verdade.

10. CtaFinal, <<A CONFIRMAR: copy do fechamento>>
    O título precisa nomear a última objeção. Rótulo do botão DIFERENTE do herói.

11. Footer: <<A CONFIRMAR: cidade>>, Instagram @alandodigital

MENSAGENS DE WHATSAPP
As seis mensagens estão especificadas em landing-page-structure.md §6. Copie de lá.
Elas são escritas na voz de QUEM VISITA (é a pessoa quem envia) e precisam ser
distinguíveis entre si, seis mensagens quase iguais não rastreiam nada.

AO FINAL
Me liste TODOS os <<A CONFIRMAR>> num bloco só, para eu levar à cliente.
E me diga, separadamente, quais seções ficaram com exibir: false e por quê.
```

**Pronto quando:** `content.ts` completo, lista de pendências num bloco só, **zero dado inventado,
zero palavra da copy alterada**.

**Nada hardcoded em componente.** Tudo vem daqui.
