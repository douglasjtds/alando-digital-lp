# Etapa 1: Auditoria e leitura da marca

### Alando Digital · agência de branding e comunicação

> Relatório da fase de entrevista da skill `landing-profissional`. Nenhuma linha de código foi
> escrita. Nenhum dado da cliente foi inventado, o que falta está marcado `<<A CONFIRMAR>>`.

---

> ## ✅ Auditado na Fase 0, em 30/07. Leia `AUDITORIA-FASE-0.md` antes deste arquivo.
>
> Os três itens "não verificado" desta seção foram verificados no material real, e **três
> conclusões deste documento caíram**: não existe ensaio profissional da Andressa, não existem
> ícones proprietários, e não existe nenhum SVG. As decisões do Douglas sobre cada um estão em
> `AUDITORIA-FASE-0.md` §0. O texto abaixo fica como registro de por que a auditoria não pôde ser
> feita antes, e a §1 continua válida: a engenharia reversa da tipografia acertou.

## 0. O que eu NÃO consegui auditar: leia primeiro

**`ref-files/` não chegou até mim.** O caminho `/Users/douglasjtds/src/freelas/buy-my-code/alando-digital-lp/ref-files`
é da sua máquina; eu só recebi três arquivos: o PDF de apresentação, o PNG da paleta e o
`Landing Page copy.md`.

Então **logos, ícones e arquivos de fonte não foram auditados.** Tudo que digo abaixo sobre
tipografia foi extraído por engenharia reversa do PDF (fontes embutidas), não da pasta de fontes.

Segundo a regra da própria skill, *"diga quando não pôde verificar; 'não verificado' é uma
resposta, 'provavelmente ok' não é"*, três itens ficam **não verificados**:

| Item | Status na Etapa 1 | Resultado da Fase 0 |
|---|---|---|
| Licença dos arquivos de fonte | ❌ não verificado | ✅ Montserrat e Playfair são OFL. A `asimilates` **não foi entregue** e fica fora |
| Ícones proprietários, existem? SVG? stroke ou fill? | ❌ não verificado | ✅ **Não existem ícones.** Existe o monograma, em PNG, versão preenchida e em contorno |
| Inventário de fotos | ❌ não verificado | ✅ 2 da Andressa e 9 de captação, todas aprovadas. **Não é ensaio profissional** |

**Duas saídas, escolha uma:**

1. Rode isto e me cole a saída, resolvo a auditoria aqui e atualizo os documentos:

```bash
cd /Users/douglasjtds/src/freelas/buy-my-code/alando-digital-lp/ref-files
find . -type f | sort
echo "───── arquivos de texto ─────"
find . -type f \( -iname "*.txt" -o -iname "LICENSE*" -o -iname "README*" -o -iname "*.md" \) \
  -exec sh -c 'echo "## $1"; cat "$1"' _ {} \;
echo "───── metadados das fontes ─────"
find . -type f \( -iname "*.ttf" -o -iname "*.otf" -o -iname "*.woff*" \) -exec sh -c '
  echo "## $1"; strings "$1" | grep -iE "personal use|demo|trial|license|copyright|uicreative|reserved" | head -8' _ {} \;
echo "───── svgs ─────"
find . -iname "*.svg" -exec sh -c 'echo "## $1"; grep -oE "(stroke|fill)=\"[^\"]*\"" "$1" | sort -u | head' _ {} \;
```

2. Ou deixe a auditoria para o Claude Code fazer localmente, é exatamente o que a
   **Fase 0** (`instructions/fase-0-auditoria-e-scaffold.md`) manda ele fazer, e ela é bloqueante:
   ele não avança para a Fase 1 sem reportar.

Recomendo a **opção 1** se você puder colar agora, porque a decisão tipográfica muda a §4 do
`DESIGN-GUIDELINES.md`.

---

## 1. Tipografia: o que dá para afirmar

Extraí as fontes embutidas no PDF de apresentação. São três famílias:

| Família | Onde aparece no PDF | Situação de licença | Decisão |
|---|---|---|---|
| **Montserrat** (Regular, Italic, Bold) | corpo de texto, rótulos em caixa alta com tracking largo, lead da capa | **OFL / Google Fonts** ✅ | Usar via `next/font/google`, subsets `latin` + `latin-ext` |
| **Playfair Display** (Regular, Italic) | títulos de seção, palavras grifadas dentro da linha display | **OFL / Google Fonts** ✅ | Usar via `next/font/google`, subsets `latin` + `latin-ext` |
| **asimilates** (Regular) | páginas 4, 17, 18, 19 e 22, em quantidade pequena | ⚠️ **Personal Use Only** | **Não vai para a web como está.** Ver abaixo |

