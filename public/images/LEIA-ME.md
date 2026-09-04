# `public/images/`

Fotos tratadas, `og-image` e favicon. Entram na **Fase 3**, processadas por
`scripts/processar-fotos.mjs`, que é o registro versionado do tratamento aplicado.

## As fontes aprovadas

Inventário completo em `instructions/AUDITORIA-FASE-0.md` §4.

| Origem | O que é | Destino |
|---|---|---|
| `ref-files/foto lp.jpg` | **bastidor da captação**, Sony ZV-E10, 4000×6000 | `Hero` |
| `drive-files/Dêssa/` | **2 fotos da Andressa**, 1023×1537 | `Sobre`, `og-image` |
| `drive-files/Fotos captações/` | **9 fotos do trabalho acontecendo**, iPhone | `Servicos`, `Sobre` |
| `ref-files/Paleta de cores.png` | montanha na neblina | `CtaFinal`, **uma vez só** na página |
| `drive-files/estruturação de perfil/` | **print do perfil de uma cliente**, 1290×1644 | `Servicos`, prova do serviço |
| `drive-files/captação e edição de vídeo/` | **11 bastidores de captação**, iPhone, 9:16. Nove usados | `Servicos`, sequência de quadros |
| `drive-files/landing pages/` | **captura da landing page de uma cliente**, 1928×16824 | `Servicos`, prova do serviço (pôster do vídeo) |

## Três restrições que decidem o recorte

**1. Os retratos não têm folga de resolução.** 1023×1537 é o que existe. A coluna da imagem em
55/45 sobre `max-w-6xl` pede 1036 px para cobrir 2x. **Nada de corte apertado no rosto:** qualquer
recorte que amplie a face derruba a densidade abaixo de 2x.

⚠️ Desde 26/08 esta restrição vale só para o `Sobre`. O herói trocou o retrato pelo bastidor da
captação, que vem de uma fonte de 4000×6000 e sai em 1200×1800, com folga real de 2x. O retrato do
herói continua sendo gerado (`retrato-hero.jpg`) porque a foto da Andressa volta em outra seção,
ainda a definir.

**2. As de captação repetem o mesmo enquadramento** (mão segurando a câmera, tela mostrando a
cena). Distribuir entre seções distantes e variar o recorte. Só duas estão em resolução de trabalho
(as `.heic`); quatro vieram em 310×552 e servem apenas para thumbnail pequeno.

**3. A paisagem tem uma única aparição permitida.** Uma vez é atmosfera, duas é banco de imagem.

**4. A sequência de vídeo é somada nove vezes, e isso muda a régua.** Os nove `video-quadro-*`
ocupam o MESMO slot, um de cada vez. Nos 1100 px e qualidade 82 do resto eles davam **1,15 MB**
numa seção só; a 800 px e qualidade 76 somam **766 KB**, e a mais pesada cai de 188 para 125 KB. O
slot dá 330 CSS px em desktop e ~350 em 390, então 800 px ainda são 2,3x num celular a DPR 2, e
cada quadro fica 3,4 s na tela sem nunca aparecer ao lado de outro.

⚠️ O `servico-video.jpg` **não desce junto**: ele é o quadro em repouso, o único que sai no HTML do
servidor e o único que quem tem `prefers-reduced-motion` vê. Continua em 1100/82.

E o peso da sequência **não é baixado de uma vez**: o `SequenciaDeQuadros` monta o quadro seguinte
com um de antecedência, então quem passa rolando pela seção baixa dois ou três, não dez.

**5. O pôster do vídeo não é foto, é quadro.** `servico-landing-page.jpg` (964×600, **26 KB**) é o
primeiro quadro do `public/video/servico-landing-page.mp4`, escrito pelo `gravar-landing.mjs` e não
pelo `processar-fotos.mjs`. Ele faz três trabalhos: pôster do `<video>`, substituto em
`prefers-reduced-motion` e fallback se o vídeo não carregar. Sai da mesma fonte pelo mesmo `sharp`
sem `withMetadata()`, então a regra de metadados continua valendo inteira.

