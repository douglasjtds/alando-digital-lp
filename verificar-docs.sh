#!/usr/bin/env bash
# Confere os 18 documentos: presença, versão e duplicatas.
# NÃO importa em que pasta eles estão. Rode da raiz do projeto:
#   bash verificar-docs.sh
set -u
ok=0; falta=0; velho=0

check(){
  nome="$1"; marca="$2"
  # procura o arquivo em qualquer subpasta, ignorando node_modules e .git
  achados=$(find . -type f -name "$nome" -not -path "*/node_modules/*" -not -path "*/.git/*" 2>/dev/null)
  if [ -z "$achados" ]; then
    printf "  FALTANDO       %s\n" "$nome"; falta=$((falta+1)); return
  fi
  n=$(printf "%s\n" "$achados" | wc -l | tr -d " ")
  while IFS= read -r arq; do
    if grep -qF "$marca" "$arq"; then
      if [ "$n" -gt 1 ]; then printf "  ok (repetido)  %s\n" "$arq"; else printf "  ok             %s\n" "$arq"; fi
      ok=$((ok+1))
    else
      printf "  DESATUALIZADO  %s   <- versão antiga, baixe de novo\n" "$arq"; velho=$((velho+1))
    fi
  done <<< "$achados"
}

echo "=== documentos ==="
check 'AUDITORIA-ETAPA-1.md' 'ensaio profissional da Andressa'
check 'CLAUDE.md' 'drive-files/` nunca vai para o build'
check 'DESIGN-GUIDELINES.md' 'Cinco superfícies, e o quente ocupa área'
check 'TODOs.md' '24 KB gzip medidos'
check 'landing-page-structure.md' 'Cinco superfícies'
check 'COMO-EXECUTAR.md' 'O ciclo de cada fase'
check 'fase-0-auditoria-e-scaffold.md' 'drive-files/  (pasta nova'
check 'fase-1-tokens.md' 'CINCO superfícies'
check 'fase-2-formas-e-assinatura.md' 'FaixaRepetida'
check 'fase-3-assets.md' 'exiftool'
check 'fase-4-conteudo.md' 'trocar "cuidamos" por "criamos"'
check 'fase-5a-header-hero-clientes.md' 'ENSAIO PROFISSIONAL'
check 'fase-5b-manifesto-momentos-servicos.md' 'HIERARQUIA, não grade'
check 'fase-5c-resultados-processo-sobre.md' 'marrom médio'
check 'fase-5d-faq-ctafinal-footer.md' 'ancora-quente` #4C2B08'
check 'fase-6-seo.md' 'AdvertisingAgency'
check 'fase-7-movimento.md' 'TRAVESSIA ENTRE CLARO E ESCURO É PROIBIDA'
check 'fase-8-auditoria.md' 'MEDIDO ou'
check 'fase-9-deploy.md' 'LIGUE A INDEXAÇÃO'

echo
echo "=== duplicatas de download ==="
# Procura só onde os arquivos são BAIXADOS. ref-files/ e drive-files/ são material
# original da cliente e ficam de fora: lá existe "Landing Page copy.md", que é a
# fonte de verdade de toda a copy da página e NÃO é duplicata de nada.
dups=$(find . -type f \( -name "*_[0-9].md" -o -name "* [0-9].md" -o -name "*([0-9]).md" \) \
  -not -path "*/ref-files/*" -not -path "*/drive-files/*" \
  -not -path "*/node_modules/*" -not -path "*/.git/*" 2>/dev/null)
if [ -n "$dups" ]; then
  printf "%s\n" "$dups" | sed "s|^|  |"
  echo "  ^ o navegador acrescenta _1 ou (1) quando o nome já existia,"
  echo "    entao esse e o MAIS NOVO. Apague o sem sufixo e renomeie."
else echo "  nenhuma"; fi

echo
echo "=== resultado ==="
echo "  $ok ok   |   $falta faltando   |   $velho desatualizado"
[ "$falta" -eq 0 ] && [ "$velho" -eq 0 ] && echo "  tudo certo" || echo "  resolva os itens acima antes da Fase 0"
