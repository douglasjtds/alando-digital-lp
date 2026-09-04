# landing-page-structure.md
### Especificação técnica: Landing page Alando Digital

> Fonte de verdade de **stack, árvore de arquivos, seções, CTA, SEO e performance**.
> Decisões visuais estão em `DESIGN-GUIDELINES.md`. Auditoria e justificativas em
> `AUDITORIA-ETAPA-1.md`.

---

## 1. Objetivo e contexto

**Objetivo único:** produzir um clique que abre uma conversa no WhatsApp com a Alando.

A métrica de sucesso é **uma só**: cliques no CTA por sessão, segmentados por origem. Não é tempo
na página, não é scroll depth, não é bounce rate.

| Canal | Peso | O que isso obriga |
|---|---|---|
| Link na bio do Instagram (@alandodigital) | **Principal** | Mobile primeiro, carregamento rápido, CTA acima da dobra, decisão em segundos, sticky mobile |
| Busca por marca ("Alando Digital") | Secundário | Metadata + JSON-LD corretos; a página tem que ser o 1º resultado |
| Indicação / compartilhamento por WhatsApp | Secundário | `og:image` correto, é onde a página de fato circula |

`<<A CONFIRMAR: o canal principal é mesmo Instagram, ou LinkedIn/indicação pesam mais? Se for B2B
por indicação, revalidar a prioridade mobile antes de assumir 390px como caso principal>>`

**Público:** dono de empresa ou profissional liberal que já tentou rede social e percebeu que
aquilo não virou marca.

---

## 2. Stack e decisões técnicas

| Item | Escolha |
|---|---|
| Framework | **Next.js (App Router)** + TypeScript estrito |
| Estilo | **Tailwind CSS v4**, tokens em `@theme` no `globals.css` |
| Componentes | **Nenhuma biblioteca.** Componentes próprios, só o utilitário `cn` |
| Animação | **anime.js v4** (`onScroll` + `createTimeline` + `stagger`) + CSS scroll-driven animations. **Sem three.js** |
| Imagens | `next/image`, AVIF com fallback WebP |
| Deploy | **Vercel** |
| Conversão | **WhatsApp** com mensagem pré-preenchida. Sem backend, sem formulário |
| Runtime | Node 20+ |

### 2.1 ⚠️ NÃO configurar `output: 'export'`

Desativaria o `next/image`, que a Vercel entrega de graça (otimização, AVIF, `srcset`, lazy). Não
há motivo para export estático aqui.

### 2.2 Animação de scroll: sim. Scroll suave por biblioteca: não

**O pedido é animação acionada pelo scroll, e ela está no projeto**, via `onScroll` do anime.js e
CSS scroll-driven animations. O vocabulário completo (três gestos e um momento) está em
`DESIGN-GUIDELINES.md` §8.

O que fica fora, e são coisas diferentes:

- **Lenis, GSAP ScrollSmoother e similares.** Reescrevem o scroll nativo: quebram
  `prefers-reduced-motion`, quebram teclado e leitor de tela, custam 15-40 KB. `onScroll` **lê** a
  posição do scroll do navegador em vez de substituí-lo, então entrega o efeito sem o passivo.
- **three.js.** Medido: **127,1 KB gzip** para a cena mínima tree-shaken, que é 6x o sistema inteiro
  de anime.js e 5x o orçamento de movimento. Razões completas em `DESIGN-GUIDELINES.md` §8, incluindo
  as cinco condições para o caso de o Douglas decidir usar de todo jeito.

### 2.3 Sem biblioteca de componentes

**Decisão de 29/07: shadcn/ui está fora.** Esta página não tem os problemas que ele resolve: não há
formulário, dialog, dropdown, tabela nem date picker. Componentes próprios, com os tokens da §4.

Fica só o utilitário `cn` (`clsx` + `tailwind-merge`), que resolve classe condicional sem template
string ilegível. Isso não é shadcn, é conveniência de duas dependências minúsculas.

**O FAQ usa `<details>`/`<summary>` nativo.** Motivo não é gosto: o conteúdo precisa estar no HTML
para o crawler, e o FAQ é a seção que mais rende cauda longa em busca. Accordion em React tira o FAQ
do índice.

### 2.4 Fora de escopo: recusar explicitamente

- Formulário de contato, login, carrinho, CMS, banco de dados
- Blog ou qualquer rota além de `/` e `/styleguide`
- Chat widget, pop-up de saída, cookie banner de terceiro
- Biblioteca de smooth-scroll e three.js (§2.2)

---

## 3. Estrutura de arquivos

