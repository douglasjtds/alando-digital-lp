# TODOs.md
### Sequência de execução: Landing page Alando Digital

> **Como usar.** O passo a passo operacional (comandos, portões, quando parar) está em
> `instructions/COMO-EXECUTAR.md`. Cada fase tem um prompt pronto em `instructions/fase-*.md`. Rode **uma fase por vez**, valide o
> critério de pronto, commite você mesmo, e só então avance. O Claude **nunca commita**, ao fim de
> cada fase ele entrega a mensagem em Conventional Commits. Não cole duas fases juntas: o resultado
> piora e o review fica impossível.
>
> **Antes de começar:** os quatro `.md` na raiz e o material da marca em `ref-files/`.

---

| Fase | Prompt | Objetivo | Bloqueada por |
|---|---|---|---|
| 0 | `fase-0-auditoria-e-scaffold.md` | Auditar `ref-files/` e subir o scaffold | - |
| 1 | `fase-1-tokens.md` | Tokens de cor e base tipográfica | Fase 0 (licença de fonte) |
| 2 | `fase-2-formas-e-assinatura.md` | Máscaras orgânicas + `FaixaRepetida` | Fase 0 (ícones existem?) |
| 3 | `fase-3-assets.md` | Pipeline de imagens | ✅ desbloqueada (material em `drive-files/`) |
| 4 | `fase-4-conteudo.md` | `content.ts` completo | Copy pendente de 3 seções |
| 5A | `fase-5a-header-hero-clientes.md` | Header, Hero, FaixaClientes | - |
| 5B | `fase-5b-manifesto-momentos-servicos.md` | Manifesto, Momentos, Servicos | ⚠️ passe visual em 390px |
| 5C | `fase-5c-resultados-processo-sobre.md` | Resultados, Processo, Sobre | - |
| 5D | `fase-5d-faq-ctafinal-footer.md` | Faq, CtaFinal, Footer, StickyMobileCta | - |
| 6 | `fase-6-seo.md` | Metadata + JSON-LD | - |
| 7 | `fase-7-movimento.md` | A animação-assinatura e o resto | Fase 5 pronta e boa **sem** animação |
| 8 | `fase-8-auditoria.md` | Auditoria honesta | - |
| 9 | `fase-9-deploy.md` | Produção | Zero `<<A CONFIRMAR>>` |

---

## Critérios de pronto

**Fase 0**: `npm run dev` sobe, `npm run build` passa, e existe **decisão escrita** sobre cada
família de fonte, sobre a existência de ícones e sobre o inventário de fotos. Se a auditoria
contradisser o `AUDITORIA-ETAPA-1.md`, parar e reportar antes da Fase 1.

**Fase 1**: `/styleguide` renderiza, `node scripts/contraste.mjs` passa nas cinco exigências e
reprova o `decor` como deve, os nove tokens estão fechados sem nenhum décimo, a regra do parágrafo
sobre sage está visível no styleguide, fontes carregam sem FOUT agressivo e `latin-ext` está
confirmado com "ã ç õ é".

**Fase 2**: as quatro máscaras são claramente orgânicas e distinguíveis entre si, nenhuma parece
`border-radius`; a `FaixaRepetida` funciona com `animation-timeline: scroll()` e uma instância só é
semântica.

**Fase 3**: assets em `public/`, o conjunto lê como um ensaio só, nenhuma imagem acima de ~200 KB.

**Fase 4**: `content.ts` completo, lista de pendências gerada num bloco só, **zero dado inventado**,
zero palavra da copy alterada sem aprovação.

**Fase 5**: página completa e navegável, ainda sem animação, bonita em 390px.
⚠️ **Passe visual real ao fim da leva B.** É onde o clichê volta: se `Servicos` empilhar como cinco
cards iguais em mobile, o efeito template voltou, por mais que o código do desktop esteja certo.

**Fase 6**: JSON-LD passa no Rich Results Test, metadata completa, `pendenciasDoSchema()` sem itens
bloqueantes, um `h1` só confirmado por grep.

**Fase 7**: os três gestos aplicados com consistência e nada fora do vocabulário, a travessia de cor
mantendo contraste nos cinco pontos de amostragem, `reduced-motion` deixando a página estática **e**
100% visível com as máscaras **abertas** (confirmado no DevTools, não no olho), e o chunk de animação
dentro dos **24 KB gzip medidos**.

**Fase 8**: diagnóstico honesto, com `arquivo:linha` como evidência, separando defeito de
engenharia de pendência de dado, e dizendo "não verificado" onde não deu para ver renderizado.

**Fase 9**: no ar, Lighthouse mobile Performance ≥ 95, preview de link correto no WhatsApp, todos
os CTAs abrindo a conversa com a mensagem certa, **zero `<<A CONFIRMAR>>`**.

---

## Pendências que travam fases inteiras

Sem estas, algumas fases não fecham. Lista completa em `AUDITORIA-ETAPA-1.md` §10.

| Pendência | Trava |
|---|---|
| Número de WhatsApp | Fase 4 e a conversão inteira |
| Domínio | Fase 6, Fase 9 |
| Cidade | Fase 4, Fase 6 |
| ✅ Ensaio profissional da Andressa: confirmado | |
| Autorização dos clientes para thumbnails de portfólio | Fase 3, Fase 5B |
| Licença da `asimilates` | Fase 1 |
| Ícones proprietários existem? | Fase 2, Fase 7 |
| Copy de `Processo`, `Faq`, `CtaFinal` | Fase 4, Fase 5C, Fase 5D |
| Logos + autorização dos números de caso | Fase 5A, Fase 5C |


Fases 5 a 8 podem rodar com os marcadores no lugar. **A Fase 9 não.**

---

## Regras de trabalho

1. **Uma fase por vez.** Ao fim, o Claude reporta e entrega a mensagem de commit. **Nunca roda `git commit`.**
2. **Mande ler os `.md`** no início de qualquer sessão nova: está no `CLAUDE.md`, mas reforce.
3. **Nunca aceite dado inventado.** Telefone, prazo, preço, número de caso ou depoimento que você
   não forneceu é alucinação, mande substituir por `<<A CONFIRMAR>>`.
4. **Nunca aceite copy alterada** sem você ter aprovado.
5. **Peça screenshot** ao fim de cada leva de seções.
6. **Rode um review com um segundo agente** ao fim das fases 5, 7 e 8, o seu fluxo de dois agentes
   (Claude Code escreve, Claude revisa) vale especialmente na 8, onde a auditoria tende a virar
   relatório complacente porque exige criticar o próprio trabalho.