⚠️ Ele é leve porque é o topo de uma página quase toda creme, não porque a régua afrouxou. Se um
dia o quadro de repouso mudar para uma seção com foto, meça de novo.

## Regras

- Nenhuma imagem acima de ~200 KB. A mais pesada é `servico-estruturacao.jpg`, **187 KB**, e ela é
  servida em 1290×1644, a largura nativa, porque em desktop ela aparece a 642 CSS px e a 1100 px de
  fonte a densidade cairia de 2,01x para 1,71x. A 1100 px ela pesaria 146 KB, se um dia for preciso.
  O herói mira **120 KB**, e nenhuma das duas fotos que já
  ocuparam o slot chegou lá: `retrato-hero.jpg` pesa 178 KB e `captacao-hero.jpg`, 142 KB (eram 138
  KB enquanto ela era dessaturada; o croma que voltou custou 4 KB). O teto duro de 200 KB é
  respeitado; o alvo de 120 KB é dívida aberta.
- **Metadados removidos em tudo.** O `processar-fotos.mjs` usa `sharp` sem `withMetadata()` e sai
  em JPEG, o que apaga o EXIF das fotos de iPhone e a credencial C2PA dos retratos num passo só.
  **Nenhuma imagem entra aqui sem passar por ele.**
- Tratamento cromático unificado: dessaturar na direção de `decor` (`#B3B793`) e aquecer
  levemente, ajustando pela **página montada**, nunca pela foto isolada. Os retratos pedem pouco,
  já vêm de parede clara com luz quente. As de captação é que brigam entre si.
  - ⚠️ **Duas exceções, e as duas são nomeadas.** A regra existe para domar cor que é ruído. Onde a
    cor é o assunto, ela se inverte e come exatamente o que a imagem foi buscar:
    - `captacao-hero.jpg`, 26/08. O coral da caneca e o rosa da tela são o que a dessaturação come
      primeiro, e são o que a foto existe para mostrar. Custa 4 KB e vale.
    - `servico-estruturacao.jpg`, 02/09. O print prova um trabalho de identidade visual: os
      círculos terracota dos destaques e o feed em tons de terra são a entrega sendo mostrada. A
      média RGB medida do original é `146,132,119`, um neutro quente já dentro da família da paleta.
    A regra continua valendo para as outras cinco.
- **Nenhum vídeo aqui.** Vídeo mora em `public/video/`, tem script próprio e orçamento próprio.
  Ver `public/video/LEIA-ME.md`, inclusive para por que existe um vídeo nesta página.
- **Nenhum PDF aqui. Nunca.** Ver `public/brand/LEIA-ME.md`.
- Foto de terceiro só com autorização escrita. Há **uma criança** na tela da câmera em
  `499E4759`, e esse é o caso mais restritivo da lista.
  - `servico-estruturacao.jpg` mostra o perfil de uma cliente com o nome legível e o rosto dela num
    dos posts. **Está em `public/` porque a autorização escrita existe**, confirmada pelo Douglas em
    02/09. Esta é a linha que separa esse arquivo do material de `drive-files/` que nunca pode sair
    de lá.
  - `servico-landing-page.jpg` e o vídeo de que ele é o pôster mostram a página de outra cliente,
    com nome, rosto e registro profissional legíveis. Mesma linha, confirmada pelo Douglas em 03/09,
    e com uma condição a mais: **a página foi entregue pela Alando**. Prova de portfólio de trabalho
    que não é da agência seria afirmação falsa sobre o serviço, não questão de imagem.
  - Sete dos nove `video-quadro-*` têm pessoa identificável ou marca de cliente legível (a modelo na
    loja de calçados, os dois homens sobre os barris, a cliente diante do espelho, e os rostos
    pequenos nas telas das câmeras). **Estão em `public/` pela mesma linha**: a autorização escrita
    existe, confirmada pelo Douglas em 02/09.
  - As duas que ficaram de fora das onze (`IMG_2333` e `IMG_7265`) saíram por serem quase o mesmo
    quadro das vizinhas, não por autorização. O critério está no `processar-fotos.mjs`.
