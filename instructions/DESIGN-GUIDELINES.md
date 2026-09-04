# DESIGN-GUIDELINES.md
### Landing page: Alando Digital (agência de branding e comunicação)

> Este documento é a **fonte de verdade visual** do projeto. Nenhuma cor, fonte, espaçamento ou
> animação deve ser inventada fora daqui. Se algo não estiver definido, pergunte antes de decidir.
> Arquivos originais da marca em `ref-files/`.

---

## 1. Posicionamento e o que o design precisa comunicar

**Bio da marca:** *"Estratégia, posicionamento e comunicação para marcas que desejam ser lembradas."*

**Slogan / h1:** *"Criando e gerenciando marcas de forma artesanal."*
Confirmado pelo Douglas em 29/07 e coerente com o lockup do logo. O documento de copy traz
"Cuidando" em dois pontos e está desatualizado ali.

### Conceito central: **antes**

O conceito não é um trio de atributos, é uma **ordem de precedência**. A palavra *antes* aparece
sete vezes de forma estrutural, em dois documentos independentes:

- "um bom posicionamento começa muito **antes** do primeiro post"
- "**Antes** de falar sobre redes sociais… queremos falar sobre pessoas"
- "**antes** de pensar em conteúdo, pensamos em identidade"
- "**antes** de pensar em cores, tipografia ou símbolos, buscamos entender quem é a sua marca"
- "**Antes** de publicar conteúdo, existe um perfil inteiro que precisa comunicar confiança"
- "**Antes** de qualquer post, qualquer cor, qualquer palavra, a gente mergulha"
- "uma comunicação forte não nasce de tendências. Ela nasce de **entendimento**"

As três ideias que sustentam o peso, e todas saíram do material dela:

1. **Entendimento antes de execução.**
2. **Artesanal, não fórmula**, *"nenhuma estratégia funciona quando tenta encaixar todas as marcas na mesma fórmula."*
3. **Ser lembrada, não ser vista**: *"muitas empresas investiam em conteúdo, mas poucas realmente construíam uma marca."*

> ⚠️ **Essas três são argumento, não oferta.** Elas vivem em prosa e na *ordem da página*. Nunca
> em três colunas com ícone em cima: é exatamente o clichê que a §2 proíbe, e a copy o entrega
> pronto e simétrico, o que torna o risco alto.

### ⚠️ Decisão de arquitetura registrada (exigência da skill)

**O catálogo de onze seções não foi seguido.** Justificativa completa em `AUDITORIA-ETAPA-1.md` §6.
Resumo do que mudou e por quê:

| Mudança | Motivo |
|---|---|
| `Metodo` (pilares com ícone) → **`Manifesto`** (prosa) + **`Servicos`** (catálogo hierárquico) | O conceito é uma sequência, não três atributos paralelos. E a agência tem portfólio de serviços, coisa que o catálogo não prevê |
| `ProvaRapida` → **`FaixaClientes`** + **`Resultados`** | A prova que a Alando tem é logo de cliente e número de caso, não credencial de conselho |
| `Depoimentos` → **`Resultados`** | Não há depoimento autorizado. Há dado de performance real, que é mais forte para B2B |
| **`Manifesto` vem ANTES de `Momentos`** (o catálogo manda o contrário) | O Manifesto não é método: é o reenquadramento que faz o leitor perceber que o problema dele é outro. Invertido, os `Momentos` viram seletor de plano e a tese vira justificativa posterior |
| Sem registro profissional no eyebrow | Agência, sem conselho |

### Os dois polos que o layout precisa equilibrar

| Polo | Como aparece no design |
|---|---|
| **Competência estratégica**: MBA ESPM, 50+ marcas, números de caso reais | Grid disciplinado e assimétrico, hierarquia tipográfica severa, respiro largo, dados apresentados sem ornamento, zero ruído. A seção `Resultados` é sóbria: número grande, contexto curto, nenhum ícone de "crescimento" |
| **Cuidado artesanal**: "atenção, intenção e respeito aos detalhes" | Máscaras orgânicas nas fotos, paleta terrosa quente, faixas de repetição derivando devagar, fotografia real, movimento lento e nunca simultâneo |

Se uma tela pender demais para um lado, está errada. Competência sem cuidado vira consultoria fria
e contradiz "artesanal"; cuidado sem competência vira perfil de lifestyle, e a Alando vende
estratégia para empresa, não afeto.

---

## 2. ⚠️ O risco nº 1 deste projeto: parecer feito por IA

O risco aqui é **acima da média**, por três motivos específicos desta marca:

1. **A paleta é literalmente o preset.** Verde escuro + sage + terracota + creme sobre foto de
   montanha na neblina é o vocabulário que gerador de imagem produz por padrão em 2026. É uma
   paleta boa; é também a mais copiada que existe agora.
2. **A copy entrega três proposições simétricas prontas.** Qualquer geração automática vai
   transformá-las em três cards. Não faça.
3. **A cliente é uma agência.** Landing de agência tem um formato-padrão tão firme (hero → grid de
   serviços → números → depoimentos → CTA) que fugir dele exige decisão consciente a cada seção.
   A arquitetura da §1 é essa decisão; não a desfaça no caminho.

### Regras de diferenciação: obrigatórias

1. **Inverter a dominância cromática.** A cor âncora é **`#102F15`**: títulos, CTA, faixa de
   fechamento, footer. O fundo claro é *suporte*. O acento é acento, **nunca** cor de botão.
   > Aqui a inversão não contraria o manual: **obedece a ele.** O deck da Alando já é escuro
   > (60-80% da área em verde/marrom quase pretos, com texto claro por cima). A tentação errada
   > neste projeto é a contrária, fazer uma landing bege clarinha "porque site é claro". Isso
   > trairia a marca *e* cairia no template no mesmo gesto.

2. **Formas orgânicas assimétricas, derivadas da marca.** A linguagem de forma vem de **duas
   fontes concretas do material**: (a) os **retângulos de amostra da paleta**, que se sobrepõem em
   colunas de larguras desiguais, dão a lógica de *faixa vertical deslocada*; (b) a **linha de
   crista das montanhas** na foto de fundo da paleta: dá a curva orgânica, longa e assimétrica,
   sem vértice agudo. Máscaras = crista de montanha aplicada a uma faixa deslocada. Nunca
   `border-radius`, nunca círculo, nunca card retangular com sombra.

3. **Fotografia real, nunca banco de imagem.** O acervo foi auditado na Fase 0 e está definido:
   **duas fotos da Andressa** (`drive-files/Dêssa/`) e **nove fotos de captação** do trabalho real
   (`drive-files/Fotos captações/`), todas aprovadas pelo Douglas em 31/07. As de captação são o
   material mais forte que a página tem, porque mostram o trabalho acontecendo, coisa que banco de
   imagem não tem. **Use.** Nenhuma pessoa nesta página pode ser banco de imagem, ilustração
   vetorial ou silhueta. Inventário completo, resoluções e restrições em `AUDITORIA-FASE-0.md` §4.

4. **Uma única animação coreografada.** A entrada do `Manifesto`. Todo o resto é reveal discreto
   ou textura de scroll. Ver §8.

5. **Sem os clichês de sempre:** nada de gradiente colorido, nada de card com sombra flutuante,
   **nada de grid de 3 (nem de 5) colunas com ícone genérico**, nada de emoji em heading, nada de
   ilustração vetorial de pessoa sem rosto, nada de seta de "crescimento" ao lado de número.

---

## 3. Cores

Os tokens têm nome de **papel**, não de cor.

> **Regra desta marca: a paleta do manual é a paleta da página.** São nove tokens, e **oito são
> hexes literais do manual**. Os seis hexes do PNG estão **todos empregados**. Existe **um único**
> valor derivado, e ele existe porque a página precisa de fundo claro e o manual não tem neutro.

### Os hexes do manual

| Token | Hex | Papel |
|---|---|---|
| `ancora` | `#102F15` | **Cor âncora.** Títulos sobre claro, CTA primário, faixa escura, footer |
| `ancora-quente` | `#4C2B08` | Segundo escuro, quente. Hover do CTA |
| `superficie-2` | `#B3B793` | **Superfície clara alternada** e texto de apoio sobre `ancora` |
| `decor` | `= #B3B793` | **Alias de `superficie-2`, usado a 6-12% de opacidade.** Blobs, faixas de repetição, bordas. Nunca cor de texto |
| `acento` | `#AB7743` | Sublinhado, borda, marcador, hover de link. **Nunca texto normal** |
| `acento-texto` | `#4C2B08` | Texto de acento e anel de foco |
| `tinta` | `#544635` | **Corpo de texto** sobre `papel` |
| `tinta-suave` | `#676127` | Legendas e apoio sobre `papel` |

