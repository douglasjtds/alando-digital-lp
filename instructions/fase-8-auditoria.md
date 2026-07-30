# Fase 8: Auditoria

> Esta é a fase que mais tende a virar relatório complacente, porque exige criticar o próprio
> trabalho. Relatório complacente aqui é **pior que nenhum**, porque dá permissão para publicar.

```
Faça uma auditoria completa contra os critérios dos documentos. NÃO CORRIJA NADA AINDA,
só o diagnóstico.

TRÊS REGRAS PARA A AUDITORIA VALER ALGUMA COISA:

  1. Aponte o risco mesmo quando o código está certo. Estruturalmente correto e
     visualmente genérico são estados compatíveis.
  2. Diga quando NÃO PÔDE VERIFICAR. "Não verificado" é uma resposta; "provavelmente ok",
     inferido de classe de Tailwind, não é. Boa parte do julgamento anti-template é visual
     e não se resolve lendo código.
  3. Separe DEFEITO DE ENGENHARIA de PENDÊNCIA DE DADO. Têm donos diferentes. Marcadores
     <<A CONFIRMAR>> impedem o lançamento, mas não são bug, são informação que falta.
     Misturar os dois faz o relatório parecer pior do que é e esconde o que precisa de código.

Cite arquivo:linha como evidência, e diga a origem de cada constatação: MEDIDO ou
INSPEÇÃO DE CÓDIGO.

--- SISTEMA VISUAL
[ ] Nenhum hex fora de globals.css e brand.ts   (grep -rE '#[0-9a-fA-F]{3,8}' src/)
[ ] Nenhuma classe [#...] no JSX
[ ] Todos os pares texto/fundo passam AA (tabela calculada, não estimada)
[ ] `decor` nunca como cor de texto; `superficie-2` só como texto sobre `ancora`
[ ] CTA primário na cor âncora, não no acento
[ ] Nenhum rounded-* em foto; todas com clipPath
[ ] Ninguém aparece como recorte flutuante

--- ANTI-TEMPLATE
[ ] A dominância cromática está invertida (âncora domina, claro é suporte)
[ ] As máscaras orgânicas são distinguíveis entre si e nenhuma parece border-radius
[ ] A faixa de repetição está em toda seção titulada e alterna direção
[ ] Só uma instância da faixa é semântica; as repetições são aria-hidden
[ ] Exatamente uma palavra em itálico por título display
[ ] Servicos é HIERÁRQUICO: Gestão dominante, não cinco blocos iguais
[ ] As três ideias da marca NÃO viraram três cards com ícone
[ ] Nenhum grid simétrico de 3 ou 5 colunas com ícone
[ ] Uma única animação coreografada; faixas só se movem com scroll
[ ] Nenhuma frase de copy que caberia no site de qualquer outra agência
[ ] PASSE VISUAL REAL EM 390px, com atenção a Servicos

--- ACESSIBILIDADE
[ ] focus-visible em 100% dos interativos
[ ] Navegação completa por Tab, ordem lógica, "pular para o conteúdo" primeiro
[ ] Um h1 só, hierarquia sem pular nível
[ ] Landmarks + aria-labelledby por seção
[ ] alt real em toda foto de conteúdo, aria-hidden em todo decorativo
[ ] prefers-reduced-motion deixa a página estática E 100% visível (DevTools, não olho)
[ ] Alvo de toque ≥ 44x44px
[ ] A accessibility tree NÃO repete o título da seção

--- PERFORMANCE
[ ] Chunk de animação < 15KB gzip, MEDIDO gzipado
[ ] anime.js fora do bundle inicial (confirmar que o chunk é lazy)
[ ] Nenhuma imagem acima de ~200KB
[ ] Só o herói com priority
[ ] JS da aplicação separado do piso do framework antes de julgar o total
[ ] Lighthouse mobile: as quatro pontuações

--- CONTEÚDO
[ ] Zero dado inventado: telefone, cidade, prazo, preço, número de caso, depoimento
[ ] Zero palavra da copy alterada sem aprovação
[ ] Todos os <<A CONFIRMAR>> listados num bloco
[ ] Autorizações de terceiros verificadas (logos, números de caso, imagem)

--- RESPONSIVIDADE
390px, 768px, 1024px, 1440px. Se não der para ver renderizado, DIGA ISSO em vez de
inferir do código.

--- O TESTE FINAL
Abra em 390px e responda com honestidade, seção por seção:
>>> "Isso aqui poderia ser o site de qualquer outra agência de marketing?"
Se a resposta for sim em qualquer seção, essa seção está errada, mesmo que o código
esteja perfeito e o checklist todo verde.
```

Depois: **corrija em prompts pequenos e focados, um problema por vez.**

**Rode esta auditoria também com um segundo agente**, que não escreveu o código. É onde o seu
fluxo de dois agentes rende mais.