### O problema do `asimilates`

`asimilates` é da fundição **UICreative** (Copyright © 2023). A versão que circula gratuitamente
em dafont, 1001fonts, cufonfonts e afins é **demo, uso pessoal apenas**; a licença comercial é
vendida em `uicreative.net` e na MyFonts, com EULAs separadas para desktop, webfont, app e
documento eletrônico. A própria página do dafont avisa que uso sem licença adequada é ilegal.

Isso é o caso literal da tabela da skill: *"Marcada DEMO / PERSONAL USE ONLY / trial → não vai.
Publicar o site é uso comercial."* E: **licença de desktop não cobre web; converter para `.woff2`
não muda a licença.**

**Mas há uma distinção que muda tudo, e ela depende de `ref-files/`:**

| Se `asimilates` for… | Consequência |
|---|---|
| **só o lettering do logo**, entregue como SVG com paths vetorizados | Não precisamos carregar a fonte. Nenhum arquivo de fonte vai para o servidor. Fica pendente apenas confirmar com a Andressa que ela tinha licença na hora de desenhar o logo: mas isso é uma questão dela com a fundição, anterior a este projeto, e não bloqueia o site. |
| **a fonte display prevista para títulos** | Bloqueia. Ou ela compra a licença **webfont** (a troca depois é uma linha em `layout.tsx`), ou substituímos. |

**Se precisar substituir, a substituta certa é Playfair Display**, e a justificativa é forte:
`asimilates` é uma serifada display de contraste alto ("Modern Classic serif Display", nas palavras
da fundição), e Playfair Display é exatamente essa anatomia, já está no material dela, já carrega
os títulos do PDF, e é OFL. Zero família nova, e o site continua parecido com o manual.

Alternativas se ela quiser mais distinção do que Playfair oferece: **Prata**, **Bodoni Moda** ou
**Instrument Serif** (todas OFL).

> `latin-ext` é obrigatório: sem ele, ã/ç/õ/é caem no fallback e a linha mistura duas fontes no
> meio da palavra. Em "Criando e gerenciando marcas de forma artesanal" isso apareceria em dois
> lugares.

---

## 2. Ícones: não verificado, com uma consequência séria

Não achei conjunto de ícones proprietários no PDF de apresentação. As páginas de serviço usam
**rótulos tipográficos em caixa alta**, não pictogramas. Isso pode significar duas coisas, e só
`ref-files/` decide:

- **Se não existem ícones proprietários:** a animação-assinatura padrão da skill (`DrawIcons`,
  ícones grandes em stroke que se desenham) **fica sem material**. E a regra é clara: *"inventar um
  trio genérico é cair no clichê que a §2.5 proíbe."* Nesse caso a assinatura de movimento muda,
  proposta na §5 deste documento.
- **Se existem:** revisitar na Fase 2 e conferir se são `stroke` ou `fill` (só `stroke` desenha).

---

## 3. Fotos: o maior risco de qualidade do projeto

O acervo que chegou é **fotografia de terceiros**: prints de feed de clientes (Dra. Roberta Cino,
Dra. Ana Luisa, Dra. Juliana, Luciano Fernandes, Daoravida, NaCasa, Vizzent, Appré) e fotografia de
paisagem: montanha na neblina, floresta de outono, que é o mesmo registro do PNG da paleta.

**⚠️ Corrigido na Fase 0: não existe ensaio profissional.** Eu havia registrado aqui, em 29/07,
que ele existia. A auditoria do material mostrou outra coisa: `drive-files/Dêssa/` tem **duas
imagens produzidas com `gpt-image`**, e `drive-files/Fotos captações/` tem **nove fotos de iPhone**
do trabalho acontecendo. **O Douglas decidiu em 31/07 usar as duas coisas**, e o inventário
completo está em `AUDITORIA-FASE-0.md` §4.

O texto abaixo fica registrado porque explica **por que** a questão da fotografia era crítica, e
porque duas coisas continuam valendo: a unificação cromática (ver `DESIGN-GUIDELINES.md` §9) e o
parágrafo sobre a equipe, que precisa de imagem que não seja só a fundadora.

**No material original que eu recebi, não havia nenhuma foto da Andressa nem da equipe.**

Isso importa mais do que parece. A regra anti-template nº 3 é *"fotografia real, nunca banco de
imagem, é o maior diferencial disponível e o antídoto mais forte"*. Sem ensaio próprio, sobra:

- paisagem (bonita, mas é o vocabulário visual mais copiado que existe hoje, literalmente o que
  gerador de imagem produz por padrão);
