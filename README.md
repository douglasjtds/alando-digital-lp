# Alando Digital, landing page

Landing page de página única para a Alando Digital, agência de branding e comunicação.
Objetivo único: produzir um clique que abre uma conversa no WhatsApp.

## Como rodar

```bash
npm install
npm run dev      # http://localhost:3000
```

Node 20 ou superior.

## Como buildar

```bash
npm run build
npm start        # serve o build local
npm run typecheck
npm run lint
```

Deploy na Vercel. **Não configurar `output: "export"`**: desligaria a otimização do
`next/image`, que a Vercel entrega de graça. Ver `instructions/landing-page-structure.md` §2.1.

## Onde ficam os tokens

Os nove tokens de cor vivem em **dois lugares, e só neles**:

| Arquivo | O que guarda |
|---|---|
| `src/app/globals.css` | bloco `@theme` com as custom properties, é o que o Tailwind consome |
| `src/config/brand.ts` | os mesmos hexes em TypeScript, para script e JSON-LD |

**Nenhum hex existe fora desses dois arquivos.** Nada de `text-[#102F15]` em componente.
Auditável com:

```bash
grep -rE '#[0-9a-fA-F]{3,8}' src/
```

Oito dos nove tokens são hexes literais do manual da Andressa. O único derivado é o
`papel` `#F7F4EC`. **A paleta está fechada: não existe décimo token.**

Contraste é calculado, nunca estimado:

```bash
node scripts/contraste.mjs        # tabela no terminal
node scripts/contraste.mjs --md   # tabela markdown, para colar no DESIGN-GUIDELINES
```

## Fronteira white-label

Trocar de cliente deveria tocar só: `globals.css`, `src/config/brand.ts`,
`src/config/content.ts`, `src/app/layout.tsx` (fontes), `OrganicClipPaths.tsx`,
`src/lib/schema.ts` e `public/`. Se um componente precisou ser editado para acomodar
conteúdo, a informação está no lugar errado.

## Pastas que nunca vão para o build

`ref-files/` e `drive-files/` são material de referência e estão no `.gitignore`.

⚠️ **`drive-files/` contém diagnóstico de marca e manual de identidade visual de outros
clientes da agência.** Nenhum PDF dali vai para `public/`, nem temporariamente: em
Next.js tudo que está em `public/` é servido, e um PDF ali fica baixável por URL direta
e indexável pelo Google mesmo sem link apontando para ele. Para `public/images/` só vão
imagens rasterizadas, aprovadas e com metadados removidos.

## Documentação

Toda a decisão de projeto está em `instructions/`:

| Arquivo | Papel |
|---|---|
| `DESIGN-GUIDELINES.md` | fonte de verdade visual: cor, tipografia, forma, movimento |
| `landing-page-structure.md` | fonte de verdade técnica: stack, seções, CTA, SEO, performance |
| `AUDITORIA-ETAPA-1.md` | por que a arquitetura não é a do template |
| `AUDITORIA-FASE-0.md` | auditoria de `ref-files/` e `drive-files/`, feita no material real |
| `TODOs.md` | a sequência de fases |
| `COMO-EXECUTAR.md` | runbook |
| `fase-0` a `fase-9` | o prompt de cada fase |

As regras permanentes para quem desenvolve estão em `CLAUDE.md`, na raiz.
