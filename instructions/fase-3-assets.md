# Fase 3: Assets

> ⚠️ Esta fase depende de material que talvez não exista. Ver `AUDITORIA-ETAPA-1.md` §3.

```
Prepare o pipeline de imagens. Os originais estão em ref-files/.

1. O INVENTÁRIO JÁ ESTÁ FEITO: leia AUDITORIA-FASE-0.md §2, §3 e §4 antes de processar.
   Resumo do que existe e já está aprovado:

   - 2 fotos da Andressa em drive-files/Dêssa/, 1023x1537. Fundo de parede clara com
     plantas, luz quente, JÁ PERTO DA PALETA. Uma vai para o Hero, outra para o Sobre.
     >>> RESTRIÇÃO DURA: 1023x1537 é o que existe e não há original maior. A coluna da
     >>> imagem em 55/45 pede 1036px para cobrir 2x. NADA DE CORTE APERTADO NO ROSTO,
     >>> senão o elemento de LCP da página fica macio. Trabalhe perto do quadro cheio.
   - 9 fotos de captação em drive-files/Fotos captações/, de iPhone. Só 2 estão em
     resolução de trabalho (as .heic). O sharp aqui é 0.34.5 e lê HEIF direto.
     >>> As nove repetem o mesmo enquadramento (mão + câmera + tela). Distribua entre
     >>> seções DISTANTES e varie o recorte, senão lê como padrão.
   - Logos e monograma: ref-files/Logos/ e ref-files/Ícones /, PNG 1080 com alfa, em
     8 cores, com versão NEGATIVA (branca). Não existe SVG, e não vamos pedir.
   - Logos de clientes: NÃO EXISTEM, e as capas dos PDFs não servem. FaixaClientes
     nasce desligada.
   - Terceiros identificáveis: uma mulher em 2ED70A8D e UMA CRIANÇA em 499E4759.
     Ambas dependem de autorização. A criança é o caso mais restritivo.

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
   Prints de feed de cliente, os dois retratos e as nove de captação vêm de contextos
   visuais completamente diferentes. Sem tratamento unificado a página lê como colagem.

   Os retratos já estão perto da paleta e pedem pouco. O risco real está nas de
   captação: loja, cafeteria, cozinha e área externa têm temperaturas incompatíveis
   entre si.

   Dessature na direção da cor `decor` (#B3B793) e aqueça levemente a temperatura.
   Ajuste olhando a PÁGINA MONTADA, não a foto isolada. Me mostre um antes/depois.

   >>> METADADOS: o processar-fotos.mjs usa sharp sem withMetadata() e escreve JPEG,
   >>> o que remove o EXIF das fotos de iPhone e a credencial C2PA dos dois retratos
   >>> num passo só. NENHUMA imagem entra em public/ sem passar por ali.

5. RECORTES
   Herói em 4:5, rosto no terço superior.
   Fotos de seção: alternar orientação retrato/paisagem, a variação quebra o ritmo de grade.

6. A PAISAGEM DA PALETA
   Pode ser usada, mas com parcimônia: montanha na neblina é o vocabulário visual mais
   copiado que existe hoje. UMA aparição só na página inteira. Uma vez é atmosfera;
   duas é banco de imagem.

7. GERAR
   favicon.ico, apple-touch-icon.png e og-image.jpg (1200x630). O favicon e o
   apple-touch-icon saem do monograma (ref-files/Ícones /, escolha a cor pelo fundo).
   Para a og-image, gere DUAS versões para comparar: (a) monograma sobre fundo `ancora`,
   (b) rosto da Andressa + marca, que é o preview no WhatsApp, onde a página circula.

Formato AVIF com fallback WebP. Reporte o peso final de cada arquivo.
Nenhuma imagem acima de ~200KB.
```

**Pronto quando:** assets em `public/`, o conjunto lê como um ensaio só, nada acima do orçamento.