- print de feed de cliente (funciona como prova, não como identidade);
- nada da pessoa por trás.

A seção "Quem está por trás da Alando" existe na copy e vai precisar de rosto. Está na lista de
pendências como **item de maior impacto**.

> Os prints de feed carregam terceiros identificáveis: profissionais de saúde, com nome. Uso
> público exige autorização por escrito de cada um. Ver §6.

---

## 4. Paleta: os dez tokens, decididos por cálculo

Seis hexes vieram do PNG. Quatro neutros foram derivados (o manual não tem neutro, o deck inteiro
é fotografia escura com texto branco).

### Tokens da marca

> **Atualizado em 29/07, depois da sua instrução de respeitar a paleta da marca.** A primeira versão
> tinha quatro cores derivadas. Agora tem **uma**.

### Os nove tokens, e oito são hexes literais do manual

| Token | Hex | Origem | Papel |
|---|---|---|---|
| `ancora` | `#102F15` | manual | Títulos, CTA primário, faixa de fechamento, footer |
| `ancora-quente` | `#4C2B08` | manual | Hover do CTA |
| `superficie-2` | `#B3B793` | manual | Superfície clara alternada; texto de apoio sobre `ancora` |
| `decor` | `= #B3B793` | manual | **Alias, usado a 6-12% de opacidade.** Faixas, blobs, bordas |
| `acento` | `#AB7743` | manual | Sublinhado, marcador, hover. **Nunca texto** |
| `acento-texto` | `#4C2B08` | manual | Texto de acento e anel de foco |
| `tinta` | `#544635` | manual | Corpo de texto sobre `papel` |
| `tinta-suave` | `#676127` | manual | Legendas e apoio. O oliva que estava sobrando |
| `papel` | `#F7F4EC` | **único derivado** | Fundo claro: `#AB7743` a 8% sobre branco |

**Os seis hexes do PNG estão todos empregados.** O único derivado é o fundo claro, e ele existe
porque a página precisa de um e o manual não tem nenhum neutro. Não é cor nova na marca: medi o deck
e o texto claro dele está em `#FFFEF8`, um branco quente que também não aparece nas seis amostras.
O manual já usa um neutro sem ter nomeado; nós só derivamos o dele por aritmética.

### Quatro decisões que o cálculo tomou, não o gosto

Rodei `scripts/contraste.mjs`. As cinco exigências passam e o `decor` reprova em texto como deve.

**1. O caramelo `#AB7743` não pode ser botão nem texto.** Dá **3,50:1** sobre `papel`, reprovado. É
quase exatamente o caso que a skill conta como origem do sistema (3,51:1). O CTA primário fica em
`ancora`, **13,27:1**. Acessível *e* menos genérico, porque quase toda landing de agência usa botão
colorido.

**2. `acento-texto` é o próprio `#4C2B08`, e não precisou derivar nada.** Medi o matiz: caramelo
`#AB7743` está em **30,0°** e marrom `#4C2B08` em **30,9°**. Mesma família, 0,9° de diferença. O
`#4C2B08` **é** o acento escurecido. Foi assim que a última cor derivada saiu da paleta.

**3. O sage `#B3B793` faz dois papéis com um hex.** A 100% é `superficie-2` (superfície e texto sobre
escuro, 7,02:1); a 6-12% de opacidade é `decor`. O alias `--color-decor` existe no CSS para o código
ficar legível, mas a marca não ganha cor por isso.

**4. A alternância de seções mudou de cara, e é visível.** Antes eram dois cremes quase iguais.
Agora são **três superfícies reais**: `papel` → sage → `ancora`. Creme, verde-acinzentado, verde
escuro. O ritmo da página fica bem mais marcado e mais fiel à paleta. **Vale mostrar para a Andressa
antes da Fase 5**, porque é consequência de projeto e não detalhe.

**Regra nova, e é a mais fácil de errar:** sobre a superfície sage o parágrafo tem que ser `ancora`
(7,02) ou `acento-texto` (6,10). O `tinta` dá só **4,39:1** ali e o `tinta-suave` dá **3,05:1**.

**Tabela completa em `DESIGN-GUIDELINES.md` §3.**

### Um presente da marca

O deck da Alando **já é escuro**. Medi as páginas: verde e marrom quase pretos dominam 60-80% da
área, com texto claro por cima. A regra anti-template nº 1 (inverter a dominância cromática)aqui
não é rebeldia contra o manual, **é obediência a ele**. A tentação, nesse caso, é a contrária:
fazer uma landing bege clarinha "porque site é claro". Seria trair a marca *e* cair no template.