### O único derivado

| Token | Hex | Origem |
|---|---|---|
| `papel` | `#F7F4EC` | `#AB7743` a 8% sobre branco |

Não é cor nova na marca: é o neutro que **o manual já usa sem ter nomeado.** Medi o deck e o texto
claro dele está em `#FFFEF8`, um branco quente que não aparece em nenhuma das seis amostras. A
página precisa de fundo claro, e derivá-lo por aritmética a partir de um hex do manual é a forma
mais fiel de obtê-lo.

Se a Andressa preferir um creme mais fechado, `#F2EDE2` e `#EFEAE0` também passam em tudo.

### Tabela de contraste (calculada, não estimada)

Gerada com `node scripts/contraste.mjs --md`, na Fase 1, contra os hexes de `src/config/brand.ts`.

Cobre as **cinco superfícies**, não três: `ancora-quente` e `tinta` deixaram de ser só cor de texto
na revisão de 29/07, e um fundo que ninguém mediu é onde o erro de contraste se esconde.

| Combinação | Ratio | Veredito |
|---|---|---|
| `ancora` sobre `papel` | **13.27:1** | ✅ AAA |
| `ancora-quente` sobre `papel` | **11.54:1** | ✅ AAA |
| `superficie-2` sobre `papel` | **1.89:1** | ❌ reprovado |
| `decor` sobre `papel` | **1.89:1** | ❌ reprovado |
| `acento` sobre `papel` | **3.50:1** | ⚠️ só texto grande |
| `acento-texto` sobre `papel` | **11.54:1** | ✅ AAA |
| `tinta` sobre `papel` | **8.29:1** | ✅ AAA |
| `tinta-suave` sobre `papel` | **5.76:1** | ✅ AA |
| `ancora` sobre `superficie-2` | **7.02:1** | ✅ AAA |
| `ancora-quente` sobre `superficie-2` | **6.10:1** | ✅ AA |
| `acento` sobre `superficie-2` | **1.85:1** | ❌ reprovado |
| `acento-texto` sobre `superficie-2` | **6.10:1** | ✅ AA |
| `tinta` sobre `superficie-2` | **4.39:1** | ⚠️ só texto grande |
| `tinta-suave` sobre `superficie-2` | **3.05:1** | ⚠️ só texto grande |
| `papel` sobre `superficie-2` | **1.89:1** | ❌ reprovado |
| `ancora-quente` sobre `ancora` | **1.15:1** | ❌ reprovado |
| `superficie-2` sobre `ancora` | **7.02:1** | ✅ AAA |
| `decor` sobre `ancora` | **7.02:1** | ✅ AAA |
| `acento` sobre `ancora` | **3.79:1** | ⚠️ só texto grande |
| `acento-texto` sobre `ancora` | **1.15:1** | ❌ reprovado |
| `tinta` sobre `ancora` | **1.60:1** | ❌ reprovado |
| `tinta-suave` sobre `ancora` | **2.30:1** | ❌ reprovado |
| `papel` sobre `ancora` | **13.27:1** | ✅ AAA |
| `ancora` sobre `ancora-quente` | **1.15:1** | ❌ reprovado |
| `superficie-2` sobre `ancora-quente` | **6.10:1** | ✅ AA |
| `decor` sobre `ancora-quente` | **6.10:1** | ✅ AA |
| `acento` sobre `ancora-quente` | **3.29:1** | ⚠️ só texto grande |
| `tinta` sobre `ancora-quente` | **1.39:1** | ❌ reprovado |
| `tinta-suave` sobre `ancora-quente` | **2.00:1** | ❌ reprovado |
| `papel` sobre `ancora-quente` | **11.54:1** | ✅ AAA |
| `ancora` sobre `tinta` | **1.60:1** | ❌ reprovado |
| `ancora-quente` sobre `tinta` | **1.39:1** | ❌ reprovado |
| `superficie-2` sobre `tinta` | **4.39:1** | ⚠️ só texto grande |
| `decor` sobre `tinta` | **4.39:1** | ⚠️ só texto grande |
| `acento` sobre `tinta` | **2.37:1** | ❌ reprovado |
| `acento-texto` sobre `tinta` | **1.39:1** | ❌ reprovado |
| `tinta-suave` sobre `tinta` | **1.44:1** | ❌ reprovado |
| `papel` sobre `tinta` | **8.29:1** | ✅ AAA |

**Exigências do sistema: as cinco passam, e o `decor` reprova como deve** (`decor` sobre `papel`,
1,89:1, é a verificação que o script faz explicitamente no fim da rodada).

⚠️ **As linhas de `decor` são informativas, e nelas a regra vence o número.** Sobre `ancora` e sobre
`ancora-quente` ele calcula 7,02 e 6,10, ou seja, "aprovado", e mesmo assim **`decor` nunca é cor de
texto, em nenhuma opacidade**: ele é o sage num papel decorativo, e cor decorativa que aparece
aprovada em texto vira cor de texto por acidente na terceira seção. Quem quer sage legível sobre
escuro pede `superficie-2`, que é o mesmo hex com o nome do papel certo.

### Quatro consequências, todas decididas pelo cálculo

**1. `acento-texto` é o próprio `#4C2B08`, e isso não é atalho.** Medi o matiz: o caramelo `#AB7743`
está em **30,0°** e o marrom escuro `#4C2B08` em **30,9°**. São a mesma família, com 0,9° de
diferença: `#4C2B08` é literalmente o acento escurecido. Não precisa derivar nada.

**2. O oliva `#676127` finalmente tem função.** Estava sobrando. Passa em `papel` a 5,76:1, então
virou `tinta-suave`, a cor de legenda e apoio.

**3. `decor` deixou de ser hex próprio.** É o sage `#B3B793` a 6-12% de opacidade. A distinção
semântica continua (o alias `--color-decor` existe no CSS para o código ficar legível), mas a marca
não ganha nenhuma cor por isso.

**4. Cinco superfícies, e o quente ocupa área.** ⚠️ **Revisado em 29/07, depois da Andressa dizer
que estava "muito verde".** Ela tinha razão, e o diagnóstico é preciso: as três cores quentes
existiam no sistema, mas só em papéis **tipográficos** (texto corrido, legenda, sublinhado, anel de
foco). Superfície é o que se percebe como "a cor da página", e todas as superfícies eram verdes ou
creme.

Fui medir o que a paleta aguenta como fundo:

| Fundo | O que passa por cima | Veredito |
|---|---|---|
| `papel` `#F7F4EC` | ancora 13.3 · marrom escuro 11.5 · tinta 8.3 · oliva 5.8 | superfície base |
| `superficie-2` `#B3B793` | ancora 7.0 · marrom escuro 6.1 | faixa clara |
| `ancora` `#102F15` | papel 13.3 · sage 7.0 | escura fria |
| **`ancora-quente` `#4C2B08`** | **papel 11.5 · sage 6.1** | **escura QUENTE, tecnicamente intercambiável com a verde** |
| **`tinta` `#544635`** | **papel 8.3** | **média quente** |
| `acento` `#AB7743` | **nenhum texto normal passa** (melhor caso 3.79) | só área e display |

**A descoberta é que `#4C2B08` é uma superfície escura completa**, e estava sendo gasto só no hover
do botão. Promovê-lo a fundo de seção é a correção direta do "muito verde": o `CtaFinal` e o rodapé
passam de verde para marrom escuro, e o verde fica **só no Manifesto**.

E `#544635`, que era só cor de texto, vira a superfície de `Resultados`.

**O caramelo `#AB7743` é caso à parte:** nenhum texto normal passa nele, nem o `papel` (3.50). Então
ele nunca é fundo de bloco com parágrafo. Onde ele funciona: **área decorativa, número em tamanho
display, aresta de revelação e a travessia de cor.** É exatamente por ser claro demais para texto que
ele é bom como destaque.

**O resultado narrativo é melhor do que o de antes:** a página abre fria (identidade, tese) e fecha
quente (convite). O arco de cor passa a acompanhar o arco da conversa.

Não existe fundo sutil além desses cinco: inventar dois off-whites quase iguais seria invenção, e
nenhum hex novo entrou aqui. **O que mudou foi o emprego, não a paleta.**

### A regra que é mais fácil de errar

Sobre a superfície sage, o corpo de texto **tem que ser** `ancora` (7,02) ou `acento-texto` (6,10).
O `tinta` `#544635` dá só **4,39:1** ali, que é texto grande, e o `tinta-suave` dá **3,05:1**, que
reprova. **Toda seção com fundo sage troca a cor do parágrafo.**

### O CTA

