# CLAUDE.md: Landing page Alando Digital

Regras permanentes deste projeto. Valem em toda sessão, sem precisar ser repetidas no prompt.

---

## Antes de qualquer coisa

Leia, por inteiro, na primeira mensagem de qualquer sessão nova:

1. `instructions/DESIGN-GUIDELINES.md`, fonte de verdade visual
2. `instructions/landing-page-structure.md`, fonte de verdade técnica e de arquitetura
3. `instructions/AUDITORIA-ETAPA-1.md`, por que a arquitetura não é a do template

Os prompts de cada fase estão na mesma pasta, em `instructions/fase-*.md`.

Se algo não estiver definido nesses arquivos, **pergunte antes de decidir**. Não invente.

---

## As três regras que valem mais que tudo

### 1. Nunca inventar dado da cliente

Telefone, cidade, domínio, prazo, preço, número de clientes, formação, depoimento, resultado de
caso: **se não veio dela, não existe.** Use `<<A CONFIRMAR: descrição>>`, que aparece realçado na
página e é omitido do JSON-LD.

Um prazo inventado é promessa contratual falsa. Um depoimento inventado é fraude e destrói
exatamente a percepção de seriedade que a página inteira existe para construir. É o erro mais caro
possível neste projeto e o mais fácil de cometer por conveniência.

Ao fim de cada fase que toque conteúdo, **liste todos os marcadores num bloco só**.

### 2. Nunca rodar `git commit`

Ao fim de cada fase: reporte a validação e entregue a **mensagem de commit pronta** em Conventional
Commits, num bloco de código. Quem commita é o Douglas.

### 3. Nunca alterar a copy sem aprovação

`Landing Page copy.md` é a fonte de verdade do texto. Se faltar texto ou algo parecer errado,
**pare e reporte**: não reescreva, não "melhore", não corrija gramática por conta própria. O
Douglas decide, e a reescrita passa pela skill `marketing-writer`.

### 4. Nunca usar travessão longo

**Nada de em dash (—) nem en dash (–)**, em lugar nenhum: copy da página, comentários de código,
nomes de commit, relatórios de fase, resposta no chat. Use vírgula, dois-pontos, parênteses, ponto
e vírgula ou duas frases.

A copy da Andressa não tem nenhum travessão longo em 7 mil caracteres. Ela escreve com vírgula e
ponto. Além de ser preferência do Douglas, travessão longo é hoje um dos sinais mais reconhecíveis
de texto gerado por IA, e esta é uma página construída inteira para não parecer isso.

Intervalos numéricos: hífen simples ou a palavra "a" (`60-72 caracteres`, `5 a 7 perguntas`).

### 5. `drive-files/` nunca vai para o build

A pasta `drive-files/` guarda material de referência da agência, e parte dele é **trabalho de
clientes**: diagnósticos de marca e manuais de identidade visual de terceiros.

- `drive-files/` fica na **raiz do projeto**, entra no `.gitignore` e **nunca** é referenciada pelo
  build.
- **Nenhum PDF vai para `public/`. Nunca, nem temporariamente.** Em Next.js, tudo que está em
  `public/` é servido: um PDF ali é baixável por URL direta e indexável pelo Google mesmo sem link
  nenhum apontando para ele. Publicar diagnóstico de cliente por acidente é dano de reputação para a
  Andressa, não bug de front-end.
- Para `public/images/` só vão **imagens rasterizadas, aprovadas e com metadados removidos**.
- Se um arquivo de `drive-files/` parecer necessário no site, **pare e pergunte**.

---

## Regras técnicas duras

| Regra | Por quê |
|---|---|
| **Nenhum hex fora de `globals.css` e `brand.ts`** | Nada de `text-[#102F15]`. Auditável com grep |
| **Nove tokens, e nenhuma cor nova** | Oito são hexes literais do manual da Andressa. O único derivado é `papel` `#F7F4EC`. Não invente um décimo |
| **Nenhum texto hardcoded em componente** | Tudo vem de `content.ts` |
| **CTA primário na cor `ancora`, nunca no `acento`** | O caramelo dá 3,50:1, reprovado. E botão colorido é assinatura de template |
| **Na faixa sage, texto é `ancora`** | `tinta` sobre sage dá só 4,39:1. Regra fácil de esquecer, porque no `papel` o `tinta` funciona |
| **Fotos com `clipPath` orgânico, nunca `border-radius`** | Ninguém é recorte flutuante |
| **Nada no herói começa com `opacity: 0` no HTML** | O LCP não pode depender de JS |
| **`prefers-reduced-motion: reduce` desliga tudo** | Animação, parallax, deriva de faixa. Página estática **e** 100% visível |
| **Um vocabulário de movimento, vários momentos** | Se todo o movimento da página não couber em uma frase, virou catálogo de efeitos. Ver `DESIGN-GUIDELINES.md` §8 |
| **Nenhum three.js** | Custo, fit de marca, clichê e `reduced-motion`. Os quatro motivos estão no §8 |
| **Não configurar `output: 'export'`** | Mataria o `next/image` |
| **Nenhuma biblioteca de smooth-scroll** | Lenis/GSAP trocam o comportamento nativo do scroll, que é coisa diferente de animar com o scroll |
| **FAQ em `<details>` nativo** | Acessível de graça, 0 KB, e o conteúdo fica no HTML para o crawler. **Sem shadcn e sem biblioteca de componentes**, só o utilitário `cn` |
| **Mobile-first de verdade** | Validar em **390px** antes de qualquer outro breakpoint |
| **`<<A CONFIRMAR>>` aparece na página e some do JSON-LD** | Schema.org aceita ausência, não aceita mentira |
| **Repetições da `FaixaRepetida` são `aria-hidden`** | Uma instância semântica só. Leitor de tela não pode ouvir o título 6 vezes |

Espaçamentos permitidos (escala 4px): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Um `mt-[27px]` é
sempre sintoma de que outra coisa está errada.

---

## Os três clichês que este projeto corre risco real de cometer

Leia `DESIGN-GUIDELINES.md` §2 inteira. O resumo:

1. **Transformar as três ideias da marca em três cards com ícone.** A copy entrega as três
   proposições prontas e simétricas. É a armadilha número um. Elas são *argumento*, vivem em prosa
   e na ordem da página.
2. **Fazer `Servicos` como grid de cinco blocos iguais.** A própria copy diz que Gestão de Redes
   Sociais é *"o coração da Alando"*. Hierarquia, não grade.
3. **Fazer a página bege clarinha "porque site é claro".** O deck da Alando já é escuro. A
   dominância invertida aqui obedece ao manual, não o contraria.

E o teste final, sempre: *"isso aqui poderia ser o site de qualquer outra agência?"* Se a resposta
honesta for sim em qualquer seção, essa seção está errada, mesmo com o checklist todo verde.

---

## Ritmo de trabalho

- **Uma fase por vez**, na ordem do `TODOs.md`. Não adiantar fases: o review fica impossível e a
  qualidade cai visivelmente em prompt longo.
- **Passe visual real** (navegador ou screenshot) ao fim das fases 5, 7 e 8. Código correto e página
  bonita são coisas diferentes.
- Se um prompt for gerar mais de ~400 linhas de uma vez, **quebre em dois e avise**.
- Ao reportar auditoria: **diga quando não pôde verificar.** "Não verificado" é uma resposta;
  "provavelmente ok", inferido de classe de Tailwind, não é. E separe **defeito de engenharia** de
  **pendência de dado**, têm donos diferentes.