```
alando-digital-lp/
├── CLAUDE.md                      ← na RAIZ: é o que o Claude Code lê sozinho
├── verificar-docs.sh
├── instructions/
│   ├── AUDITORIA-ETAPA-1.md
│   ├── DESIGN-GUIDELINES.md
│   ├── landing-page-structure.md
│   ├── TODOs.md
│   └── fase-0 … fase-9.md         ← os 13 prompts
├── ref-files/                     ← material original da marca (não versionar se pesado)
├── drive-files/                   ← ⚠️ REFERÊNCIA. gitignored. NUNCA vai para o build
├── scripts/
│   ├── contraste.mjs
│   └── processar-fotos.mjs
├── public/
│   ├── brand/                     monograma claro/escuro, logos de clientes
│   └── images/                    fotos tratadas, og-image, favicon
└── src/
    ├── app/
    │   ├── globals.css            ← os 10 hexes vivem AQUI
    │   ├── layout.tsx             ← as famílias de fonte
    │   ├── page.tsx
    │   ├── not-found.tsx
    │   ├── robots.ts
    │   ├── sitemap.ts
    │   └── styleguide/page.tsx
    ├── components/
    │   ├── layout/                Header, Footer, StickyMobileCta
    │   ├── sections/              Hero, FaixaClientes, Manifesto, Momentos,
    │   │                          Servicos, Resultados, Processo, Sobre,
    │   │                          Faq, CtaFinal
    │   ├── motion/                Reveal, ManifestoTimeline, anime.ts
    │   └── ui/                    Button, Eyebrow, Section, WhatsappCta,
    │                              OrganicImage, OrganicClipPaths, Pendencia,
    │                              FaixaRepetida  ← componente-assinatura
    ├── config/
    │   ├── brand.ts               ← hexes, fontes, contato, domínio
    │   └── content.ts             ← TODA a copy
    ├── hooks/usePrefersReducedMotion.ts
    └── lib/
        ├── analytics.ts  cn.ts  contrast.ts  pendencias.ts
        ├── schema.ts     site-url.ts  whatsapp.ts
```

### Fronteira white-label

Trocar de cliente deveria tocar **só** estes arquivos:

`globals.css` (os 10 hexes) · `brand.ts` · `content.ts` · `layout.tsx` (fontes) ·
`OrganicClipPaths.tsx` (as máscaras) · `lib/schema.ts` (`TIPO_NEGOCIO`) · `public/`

**Nada mais deveria precisar mudar.** Se um componente precisou ser editado para acomodar conteúdo,
ou a informação está no lugar errado, ou o componente está fazendo curadoria que não é dele.
Investigue antes de editar.

---

## 4. Sistema de tokens

São **nove**, e oito são hexes literais do manual da Andressa.

```css
@theme {
  --color-ancora:        #102F15;  /* manual */
  --color-ancora-quente: #4C2B08;  /* manual */
  --color-decor:         #B3B793;  /* manual */
  --color-superficie-2:  #B3B793;  /* manual, mesmo hex do decor, outro papel */
  --color-acento:        #AB7743;  /* manual */
  --color-acento-texto:  #4C2B08;  /* manual */
  --color-papel:         #F7F4EC;  /* ÚNICO derivado */
  --color-tinta:         #544635;  /* manual */
  --color-tinta-suave:   #676127;  /* manual */
}
```

**Cinco superfícies** (revisado em 29/07, ver `DESIGN-GUIDELINES.md` §3): `papel`, `superficie-2`
(sage), `ancora` (verde escuro), **`ancora-quente` (marrom escuro)** e **`tinta` (marrom médio)**.
O `acento` nunca é fundo de bloco com parágrafo: nenhum texto normal passa nele. Não existe fundo
sutil, porque o manual não tem neutro e inventar dois off-whites quase iguais seria invenção.

**Regras duras:**
- Nenhum hex fora de `globals.css` e `brand.ts`. Nada de `text-[#102F15]`
- **Nenhuma cor nova.** Não acrescente um décimo token
- Na faixa `superficie-2`, o texto é `ancora` ou `acento-texto`, **nunca `tinta`** (4,39:1)

Tabela completa e as quatro regras que ela impõe: `DESIGN-GUIDELINES.md` §3.

---

## 5. Estrutura da página, seção por seção

> ⚠️ **Esta arquitetura NÃO é a das onze seções do catálogo da skill.** A justificativa está em
> `AUDITORIA-ETAPA-1.md` §6 e o registro obrigatório em `DESIGN-GUIDELINES.md` §1. Resumo: a Alando
> é agência com portfólio de serviços, não profissional autônoma com um serviço; e o conceito
> central é uma sequência ("antes"), não três atributos paralelos.

O arco da conversa:

> quem somos → quem já confia → **o assunto não é o que você pensa** → você é atendida aqui →
> o que fazemos → já funcionou antes → como acontece → quem está por trás → dúvidas → agir

Toda seção titulada usa `FaixaRepetida` (`DESIGN-GUIDELINES.md` §6), com direção alternando.

---

