# COMO-EXECUTAR.md
### Passo a passo do projeto no Claude Code

> Guia operacional. O **que** construir está nos outros documentos; aqui está o **como tocar**.

---

## 1. Antes da primeira sessão

```bash
cd /Users/douglasjtds/src/freelas/buy-my-code/alando-digital-lp

# 1. os 18 documentos, presentes e na versão certa
bash verificar-docs.sh          # tem que dar: 18 ok | 0 faltando | 0 desatualizado

# 2. baseline no git, ANTES de qualquer código
git init
git add -A
git commit -m "chore: documentação de projeto e material de referência"
```

O commit inicial não é burocracia: `/diff` e `/rewind` precisam de um ponto de partida. Sem ele, a
primeira fase gera dezenas de arquivos e não dá para separar o que o Claude fez do que já existia.

**Confira a estrutura:**

```
alando-digital-lp/
├── CLAUDE.md              ← RAIZ. É o único que o Claude Code lê sozinho
├── verificar-docs.sh
├── instructions/          ← os 4 documentos + os 13 prompts + este arquivo
├── ref-files/             ← material da marca
└── drive-files/           ← ⚠️ referência. gitignored. NUNCA vai para o build
```

Se o `CLAUDE.md` não estiver na raiz, nada disso funciona: ele é a memória de projeto, e é o que
carrega as cinco regras duras em toda sessão sem você precisar repetir.

---

## 2. Setup do Claude Code, uma vez só

```bash
claude
```

Dentro da sessão:

| Comando | Para quê |
|---|---|
| `/memory` | Confirme que o `CLAUDE.md` da raiz aparece como memória de projeto. **Se não aparecer, pare e resolva antes de tudo** |
| `/permissions` | Libere leitura e edição em `src/`, `public/`, `scripts/`. **Não libere `git commit`** |
| `/model` | Opus para as fases de julgamento (0, 2, 5B, 7, 8). Sonnet dá conta das mecânicas (1, 3, 6, 9) |

⚠️ **Não rode `/init`.** Ele gera um `CLAUDE.md` do zero e sobrescreveria o nosso.

---

## 3. O ciclo de cada fase

Sempre igual, treze vezes:

```
1.  /clear                      contexto limpo. A fase anterior não ajuda, só ocupa espaço
2.  > Leia instructions/fase-N-xxx.md e execute.
3.  ... o Claude trabalha ...
4.  /diff                       veja o que mudou antes de acreditar no relatório
5.  valide o "Pronto quando" da fase (está no fim de cada prompt)
6.  git add -A && git commit    VOCÊ commita, com a mensagem que ele te entregou
```

**Uma fase por vez.** Colar duas juntas piora o resultado e torna o review impossível: quando algo
sai errado você não sabe qual instrução falhou.

**`/clear` entre fases é obrigatório.** Cada prompt manda ler os documentos de que precisa. Arrastar
o contexto da fase anterior só empurra o que importa para fora da janela.

### Quando o Claude Code te entregar a mensagem de commit

Ele **nunca** roda `git commit`, está na regra 2 do `CLAUDE.md`. Ele entrega a mensagem pronta em
Conventional Commits e você executa. Isso é de propósito: o commit é o seu ponto de controle, e é a
única coisa que garante que você olhou o diff.

---

## 4. As treze fases, na ordem

| Fase | Arquivo | Modelo | Portão antes de commitar |
|---|---|---|---|
| 0 | `fase-0-auditoria-e-scaffold.md` | Opus | **Bloqueante.** Decisão escrita sobre fonte, ícones e fotos. `npm run build` passa |
| 1 | `fase-1-tokens.md` | Sonnet | `/styleguide` renderiza. `node scripts/contraste.mjs` passa nas 5 exigências e reprova o `decor` |
| 2 | `fase-2-formas-e-assinatura.md` | Opus | Máscaras distinguíveis. `FaixaRepetida` com uma instância semântica só |
| 3 | `fase-3-assets.md` | Sonnet | Nenhuma imagem acima de ~200 KB. Metadados removidos dos derivados de PDF |
| 4 | `fase-4-conteudo.md` | Opus | **Zero dado inventado.** Lista de `<<A CONFIRMAR>>` num bloco só |
| 5A | `fase-5a-header-hero-clientes.md` | Sonnet | Herói bom em 390px. Foto do herói ≤ 120 KB |
| 5B | `fase-5b-manifesto-momentos-servicos.md` | **Opus** | ⚠️ **Passe visual em 390px.** Serviços não pode ler como cinco cards iguais |
| 5C | `fase-5c-resultados-processo-sobre.md` | Sonnet | Marcadores visíveis onde falta dado |
| 5D | `fase-5d-faq-ctafinal-footer.md` | Sonnet | FAQ em `<details>` nativo |
| 6 | `fase-6-seo.md` | Sonnet | JSON-LD passa no Rich Results Test. Um `h1` só, confirmado por grep |
| 7 | `fase-7-movimento.md` | **Opus** | Chunk ≤ 24 KB **medido**. `reduced-motion` estático **e** 100% visível |
| 8 | `fase-8-auditoria.md` | **Opus** | Diagnóstico honesto, com `arquivo:linha` |
| 9 | `fase-9-deploy.md` | Sonnet | **Zero `<<A CONFIRMAR>>`** |