---

## 5. As três perguntas que você fez

### 5.1 Qual é o h1

> ## Criando e gerenciando marcas de forma artesanal.

Não inventei: é a primeira linha do `Landing Page copy.md` **e** é reafirmada por ela no fim de
"Nossa história". **Confirmado pelo Douglas em 29/07: é "Criando".** Bate com o lockup do logo na
capa do deck, que traz o tagline em caixa alta sob a marca, e o lockup manda mais que o documento
de copy: ele já está impresso, aplicado e em circulação.
Frase que a marca já usa para se descrever, que é a regra.

**✅ Divergência resolvida.** Eu tinha seguido com "Cuidando" porque o documento de copy traz essa
forma em dois lugares. O Douglas confirmou que o correto é **"Criando"**, e o lockup do logo
concorda. O documento de copy é que está desatualizado nesse ponto.

**⚠️ Mas a troca abre uma pendência nova, e é uma linha só.** Contei as seis ocorrências de
"cuidar" na copy. Cinco continuam válidas e não têm relação com o slogan:

| Onde | Trecho | Situação |
|---|---|---|
| Título de seção | "Como podemos **cuidar** da sua marca" | ✅ segue |
| Momentos | "nosso objetivo é o mesmo: **cuidar** da sua marca com estratégia" | ✅ segue |
| Nossa história | "Desde 2017, **cuidamos** da comunicação de empresas" | ✅ segue |
| Última linha da página | "passamos a **cuidar** da sua comunicação" | ✅ segue |
| Nossa história, fechamento | "É por isso que dizemos que **cuidamos e gerenciamos marcas de forma artesanal**" | ⚠️ **quebra** |

O problema é só a última: ela é apresentada com "É por isso que dizemos que", ou seja, **está
citando o slogan explicitamente**. Se o slogan é "Criando", essa frase cita errado o próprio
tagline da marca, na seção que existe justamente para explicá-lo.

**✅ Resolvido em 29/07: o Douglas aprovou a troca de uma palavra.** A linha passa a ser:

> "É por isso que dizemos que **criamos** e gerenciamos marcas de forma artesanal. Não porque
> fazemos menos, mas porque fazemos com atenção, intenção e respeito aos detalhes que tornam cada
> negócio único."

**É a única alteração autorizada na copy da Andressa até agora, e é uma palavra.** O eco com o h1
sobrevive, que é o que faz a seção fechar. As outras cinco ocorrências de "cuidar" ficam intactas.

⚠️ **Levar isso para a Andressa junto com o aviso maior:** o `Landing Page copy.md` que ela mandou
está com o tagline antigo em dois pontos. Não é erro de digitação, é uma versão anterior circulando,
e provavelmente está em outros materiais também.

**Correção de algo que eu disse antes:** afirmei que "Criando quebra a rima interna do texto".
Exagerei. Contando de fato, quebra **uma linha**, e o conserto é uma palavra. As outras cinco
ocorrências de "cuidar" não competem com o slogan, elas o complementam: o slogan diz **o que a
Alando faz** (cria e gerencia), e o corpo diz **como** (com cuidado). Os dois verbos convivem bem.

**A linha da capa do PDF**: *"Estratégia, posicionamento e comunicação para marcas que desejam
ser lembradas"*, é excelente, mas não é h1. Ela é `<title>` e `meta description`. Ela explica o que a
Alando faz para quem chega do Google; o h1 explica *como*, para quem já está lendo.