### 5.0: `Header`

Monograma à esquerda; âncoras + CTA compacto à direita no desktop; só monograma + CTA no mobile.
**Sem menu hambúrguer**, a página é curta e o CTA vale mais que a navegação. Fundo `papel` com
blur após 40px de scroll. Âncoras: `#servicos`, `#processo`, `#sobre`, `#duvidas`.

---

### 5.1: `Hero` ⭐

**Job:** em 3 segundos, "agência séria que pensa antes de executar" + a ação.

| Elemento | Conteúdo |
|---|---|
| eyebrow | `Branding e comunicação · <<A CONFIRMAR: cidade>>` |
| **h1** | **Criando e gerenciando marcas de forma artesanal.** (confirmado) |
| subtítulo | *Porque nenhuma marca deveria ser tratada como só mais um cliente.* |
| CTA único | **Quero conversar com a Alando** |

**Layout 55/45**, nunca 50/50. Foto: uma das duas de `drive-files/Dêssa/`, aprovadas em 31/07,
dentro de máscara orgânica.

⚠️ **O original tem 1023×1537 e não existe maior.** A coluna da imagem em 55/45 sobre `max-w-6xl`
dá cerca de 518 CSS px, que pede 1036 px para cobrir 2x. **Sem corte apertado no rosto:** a foto
entra perto do quadro cheio, senão o elemento de LCP da página fica macio. Ver
`DESIGN-GUIDELINES.md` §9.