Depois da Fase 8 vêm as correções: **prompts pequenos, um problema por vez**, e não uma leva só.

---

## 5. O segundo par de olhos

Você já trabalha com dois agentes. O Claude Code tem isso embutido agora, mas ele cobre metade do
problema. Vale saber qual metade.

**`/code-review`** (nas fases 5, 6, 7 e 9) revisa o **diff** procurando bug de correção. Pega
`useEffect` sem cleanup, `sizes` errado no `next/image`, observer que não desconecta, acessibilidade
quebrada. Rode antes de commitar:

```
/code-review high
/code-review high --fix        se quiser que ele aplique as correções
```

**O que ele NÃO pega:** julgamento anti-template. "Isso aqui poderia ser o site de qualquer outra
agência?" não é bug de código, é decisão de design, e não aparece em diff nenhum. Para isso:

- **Passe visual em 390px**, olho humano, nas fases 5B, 7 e 8. Não delegue.
- **Sessão nova e limpa** para a Fase 8, sem o contexto de quem escreveu o código. Auditoria feita
  por quem acabou de escrever tende a virar relatório complacente, e relatório complacente é pior
  que nenhum, porque dá permissão para publicar.

Se quiser separar de verdade, use `/branch` antes de auditar: você audita numa linha, corrige em
outra, e não perde a conversa original.

---

## 6. Onde parar e voltar

Três tipos de parada, com donos diferentes.

**Volte para MIM (aqui no chat) se:**
- a Fase 0 contradisser a `AUDITORIA-ETAPA-1.md`, principalmente sobre a licença da **asimilates**
  (a decisão tipográfica inteira depende disso)
- o ensaio da Andressa for em fundo claro de estúdio (muda enquadramento e tratamento)
- não existir nenhuma foto de captação com mais de uma pessoa (o parágrafo da equipe fica sem
  imagem que o sustente)
- a Fase 8 acusar algo estrutural

**Volte para a ANDRESSA se faltar:**

```
BLOQUEIA O DEPLOY
  número de WhatsApp com DDD    domínio final    cidade

BLOQUEIA SEÇÕES
  logos autorizados                        -> FaixaClientes
  autorização escrita dos números de caso  -> Resultados
  autorização dos clientes p/ thumbnails   -> Servicos
  o processo real, com prazos reais        -> Processo
  as 5 a 7 objeções que ela mais ouve      -> Faq
  a copy do fechamento                     -> CtaFinal
```

**Pare o Claude Code na hora se ele:**
- inventar telefone, prazo, preço, número de caso ou depoimento
- alterar a copy sem você ter aprovado (a única alteração autorizada é "cuidamos" → "criamos")
- tentar `git commit`
- colocar qualquer PDF em `public/`
- instalar three.js, Lenis, GSAP ou shadcn

Nesses casos: `/rewind` volta código e conversa ao checkpoint anterior.

---

## 7. Contexto: o que vai te atrapalhar

Os documentos são grandes. `DESIGN-GUIDELINES.md` e `landing-page-structure.md` passam de 600
linhas cada. Mandar ler os quatro em toda sessão queima contexto à toa.

- **Cada prompt de fase já diz qual documento ler.** Confie nisso e não mande ler tudo.
- **`/context`** mostra o que está ocupando a janela. Rode se a fase começar a ficar lenta ou
  esquecida.
- **`/compact`** resume e libera espaço sem perder o fio, quando a fase for longa e você não quiser
  limpar tudo.
- **`/clear` entre fases**, sempre.

---

## 8. Atalho opcional: as fases como comandos

Se cansar de digitar o caminho, transforme cada prompt em comando. Rode uma vez, na raiz:

```bash
mkdir -p .claude/commands
for f in instructions/fase-*.md; do
  nome=$(basename "$f" .md)
  { echo "---"
    echo "description: Executa a $nome do projeto Alando"
    echo "---"
    cat "$f"
  } > ".claude/commands/${nome}.md"
done
```

Depois disso, `/fase-1-tokens` faz o mesmo que mandar ler o arquivo. Dentro de uma sessão aberta,
`/reload-skills` faz o Claude Code enxergar os comandos novos sem reiniciar.

⚠️ **Se você editar um prompt em `instructions/`, regenere os comandos.** Senão passam a existir
duas versões e você não vai saber qual rodou. É o mesmo problema de documento desatualizado que o
`verificar-docs.sh` resolve, só que sem script para pegar.

---

## 9. O primeiro comando, agora

```bash
cd /Users/douglasjtds/src/freelas/buy-my-code/alando-digital-lp
bash verificar-docs.sh
git init && git add -A && git commit -m "chore: documentação de projeto e material de referência"
claude
```

E dentro da sessão:

```
/memory                    confirme que o CLAUDE.md da raiz carregou
/model opus
> Leia instructions/fase-0-auditoria-e-scaffold.md e execute.
```

A Fase 0 é bloqueante e não escreve código antes de reportar. O que ela responde decide a Fase 1.
