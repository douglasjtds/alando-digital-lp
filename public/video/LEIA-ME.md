# `public/video/`

Um arquivo só, e a pasta existe porque ele não é imagem. Gerado por
`scripts/gravar-landing.mjs`, que é o registro versionado da captura e do encode.

| Arquivo | O que é | Onde aparece |
|---|---|---|
| `servico-landing-page.mp4` | a landing page de uma cliente rolando, em visita guiada | `Servicos`, prova de Landing Pages |

O pôster dele é `public/images/servico-landing-page.jpg`, o primeiro quadro, e mora lá porque é
imagem: ele é o que aparece em `prefers-reduced-motion` e o fallback se o vídeo não carregar.

## ⚠️ Este vídeo é um desvio registrado, não um recurso disponível

A `DESIGN-GUIDELINES.md` §8 fecha o movimento da página em três gestos presos ao scroll, mais um
momento coreografado. Este é o **segundo** desvio, decidido pelo Douglas em 03/09 com o texto do
primeiro (a sequência de quadros de Captação, 02/09) na mesa. O argumento inteiro e as contenções
estão na §8.

**Não é precedente para um terceiro.** Antes de trazer outro vídeo para esta página, leia a §8.

## Orçamento

| Item | Teto | Medido |
|---|---|---|
| `servico-landing-page.mp4` | **400 KB** | **375 KB**, CRF 34, 964×600, 11,5s |
| `servico-landing-page.jpg` (pôster) | 200 KB, o teto de imagem | **26 KB** |

O teto de 400 KB é linha de orçamento **nova**, aberta junto com a decisão de 03/09: nenhum vídeo
cabe nos ~200 KB que valem para imagem. Ele não é folga para os outros assets, é o preço desta
decisão específica, e o `gravar-landing.mjs` falha em vez de estourá-lo.

Três coisas seguram o custo real, e as três estão medidas no cabeçalho do script:

1. **O ritmo é parada e avanço**, não rolagem contínua. Rolagem contínua move todo pixel em todo
   quadro, e nessa forma nem o pior degrau de qualidade coube: 688 KB em CRF 36.
   A parada subiu de 0,7s para 1,2s em 04/09, porque a visita passava rápido demais na página
   montada. Custou 16 KB (359 → 375) por 3,5s a mais, que é a medida do argumento: quadro repetido
   é quase de graça, e é por isso que o avanço ficou onde estava.
2. **964 de largura, não 1284.** O 2x exato do campo, quando ele ocupava a linha inteira, seria
   1284, e ele não cabia em degrau nenhum. Desde 04/09 o vídeo é exibido ao lado do texto acima de
   1152px, em 484 px de conteúdo, e a densidade dos mesmos 964 subiu para **1,99x**.
3. **`preload="none"` e `<source>` anexado só na interseção.** Quem não chega na seção não baixa
   nada, e isso foi verificado com o painel de rede: zero requisição de `.mp4` antes de rolar.

## Regras

- **Sem trilha de áudio** (`-an`). Economiza bytes e tira do caminho o motivo mais comum de o
  autoplay ser bloqueado.
- **Metadados removidos** (`-map_metadata -1`), o análogo do `sharp` sem `withMetadata()` que vale
  para as imagens. Conferido: o arquivo final não carrega nada do original.
- `yuv420p` e `+faststart`. Sem o primeiro, navegador nenhum aceita; sem o segundo, o vídeo só
  começa depois de baixar inteiro.
- **Nenhum arquivo entra aqui sem passar pelo `gravar-landing.mjs`**, mesma regra do
  `processar-fotos.mjs` para `public/images/`.

## Autorização

`servico-landing-page.mp4` mostra a página de uma cliente real, com o nome, o rosto e o registro
profissional dela legíveis em alguns quadros. **Ele está em `public/` porque a autorização escrita
existe, e porque a página foi entregue pela Alando**, as duas coisas confirmadas pelo Douglas em
03/09. É a mesma linha que separa o `servico-estruturacao.jpg` do material de `drive-files/` que
nunca pode sair de lá.

O `alt` do bloco descreve o que está no quadro, não afirma resultado nenhum (a §11 proíbe promessa
numérica) e **não nomeia a cliente**: a autorização é para publicar a página, não para transformar
o nome dela em legenda no site de outra marca.
