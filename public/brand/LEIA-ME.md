# `public/brand/`

Monograma e lockups da Alando. Entram na **Fase 3**.

## De onde vem

`ref-files/Logos/` e `ref-files/Ícones /`, auditados na Fase 0. São **40 PNGs de 1080×1080 com
alfa**, organizados em três lockups e um monograma, cada um nas **oito cores da paleta**, com
versão **negativa (branca)** incluída:

| Origem | Conteúdo | Onde usar |
|---|---|---|
| `Ícones /1-8` e `Logos/9-16` | monograma preenchido | header (32px), footer (40px) |
| `Ícones /9-16` | monograma em contorno | recurso gráfico estático |
| `Logos/1-8` | lockup horizontal com tagline | og-image, onde houver largura |
| `Logos/17-24` | lockup vertical com tagline | `CtaFinal`, rodapé em mobile |

## Não existe SVG, e não vamos pedir

Decisão do Douglas em 31/07. **PNG 1080 servido por `next/image` resolve**: as variantes são
geradas no build e um monograma de 32px sai em cerca de 2 KB.

E não há SVG a pedir: o próprio deck da Alando coloca o lockup como **raster de 588×343**, menor
que os PNGs que temos. `ref-files/` é a melhor fonte que existe.

**A única perda é a animação de traçado**, que precisaria de `stroke` em SVG. A Fase 7 fica nos
três gestos da `DESIGN-GUIDELINES.md` §8, que já era o plano principal.

## Regra que vale para esta pasta e para `public/images/`

**Nenhum PDF entra aqui. Nunca, nem temporariamente.** Em Next.js tudo que está em `public/` é
servido: um PDF aqui fica baixável por URL direta e indexável pelo Google mesmo sem link nenhum
apontando para ele. `drive-files/` guarda diagnóstico de marca e manual de identidade visual de
**outros clientes da agência**, e publicar isso por acidente é dano à reputação da Andressa.

Só entram imagens rasterizadas, aprovadas e **com metadados removidos**. Imagem exportada de PDF
carrega XMP com o nome do arquivo original: "Cópia de Id Visual Juliana" viraria o nome de um
cliente embutido num arquivo público. O `exiftool` **não está instalado nesta máquina**
(`brew install exiftool`).

## Logos de clientes: adiados

Não existe arquivo de logo de cliente no projeto, e as capas dos PDFs **não servem de fonte**: não
há um único operador de curva nelas. Pedido em aberto com a Andressa: **SVG exportado do Canva**,
mais autorização de cada cliente. `FaixaClientes` nasce desligada.