**Não incluir** o parágrafo longo da copy ("Na Alando, acreditamos que um bom posicionamento começa
muito antes do primeiro post…"). Ele desce inteiro, sem alteração de texto, para o `Manifesto`.
`<<A CONFIRMAR com o Douglas: aprovada a mudança de posição do parágrafo?>>`

**Regra do LCP:** nada aqui começa com `opacity: 0` no HTML. Um CTA só, dois no herói reduzem os dois.

---

### 5.2: `FaixaClientes` 🆕

**Job:** prova social imediata, sem afirmar nada.

Faixa fina sobre `superficie-2` (sage). Título discreto: *"Marcas que confiam em nós"*. Logos em
SVG, monocromáticos em `ancora`, altura óptica equalizada (não por bounding box). **Atenção:** sobre
sage o logo precisa de `ancora`, não de `tinta` (4,39:1).

**Nasce desligada** (`exibir: false`). Liga quando os logos autorizados chegarem.

⚠️ **Adiada por decisão de 31/07, e o motivo é material.** Não existe arquivo de logo de cliente
no projeto, e as capas dos manuais de identidade visual **não servem de fonte**: a Fase 0 abriu os
10 PDFs e não há **nenhum** operador de curva ou linha nas capas. O nome do cliente ali é texto
vivo, na fonte da marca dele, e o resto é raster avulso. Extrair daria um conjunto misto, e esta
seção exige SVG monocromático com altura óptica equalizada.

O pedido certo é fácil de atender: **a Andressa desenhou essas identidades e tem os arquivos-fonte,
e o Canva exporta SVG.**

`<<A CONFIRMAR: logos de clientes autorizados, em SVG exportado do Canva>>`

Sem carrossel automático. Se não couberem, quebra em duas linhas.

---

### 5.3: `Manifesto` 🆕 ⭐⭐ **SEÇÃO-ASSINATURA**

**Job:** reenquadrar. O leitor chegou achando que compra "posts por mês"; sai desta seção sabendo
que o assunto é identidade.

Fundo **`ancora`**: o primeiro momento escuro da página, e ele vem cedo de propósito.

- `h2`: **"Antes de falar sobre redes sociais…"** com `FaixaRepetida` em `superficie-2`
- resolve em: **"…queremos falar sobre pessoas."**, palavra *pessoas* em Playfair itálico
- corpo: os dois parágrafos da copy ("Toda empresa nasce de um sonho…" / "Quando uma marca deixa de
  mostrar quem realmente é…"), mais o parágrafo migrado do herói
- fecha em: *"É por isso que, antes de pensar em conteúdo, pensamos em identidade."*

**É aqui que fica a única animação coreografada da página.** A reticência resolve uma vez, abaixo
da dobra. Ver `DESIGN-GUIDELINES.md` §8.

Sem CTA. Esta seção argumenta; não vende.

---

### 5.4: `Momentos` (= `ParaQuem`)

**Job:** a pessoa se reconhecer. É a seção que mais reduz rejeição.

Abre com *"Cada empresa chega até nós em um momento diferente."* Três blocos, direto da copy:

| # | Situação (título) | Diagnóstico (texto) |
|---|---|---|
| 1 | Está dando os primeiros passos | precisa construir uma identidade forte |
| 2 | Já tem marca consolidada | mas a comunicação deixou de representar quem realmente é |
| 3 | Quer crescer e vender mais | fortalecer o posicionamento no digital |

Fecha com o parágrafo de "Independentemente do momento…".

**Layout escalonado**, larguras e colunas alternadas. **Não** grid simétrico, **não** ícone ao lado
de cada item, **não** três cards iguais. O `titulo` é a situação; o `texto` é o diagnóstico, e é
no diagnóstico que a expertise aparece.

`<<A CONFIRMAR com o Douglas: a copy traz os três momentos num parágrafo corrido; separá-los em
três blocos é reorganização de layout, sem alterar palavras. Aprovado?>>`

---

### 5.5: `Servicos` 🆕

**Job:** o catálogo, com hierarquia honesta.

Cinco serviços, direto da copy, **e a copy diz qual é o centro**: *"Gestão de Redes Sociais. Esse
é o coração da Alando."*

| Serviço | Peso no layout |
|---|---|
| **Gestão de Redes Sociais** | **Bloco dominante**, largura cheia, o texto mais longo, foto |
| Identidade Visual | órbita |
| Estruturação de Perfil | órbita |
| Captação e edição de vídeos | órbita, **sequência de quadros** (ver DESIGN-GUIDELINES.md §8) |
| Landing Pages | órbita |

**Regras de layout:**
- **Nunca cinco cards iguais.** Isso mentiria sobre o negócio e cairia no template no mesmo gesto.
- Blocos empilhados **alternando o lado**, larguras desiguais.
- Foto em **alguns**, não em todos, a lacuna quebra o ritmo de grade.
- ⚠️ **Captação virou sequência em 02/09.** O slot é o mesmo e o layout não mudou: o que mudou é que
  dez bastidores se revezam ali, trocando sozinhos. É o único movimento da página que não é preso ao
  scroll, e o desvio, o argumento e as quatro contenções estão registrados na
  `DESIGN-GUIDELINES.md` §8. **Não estenda para outro serviço:** o que sustenta o desvio é a seção
  ser a que vende imagem em movimento.
- ⚠️ **A pilha entrou em 04/09**, e o layout continua sem mudar: atrás da foto, duas placas em leque
  mostram os próximos dois quadros, para o slot dizer em imagem o que o contador `01 / 10` já dizia
  em texto. Placas atrás e nunca por cima, mesma máscara, estáticas. Ver `DESIGN-GUIDELINES.md` §8.
- Sem ícone genérico em cima de cada. Se não houver ícone proprietário, **não há ícone**.
- **Thumbnails de portfólio entram aqui, não numa seção nova.** O material de
  `drive-files/` (capas de diagnóstico de marca e de identidade visual de clientes) vai **anexado ao
  serviço que ele comprova**: Identidade Visual e Estruturação de Perfil. Prova ao lado da
  afirmação vale mais do que uma galeria no fim da página, e evita inflar a arquitetura.
  Tratamento obrigatório em `DESIGN-GUIDELINES.md` §9.
  - ✅ **Duas provas existem, e as duas se renderizam diferente da `foto`.** Estruturação de Perfil
    tem o print do perfil de uma cliente (02/09) e Landing Pages tem **um vídeo** da página de outra
    cliente rolando (03/09). Nos dois casos a máscara **emoldura** o artefato em vez de recortá-lo,
    porque cada aresta deles carrega conteúdo: `.campo-prova` no retrato e `.campo-prova-largo` no
    deitado, os dois medidos no `globals.css`. O componente é o `CampoProva`.
  - ✅ **Acima de 1152px o vídeo fica AO LADO do texto** (04/09), na coluna larga de um grid de
    1,4fr / 1fr. O print de retrato **não** vai junto: ele tem 1290 px e é nas legendas dele que a
    prova mora, então continua ocupando a linha inteira. No vídeo a conta é a oposta e ela melhora,
    a densidade sobe de 1,48x para 1,99x. Detalhe medido na `DESIGN-GUIDELINES.md` §8 e no
    comentário do `Servicos.tsx`.
  - ⚠️ **As duas dependem de autorização escrita da cliente dona do material**, e a de Landing Pages
    depende de mais uma coisa: **a página precisa ter sido entregue pela Alando.** Exibir como
    portfólio um trabalho que não é da agência é afirmação falsa sobre o serviço, o que é a mesma
    classe de erro que inventar depoimento. Confirmado pelo Douglas em 02/09 e 03/09.
  - ⚠️ **O vídeo é o segundo desvio registrado da `DESIGN-GUIDELINES.md` §8**, e ele é maior que o
    primeiro. Leia a §8 antes de propor um terceiro.
- ⚠️ **Passe visual obrigatório em 390px.** É aqui que o clichê volta: em mobile tudo empilha, e
  cinco blocos empilhados com título em cima leem como cinco cards iguais, por mais que o código
  do desktop esteja certo.

Cada serviço mantém a linha de fechamento da copy quando existir (ex.: *"Ideal para empresas que
estão começando ou passando por um reposicionamento."*).

> ⛔ **A landing não exibe preço.** Decisão do Douglas em 31/07. O deck traz "A partir de R$ 2400"
> na p. 17, e o número **não vai para a página**, em nenhuma seção e em nenhuma forma, nem como
> faixa de investimento. Fica registrado aqui para ninguém reabrir o assunto ao ler o PDF.

Depois dos cinco, o bloco **"Mais do que contratar um serviço…"** fecha a seção: é o diferencial,
e é onde a tese volta.

`<<A CONFIRMAR: a copy lista 5 serviços; o PDF lista outros (Consultoria, Consultoria 2.0, Branding
de Marca, Google Meu Negócio, Design avulso). Qual é o portfólio atual?>>`

---

### 5.6: `Resultados` 🆕 (substitui `Depoimentos`)

**Job:** mostrar que já funcionou, sem prometer que vai funcionar.

Fundo **`tinta` `#544635`** (marrom médio), texto `papel` (8.3:1). Números grandes em `acento`
`#AB7743`, que passa em tamanho display. Sem aspas gigantes decorativas, sem avatar, sem seta de
crescimento.
Número grande em Playfair, contexto curto em Montserrat.

Material real disponível no deck, **todo ele pendente de autorização**:

| Cliente | Dado |
|---|---|
| Daoravida | +218 mil visualizações em 60 dias; +59,2% em interações |
| NaCasa | +79,64% de alcance; +78,03% em curtidas; +116,67% em comentários |
| Vizzent | +100% de seguidores; +100% de taxa de engajamento |
| Luciano Fernandes | um conteúdo alcançou 183 mil pessoas, 20 mil interações |

**Nasce desligada** (`exibir: false`). Liga só com autorização escrita.
`<<A CONFIRMAR: autorização escrita de cada cliente para publicação dos números>>`
`<<A CONFIRMAR: nomear os clientes ou anonimizar por segmento?>>`

**A redação tem que deixar claro que é história, não previsão.** Número de caso apresentado como
expectativa é promessa de resultado.

> Se depoimentos reais e autorizados aparecerem depois, entram aqui como segunda camada. Depoimento
> inventado é fraude e destrói exatamente a percepção que a página constrói, não há meio-termo.

---

### 5.7: `Processo` (= `ComoFunciona`)

**Job:** eliminar a incerteza de "o que acontece se eu mandar essa mensagem?".

**O único lugar da página onde 01/02/03 se justifica**, porque o conteúdo é de fato uma sequência,
e por isso vem em `<ol>`. Em qualquer outra seção a numeração é decoração.

⚠️ **Copy inexistente.** Matéria-prima no PDF (p. 17-18): *"Todo mês começa com estratégia"* →
diagnóstico → planejamento estratégico → roteiros e direcionamento → captação → edição → design →
publicação → acompanhamento.

`<<A CONFIRMAR: o processo real, passo a passo, com as palavras dela>>`
`<<A CONFIRMAR: prazos reais de cada etapa>>`

**Prazo e duração são promessa contratual. Marcar e perguntar; nunca estimar.**

CTA ao fim da seção, com mensagem de WhatsApp própria.

---

### 5.8: `Sobre`

**Job:** humanizar. A proximidade tem que ser sentida, não afirmada.

Dois movimentos, na ordem da copy:

**a) Nossa história**: fundada em 2022, com história com marcas desde 2017. A inquietação que
gerou a agência (*"muitas empresas investiam em conteúdo, mas poucas realmente construíam uma
marca"*). Fecha em *"...e gerenciamos marcas de forma artesanal. Não porque fazemos menos,
mas porque fazemos com atenção, intenção e respeito aos detalhes."*

✅ **Uma palavra alterada nessa linha, aprovada pelo Douglas em 29/07.** O documento de copy diz
*"dizemos que **cuidamos** e gerenciamos"*, com o tagline antigo. Como a frase se apresenta com "É
por isso que dizemos que", ela cita o slogan explicitamente e precisa citá-lo certo. A linha final é:

> *"É por isso que dizemos que **criamos** e gerenciamos marcas de forma artesanal. Não porque
> fazemos menos, mas porque fazemos com atenção, intenção e respeito aos detalhes."*

**É a única alteração autorizada na copy.** Nenhuma outra ocorrência de "cuidar" muda.

**b) Quem está por trás da Alando**: Andressa Lando, estrategista de marketing, especialista em
Branding, MBA pela ESPM. E o parágrafo sobre a equipe, que é importante: *"nunca foi construída
para depender de uma única pessoa."*

Layout 5/7, invertendo o herói. Foto: **a segunda** de `drive-files/Dêssa/`, com máscara orgânica
**diferente** da do herói. `medida` no texto.

⚠️ **Atenção ao parágrafo da equipe.** A copy diz que a Alando *"nunca foi construída para depender
de uma única pessoa"*. Só o rosto da fundadora aqui faz a imagem contradizer o texto ao lado dela.
As fotos de captação de `drive-files/Fotos captações/` resolvem isso: mostram o trabalho
acontecendo, que é o que o parágrafo afirma. Como as nove repetem o mesmo enquadramento, usar aqui
uma que não apareça em `Servicos`.

Nada de trajetória inventada. Inventar credencial é a mesma classe de erro que inventar depoimento.

---

### 5.9: `Faq`

`<details>`/`<summary>` nativo. 5 a 7 perguntas. Respostas em prosa real, 2 a 4 frases. Espelha
**exatamente** o JSON-LD `FAQPage`: se divergirem, o Google passa a ignorar o markup inteiro.

⚠️ **Copy inexistente.** `<<A CONFIRMAR: as 5-7 objeções que a Andressa mais ouve>>`

**Peça as objeções reais dela: ela sabe de cor, e são muito melhores que qualquer lista genérica.**
Temas prováveis, a validar com ela: valor/investimento, prazo de contrato, o que ela precisa
fornecer, atendimento remoto para outros estados, quem grava os vídeos, o que acontece se ela não
gostar do conteúdo.

---

### 5.10: `CtaFinal`

Faixa full-bleed em **`ancora-quente` `#4C2B08`** (marrom escuro), não em verde: é o fechamento
quente do arco, e foi a mudança que respondeu ao "muito verde" da Andressa. CTA em
**`superficie-2`, texto `ancora`** (7,02:1 dentro do botão, 6,10:1 contra o fundo da seção).

> ⚠️ **Corrigido em 01/08, na Fase 5D.** Esta linha pedia "CTA invertido (fundo `papel`, texto
> `ancora`): o único botão claro da página", e era o texto anterior à revisão de 29/07 da
> `DESIGN-GUIDELINES.md` §3, que já tinha trocado para sage com o motivo escrito. Decidido pelo
> Douglas: fica sage, e a variante `invertido` saiu do `WhatsappCta`.

⚠️ **Copy inexistente.** O título precisa nomear a **última objeção**, que numa agência raramente é
o serviço, costuma ser *"será que eu preciso disso agora"* ou *"será que dá para começar pequeno"*.

Rótulo do botão **diferente** do herói: no herói a pessoa está decidindo se vale a pena; aqui ela
já decidiu e está começando.

`<<A CONFIRMAR: copy do fechamento>>`

Material da própria marca para inspirar (deck, p. 24): *"Será um prazer fazer parte da próxima fase
da sua marca."* e *"Vamos construir isso juntos?"*

---

### 5.11: `Footer`

Fundo `ancora-quente` (segue o `CtaFinal`), texto `papel` (11.5:1). Monograma, nome completo,
Instagram, cidade (peso em busca
local), copyright, crédito discreto do desenvolvimento.

`<<A CONFIRMAR: cidade>>` · `<<A CONFIRMAR: CNPJ, se ela quiser exibir>>`

---

### 5.12: `StickyMobileCta`

Só `< 768px`, aparece depois que o herói sai da viewport (IntersectionObserver em `#inicio`), some
quando volta. Respeita `safe-area-inset-bottom`, senão fica atrás da barra do iPhone.

Quando o tráfego vem de link na bio, este costuma ser o CTA mais clicado da página inteira.

---

## 6. CTA de WhatsApp: especificação

**Por que WhatsApp e não formulário:** a conversa já é onde o atendimento acontece; não introduz
estado persistente (sem banco, sem LGPD de dados coletados, sem e-mail transacional, sem página de
obrigado); e a taxa de resposta é incomparavelmente maior. Formulário vira e-mail que vira caixa de
entrada que vira nada.

`<<A CONFIRMAR: número de WhatsApp com DDD>>`
`<<A CONFIRMAR: WhatsApp é mesmo o canal? Se para B2B ela preferir agendamento, link para Calendly
é possível. Formulário está fora de escopo por decisão de arquitetura>>`

### Rastreio de origem sem backend

Cada CTA manda uma mensagem **diferente**. A mensagem que chega no celular dela já diz de qual
ponto da página a pessoa saiu.

| Origem | Mensagem | O que revela |
|---|---|---|
| `header` | "Oi! Vim pelo site da Alando e quero falar com vocês." | Já conhecia, veio direto |
| `hero` | "Oi! Quero conversar sobre a comunicação da minha marca." | Decidiu nos primeiros segundos: se for o campeão, o herói faz o trabalho todo |
| `servicos` | "Oi! Vi os serviços de vocês e quero entender qual faz sentido pra minha empresa." | Estava escolhendo o quê |
| `processo` | "Oi! Vi como vocês trabalham e queria entender como começar." | Precisava entender o processo: se for o campeão, a incerteza era o bloqueio |
| `cta-final` | "Oi! Li a página inteira e quero começar uma conversa sobre a minha marca." | Leu tudo. Costuma ser o lead mais qualificado |
| `sticky-mobile` | "Oi! Quero falar com a Alando sobre a minha marca." | Mobile, em algum ponto do meio. Quase sempre o volume maior |

Duas regras: **voz de quem visita** (é a pessoa quem envia) e **distinguíveis entre si** (cinco
mensagens quase iguais não rastreiam nada). Vivem em `content.ts`, é copy.

`Record<CtaOrigem, string>` não compila incompleto: acrescentar uma origem obriga a escrever a mensagem.

### O estado pendente

Enquanto `brand.whatsapp.phone` estiver vazio, `linkDoCta()` devolve `null` e o `WhatsappCta`
renderiza o botão **desabilitado**, com o marcador no `title`. Isso é deliberado: a alternativa,
montar `https://wa.me/?text=…` sem destinatário: abre o WhatsApp em branco, parece que funcionou,
e chega em produção sem ninguém notar.

### Anatomia

Fundo `ancora`, texto `papel`. Sem sombra colorida, sem gradiente, sem borda muito arredondada.
Alvo ≥44×44px. Anel de foco `acento-texto`, offset 3px. `target="_blank" rel="noopener noreferrer"`
e `aria-label` explícito. **Um CTA por seção.**

### Analytics

`trackCtaWhatsapp(origem)` dispara `cta_whatsapp` com a origem. Convive com Vercel Analytics
(`window.va`), GA4 (`gtag`) e GTM (`dataLayer`) sem instalar nada. Custo: zero KB até alguém
escolher um provedor.

---

## 7. SEO

### Metadata

- `title`: `Alando Digital, Branding e comunicação em <<A CONFIRMAR: cidade>>` (≤60 chars)
- `description` (150-160): base na linha da capa do deck: *"Estratégia, posicionamento e
  comunicação para marcas que desejam ser lembradas"*, mais a região
- `openGraph`: `locale: pt_BR`, `og-image.jpg` 1200×630. Com o ensaio disponível, testar **rosto +
  marca** em vez de só monograma: é o card de link no WhatsApp e no Instagram, onde a página circula
- `twitter: summary_large_image`
- `alternates.canonical` + `metadataBase`

### `noindex` enquanto não há domínio

Ordem de resolução em `lib/site-url.ts`: `NEXT_PUBLIC_SITE_URL` → `brand.site.url` →
`VERCEL_PROJECT_PRODUCTION_URL` → `localhost`. Enquanto a URL for provisória, `canonicalPendente`
é `true` e a página pede `noindex`. Preview de Vercel indexado compete com o domínio real e é
trabalhoso de tirar do índice depois.

**Lembrar de ligar a indexação junto com o domínio.** É o esquecimento mais comum do deploy.

`<<A CONFIRMAR: domínio final>>`

### Dados estruturados: um `@graph`

Grafo único, não nós soltos, para cruzar por `@id`.

1. **`Organization` com `@type: "AdvertisingAgency"`**, é o subtipo de `LocalBusiness` mais
   específico para agência de comunicação. Constante `TIPO_NEGOCIO` no topo de `lib/schema.ts`.
   > **Desvio deliberado do catálogo da skill**, que manda `ProfessionalService` para "qualquer
   > outra". `AdvertisingAgency` existe em schema.org e diz muito mais.

   Campos: `name`, `alternateName`, `description`, `url`, `logo`, `image`, `foundingDate` (2022),
   `areaServed`, `sameAs` (Instagram), `telephone`, `address`.

2. **`Person`**: Andressa Lando, `jobTitle`, `alumniOf` (ESPM), `sameAs`, ligada ao nó do negócio
   por `founder` / `@id`.

3. **`OfferCatalog`** com um `Service` por serviço da §5.5.
   > **Extensão em relação ao catálogo da skill**, que assume um serviço só. Para agência, é ganho
   > real de SEO e descreve o negócio com honestidade.

4. **`FAQPage`**, espelha exatamente o accordion. Só entram perguntas com resposta confirmada; se
   nenhuma qualificar, o nó não é emitido (`FAQPage` com `mainEntity` vazio é inválido).

### ⚠️ A regra assimétrica dos marcadores

> **Na PÁGINA o marcador `<<A CONFIRMAR>>` aparece. Nos DADOS ESTRUTURADOS o campo é omitido.**

Na página o marcador é útil: alguém vê e substitui. No JSON-LD ele é **dado falso publicado em
formato legível por máquina**, reprova no Rich Results Test e pode ser indexado como se fosse o
telefone dela.

**Schema.org aceita ausência. Não aceita mentira.**

Implementação: `lib/pendencias.ts` → `confirmado()` devolve `undefined` (não `null`, não `""`,
`undefined` é o único valor que `JSON.stringify` remove). Todo campo do grafo passa por lá.
`pendenciasDoSchema()` devolve a lista do que está sendo omitido.

### Realismo: alinhar com a Andressa ANTES

Uma landing de página única **não ranqueia sozinha** para "agência de marketing em <cidade>". O que
ela faz bem: busca por marca ("Alando Digital": aqui ela é 1º lugar), busca local de cauda longa
via FAQ, e **preview de link no WhatsApp e no Instagram**, que é onde a página de fato circula.

Se SEO virar prioridade real, o caminho é Google Business Profile + conteúdo recorrente. É fase 2 e
outro orçamento. Dizer isso no começo evita a conversa ruim no terceiro mês.

### Técnico

- **Um único `h1`** (o do herói). Hierarquia `h2` por seção, sem pular nível.
- `lang="pt-BR"` no `<html>`.
- `sitemap.ts` + `robots.ts` (não `robots.txt` estático, o robots precisa saber se a indexação
  está liberada).
- Âncoras: `#servicos`, `#processo`, `#sobre`, `#duvidas`.
- Todo conteúdo relevante em HTML, nunca injetado por JS.
- **A repetição visual da `FaixaRepetida` não pode chegar ao HTML semântico repetida.** Uma
  instância real, o resto `aria-hidden="true"`.
- Cidade em `title`, `description`, hero, footer e JSON-LD.

---

## 8. Performance

| Métrica | Alvo |
|---|---|
| Lighthouse Performance (mobile) | ≥ 95 |
| LCP | < 2.0s |
| CLS | < 0.05 |
| Chunk de animação | **< 25 KB gzip**, medido gzipado |
| Qualquer imagem | ≤ ~200 KB |
| O vídeo da prova de Landing Pages | **≤ 400 KB**, linha própria. Medido: 375 KB |

- anime.js por subpath, via `dynamic import` **após a hidratação**. Confirmar que o chunk é lazy.
- Se passar de 25 KB, cortar momento de animação, não cortar qualidade dos que ficam.
- Só o herói com `priority`. Todo o resto lazy.
- **O vídeo não conta para o carregamento inicial, e isso é obrigação e não consequência.**
  `preload="none"` e `<source>` anexado só quando o bloco se aproxima: quem não desce até Serviços
  não baixa os 375 KB. Verificado no painel de rede, em desktop e em 390px. Os 400 KB são linha de
  orçamento própria, aberta com a decisão de 03/09, e não folga para os outros assets.
- `next/font` faz self-host no build, o navegador do visitante nunca fala com o servidor do Google
  (relevante para LGPD e para latência).
- Separar o piso do framework do código da aplicação antes de julgar que algo está pesado.

---

## 9. Acessibilidade: mínimo não negociável

- Todos os pares de texto passam **AA** (tabela calculada, `DESIGN-GUIDELINES.md` §3)
- `focus-visible` em **100%** dos interativos, com `acento-texto` e offset 3px
- Navegação completa por Tab, ordem lógica, "pular para o conteúdo" como primeiro focável
- Um `h1` só; hierarquia sem pular nível
- Landmarks + `aria-labelledby` por seção
- `alt` real em toda foto de conteúdo, `aria-hidden` em todo decorativo
- **`prefers-reduced-motion` deixa a página estática E 100% visível.** Conteúdo escondido por causa
  de uma preferência de acessibilidade é o pior desfecho possível
- Alvo de toque ≥ 44×44px
- **As repetições da `FaixaRepetida` são `aria-hidden`.** Um `<h2>` que soa "quem somos quem somos
  quem somos" para leitor de tela é falha grave

---

## 10. Informações que faltam: bloqueiam o desenvolvimento

Lista completa e organizada em `AUDITORIA-FASE-0.md` §9. Resumo do que trava o quê:

| Falta | Trava |
|---|---|
| Número de WhatsApp | **Toda a conversão.** Botões ficam desabilitados |
| Domínio | `metadataBase`, canonical, indexação |
| Cidade | `title`, `description`, footer, JSON-LD, busca local |
| Logos de clientes autorizados, em SVG | `FaixaClientes` |
| Autorização dos números de caso | `Resultados` |
| Autorização de imagem nas fotos de captação, inclusive da criança | `Servicos` |
| Autorização de cada cliente cujo material vire thumbnail | `Servicos` |
| Processo real + prazos | `Processo` |
| Objeções reais | `Faq` |
| Copy do fechamento | `CtaFinal` |

**Resolvido na Fase 0, e fora da lista:** fotos da Andressa e da equipe, licença da `asimilates`,
existência de ícones proprietários, logo e monograma, e preço na página.