Primário: fundo `ancora`, texto `papel`, **13,27:1**. O caramelo não pode ser botão: 3,50:1 é
reprovado, e é quase exatamente o caso que originou este sistema. Botão colorido também é assinatura
de template, então acessibilidade e diferenciação apontam para o mesmo lugar.

No `CtaFinal` (agora fundo `ancora-quente`), inverte para **fundo `superficie-2` + texto `ancora`**
(sage sobre marrom escuro dá 6,10:1 no fundo, e ancora sobre sage dá 7,02:1 no botão). Sage é hex do
manual e faz o trabalho que eu tinha dado ao `papel`.

> ✅ **Esta é a versão que vale, confirmada pelo Douglas em 01/08.** A §10, a §5.10 da estrutura e
> o prompt da Fase 5D tinham ficado com o texto anterior (`papel`, "o único botão claro da
> página"), e os três foram corrigidos. **Não existe mais botão em `papel` na página**, e a
> variante `invertido` saiu do `WhatsappCta`.

### Os PDFs de cliente: a regra é diferente de todas as outras

`drive-files/` tem diagnósticos de marca e manuais de identidade visual de **outros clientes da
agência**. É material de trabalho de terceiros, com conteúdo estratégico. Ele existe no projeto
como **referência**, e três regras valem juntas:

1. **Nenhum PDF vai para `public/`. Nunca, nem temporariamente.** Em Next.js tudo em `public/` é
   servido: um PDF ali é baixável por URL direta e indexável pelo Google mesmo sem nenhum link
   apontando para ele. Publicar diagnóstico de cliente por acidente é dano à reputação da Andressa,
   não bug de front-end.
2. **Se usados como thumbnail, são artefato e não documento.** Escala em que nada é legível, recorte
   parcial, sobreposição. O que se comunica é *"nós produzimos isto"*, não o conteúdo. Se no tamanho
   final der para ler nome de cliente ou texto estratégico, o thumbnail está grande demais.
3. **Autorização escrita de cada cliente dono do material**, igual aos números de caso da §5.6.
   Sem ela, não entra.

E um detalhe fácil de esquecer: **imagem exportada de PDF carrega metadados XMP/EXIF** com nome do
arquivo original, autor e software. Remover é obrigatório (`exiftool -all=`).

### O que não fazer

- `decor` como cor de texto, em qualquer opacidade.
- `acento` como fundo de botão ou como texto normal.
- `tinta` ou `tinta-suave` em parágrafo sobre sage.
- **Qualquer hex fora das duas tabelas acima. A paleta está fechada e não tem décimo token.**


## 4. Tipografia

### As famílias do manual

Extraídas das fontes embutidas no PDF de apresentação:

1. **asimilates**, display. Serifada de contraste alto, "Modern Classic serif Display" (fundição
   UICreative). Aparece nas páginas 4, 17, 18, 19 e 22, em pouca quantidade.
2. **Playfair Display** (Regular + Italic), serifada de alto contraste. Carrega os títulos de
   seção e, em itálico, as palavras grifadas dentro da linha display.
3. **Montserrat** (Regular, Italic, Bold), sans geométrica. Corpo de texto e os rótulos em caixa
   alta com tracking largo, que são uma marca registrada do deck.

### ⚠️ Licenciamento

| Família | Situação | Decisão |
|---|---|---|
| **Montserrat** | OFL / Google Fonts ✅ | **Usar** via `next/font/google`, subsets `latin` + `latin-ext` |
| **Playfair Display** | OFL / Google Fonts ✅ | **Usar** via `next/font/google`, subsets `latin` + `latin-ext` |
| **asimilates** | ⚠️ Personal Use Only. UICreative, © 2023. **E o arquivo não foi entregue** | ✅ **Resolvido na Fase 0: fica fora** |

### ✅ A questão da `asimilates`, fechada na Fase 0

Auditei `ref-files/Fontes/`: **a `asimilates` não está lá.** E a pergunta que decidia tudo tem
resposta dupla, verificada no material:

- **Ela não é o lettering do logo.** O wordmark "ALANDO DIGITAL" está numa sans geométrica fina em
  caixa alta, e a `asimilates` é serifada display de contraste alto. Anatomias opostas.
- **Ela é uma display do deck**, nos subtítulos em serifada inclinada das páginas 4, 17 e 22.

**Decisão: display e editorial ficam em Playfair Display.** Mesma anatomia (serifada display de
contraste alto), já está no material, já carrega os títulos do deck, é OFL, zero família nova. Se
um dia a Andressa comprar a **licença webfont** da UICreative e mandar o arquivo, a troca é uma
linha em `layout.tsx`. Alternativas, se ela quiser mais distinção: **Prata**, **Bodoni Moda**,
**Instrument Serif**, todas OFL.

> Pendência menor, que não bloqueia: a sans do lockup não foi identificada com certeza. Não
> importa para o site, porque o logo é entregue como imagem. Ver `AUDITORIA-FASE-0.md` §1.3.

> Toda troca precisa ser comunicada à Andressa. Ela vai abrir o site ao lado do manual e comparar;
> descobrir a diferença sozinha é muito pior do que ser avisada.

### Papéis (disciplina de uso)

| Papel | Família | Uso |
|---|---|---|
| **Display** | asimilates *(se liberada)*, senão Playfair Display | Somente `h1` e `h2`, e o lockup do logo. Nunca em texto corrido |
| **Editorial** | Playfair Display, **Italic é o papel principal aqui** | A palavra grifada dentro do título display, e pull quotes |
| **UI** | Montserrat | Botões, nav, labels, eyebrows, FAQ, footer, corpo de texto |

Três famílias é o teto. A quarta sempre parece indecisão, nunca riqueza.

**Carregar Playfair Display Italic como instância separada, com `preload: false`**, ele aparece em
uma palavra por título e não pode competir com o LCP.

### Escala (fluida, `clamp()`)

```
display-xl   clamp(2.75rem, 7vw, 5rem)      line-height 1.05  tracking -0.02em
display-lg   clamp(2rem, 5vw, 3.25rem)      line-height 1.12  tracking -0.01em
display-md   clamp(1.5rem, 3.5vw, 2.25rem)  line-height 1.2
body-lg      clamp(1.05rem, 1.6vw, 1.25rem) line-height 1.7
body         1rem                            line-height 1.7
caption      0.875rem                        line-height 1.5
eyebrow      0.75rem  tracking 0.18em  uppercase
```

**Utilitário adicional desta marca:**

```
lead-tracked   tracking 0.14em   line-height 1.9   Montserrat 400
```

O deck usa muito uma linha de lead em Montserrat com tracking largo (a capa inteira, os textos de
serviço). É um traço forte da marca e vale ter como utilitário, **mas só para linhas curtas de
lead, nunca em parágrafo corrido**, onde tracking largo destrói a legibilidade.

**Regras:**
- Medida de leitura **60-72 caracteres** (`max-w-[62ch]`, utilitário `medida`).
- Título display nunca em `uppercase`, serifada de alto contraste morre em caixa alta.
- `eyebrow` e `lead-tracked` são os únicos elementos com tracking largo da página. `eyebrow` é o
  único em caixa alta.
- `strong { font-weight: 600 }` na base, para não cair em bold sintético.

---

## 5. A marca em arquivo: monograma e lockups

✅ **Auditado na Fase 0.** Detalhe completo em `AUDITORIA-FASE-0.md` §2 e §3.

### Não existem ícones proprietários

O que a pasta `ref-files/Ícones /` guarda **não são ícones**: são 16 PNGs do **monograma**, em
versão preenchida e em versão de contorno, nas oito cores da paleta. As páginas de serviço do deck
usam **rótulos tipográficos em caixa alta**, não pictogramas.

**Consequência:** a animação-assinatura padrão (`DrawIcons`) fica sem material e sai de cena. A
assinatura de movimento é a da §8, que já era o plano principal. **Não inventar um conjunto
genérico de ícones**: seria o clichê que a §2.5 proíbe.

### O que existe, e como usar

| Pasta | Conteúdo | Uso |
|---|---|---|
| `ref-files/Ícones /1-8` | monograma **preenchido**, 8 cores, PNG 1080 com alfa | header, footer, marca d'água |
| `ref-files/Ícones /9-16` | monograma **em contorno**, 8 cores | recurso gráfico estático |
| `ref-files/Logos/1-8` | lockup **horizontal** com tagline | og-image, onde houver largura |
| `ref-files/Logos/9-16` | monograma isolado (duplica `Ícones /1-8`) | header, footer |
| `ref-files/Logos/17-24` | lockup **vertical** com tagline | `CtaFinal`, rodapé em mobile |

As oito cores são exatamente a paleta, e incluem **branco**, ou seja, a **versão negativa existe**,
que é o que o `CtaFinal` e o rodapé escuros precisam.

### ⚠️ Não existe SVG, e a especificação mudou por causa disso

**Monograma: PNG 1080 com alfa, servido por `next/image`.** Header a 32px, footer a 40px. Nunca
esticado, nunca rotacionado, nunca sobre fundo de baixo contraste.

Isto substitui a exigência anterior de SVG, e a troca é segura: o `next/image` gera as variantes e
serve cerca de 2 KB num monograma de 32px. **Não há SVG a pedir:** o próprio deck da Alando coloca
o lockup como raster de 588×343, menor que os PNGs de 1080 que temos.

**O que o PNG não entrega é traçado para animação de desenho**, e essa é a única perda. Decisão do
Douglas em 31/07: **não vetorizamos**, e a Fase 7 fica nos três gestos da §8.

**Ícones de interface** (chevron do FAQ, WhatsApp, seta) são **outra coisa**: Lucide, peso 1.5px,
nunca no mesmo bloco visual que a marca.

---

## 6. A assinatura estrutural: a faixa de palavra repetida

Esta é a decisão de identidade mais importante do projeto. Ela **não é ornamento, é o sistema de
titulação da marca.**

### De onde vem

Está em ~15 das 24 páginas do deck:

| Página | Faixa |
|---|---|
| 2 | `quem somosquem somosquem somos…` |
| 3 | `oquefazemosoquefazemosoquefazemos…` |
| 9-11 | `DaoravidaDaoravidaDaoravida` |
| 16 | `Muito além dos números` ×3 |
| 17-19, 21 | título do serviço ×3 |
| 22 | `Solicite seu orçamento!` ×3 |
| 23 | `AlandoDigitalAlandoDigital…` + `construirconstruirconstruir` |
| 24 | `juntos?juntos?juntos?` |

É assim que a Alando escreve um `<h2>`.

### Como implementar

Componente `FaixaRepetida`, usado por **toda** seção que tem título:

- O texto repetido N vezes numa linha, `white-space: nowrap`, cortado pela viewport.
- Cópias em `decor` sobre fundo claro, `superficie-2` sobre `ancora`. Nunca em `tinta`.
- **Uma** instância legível em `ancora` carrega o `<h2>` semântico; as repetições são
  `aria-hidden="true"`.
- **Deriva lateral ligada ao scroll**, `animation-timeline: scroll()`, direção **alternando** a
  cada seção. Amplitude modesta: o objetivo é textura, não corrida.
- Custo: **0 KB**. Sem listener, sem rAF, sem biblioteca. Onde `animation-timeline` não existir, o
  `@supports` não casa e a faixa fica parada, degradação silenciosa de propósito.

**Regra de acessibilidade não negociável:** a repetição visual **não pode** chegar ao leitor de
tela. Um `<h2>` que soa "quem somos quem somos quem somos quem somos" é falha grave. Uma instância
semântica, o resto `aria-hidden`.

### A camada complementar: a palavra em Playfair itálico

No deck, *construir*, *juntos?* e *números* aparecem em itálico serifado enquanto o resto da linha
é outra coisa. É a gramática de ênfase da marca.

**Regra: exatamente uma palavra por título display ganha o itálico**, e é a palavra que carrega o
peso do argumento. Uma só, duas viram decoração. Definida em `content.ts`, nunca hardcoded.

### Formas orgânicas

- Fotos mascaradas por `clipPath` SVG assimétrico. Linguagem: **crista de montanha aplicada a uma
  faixa vertical deslocada**, as duas fontes de forma do material (§2.2).
- 4 variações no total, definidas uma vez em `<svg>` oculto e reusadas por `id`. Cada foto com uma
  forma diferente; as que cobrem retrato precisam de borda superior limpa, é onde está a cabeça.
- Blobs de fundo em `decor` com opacidade **6-12%**, sempre atrás do conteúdo, sempre `aria-hidden`.
- **Nunca** blob e `border-radius` na mesma imagem. Nunca `rounded-*` em foto.

---

## 7. Espaçamento e layout

- Escala base **4px**. Espaçamentos permitidos: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Padding vertical de seção: `clamp(4rem, 10vw, 8rem)` (utilitário `secao-y`). O `Section` aplica
  padding e **nunca declara margin**.
- Container: `max-w-6xl` (1152px), padding lateral `clamp(1.25rem, 5vw, 3rem)` (`container-lp`).
- **Layout assimétrico é a regra.** Nada de 50/50. Hero em 55/45, seções alternando 7/5 e 5/7.
- **`Servicos` é hierárquico, nunca grid de cinco.** "Gestão de Redes Sociais" é, nas palavras dela,
  *"o coração da Alando"*: ela ocupa um bloco dominante, largura cheia; os outros quatro orbitam
  em larguras desiguais. Cinco cards iguais mentiria sobre o negócio e cairia no template no mesmo gesto.
- **A faixa de repetição sangra além do container** (`full-bleed`), o conteúdo não.
- Mobile-first de verdade: **o tráfego vem do link na bio do Instagram** (@alandodigital). Toda
  decisão de layout se valida primeiro em **390px**.
  `<<A CONFIRMAR: o canal principal é mesmo Instagram, ou há indicação/LinkedIn relevante?>>`

---

## 8. Movimento

Douglas pediu **animações acionadas pelo scroll**, com anime.js. Isso não é biblioteca de scroll
suave, e a diferença importa: o scroll nativo continua intocado, e a posição dele é usada só como
**linha do tempo**.

### O vocabulário: três gestos e um momento

A regra não é "uma animação só". É **um vocabulário fechado, aplicado com consistência**. A diferença
entre página com identidade e página que parece gerada não é a quantidade de movimento, é se o
movimento tem gramática: quinze ocorrências de três gestos leem como sistema; três ocorrências de
dez efeitos leem como catálogo.

**Nada de movimento fora deste vocabulário. Sem exceção, e sem "só nessa seção aqui".**

---

**Gesto 1: Deriva.** Contínuo, preso ao scroll.

As faixas de palavra repetida derivam lateralmente, direção alternando a cada seção, amplitude
modesta. Está em toda seção titulada, o que faz dele o gesto mais presente da página.

Ferramenta: **CSS `animation-timeline: scroll()`, 0 KB.** É o elemento de maior contagem da página e
não precisa de main thread.

---

**Gesto 2: Travessia de cor.** Contínuo, preso ao scroll.

O fundo atravessa entre superfícies conforme a página desce, e depois da revisão da §3 **a metade
quente da paleta é o material da segunda metade da página**: `papel` → `superficie-2` → `ancora`
no topo, `tinta` → `ancora-quente` embaixo, com o `acento` como aresta de destaque.

> ⚠️ **Regra que os números impõem: a travessia só acontece dentro de uma faixa de valor.**
> A cor do texto atravessa junto, e ela precisa passar **nas duas pontas**. Entre `papel` e
> `superficie-2`, o texto é `ancora` (13.3 e 7.0, passa nos dois). Entre `ancora` e `ancora-quente`,
> o texto é `papel` (13.3 e 11.5, passa nos dois). **Travessia entre claro e escuro é proibida:** no
> meio do caminho o fundo vira tom médio e o texto também, e o contraste desaba para perto de 1:1
> sem que nada acuse erro. A passagem de claro para escuro é **fronteira de seção**, não travessia.

**A paleta é o material da animação**, não uma decoração aplicada por cima dela. É o gesto que
transforma a alternância marcada da §3 em intenção, em vez de solavanco entre seções.

Ferramenta: **anime.js `onScroll({ sync })`**, interpolando as custom properties.

> ⚠️ **A armadilha é de contraste, e ela é silenciosa.** No meio da travessia existem tons
> intermediários que não estão em nenhuma tabela. `tinta` sobre `papel` dá 8,29:1 e sobre sage dá
> 4,39:1: durante a travessia ele passa por tudo entre os dois. **A cor do texto atravessa junto**, e
> o contraste tem que se sustentar em **cada passo**, não só nas pontas. Na prática: em qualquer
> seção que participe da travessia, o parágrafo é `ancora`, que passa nas três superfícies.
> Teste amostrando 0%, 25%, 50%, 75% e 100% do progresso, não só o começo e o fim.

---

**Gesto 3: Revelação por máscara.** Discreto, preso ao scroll.

**Substitui o `fade + translateY` em toda a página.** Em vez de o conteúdo surgir de baixo (que é o
reveal de qualquer landing page), ele é revelado pela **máscara orgânica abrindo ao longo da curva de
crista de montanha** que já define as formas da marca (§2.2, §6). Com `stagger` em listas, o
escalonamento sai da mesma curva.

Ferramenta: **anime.js `onScroll({ sync })`** + `stagger`.

> Por que rende mais do que parece: `fade + translateY` é o reveal que todo gerador produz. Trocá-lo
> por uma revelação derivada da forma da marca muda a impressão da página inteira, porque é o
> movimento que o visitante vê quinze vezes, não uma.

---

### ⚠️ DESVIO REGISTRADO: a sequência de quadros de Captação (02/09)

**Existe UM movimento na página que não é preso ao scroll**, e ele é decisão do Douglas, tomada
com esta seção na mesa. Fica escrito aqui para ninguém o encontrar numa auditoria e tratar como
defeito, e para ninguém o usar como precedente.

**O que é:** no slot lateral de "Captação e edição de vídeos", dez quadros se revezam sozinhos, um
a cada 3,1 s (2,2 s parado + 0,9 s de troca). Eram 4,3 s até 04/09: naquele dia o Douglas viu o
bloco rodar duas vezes e pediu duas reduções, primeiro 0,2 s (que não se notou) e depois 1 s.

**Por que ele se sustenta:** a única seção que anda sozinha no tempo é a que vende imagem em
movimento. Vídeo é quadro trocando no tempo. Aqui a autonomia é o argumento da própria seção, não
um efeito aplicado por cima dela. Em qualquer outra seção o mesmo movimento seria carrossel de
template, e é por isso que ele não se estende a nenhuma.

**O desvio fica em UM eixo, o gatilho.** O gesto continua sendo o **Gesto 3**: o quadro que entra é
trazido pela mesma crista de montanha que revela todo bloco da página, com a mesma classe
`.revelar`, o mesmo `TEMPO.revelacao` e a mesma `CURVA.revelacao`. Nenhum CSS novo, nenhum keyframe
novo, nenhuma máscara nova, nenhum subpath novo do anime.js (o chunk continua em **19.217 bytes
gzip**, medido antes e depois). **Fade fica de fora de propósito:** crossfade é a transição de
qualquer carrossel, e adotá-lo seria desviar em dois eixos em vez de um.

**As quatro contenções, e nenhuma é opcional:**

1. **Só anda com o bloco na tela.** Fora da viewport não há relógio.
2. **Para com a aba oculta, no hover e no foco.** O `requestAnimationFrame` não roda em documento
   oculto, então uma troca disparada ali ficaria pendurada no meio.
3. **Botão de pausa visível**, exigência da WCAG 2.2.2 (conteúdo que anda sozinho por mais de cinco
   segundos precisa de um jeito de parar). Fica **abaixo** da foto, nunca sobreposto: overlay de
   carrossel é assinatura de template e a §9 não deixa nada boiar por cima da imagem.
4. **`prefers-reduced-motion: reduce` desliga por completo**, e sobra o quadro em repouso, estático
   e inteiro.

**O contador, e por que ele não é bolinha.** Abaixo da foto, ao lado do botão, um rótulo
`01 / 10` diz que existem outras fotos **antes de qualquer movimento**. Sem ele, nos primeiros
2,2 s o bloco é indistinguível de uma foto estática, e o botão sozinho avisa que algo se move sem
avisar que há mais o que ver.

Como o botão, ele **não sai no HTML do servidor**: os dois só existem depois que a hidratação
confirma que a sequência vai rodar. Sem JS não há sequência, e prometer dez fotos que não chegam
é pior do que não prometer. A seção fica bem abaixo da dobra, então na prática ninguém vê a falta.

⚠️ **Fileira de pontos está proibida aqui**, é a assinatura de carrossel que a §2.5 veta. O que
entra no lugar é o rótulo em **caixa alta com tracking largo** (§4), com numeração de zero à
esquerda, que nesta seção é a convenção do próprio ofício: claquete numera take. Número corrente
em `ancora` (13,27:1), total em `tinta-suave` (5,76:1). Ele vira no **fim** da varredura: anuncia o
quadro que chegou, nunca o que está chegando.

**A pilha, e por que ela não é chrome de carrossel (04/09).** Atrás da foto, duas placas em leque
(8 px e 16 px de deslocamento, 1,5° e 3° de giro) mostram os **próximos dois quadros** da sequência.
O contador diz em texto que existem outras nove; a pilha diz o mesmo em imagem, e as duas coisas
falam antes de qualquer movimento. As quatro razões de ela não ser chrome:

1. As placas ficam **atrás**, nunca por cima: a §9 continua valendo inteira, nada boia sobre a
   imagem.
2. Elas usam a **mesma `crista-faixa`** da foto da frente. Nenhum `border-radius` entrou pela porta
   dos fundos, e a pilha não é um cartão flutuante.
3. Elas são **estáticas**. Nenhum tempo novo entrou no vocabulário: o leque dá volume físico ao
   slot, ele não anima.
4. Elas **viram no começo da varredura**, junto com a foto da frente: a base delas é o quadro que
   **entra**. A foto que estava na placa de cima é a que vem para a frente no mesmo gesto, que é o
   que a pilha promete. Saindo do `indiceVisivel`, como o contador, as placas esperavam os 900 ms
   da crista para virar e aquilo lia como atraso (corrigido em 04/09). **A pilha não acompanha o
   contador de propósito:** o contador *anuncia* o quadro que chegou, a pilha mostra o monte que
   sobrou, e cada um muda quando o que ele diz muda.

O leque cabe **dentro** da coluna, por `padding` na pilha e não por sangria: em 390 px sobram 19,5 px
de margem de página, e leque sangrando ali daria scroll horizontal. A conta está no bloco
`.pilha-de-quadros` do `globals.css`. Como o contador e o botão, a pilha **some inteira** com
`prefers-reduced-motion` e sem JS: prometer em imagem nove fotos que não chegam é o mesmo erro que o
`/ 10` cometeria.

**Acessibilidade:** o quadro em repouso carrega o `alt` real, os outros nove são `alt=""` e
`aria-hidden`, **as placas da pilha também**, e **o contador também é `aria-hidden`**. É a regra da `FaixaRepetida` (§6) aplicada
aqui pelo mesmo motivo: anunciar "1 de 10" a quem recebe um `alt` só é prometer nove coisas que a
pessoa não alcança.

---

### ⚠️ SEGUNDO DESVIO REGISTRADO: o vídeo da prova de Landing Pages (03/09)

**O vocabulário abriu, e o desvio acima previa exatamente isto.** A §8 dizia, sobre a sequência de
Captação, "para ninguém o usar como precedente", e o checklist dizia "se aparecer uma segunda
exceção, o vocabulário abriu". Apareceu. Fica registrado com o mesmo rigor, e com o custo à vista.

**O que é:** no campo de prova de "Landing Pages", um MP4 de 11,5 segundos mostra a landing page de
uma cliente em visita guiada, parando 1,2s em cada seção. Toca uma vez ao entrar na tela, para no
fim e volta ao primeiro quadro.

**A parada era de 0,7s e subiu para 1,2s em 04/09**, com a página montada na mesa: cada seção da
página da cliente ficava menos de um segundo na tela, que é pouco para alguém ver o que está sendo
mostrado. Só a parada mudou, e o avanço entre seções continua em 0,5s, porque alongar a parada é o
único eixo que compra tempo sem comprar bytes: quadro repetido é quase de graça em H.264, e a
medida ficou registrada, 16 KB por 3,5s a mais.

**⚠️ Este desvio é MAIOR que o primeiro, e isso precisa estar dito.** A sequência de Captação desvia
em **um** eixo, o gatilho, e mantém o Gesto 3 como transição: mesma crista, mesma classe, mesmo
tempo, mesma curva. O vídeo desvia em **três**: no gatilho (tempo, não scroll), na mídia (um `<video>`,
que nenhuma outra parte da página usa) e no gesto (o movimento é interno ao arquivo, não é nenhum
dos três).

**Por que ele se sustenta mesmo assim:** a prova de que a Alando constrói uma página é a página se
comportando como página, e página é uma coisa que rola. Um print prova que existe um topo bonito;
prova nenhuma sobre a página inteira, que é o que o serviço entrega. É a mesma família de argumento
do primeiro desvio (a autonomia pertence ao que a seção vende), e é por isso que os dois param aqui:
**os outros três serviços não têm nada que só se demonstre em movimento.**

**Antes de admitir um terceiro, saiba o que já foi recusado nesta decisão.** Havia uma alternativa
que não abria exceção nenhuma: a página alta rolando dentro da máscara presa ao `animation-timeline:
view()`, 0 KB de JS, que é a textura de parallax que a §8 já prevê. Ela foi apresentada com esse
argumento e o Douglas escolheu o vídeo mesmo assim, em 03/09, com este texto na mesa. A escolha é
dele; o registro é para que o próximo desvio precise de um argumento melhor que "já tem vídeo lá".

**As cinco contenções, e nenhuma é opcional:**

1. **Toca uma vez e para.** Não é loop. Conteúdo em loop dentro de um bloco de serviço é banner, e a
   §2.5 veta.
2. **Volta ao primeiro quadro no fim.** Achado no passe visual: sem isso o bloco fica parado para
   sempre no último quadro, que é a faixa escura de fechamento da página da cliente, e um retângulo
   verde escuro dentro de uma seção clara lê como pedaço da própria página da Alando, não como o
   site de outra marca. O repouso é sempre o topo da página da cliente.
3. **Não baixa para quem não chega.** `preload="none"` e `<source>` anexado só na interseção, com
   uma tela de antecedência. Verificado no painel de rede: **zero requisição de `.mp4`** antes de
   rolar até lá, em desktop e em 390px.
4. **Botão de repetir e pausar**, exigência da WCAG 2.2.2, **abaixo** do vídeo e nunca sobreposto,
   no mesmo desenho do controle da sequência de quadros para os dois lerem como um sistema só.
   Nada de `<video controls>`, que traz a barra do sistema operacional inteira.
5. **`prefers-reduced-motion: reduce` não monta `<video>` nenhum.** Fica o pôster, que é o primeiro
   quadro, com o `alt` real. Verificado: nesse modo não há `<video>` no DOM e nenhuma requisição de
   vídeo acontece.

**Sem áudio.** O arquivo não tem trilha (`-an`). Economiza bytes e tira do caminho o motivo mais
comum de o autoplay ser bloqueado. Testado com a política mais restritiva do Chromium
(`--autoplay-policy=document-user-activation-required`): toca, porque vídeo mudo é isento.

**O orçamento é NOVO, e é o segundo custo desta decisão.** Nenhum vídeo cabe nos ~200 KB que valem
para imagem. Abriu-se uma linha de **400 KB**, e o arquivo mede **375 KB** (964×600, CRF 34, 11,5s).
Ela vale para este arquivo, não é folga para os outros assets, e o `scripts/gravar-landing.mjs`
falha em vez de estourá-la. As três medições que seguraram o número estão no cabeçalho do script.

**A moldura é a `crista-vale`**, escolhida por medição na proporção do vídeo, e o campo é o
`.campo-prova-largo`. Os números e o porquê de não ser a `crista-retrato` (que é a mais econômica e
já está na mesma seção) estão no `globals.css`.

**Acima de 1152px o vídeo fica AO LADO do texto, e não abaixo dele** (04/09). Ele vira a coluna
larga de um grid de 1,4fr / 1fr, com o texto na estreita, e 1152 é o ponto exato em que o
`max-w-6xl` para de crescer, então a divisão sempre renderiza nas mesmas medidas. Abaixo disso
segue empilhado, inclusive nos 390px.

A conta melhora para o vídeo: a coluna de 597 px deixa 484 px de conteúdo, e a densidade dos mesmos
964 sobe de 1,48x para **1,99x**. O campo largo perde tamanho de tela e ganha nitidez. A coluna do
texto fica entre 39 e 51 caracteres por linha, abaixo dos 60-72 da §4 e dentro do checklist, que
proíbe passar de 72.

**O print de Estruturação de Perfil foi junto, algumas horas depois, e a divisão dele é a
espelhada** (04/09). Este parágrafo dizia o contrário até então, e o texto anterior fica resumido
aqui porque ele é o argumento que a decisão contrariou: o print tem 1290 px, é nas legendas dele que
a prova mora, e por isso ele ocupava a linha inteira. O Douglas pediu que ele também fosse para o
lado, e escolheu para ele a coluna **estreita**, com o custo apresentado antes da escolha:

| | vídeo | print |
|---|---|---|
| grade acima de 1152px | `1,4fr / 1fr` | `1fr / 1,4fr` |
| coluna da prova | 597 px | 427 px |
| conteúdo dentro do campo | 484 px (81%) | 342 px (80%) |
| densidade sobre o arquivo | 1,99x de 964 | 3,77x de 1290 |
| coluna do texto | 427 px, 39-51 car. | 597 px, cerca de 62 car. |

⚠️ **O custo do print está na linha que a tabela não tem, e ele é de legibilidade, não de
densidade.** Densidade sobra (3,77x), só que num artefato ela não é a medida certa: o print é a
captura de uma tela de 430 px lógicos, então em 342 px a interface do Instagram renderiza a
**0,80x**, menor do que num celular real. Na linha inteira ela saía a 1,49x. As legendas e os nomes
de destaque, que são a prova, ficam no limite.

**O passe visual em 1440px foi feito, e o veredito é parcial.** A 1x, os nomes dos destaques
("Atuação", "Olhar", "Nathalia"), a estrutura do perfil e a consistência visual do feed continuam
legíveis, e são exatamente as três coisas que o `alt` da prova afirma. O que se perde são as
legendas DENTRO de cada post, que a 342 px viram textura. A prova, como ela está escrita, ainda se
sustenta; ela deixou de sustentar mais do que isso.

O que se ganha em troca é real e é o outro lado da mesma conta: a coluna do texto vai a 597 px, e
as linhas caem para **66-75 caracteres**, contra até 79 nos blocos que seguem em linha inteira
(contado linha a linha com `Range`, não estimado). E as duas alturas passam a casar, 520 px de campo
contra 336 de texto, em vez de o bloco medir 1318 px empilhado.

⚠️ Os 75 ainda passam dos 72 desta §4, e isso é **pré-existente e da seção inteira**, não desta
mudança: o utilitário `medida` é `62ch`, e em Montserrat 1ch mede 10,6 px, ou seja, 62ch dá 657 px e
rende até 79 caracteres. Vale uma decisão à parte, para a seção toda, e não aqui.

Abaixo de 1152px nada disso vale, e os dois seguem empilhados, inclusive nos 390px.

**Risco em aberto, para julgar na página montada:** a página da cliente usa o mesmo vocabulário
visual desta (serifada display, neutros quentes, botão escuro), então ela pode ler como um pedaço da
própria Alando em vez de "o site de outra marca", o que enfraquece justamente a frase da copy que a
prova existe para sustentar. A contenção 2 reduz o efeito; ela não o elimina.

---

**O momento coreografado: Resolução.** Uma vez só, na entrada do `Manifesto`.

*"Antes de falar sobre redes sociais…"* aparece, e *"…queremos falar sobre pessoas."* resolve depois.
Abaixo da dobra, zero risco de LCP, amarrado ao conceito.

Ferramenta: **anime.js `createTimeline`**.

---

**Textura, não gesto: parallax dentro da máscara.** A foto deriva atrás do `clipPath`. CSS
`animation-timeline: view()`, 0 KB. Três armadilhas no fim desta seção.

### Orçamento, medido

| Item | gzip |
|---|---|
| anime.js 4.5.0 (`animate` + `createTimeline` + `onScroll` + `stagger` + `utils` + `createScope`) | **21,2 KB** |
| Gestos 1 e textura (CSS puro) | **0 KB** |
| **Orçamento total do movimento** | **24 KB** |

Medido com esbuild + `gzip -9`, não estimado. O orçamento subiu de 15 para 24 KB porque `onScroll`
entrou, e é ele que atende ao pedido. **Meça de novo no fim da Fase 7** e compare com este número.

### three.js: não, e com número

Medi. Uma cena mínima em three 0.185 (renderer + scene + câmera ortográfica + plano +
`ShaderMaterial`), tree-shaken, minificada e gzipada: **127,1 KB**. Isso é o **piso da biblioteca**,
antes de uma linha de efeito. É **6x o sistema inteiro de anime.js** e **5x o orçamento de movimento
da página**.

Num projeto cujo canal principal é link na bio do Instagram, com meta de LCP < 2,0s e Lighthouse
mobile ≥ 95, isso é caro. E há custo além do KB: inicializar WebGL e compilar shader tem preço em
Android intermediário, em bateria e em memória.

O argumento decisivo, porém, é outro. **Névoa, partícula e distorção de imagem em WebGL no scroll são
hoje a assinatura visual das landing pages de agência.** É o mesmo problema da referência do
Pinterest, só que a 127 KB. Uma página construída inteira para não parecer feita em série não deveria
fechar com o efeito mais serializado do mercado.

**Se você quiser mesmo**, o caminho aceitável é este, e as cinco condições valem juntas:

1. **Um lugar só.** O único que se justifica é o `CtaFinal`: faixa escura, full-bleed, foto de
   montanha, fim da página. Névoa lenta sobre a foto tem lastro na marca.
2. **Abaixo da dobra**, sempre. Nunca no herói.
3. **`dynamic import` com `ssr: false`**, disparado por IntersectionObserver quando a seção se
   aproxima. Nunca no bundle inicial.
4. **Portão de dispositivo:** não carrega em `prefers-reduced-motion`, nem sem WebGL2, nem com
   `navigator.hardwareConcurrency <= 4`, nem com `navigator.connection.saveData`. Sem a névoa, a
   seção tem que ficar completa.
5. **Orçamento próprio, reportado à parte.** Não entra nos 24 KB.

Antes disso, faça o teste barato: a mesma névoa em **canvas 2D com ruído**, ou em textura animada por
CSS, custa alguns KB. Se o barato resolver, o caro não tem argumento.

### As regras que não mudam

1. **A animação nunca bloqueia o LCP.** Nada no herói começa com `opacity: 0` no HTML. O estado
   inicial é aplicado **via JS**, depois que a timeline confirma que vai rodar. Se o JS não chegar, a
   página está completa.
2. **`prefers-reduced-motion: reduce` desliga tudo.** Estática e **100% visível**. Zero parallax,
   zero deriva, zero travessia, zero abertura de máscara: as máscaras ficam **abertas**, e a
   travessia de cor tem **estado final definido** (cada seção assume sua superfície de destino).
   > Armadilha desta marca: em animação de scroll-timeline, **zerar a duração não para o movimento**,
   > cola o elemento no último keyframe. No Gesto 3 isso deixaria a máscara travada no meio da
   > abertura, cortando conteúdo. Só `animation: none` desfaz de verdade.
3. **Nada anima duas vezes.** Reveal roda uma vez e desconecta o observer.
4. anime.js por **subpath**, via **`dynamic import` após a hidratação**. `createScope()` +
   `scope.revert()` no cleanup do `useEffect`.
5. **Nenhuma biblioteca de scroll suave** (Lenis, ScrollSmoother) e **nenhum three.js**. As primeiras
   reescrevem o scroll nativo e quebram teclado e leitor de tela, e não têm relação com o que foi
   pedido: `onScroll` lê a posição do scroll do navegador em vez de substituí-lo.

### Armadilhas do parallax por CSS

1. **O wrapper publica a timeline; a imagem consome.** `animation-timeline: view()` direto na imagem
   não funciona: o wrapper com `overflow-hidden` vira scroll container e o progresso trava em 50%.
   Nomeie a timeline no wrapper (`view-timeline-name`) e consuma na imagem.
2. **Longhands, nunca o shorthand `animation`.** O shorthand reescreve `animation-duration` para
   `0s`; numa timeline de progresso a duração precisa ser `auto`. Com `0s` a animação congela em 50%
   e parece que "só não funcionou". Erro silencioso.
3. **O `scale` é requisito, não efeito**, e é **constante** nos dois keyframes. Sem ele o translate
   descobre a borda do `clipPath` e abre uma faixa vazia dentro da máscara.


## 9. Fotografia: direção e uso definido

### Inventário, auditado na Fase 0

Detalhe completo, com resoluções, EXIF e pesos, em `AUDITORIA-FASE-0.md` §4.

| Origem | Descrição | Destino | Observação |
|---|---|---|---|
| `drive-files/Dêssa/` | **2 fotos da Andressa**, 1023×1537 | `Hero`, `Sobre`, `og-image` | Aprovadas em 31/07. Fundo de parede clara com plantas, luz quente. **Resolução sem folga**, ver abaixo |
| `drive-files/Fotos captações/` | **9 fotos do trabalho acontecendo**, iPhone | `Servicos`, `Sobre` | Aprovadas. Só 2 em resolução de trabalho (HEIC). O motivo se repete nas nove |
| PNG da paleta | Montanha na neblina, floresta de outono | `CtaFinal`, **uma vez só** | É o vocabulário mais copiado que existe hoje. Uma aparição é atmosfera, duas é banco de imagem |
| PDF, p. 4-15 | Prints de feed de clientes | `Resultados` | Terceiros identificáveis. **Autorização obrigatória** |
| `drive-files/Identidades visuais/` | Capas de identidade visual de clientes | `Servicos` (thumbnail) | ⚠️ **Referência. Não podem ser publicados.** Regra abaixo |
| `drive-files/landing pages/` | Captura da landing page de uma cliente | `Servicos` (prova, **em vídeo**) | Entregue pela Alando e **autorizada por escrito**, 03/09. Ver §8, segundo desvio |

### As três decisões que o acervo define

**1. O herói ganha a composição forte, e vira o LCP.** A foto da Andressa entra na máscara orgânica
em 55/45, com o rosto no terço superior. **Essa imagem passa a ser o elemento de LCP da página**:
só ela leva `priority`, e o `sizes` precisa estar certo, senão o navegador baixa a versão desktop
no celular. Alvo: **≤ 120 KB** no recorte final.

> ⚠️ **A restrição que decide o enquadramento: não há folga de resolução.** O original tem
> 1023×1537 e não existe maior. Na composição 55/45 sobre `max-w-6xl`, a coluna da imagem dá cerca
> de **518 CSS px**, o que pede **1036 px** para cobrir 2x. **Nada de corte apertado no rosto:**
> qualquer recorte que amplie a face derruba a densidade abaixo de 2x e deixa macio justamente o
> elemento de LCP. O enquadramento trabalha com a máscara, não contra ela.

**2. A `og-image` pode ser rosto + marca.** Estava especificada como monograma sobre fundo
`ancora`. Com foto disponível, vale testar o preview com **rosto + marca**, que costuma ser mais
forte no lugar onde a página de fato circula: o card de link no WhatsApp e no Instagram. Testar as
duas e comparar.

**3. A paisagem da montanha é rebaixada.** Ela era o plano B para o herói. Tem **uma única
aparição na página inteira**, no `CtaFinal`.

### ⚠️ Três cuidados de execução

**Unificação cromática.** Boa notícia da auditoria: as fotos da Andressa **não são de estúdio
branco**, são parede clara com plantas e luz quente, então já estão perto da paleta e o ajuste
tende a ser pequeno. O risco real está nas de captação, que vieram de sessões diferentes (loja,
cafeteria, cozinha, área externa) e têm temperaturas incompatíveis entre si. Dessaturar na direção
de `decor` e aquecer levemente, sempre olhando a **página montada**, nunca a foto isolada.

**Metadados são obrigação, não capricho.** Toda foto passa pelo `scripts/processar-fotos.mjs`, que
usa `sharp` sem `withMetadata()` e escreve JPEG. Isso remove o EXIF das fotos de iPhone (que
carregam data e aparelho) e a credencial C2PA das duas da Andressa, num passo só. **Nenhuma imagem
vai para `public/` sem passar por ali.**

**A equipe, e a repetição do motivo.** A copy afirma que a Alando *"nunca foi construída para
depender de uma única pessoa"*. Se `Sobre` trouxer só o rosto da fundadora, **a imagem contradiz o
texto ao lado dela**, e as fotos de captação são o que resolve. Só que as nove repetem o mesmo
enquadramento (mão segurando a câmera, tela mostrando a cena): usar duas em seções vizinhas lê como
padrão. **Distribuir entre seções distantes e variar o recorte dentro da máscara.**

### Regras

- **A pessoa nunca é recorte flutuante.** Fica ancorada dentro de uma máscara orgânica. Recorte
  boiando na tela lê como banner barato.
- **Consistência cromática:** prints de feed, retratos e fotos de captação vêm de contextos visuais
  completamente diferentes. Sem tratamento unificado (dessaturação na direção de `decor`,
  temperatura levemente quente) a página lê como colagem. Ajustar olhando a **página montada**, não
  a foto isolada.
- Toda foto de conteúdo com `alt` descritivo real. `alt=""` só em decorativo.
- **AVIF com fallback WebP** via `next/image`, `sizes` correto, `priority` **só** no herói.
- **Vídeo é exceção registrada, não mídia disponível.** Existe **um** na página, e ele tem seção
  própria na §8, script próprio (`scripts/gravar-landing.mjs`), pasta própria (`public/video/`) e
  orçamento próprio (400 KB, contra ~200 KB de imagem). Um segundo vídeo não é decisão de
  fotografia: é uma terceira exceção de movimento, e passa pela §8.
- Nenhuma imagem acima de ~200 KB, e o herói até **120 KB**.
- **Nenhuma imagem entra em `public/` sem passar pelo `scripts/processar-fotos.mjs`**, que é o que
  remove metadados.

### O que não fazer

- Banco de imagem, sempre que houver foto real disponível.
- **Print de feed como imagem-símbolo da Alando.** Ele pertence só a `Resultados`, onde descreve um
  trabalho específico. Fora dali vira símbolo da marca, que é outra coisa.
- Paisagem genérica em mais de um lugar da página. Uma vez é atmosfera; duas é banco de imagem.
- Foto de terceiro sem autorização escrita. Ver `AUDITORIA-ETAPA-1.md` §8.

---

## 10. Componentes: estados obrigatórios

Todo elemento interativo precisa de `default`, `hover`, `focus-visible`, `active`, `disabled`.

- **Foco visível obrigatório:** `outline: 2px solid var(--color-acento-texto); outline-offset: 3px`.
  Nunca `outline: none` sem substituto.
- Alvo de toque mínimo **44×44px**, inclusive no CTA compacto do header.
- **CTA primário:** fundo `ancora`, texto `papel`, Montserrat 600, `tracking 0.02em`.
  Hover: `ancora-quente` + `translateY(-1px)`. **Sem sombra colorida, sem gradiente, sem borda
  muito arredondada**, os três são assinatura de template.
- **CTA secundário:** borda 1px `ancora`, texto `ancora`, fundo transparente.
- **CTA do `CtaFinal`:** fundo `superficie-2`, texto `ancora`. 7,02:1 dentro do botão e 6,10:1
  contra o `ancora-quente` da seção.
  > ⚠️ **Corrigido em 01/08, na Fase 5D.** Esta linha dizia "invertido: fundo `papel`, texto
  > `ancora`. É o único botão claro da página", que é o texto anterior à revisão de 29/07: a
  > §3 já dizia *"Sage é hex do manual e faz o trabalho que eu tinha dado ao `papel`"*, e
  > ninguém tinha propagado para cá. As duas combinações passam em contraste, então a decisão
  > era de identidade, e o Douglas fechou em sage. **Não existe mais botão em `papel`**: a
  > variante `invertido` saiu do `WhatsappCta`, porque botão claro sem dono é convite para
  > alguém usar e gastar o efeito que esta linha protegia.
- **Link em texto:** sublinhado com `text-underline-offset: 4px`, `text-decoration-color: acento`.
- **FAQ:** `<details>`/`<summary>` nativo. **Não usar accordion de shadcn/Radix**, o nativo é
  acessível de graça, custa 0 KB, e mantém o conteúdo no HTML para o crawler, que é a razão de o
  FAQ existir.

### Sem shadcn/ui

**Decisão de 29/07: shadcn está fora do projeto.** Esta página não tem os problemas que ele
resolve: não há formulário, dialog, dropdown, tabela nem date picker, e o FAQ é `<details>` nativo
por decisão de SEO e acessibilidade. Todo componente aqui é de marca, construído sobre os nove
tokens.

Fica só o utilitário `cn` (`clsx` + `tailwind-merge`), que são duas dependências minúsculas e
resolvem classe condicional sem template string ilegível. Isso não é shadcn, é conveniência.

---

## 11. Voz e escrita

Tom: **adulto, direto, caloroso e sem fórmula.** A Alando fala com **dono de empresa ou profissional
liberal que já tentou rede social**: que já publicou, já pagou anúncio, já contratou alguém, e
percebeu que aquilo não virou marca. Ele não está desinformado; está cansado de execução sem tese.

**Fonte de verdade da copy: `Landing Page copy.md`.** Nenhuma alteração sem aprovação do Douglas.

**Fazer:**
- Frases curtas. Verbo ativo. Segunda pessoa ("você"), primeira do plural para a Alando ("nós").
- Ser específica: *"perguntamos qual é a essência da sua marca, não quantos posts você quer por
  mês"* > *"trabalhamos com estratégia personalizada"*.
- Botão diz exatamente o que acontece: **"Quero conversar com a Alando"** (herói) e um rótulo
  **diferente** no `CtaFinal`. No herói a pessoa está decidindo se vale a pena; no fim ela já
  decidiu e está começando.

### Pontuação: nada de travessão longo

**Não usar em dash (—) nem en dash (–) em lugar nenhum**, nem na copy da página, nem nos
comentários de código, nem nos relatórios de fase. Use vírgula, dois-pontos, parênteses,
ponto e vírgula ou duas frases separadas.

Não é só preferência de quem está desenvolvendo: a copy da Andressa não tem **nenhum** travessão
longo em 7 mil caracteres. Ela escreve com vírgula e ponto. Introduzir travessão seria acrescentar
uma voz que não é a dela, e hoje é um dos sinais mais reconhecíveis de texto gerado por IA, o que
contradiz uma página inteira construída para não parecer isso.

Intervalos numéricos usam hífen simples ou a palavra "a": `60-72 caracteres`, `5 a 7 perguntas`.

**Não fazer:**
- Clichê de agência: "soluções digitais", "resultados que impressionam", "presença digital de
  sucesso", "conteúdo que engaja", "eleve sua marca a outro patamar", "somos apaixonados por".
- **Promessa de resultado numérico.** Os números de caso são história do que aconteceu com um
  cliente, não previsão. A redação tem que deixar isso claro.
- Superlativo vazio: "a melhor", "revolucionário", "transformador".
- Texto que caberia no site de qualquer concorrente. Se couber, está errado.

---

## 12. Checklist de qualidade

**Sistema visual**
- [ ] Nenhum hex fora de `globals.css` e `brand.ts` (`grep -rE '#[0-9a-fA-F]{3,8}' src/`)
- [ ] Nenhuma classe `[#...]` no JSX
- [ ] **Nenhum décimo token. A paleta está fechada nos nove**
- [ ] Todos os pares texto/fundo passam AA (tabela calculada da §3)
- [ ] `decor` nunca como cor de texto, em nenhuma opacidade
- [ ] **Sobre a superfície sage, nenhum parágrafo em `tinta` ou `tinta-suave`**
- [ ] CTA primário na cor âncora, não no acento
- [ ] Fotos com máscara orgânica, nenhuma com `border-radius`
- [ ] Ninguém aparece como recorte flutuante

**Anti-template**
- [ ] A dominância cromática está invertida (âncora domina, claro é suporte)
- [ ] As três superfícies aparecem, e a alternância é intencional
- [ ] Máscaras orgânicas distinguíveis entre si, nenhuma parece `border-radius`
- [ ] Faixa de repetição em toda seção titulada, alternando direção
- [ ] Só uma instância da faixa é semântica; as repetições são `aria-hidden`
- [ ] Exatamente uma palavra em itálico por título display
- [ ] `Servicos` é hierárquico, Gestão dominante, não cinco blocos iguais
- [ ] As três ideias da marca NÃO viraram três cards com ícone
- [ ] Nenhum grid simétrico de 3 ou 5 colunas com ícone
- [ ] Nenhuma frase de copy que caberia no site de qualquer outra agência

**Movimento**
- [ ] **Nenhum movimento fora dos três gestos e do momento coreografado**, com as DUAS exceções
      registradas na §8, e nenhuma além delas: a sequência de quadros de Captação (02/09, desvia só
      no gatilho) e o vídeo da prova de Landing Pages (03/09, desvia no gatilho, na mídia e no
      gesto). As duas param em `Servicos` e as duas vivem no que a seção vende. **Uma terceira
      precisa de argumento melhor que "já tem duas"**
- [ ] O reveal da página é revelação por máscara, **não** `fade + translateY`
- [ ] A travessia de cor mantém contraste em 0%, 25%, 50%, 75% e 100% do progresso
- [ ] Faixas se movem só com scroll, nunca em loop autônomo
- [ ] A sequência de Captação para no hover, no foco, com a aba oculta e no botão de pausa
- [ ] O vídeo de Landing Pages toca uma vez, volta ao primeiro quadro e tem botão de pausa
- [ ] Nenhuma requisição de `.mp4` antes de o bloco entrar na tela, medida no painel de rede
- [ ] Vídeo **≤ 400 KB**, que é linha de orçamento própria e não vale para mais nada. Medido: 375 KB
- [ ] Chunk de animação **≤ 24 KB gzip, medido gzipado**
- [ ] Sem three.js, sem Lenis, sem ScrollSmoother
- [ ] `prefers-reduced-motion` testado no DevTools: estático, **100% visível**, máscaras **abertas**, travessia em estado final

**Acessibilidade**
- [ ] Foco de teclado visível em 100% dos interativos, `acento-texto`, offset 3px
- [ ] Um `h1` só, hierarquia sem pular nível
- [ ] `alt` real em toda foto de conteúdo, `aria-hidden` em todo decorativo
- [ ] Alvo de toque ≥ 44×44px
- [ ] A accessibility tree não repete o título da seção

**Conteúdo**
- [ ] Testado em 390px **antes** de qualquer outro breakpoint
- [ ] Nenhum texto acima de 72 caracteres por linha
- [ ] Zero dado inventado, zero palavra da copy alterada além da única autorizada
- [ ] Licença das fontes resolvida e documentada
- [ ] Nenhum `<<A CONFIRMAR>>` restante
