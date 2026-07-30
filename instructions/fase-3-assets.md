# Fase 3: Assets

> ⚠️ Esta fase depende de material que talvez não exista. Ver `AUDITORIA-ETAPA-1.md` §3.

```
Prepare o pipeline de imagens. Os originais estão em ref-files/.

1. INVENTÁRIO PRIMEIRO
   Originais em ref-files/ e drive-files/. Antes de processar, me confirme:
   - Ensaio profissional da Andressa (confirmado): quantas fotos, quais enquadramentos,
     e em que registro foi feito? Se for fundo claro de estúdio, ME AVISE ANTES de
     processar: briga com uma página de verde escuro e o resultado lê como colagem
   - Fotos de captação/bastidores: quantas, que situações?
   - Logos de clientes em SVG?
   - Quais fotos têm terceiros identificáveis?

2. OS PDFs DE CLIENTE: regra especial, leia com atenção
   drive-files/ tem diagnósticos de marca e identidades visuais de OUTROS CLIENTES
   da agência. São REFERÊNCIA. Não podem ser publicados.

   >>> NENHUM PDF VAI PARA public/. Nem temporariamente.
   >>> Em Next.js tudo em public/ é servido: um PDF ali é baixável por URL direta e
   >>> indexável pelo Google mesmo sem link algum apontando para ele. Publicar
   >>> diagnóstico de cliente por acidente é dano à reputação da Andressa.

   O que PODE ser feito, e só com autorização escrita do cliente dono do material:
   - Rasterizar a capa em thumbnail PEQUENO, tratado como ARTEFATO e não como
     documento: escala em que nada é legível, recorte parcial, sobreposição.
     O objetivo é comunicar "nós produzimos isto", não entregar o conteúdo
   - Se na capa aparecer nome do cliente ou texto estratégico legível no tamanho
     final, PARE e me diga antes de gerar o arquivo

   >>> REMOVA OS METADADOS de toda imagem derivada de PDF. Exportação de PDF carrega
   >>> XMP/EXIF com nome do arquivo original, autor e software. Rode algo como
   >>> `exiftool -all= arquivo.webp` e me confirme que ficou limpo.

3. MAPEAMENTO
   Edite a tabela FOTOS de scripts/processar-fotos.mjs mapeando cada original para o
   nome semântico do destino: retrato-hero, retrato-sobre, equipe-*, servico-gestao,
   servico-video (use as fotos de captação aqui: é material do trabalho real deles,
   muito melhor que qualquer banco de imagem), portfolio-*, og-image.

4. TRATAMENTO CROMÁTICO UNIFICADO
   Este projeto tem um problema específico: prints de feed de cliente e (se houver)
   ensaio da Andressa vêm de contextos visuais completamente diferentes. Sem tratamento
   unificado a página lê como colagem.

   Dessature na direção da cor `decor` (#B3B793) e aqueça levemente a temperatura.
   Ajuste olhando a PÁGINA MONTADA, não a foto isolada. Me mostre um antes/depois.

5. RECORTES
   Herói em 4:5, rosto no terço superior.
   Fotos de seção: alternar orientação retrato/paisagem, a variação quebra o ritmo de grade.

6. A PAISAGEM DA PALETA
   Pode ser usada, mas com parcimônia: montanha na neblina é o vocabulário visual mais
   copiado que existe hoje. UMA aparição só na página inteira. Uma vez é atmosfera;
   duas é banco de imagem.

7. GERAR
   favicon.ico, apple-touch-icon.png e og-image.jpg (1200x630). Com o ensaio disponível,
   gere DUAS versões para comparar: (a) monograma sobre fundo `ancora`, (b) rosto da
   Andressa + marca: é o preview no WhatsApp, que é onde a página mais circula).

Formato AVIF com fallback WebP. Reporte o peso final de cada arquivo.
Nenhuma imagem acima de ~200KB.
```

**Pronto quando:** assets em `public/`, o conjunto lê como um ensaio só, nada acima do orçamento.
