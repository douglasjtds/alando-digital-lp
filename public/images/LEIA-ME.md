# `public/images/`

Fotos tratadas, `og-image` e favicon. Entram na **Fase 3**, processadas por
`scripts/processar-fotos.mjs`, que é o registro versionado do tratamento aplicado.

## As fontes aprovadas

Inventário completo em `instructions/AUDITORIA-FASE-0.md` §4.

| Origem | O que é | Destino |
|---|---|---|
| `drive-files/Dêssa/` | **2 fotos da Andressa**, 1023×1537 | `Hero`, `Sobre`, `og-image` |
| `drive-files/Fotos captações/` | **9 fotos do trabalho acontecendo**, iPhone | `Servicos`, `Sobre` |
| `ref-files/Paleta de cores.png` | montanha na neblina | `CtaFinal`, **uma vez só** na página |

## Três restrições que decidem o recorte

**1. Os retratos não têm folga de resolução.** 1023×1537 é o que existe. A coluna da imagem em
55/45 sobre `max-w-6xl` pede 1036 px para cobrir 2x. **Nada de corte apertado no rosto:** qualquer
recorte que amplie a face derruba a densidade abaixo de 2x, e o herói é o elemento de LCP.

**2. As nove de captação repetem o mesmo enquadramento** (mão segurando a câmera, tela mostrando a
cena). Distribuir entre seções distantes e variar o recorte. Só duas estão em resolução de trabalho
(as `.heic`); quatro vieram em 310×552 e servem apenas para thumbnail pequeno.

**3. A paisagem tem uma única aparição permitida.** Uma vez é atmosfera, duas é banco de imagem.

## Regras

- Nenhuma imagem acima de ~200 KB. O herói vai até **120 KB**.
- **Metadados removidos em tudo.** O `processar-fotos.mjs` usa `sharp` sem `withMetadata()` e sai
  em JPEG, o que apaga o EXIF das fotos de iPhone e a credencial C2PA dos retratos num passo só.
  **Nenhuma imagem entra aqui sem passar por ele.**
- Tratamento cromático unificado: dessaturar na direção de `decor` (`#B3B793`) e aquecer
  levemente, ajustando pela **página montada**, nunca pela foto isolada. Os retratos pedem pouco,
  já vêm de parede clara com luz quente. As de captação é que brigam entre si.
- **Nenhum PDF aqui. Nunca.** Ver `public/brand/LEIA-ME.md`.
- Foto de terceiro só com autorização escrita. Há **uma criança** na tela da câmera em
  `499E4759`, e esse é o caso mais restritivo da lista.