**Um ajuste de herói que precisa da sua confirmação:** a copy coloca no topo, depois do h1, um
parágrafo de quatro linhas ("Na Alando, acreditamos que um bom posicionamento começa muito antes
do primeiro post…"). Herói cheio é o erro clássico: ele leva eyebrow, h1, **uma** frase de
subtítulo e **um** CTA. Proposta: fica no herói só *"Porque nenhuma marca deveria ser tratada como
só mais um cliente."*, e o parágmento longo desce inteiro, sem uma palavra alterada, para a seção
Manifesto, onde ele encaixa perfeitamente. **É mudança de posição, não de texto.** Confirma?

### 5.2 Quais são os pilares

**Resposta honesta: a Alando não tem três pilares paralelos.** Ela tem uma **tese com ordem**.

O material inteiro gira em torno de uma palavra, e é literalmente a palavra *antes*:

- "um bom posicionamento começa muito **antes** do primeiro post"
- "**Antes** de falar sobre redes sociais… queremos falar sobre pessoas"
- "**antes** de pensar em conteúdo, pensamos em identidade"
- "**antes** de pensar em cores, tipografia ou símbolos, buscamos entender quem é a sua marca"
- "**Antes** de publicar conteúdo, existe um perfil inteiro que precisa comunicar confiança"
- "**Antes** de qualquer post, qualquer cor, qualquer palavra, a gente mergulha" *(PDF, p. 21)*
- "Em vez de começar perguntando quantos posts o cliente queria publicar por mês, passamos a fazer
  perguntas muito mais importantes"

Sete ocorrências estruturais, em dois documentos independentes. Isso não é um tique de escrita, é
o conceito central. E é uma **sequência**, não três atributos.

Se ainda assim for preciso nomear as ideias que sustentam o peso, são estas, e todas as três
saíram do material dela:

1. **Entendimento antes de execução.** *"uma comunicação forte não nasce de tendências. Ela nasce
   de entendimento."*
2. **Artesanal, não fórmula.** *"nenhuma estratégia funciona quando tenta encaixar todas as marcas
   na mesma fórmula."*
3. **Ser lembrada, não ser vista.** *"marcas que desejam ser lembradas"*, *"Muito além dos
   números"*, *"muitas empresas investiam em conteúdo, mas poucas realmente construíam uma marca."*

**Mas (e este é o ponto)esses três são argumento, não oferta.** Eles pertencem à prosa e à
*ordem da página*, nunca a um grid de três colunas com ícone em cima. A copy entrega essas três
proposições prontinhas e simétricas, e é exatamente por isso que o risco de clichê aqui é alto: o
caminho óbvio produz o layout que o checklist anti-template proíbe em primeiro lugar.

**O que a página precisa de fato exibir como blocos são os cinco serviços**, e eles também não
são paralelos. A própria copy diz: *"Gestão de Redes Sociais. Esse é o coração da Alando."* Então
a seção de serviços é **hierárquica**: um bloco dominante e quatro em órbita. Cinco cards iguais
seria mentir sobre o negócio dela e cair no template no mesmo gesto.

### 5.3 Qual é a assinatura estrutural

> **A faixa de palavra repetida.**

É o device da casa, e não é dedução minha, está em ~15 das 24 páginas do deck:

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

Repare no que ela é: **não é ornamento, é o sistema de titulação da marca.** É assim que a Alando
escreve um `<h2>`. Isso satisfaz o critério mais duro do anti-template, *"um elemento estrutural
que só esta marca teria, e que atravessa a página inteira em vez de decorar uma seção"*, e
satisfaz porque veio do manual, não de um repertório de efeitos.

**Tradução para web:** cada `<h2>` vira uma faixa de repetição horizontal, cortada pela viewport,
nas cópias em `decor` sobre fundo claro (ou `superficie-2` sobre `ancora`), com **uma** instância
legível em `ancora` carregando a semântica. A faixa deriva lateralmente conforme o scroll, com
direção alternando a cada seção. Custo: **0 KB**, via `animation-timeline: scroll()`, sem listener,
sem rAF, sem biblioteca. Onde o navegador não suportar, `@supports` não casa e a faixa fica
parada, o que é degradação silenciosa de propósito.

**Segunda camada, complementar: a palavra em Playfair itálico dentro da linha display.** No deck:
*construir*, *juntos?*, *números* aparecem em itálico serifado enquanto o resto da linha é outra
coisa. É a gramática de ênfase dela. Regra para a página: **exatamente uma palavra por título
display** ganha o itálico, e é a palavra que carrega o peso. Uma só, duas viram decoração.

**Terceira camada, conceitual: "antes" decide a ordem.** A página performa a tese em vez de
enunciá-la: ela fala de pessoas antes de falar de redes sociais, e adia o catálogo de serviços
para depois do manifesto. Toda landing de agência abre com o menu de serviços. Esta não abre,
e essa recusa é o argumento.

#### A tensão que isso cria, e como resolvo

Se toda seção tem uma faixa se movendo, isso é "efeito espalhado pela página", que é o sintoma que
a skill manda evitar. Resolução, e registro isso como decisão consciente:

- As faixas **só se movem quando o usuário rola** (`animation-timeline: scroll()`), nunca em loop
  autônomo. Isso as coloca na categoria de *textura de parallax*, não de animação, o mesmo estatuto
  da foto que deriva atrás da máscara. E é o que você pediu: movimento suave ligado ao scroll.
- O **único momento coreografado** fica na entrada do Manifesto: *"Antes de falar sobre redes
  sociais…"* aparece, e *"…queremos falar sobre pessoas"* resolve depois, uma vez. Uma timeline,
  abaixo da dobra, zero risco de LCP, e diretamente amarrada ao conceito.
- **Se `ref-files/` revelar ícones proprietários**, reavaliar na Fase 2: o momento coreografado
  pode migrar para os serviços com `DrawIcons`, e o Manifesto volta a ser reveal discreto.

---

## 6. A arquitetura não cabe nas onze seções, e mudar é o certo

Você abriu a porta e eu vou passar por ela: **o catálogo não serve aqui.** Não por pouco.

O catálogo pressupõe **uma pessoa, um serviço, um conselho profissional**. A Alando é **uma agência
com equipe, um portfólio de cinco serviços, cinquenta e tantas marcas atendidas e nenhum conselho**.
E a copy que a Andressa escreveu já tem arquitetura própria, coerente, que não é a do template.

### Mapeamento honesto

| O que ela escreveu | Seção do catálogo | Veredito |
|---|---|---|
| h1 + frase + CTA | `Hero` | ✅ igual |
| "Marcas que confiam em nós" (logos) | - | 🆕 **não existe no catálogo** |
| "Antes de falar sobre redes sociais…" | `ParaQuem`? | ❌ **não.** É manifesto/tese, não reconhecimento de dor |
| "Cada empresa chega em um momento diferente" | `ParaQuem` | ✅ é isto, e está na voz certa |
| Os 5 serviços | `Metodo`? | ❌ **não.** Metodo é conceito; isto é catálogo. Não existe no template |
| "Mais do que contratar um serviço" | - | 🆕 diferencial, sem equivalente |
| "Nossa história" + "Quem está por trás" | `Sobre` | ✅ mas em dois movimentos, e em 3ª pessoa |
| - | `ProvaRapida` | ⛔ substituída por logos + resultados reais |
| - | `ComoFunciona` | ⚠️ **falta na copy** e faz falta |
| - | `Depoimentos` | ⚠️ **falta.** O deck tem números reais, ver abaixo |
| - | `Faq` | ⚠️ **falta na copy** |
| - | `CtaFinal` | ⚠️ **falta.** A copy termina sem fechamento |

Três seções do catálogo não têm equivalente na copy dela; duas seções dela não têm equivalente no
catálogo. Isso não é ajuste, é outra arquitetura.

### A arquitetura proposta

```
Header
 1. Hero              h1 + frase + 1 CTA
 2. FaixaClientes     🆕 logos, a prova social que ela de fato tem
 3. Manifesto         🆕 "Antes de falar sobre redes sociais…"  ← momento coreografado
 4. Momentos          = ParaQuem. Os três momentos, na voz de quem chega
 5. Servicos          🆕 5 serviços HIERÁRQUICOS: Gestão dominante, 4 em órbita
 6. Resultados        🆕 substitui Depoimentos. Números reais do deck. Nasce desligada
 7. Processo          = ComoFunciona. Único <ol> da página. COPY PENDENTE
 8. Sobre             Nossa história + Quem está por trás, em dois movimentos
 9. Faq               COPY PENDENTE
10. CtaFinal          faixa `ancora`, CTA claro invertido. COPY PENDENTE
Footer
StickyMobileCta
```

> ⚠️ **A linha 10 envelheceu duas vezes, e fica como estava porque este arquivo é registro
> datado.** A faixa do `CtaFinal` passou de `ancora` para `ancora-quente` na revisão de 29/07
> (o "muito verde" da Andressa), e o botão passou de `papel` para `superficie-2`, confirmado
> pelo Douglas em 01/08. O estado atual está em `DESIGN-GUIDELINES.md` §3 e §10 e em
> `landing-page-structure.md` §5.10.

### Por que o Manifesto vem ANTES dos Momentos

O catálogo é explícito: `ParaQuem` vem antes de `Metodo` *"porque ninguém se interessa por método
antes de se reconhecer no problema"*. Estou invertendo, e com argumento:

O Manifesto da Alando **não é método, é o reenquadramento que faz o leitor perceber que o problema
dele é outro.** Ele chegou achando que compra "posts por mês"; a página precisa dizer, antes de
qualquer outra coisa, que o assunto é identidade. Se os Momentos vierem primeiro, eles são lidos
como um seletor de plano ("estou começando" / "quero crescer") e a tese vira justificativa
posterior. Invertido, os Momentos chegam depois de o leitor já ter mudado de pergunta.

*(Registrado no `DESIGN-GUIDELINES.md` §1 conforme a exigência da skill: quem muda a arquitetura
precisa deixar o porquê escrito.)*

### O arco da conversa fica

> quem somos → quem já confia → **o assunto não é o que você pensa** → você é atendida aqui →
> o que fazemos → já funcionou antes → como acontece na prática → quem está por trás → dúvidas → agir

---

## 7. Stack: as três divergências, agora resolvidas

| Você pediu | Onde ficou | Por quê |
|---|---|---|
| React + TS + Node + Tailwind | **Next.js App Router** + TS + Tailwind v4 | Next é React. Precisamos dele por `next/image`, Metadata API e JSON-LD no HTML. E **nada de `output: 'export'`**: mataria o `next/image`, que a Vercel entrega de graça |
| **shadcn/ui** | ✅ **Fora do projeto** (decidido em 29/07) | Esta página não tem os problemas que ele resolve: nenhum formulário, dialog, dropdown, tabela ou date picker. O FAQ tem que ser `<details>` nativo, por SEO. Fica só o `cn` (`clsx` + `tailwind-merge`), que não é shadcn, é conveniência |
| **animação no scroll** | ✅ **anime.js `onScroll`**, medido em 21,2 KB gzip | Eu tinha entendido errado na primeira volta: você falou de animação acionada pelo scroll, e eu respondi sobre mecânica de scroll. São coisas diferentes. `onScroll` **lê** a posição do scroll em vez de substituí-lo, então entrega o efeito sem o passivo de acessibilidade do Lenis |
| **three.js** | ⚠️ **Recomendo não**, com número | Medido: **127,1 KB gzip** para a cena mínima tree-shaken. 6x o sistema inteiro de anime.js, 5x o orçamento de movimento. E névoa/partícula/distorção WebGL no scroll é hoje *a* assinatura de landing de agência, o mesmo problema da referência do Pinterest a 127 KB. As cinco condições para usar de todo jeito estão em `DESIGN-GUIDELINES.md` §8 |

---

## 8. Ética e autorização: não há conselho, mas há terceiros

Sem conselho profissional: nada de registro obrigatório no eyebrow, nada de restrição publicitária
de código de ética. Mas há três frentes de autorização, todas bloqueantes:

1. **Logos de clientes**, uso de marca de terceiro exige autorização. Precisamos da lista do que
   está liberado, e em SVG.
2. **Números de caso** (Daoravida +218 mil visualizações em 60 dias; NaCasa +79,64% de alcance;
   Vizzent +100% de seguidores; Luciano 183 mil pessoas): são **dados reais e ótimos**, e é o
   material que salva a seção Resultados. Mas precisam de autorização por escrito, e de decisão
   sobre nomear ou anonimizar.
3. **Profissionais de saúde identificados** (Dra. Roberta Cino, Dra. Ana Luisa, Dra. Juliana),
   além da autorização de imagem, elas têm conselho próprio, e publicidade que sugira resultado de
   atendimento ("encher a agenda") tem restrição no lado delas. O texto sobre elas fala de
   resultado da *Alando*, não de resultado clínico (o que ajuda), mas a autorização tem que ser
   delas, não da Andressa.

Enquanto não houver autorização, `Resultados` fica com `exibir: false`. **Seção desligada é estado
final legítimo. Número inventado, não.**

---

## 9. Divergências na copy: nada foi alterado, tudo listado

Regra sua: nenhuma alteração de texto sem confirmar. Então segue a lista.

| # | O quê | Proposta |
|---|---|---|
| 1 | ✅ **Slogan resolvido: "Criando"** | Confirmado pelo Douglas. O documento de copy está desatualizado nos dois lugares onde diz "Cuidando" |
| 1b | ✅ **"...dizemos que criamos e gerenciamos..."** | Aprovado pelo Douglas em 29/07. Uma palavra. É a única alteração autorizada na copy até agora |
| 2 | **Parágrafo longo no herói** | Mover para o Manifesto, **sem trocar uma palavra**. Confirmar |
| 3 | **Serviços divergem entre copy e PDF** | A copy lista 5 (Identidade Visual, Estruturação de Perfil, Gestão, Captação/Edição, Landing Pages). O PDF lista outros: Gestão Completa, Consultoria, Consultoria 2.0, Branding de Marca, Google Meu Negócio, Design avulso. **Qual é o portfólio atual?** Estou seguindo a copy, que é a fonte de verdade que você definiu |
| 4 | **`Processo` não tem copy** | Matéria-prima existe no PDF ("Todo mês começa com estratégia", diagnóstico → planejamento → roteiros → captação → edição → publicação → acompanhamento). Não vou escrever: preciso do seu ok e do processo real dela |
| 5 | **`Faq` não tem copy** | Precisa das objeções que ela ouve de verdade, não de uma lista genérica. É a seção que mais rende cauda longa em busca, justamente porque as perguntas são o que as pessoas digitam |
| 6 | **`CtaFinal` não tem copy** | A copy termina em "passamos a cuidar da sua comunicação", sem fechamento. O título precisa nomear a **última objeção**: que numa agência raramente é o serviço, e quase sempre é "será que eu preciso disso agora" |
| 7 | **"Logos clientes aqui"** | Placeholder explícito na copy |
| 8 | **Nenhuma cidade é citada** | Peso em busca local. Precisa aparecer em title, description, footer e JSON-LD |

Quando você confirmar 1 a 3 e me passar matéria-prima de 4 a 6, aciono a `/marketing-writer` para
escrever **só** o que falta, na voz dela, e te mando para aprovar antes de entrar no `content.ts`.

---

## 10. Pendências: o bloco para levar à Andressa

> ⚠️ **Bloco reescrito em 31/07, depois da Fase 0.** A lista viva é esta. A versão anterior
> tratava fotos, fontes e ícones como pendências, e as três estão resolvidas.

```
BLOQUEIA O DESENVOLVIMENTO
 1. Número de WhatsApp (com DDD), e confirmar que WhatsApp é mesmo o canal.
    Se para B2B ela preferir e-mail ou agendamento, me diga: formulário está fora
    de escopo por decisão de arquitetura, mas link para Calendly é possível.
 2. Domínio final. Enquanto não houver, a página sobe com noindex.
 3. Cidade / região de atuação.

BLOQUEIA SEÇÕES ESPECÍFICAS
 4. Logos de clientes autorizados, em SVG exportado do Canva.  → FaixaClientes
    (as capas dos PDFs NÃO servem: não há arte vetorial nelas)
 5. Autorização escrita para os números de caso do deck.       → Resultados
 6. Autorização de imagem dos profissionais citados.           → Resultados
 7. Autorização de imagem das pessoas nas fotos de captação,
    inclusive a criança que aparece na tela de uma delas.      → Servicos
 8. Autorização de cada cliente cujo material de identidade
    visual vire thumbnail de portfólio.                        → Servicos
 9. O processo real, passo a passo, com prazos reais.          → Processo
10. As 5 a 7 objeções que ela mais ouve.                       → Faq
11. Copy do fechamento.                                        → CtaFinal
12. Depoimentos reais autorizados, se existirem.               → (opcional)

CONFIRMAÇÕES DE COPY (você, não ela)
13. ✅ RESOLVIDO: o slogan é "Criando", e a linha de fechamento de "Nossa história"
    passa a dizer "criamos e gerenciamos". Uma palavra, aprovada.
    ⚠️ AVISAR A ANDRESSA: o documento de copy dela tem o tagline antigo em dois pontos.
    A Fase 0 confirmou pelo lockup impresso: o tagline do logo diz "CRIANDO".
14. Mover o parágrafo do herói para o Manifesto?
15. Qual lista de serviços é a atual: a da copy (5) ou a do PDF (6)? Não bloqueia.

RESOLVIDO NA FASE 0
 ✅ Fotos da Andressa: 2 em drive-files/Dêssa/, aprovadas em 31/07.
 ✅ Fotos de captação: 9, aprovadas. Fundo NÃO é estúdio branco.
 ✅ Licença de fonte: a asimilates não foi entregue e não é o lettering do logo.
    Display fica em Playfair Display.
 ✅ Ícones proprietários: não existem. Existe o monograma, em fill e em contorno.
 ✅ Logo e monograma: PNG 1080 via next/image. Não existe SVG, e nem o deck tem.
 ✅ Preço: a landing não exibe.

INFORMAÇÃO SECUNDÁRIA
16. Instagram confirmado (@alandodigital). Tem LinkedIn? Outras redes?
17. Ano de fundação: 2022 (a copy diz que a história com marcas começa em 2017).
18. "mais de 50 marcas", do PDF. Vale usar na página? Confirmar que segue válido.
19. Qual é a fonte do lettering do logo? Curiosidade de manual, não bloqueia.
```

---

## 11. Próximo passo

Os documentos e os prompts estão prontos, com todos os marcadores no lugar:

```
DESIGN-GUIDELINES.md        fonte de verdade visual
landing-page-structure.md   fonte de verdade técnica e de arquitetura
TODOs.md                    a sequência, uma fase por vez
CLAUDE.md                   regras permanentes para o Claude Code
instructions/fase-0 … fase-9   prompts prontos para colar, um por fase
```

Comece pela **Fase 0**: ela é a auditoria de `ref-files/` que eu não pude fazer, e é bloqueante.
Se a saída dela contradisser alguma coisa deste relatório, me traga: eu atualizo os documentos
antes da Fase 1.
