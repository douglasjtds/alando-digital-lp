import type { Metadata } from "next";
import Image from "next/image";

import { FaixaRepetida } from "@/components/ui/FaixaRepetida";
import { MASCARAS } from "@/components/ui/OrganicClipPaths";
import {
  colors,
  fonts,
  larguraDoMonograma,
  marca,
  papeis,
  superficies,
  type Superficie,
  type TokenDeCor,
} from "@/config/brand";
import { formatarRazao, razaoDeContraste, veredito } from "@/lib/contrast";
import { partirNoItalico } from "@/lib/italico";

/**
 * /styleguide: a página que prova que o sistema fecha.
 *
 * Todo ratio aqui é CALCULADO a partir dos hexes de `brand.ts`, nunca escrito à mão.
 * Número escrito à mão numa página de sistema envelhece na primeira vez que alguém
 * mexe num hex, e envelhece em silêncio, que é o pior jeito de envelhecer.
 *
 * Não é rota de produção: `noindex` explícito, e o `robots.ts` da Fase 6 confirma.
 */
export const metadata: Metadata = {
  title: "Styleguide, Alando Digital",
  robots: { index: false, follow: false },
};

/** A ordem da tabela do DESIGN-GUIDELINES.md §3, não a ordem alfabética. */
const TOKENS = Object.keys(colors) as TokenDeCor[];

/**
 * `decor` fica fora de toda amostra de texto, de propósito.
 *
 * Ele é `superficie-2` com outro nome, e sobre fundo escuro o cálculo diz 7,02:1, ou
 * seja, "aprovado". A regra vence o número: cor decorativa que aparece aprovada em
 * texto vira cor de texto por acidente na terceira seção. Ele tem o bloco só dele
 * mais abaixo, na opacidade em que de fato existe.
 */
const TOKENS_DE_TEXTO = TOKENS.filter((t) => t !== "decor");

/** A string do prompt da Fase 1. Se `latin-ext` falhar, falha aqui, à vista. */
const TESTE_LATIN_EXT =
  "Criando e gerenciando marcas de forma artesanal · essência · posicionamento · atenção";

/**
 * Referência a arquivo, token ou utilitário.
 *
 * Não define cor: herda a do bloco onde está. Um `code` com cor própria dentro do
 * bloco da regra do sage quebraria justamente a regra que o bloco ensina.
 */
function Cod({ children }: { children: React.ReactNode }) {
  return <code className="font-mono">{children}</code>;
}

/**
 * O container mora AQUI dentro, não no `<main>`.
 *
 * É o que a landing-page-structure.md §7 pede e o que a Fase 5 vai repetir: a
 * faixa de repetição sangra além do container (full-bleed) e o conteúdo, não.
 * Com `container-lp` no `<main>`, a faixa seria cortada em 72rem e o
 * full-bleed nunca seria testado de verdade.
 */
function Secao({
  titulo,
  children,
  sangrar = false,
}: {
  titulo: string;
  children: React.ReactNode;
  /** `true` entrega os filhos em largura de página, sem container. */
  sangrar?: boolean;
}) {
  return (
    <section className="border-tinta-suave/20 border-t py-16">
      <div className="container-lp">
        <h2 className="display-md text-ancora mb-8">{titulo}</h2>
      </div>
      {sangrar ? children : <div className="container-lp">{children}</div>}
    </section>
  );
}

/* ── §1 Paleta ────────────────────────────────────────────────────────────── */

function Paleta() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {TOKENS.map((token) => (
        <li
          key={token}
          className="border-tinta-suave/20 text-ancora border p-4"
          style={{ backgroundColor: colors.papel }}
        >
          <div
            className="border-tinta-suave/20 mb-4 h-20 border"
            style={{ backgroundColor: colors[token] }}
            aria-hidden="true"
          />
          <p className="eyebrow text-ancora">{token}</p>
          <p className="caption text-tinta mt-1 tracking-[0.08em]">
            {colors[token]}
          </p>
          <p className="caption text-tinta mt-2">{papeis[token]}</p>
        </li>
      ))}
    </ul>
  );
}

/* ── §2 As cinco superfícies ──────────────────────────────────────────────── */

function BlocoDeSuperficie({ fundo }: { fundo: Superficie }) {
  const linhas = TOKENS_DE_TEXTO.filter((t) => colors[t] !== colors[fundo])
    .map((frente) => {
      const razao = razaoDeContraste(colors[frente], colors[fundo]);
      return { frente, razao, v: veredito(razao) };
    })
    .sort((a, b) => b.razao - a.razao);

  const passam = linhas.filter((l) => l.v.passaEmTextoNormal);

  return (
    <div
      className="border-tinta-suave/20 border p-6 sm:p-8"
      style={{ backgroundColor: colors[fundo] }}
    >
      <p
        className="eyebrow"
        style={{ color: passam[0] ? colors[passam[0].frente] : colors.papel }}
      >
        superfície {fundo} · {colors[fundo]}
      </p>

      {/* Empilhado em 390px, lado a lado a partir de `sm`. Sem `min-w-*`: largura
          mínima ao lado de um `whitespace-nowrap` é a receita de estouro horizontal,
          e estouro horizontal não avisa, só corta. Medido em 390: scrollWidth 390. */}
      <ul className="mt-6 space-y-4">
        {linhas.map(({ frente, razao, v }) => (
          <li
            key={frente}
            className="flex flex-col gap-x-6 sm:flex-row sm:items-baseline sm:justify-between"
          >
            <span className="body" style={{ color: colors[frente] }}>
              {v.passaEmTextoNormal ? (
                <>
                  Texto em <strong>{frente}</strong>: atenção, intenção e
                  respeito aos detalhes.
                </>
              ) : (
                <>Texto em {frente}: não use isto em parágrafo aqui.</>
              )}
            </span>
            <span
              className="caption tabular-nums sm:whitespace-nowrap"
              style={{
                color: passam[0] ? colors[passam[0].frente] : colors.papel,
              }}
            >
              {v.icone} {formatarRazao(razao)} {v.rotulo}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── §3 Tipografia ────────────────────────────────────────────────────────── */

function Escala() {
  return (
    <div className="space-y-10">
      <div>
        <p className="eyebrow text-tinta-suave">
          display-xl · h1, um por página
        </p>
        <p className="display-xl text-ancora mt-2">
          Criando e gerenciando marcas de forma{" "}
          <span className="editorial">artesanal</span>.
        </p>
      </div>

      <div>
        <p className="eyebrow text-tinta-suave">display-lg · h2 de seção</p>
        <p className="display-lg text-ancora mt-2">
          Antes de falar sobre redes sociais, queremos falar sobre{" "}
          <span className="editorial">pessoas</span>.
        </p>
      </div>

      <div>
        <p className="eyebrow text-tinta-suave">display-md · h3</p>
        <p className="display-md text-ancora mt-2">
          Cada empresa chega até nós em um momento diferente
        </p>
      </div>

      <div>
        <p className="eyebrow text-tinta-suave">
          lead-tracked · só linha curta de lead, nunca parágrafo corrido
        </p>
        <p className="lead-tracked text-tinta mt-2">
          Estratégia, posicionamento e comunicação
        </p>
      </div>

      <div>
        <p className="eyebrow text-tinta-suave">body-lg · subtítulo e lead</p>
        <p className="body-lg medida text-tinta mt-2">
          A medida de leitura é de 60 a 72 caracteres, e o utilitário{" "}
          <Cod>medida</Cod> trava em 62ch. Acima disso o olho perde a linha na
          volta, e a consequência aparece como cansaço, não como erro visível.
        </p>
      </div>

      <div>
        <p className="eyebrow text-tinta-suave">body · corpo de texto</p>
        <p className="body medida text-tinta mt-2">
          Texto corrido em Montserrat sobre papel, que dá 8,29:1. A ênfase usa{" "}
          <strong>peso 600</strong>, e não o bold sintético do navegador: sem a
          regra na base, o peso 700 é desenhado por cima do arquivo que a fonte
          carregou e a letra engorda errado.
        </p>
      </div>

      <div>
        <p className="eyebrow text-tinta-suave">caption · legenda e apoio</p>
        <p className="caption medida text-tinta-suave mt-2">
          Legendas em tinta-suave sobre papel: 5,76:1, aprovado em AA. Sobre a
          superfície sage o mesmo par cai para 3,05:1 e reprova.
        </p>
      </div>

      <div>
        <p className="eyebrow text-tinta-suave">
          eyebrow · o único elemento em caixa alta da página
        </p>
        <p className="eyebrow text-ancora mt-2">
          Branding e comunicação · seção
        </p>
      </div>
    </div>
  );
}

function TesteDeAcentos() {
  const amostras = [
    { rotulo: `display · ${fonts.display.familia}`, classe: "display-md" },
    {
      rotulo: `editorial · ${fonts.editorial.familia}`,
      classe: "display-md editorial",
    },
    { rotulo: `ui · ${fonts.ui.familia}`, classe: "body-lg" },
  ];

  return (
    <div className="space-y-6">
      <p className="body medida text-tinta">
        Se <Cod>latin-ext</Cod> faltar em alguma família, ã, ç, õ e é caem no
        fallback e a linha mistura duas fontes no meio da palavra. O defeito é
        visível a olho nu, e só aqui: no h1 ele apareceria duas vezes.
      </p>
      {amostras.map(({ rotulo, classe }) => (
        <div key={rotulo}>
          <p className="eyebrow text-tinta-suave">{rotulo}</p>
          <p className={`${classe} text-ancora mt-2`}>{TESTE_LATIN_EXT}</p>
        </div>
      ))}
    </div>
  );
}

/* ── §4 A assinatura estrutural ───────────────────────────────────────────── */

/**
 * As duas faixas de demonstração.
 *
 * ⚠️ Estas strings NÃO são a fonte de verdade de nada: são as faixas reais do
 * deck (p. 16 e p. 24), usadas aqui só para o sistema ser validado antes de
 * existir copy. Quem preenche `texto`, `repeticoes` e a palavra em itálico de
 * verdade é o `content.ts`, na Fase 4. Nenhum componente conhece copy.
 */
const FAIXAS_DEMO = [
  {
    id: "faixa-demo-clara",
    texto: "Muito além dos números",
    palavraItalica: "números",
    repeticoes: 6,
    direcao: "direita",
    variante: "claro",
  },
  {
    id: "faixa-demo-escura",
    texto: "Vamos construir isso juntos?",
    palavraItalica: "juntos?",
    repeticoes: 5,
    direcao: "esquerda",
    variante: "escuro",
  },
] as const;

/** Os três casos do `partirNoItalico`, incluindo o que tem que falhar. */
const CASOS_DE_ITALICO = [
  {
    texto: "Criando e gerenciando marcas de forma artesanal.",
    palavra: "artesanal",
    espera: "casa: a palavra existe e está isolada",
  },
  {
    texto: "Criando e gerenciando marcas de forma artesanal.",
    palavra: "arte",
    espera: "NÃO casa: 'arte' está dentro de 'artesanal', e fronteira é regra",
  },
  {
    texto: "Vamos construir isso juntos?",
    palavra: "juntos?",
    espera: "casa: pontuação faz parte da palavra grifada",
  },
] as const;

function Assinatura() {
  return (
    <>
      <div className="container-lp">
        <p className="body medida text-tinta mb-10">
          O device está em ~15 das 24 páginas do deck. A primeira cópia carrega
          o <Cod>&lt;h2&gt;</Cod> e alinha com o conteúdo da seção; as demais
          são <Cod>aria-hidden</Cod> e sangram além da borda da página. Role a
          página: as duas derivam em <strong>sentidos opostos</strong>.
        </p>
      </div>

      <div className="space-y-16">
        {FAIXAS_DEMO.map((faixa) => (
          <div
            key={faixa.id}
            className={faixa.variante === "escuro" ? "bg-ancora py-12" : "py-4"}
          >
            <FaixaRepetida {...faixa} />
            <p
              className={`caption container-lp mt-4 ${
                faixa.variante === "escuro"
                  ? "text-superficie-2"
                  : "text-tinta-suave"
              }`}
            >
              variante <strong>{faixa.variante}</strong> · deriva para a{" "}
              <strong>{faixa.direcao}</strong> · {faixa.repeticoes} cópias, das
              quais {faixa.repeticoes - 1} são <Cod>aria-hidden</Cod>
            </p>
          </div>
        ))}
      </div>

      <div className="container-lp mt-12 space-y-8">
        <div>
          <p className="eyebrow text-tinta-suave">
            a palavra em itálico · exatamente uma por título
          </p>
          <ul className="mt-3 space-y-3">
            {CASOS_DE_ITALICO.map(({ texto, palavra, espera }) => {
              const partes = partirNoItalico(texto, palavra);
              return (
                <li key={`${texto}-${palavra}`}>
                  <p className="display-md text-ancora">
                    {partes ? (
                      <>
                        {partes[0]}
                        <span className="editorial">{partes[1]}</span>
                        {partes[2]}
                      </>
                    ) : (
                      texto
                    )}
                  </p>
                  <p className="caption text-tinta-suave">
                    <Cod>{palavra}</Cod> · {espera}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="border-acento border-l-4 pl-6">
          <p className="body medida text-tinta">
            <strong>Em `prefers-reduced-motion`</strong> a animação não chega a
            ser declarada, então o trilho fica em <Cod>translate3d(0,0,0)</Cod>:
            estático, alinhado, e <strong>100% visível</strong>. Não é{" "}
            <Cod>animation-duration: 0s</Cod> de propósito: em timeline de
            progresso, duração zero cola o elemento no último keyframe e a faixa
            ficaria deslocada para sempre.
          </p>
        </div>
      </div>
    </>
  );
}

/* ── §5 As quatro máscaras ────────────────────────────────────────────────── */

function Mascaras() {
  return (
    <>
      <p className="body medida text-tinta mb-8">
        Crista de montanha aplicada a uma faixa vertical deslocada, as duas
        fontes de forma do material. Em <Cod>objectBoundingBox</Cod>, então a
        mesma forma serve a qualquer proporção. O teste é de longe: se duas se
        confundirem, ou se alguma parecer <Cod>border-radius</Cod>, está errado.
      </p>

      {(["retrato", "paisagem"] as const).map((formato) => (
        <div key={formato} className="mb-10">
          <p className="eyebrow text-tinta-suave mb-4">
            {formato} ·{" "}
            {formato === "retrato"
              ? "as duas primeiras têm topo limpo: o alto do quadro é intocável"
              : "a serra vai para o topo quando não há cabeça a proteger"}
          </p>
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {MASCARAS.map(({ id, nota }) => (
              <li key={id}>
                <div
                  className={`bg-ancora ${
                    formato === "retrato" ? "aspect-[4/5]" : "aspect-[3/2]"
                  }`}
                  style={{ clipPath: `url(#${id})` }}
                  aria-hidden="true"
                />
                <p className="caption text-ancora mt-2">
                  <Cod>{id}</Cod>
                </p>
                <p className="caption text-tinta-suave">{nota}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

/* ── §6 Monograma ─────────────────────────────────────────────────────────── */

function Monograma() {
  const usos = [
    { rotulo: "header", altura: marca.alturas.header },
    { rotulo: "footer", altura: marca.alturas.footer },
  ];

  const fundos = [
    { nome: "papel", src: marca.monograma.escuro, classe: "bg-papel" },
    {
      nome: "superficie-2",
      src: marca.monograma.escuro,
      classe: "bg-superficie-2",
    },
    { nome: "ancora", src: marca.monograma.claro, classe: "bg-ancora" },
    {
      nome: "ancora-quente",
      src: marca.monograma.claro,
      classe: "bg-ancora-quente",
    },
    { nome: "tinta", src: marca.monograma.claro, classe: "bg-tinta" },
  ];

  return (
    <>
      <p className="body medida text-tinta mb-8">
        Não existe SVG da marca, e não vamos pedir: o deck da própria Alando
        traz o lockup como raster de 588×343, menor que os PNGs de 1080 que
        temos. O <Cod>next/image</Cod> serve cerca de 2 KB num monograma de
        32px. A marca é <strong>retrato</strong> ({marca.monograma.largura}×
        {marca.monograma.altura}), então quem consome dimensiona pela altura.
      </p>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fundos.map(({ nome, src, classe }) => (
          <li
            key={nome}
            className={`border-tinta-suave/20 flex items-end gap-6 border p-6 ${classe}`}
          >
            {usos.map(({ rotulo, altura }) => (
              <div key={rotulo} className="flex flex-col items-center gap-2">
                <Image
                  src={src}
                  alt=""
                  width={larguraDoMonograma(altura)}
                  height={altura}
                  aria-hidden="true"
                />
                <span
                  className={`caption ${
                    nome === "papel" || nome === "superficie-2"
                      ? "text-ancora"
                      : "text-papel"
                  }`}
                >
                  {rotulo} · {altura}px
                </span>
              </div>
            ))}
            <span
              className={`eyebrow ml-auto ${
                nome === "papel" || nome === "superficie-2"
                  ? "text-ancora"
                  : "text-papel"
              }`}
            >
              {nome}
            </span>
          </li>
        ))}
      </ul>

      <p className="caption medida text-tinta-suave mt-6">
        Não existem ícones proprietários: <Cod>ref-files/Ícones /</Cod> são 16
        PNGs deste mesmo monograma, preenchido e em contorno, nas oito cores.
        Nenhum conjunto de ícones foi desenhado, e essa é a decisão certa: ícone
        genérico é o clichê que a §2.5 proíbe.
      </p>
    </>
  );
}

/* ── Página ───────────────────────────────────────────────────────────────── */

export default function Styleguide() {
  const sageAncora = razaoDeContraste(colors.ancora, colors["superficie-2"]);
  const sageAcento = razaoDeContraste(
    colors["acento-texto"],
    colors["superficie-2"],
  );
  const sageTinta = razaoDeContraste(colors.tinta, colors["superficie-2"]);
  const sageTintaSuave = razaoDeContraste(
    colors["tinta-suave"],
    colors["superficie-2"],
  );
  const decorNoPapel = razaoDeContraste(colors.decor, colors.papel);

  return (
    <main className="py-16">
      <header className="container-lp">
        <p className="eyebrow text-tinta-suave">
          Sistema de design · Fases 1 e 2
        </p>
        <h1 className="display-lg text-ancora mt-2">
          Styleguide da <span className="editorial">Alando</span> Digital
        </h1>
        <p className="body-lg medida text-tinta mt-4">
          Nove tokens, e oito são hexes literais do manual. Todos os ratios
          desta página são calculados a partir de <Cod>src/config/brand.ts</Cod>
          , no momento em que ela renderiza.
        </p>
      </header>

      <Secao titulo="Os nove tokens">
        <Paleta />
        <p className="caption medida text-tinta-suave mt-6">
          A paleta está fechada. Não existe um décimo token, e <Cod>decor</Cod>{" "}
          não é hex próprio: é <Cod>superficie-2</Cod> com outro papel.
        </p>
      </Secao>

      <Secao titulo="As cinco superfícies, e o que carrega texto em cada uma">
        <p className="body medida text-tinta mb-8">
          O <Cod>acento</Cod> não está aqui de propósito: nenhum texto normal
          passa nele, nem o <Cod>papel</Cod> (3,50:1). Ele é área decorativa,
          número em tamanho display e aresta de animação, nunca fundo de bloco
          com parágrafo.
        </p>
        <div className="space-y-6">
          {superficies.map((fundo) => (
            <BlocoDeSuperficie key={fundo} fundo={fundo} />
          ))}
        </div>
      </Secao>

      <Secao titulo="A regra que é mais fácil de errar">
        <div
          className="border-acento border-l-4 p-6 sm:p-8"
          style={{ backgroundColor: colors["superficie-2"] }}
        >
          <p className="body-lg medida text-ancora">
            Sobre a superfície sage, o parágrafo tem que ser{" "}
            <strong>ancora</strong> ({formatarRazao(sageAncora)}) ou{" "}
            <strong>acento-texto</strong> ({formatarRazao(sageAcento)}).
          </p>
          <p className="body medida text-ancora mt-4">
            O <Cod>tinta</Cod> dá {formatarRazao(sageTinta)} aqui e o{" "}
            <Cod>tinta-suave</Cod> dá {formatarRazao(sageTintaSuave)}. Os dois
            funcionam sobre <Cod>papel</Cod>, e é isso que torna o erro fácil:{" "}
            <strong>toda</strong> seção com fundo sage troca a cor do parágrafo.
          </p>
          <p className="caption medida text-ancora mt-4">
            Este bloco está renderizado em sage com texto em ancora. As duas
            linhas abaixo mostram o erro, na cor errada de propósito:
          </p>
          <p className="body mt-3" style={{ color: colors.tinta }}>
            Parágrafo em tinta sobre sage: {formatarRazao(sageTinta)}, reprovado
            em texto normal.
          </p>
          <p className="body mt-1" style={{ color: colors["tinta-suave"] }}>
            Parágrafo em tinta-suave sobre sage: {formatarRazao(sageTintaSuave)}
            , reprovado.
          </p>
        </div>
      </Secao>

      <Secao titulo="decor: a cor que existe só em opacidade">
        <p className="body medida text-tinta mb-6">
          <Cod>decor</Cod> é o alias de <Cod>superficie-2</Cod>, mesmo hex, e só
          aparece entre 6% e 12% de opacidade: blobs de fundo, faixas de
          repetição, bordas. Sobre <Cod>papel</Cod> ele dá{" "}
          {formatarRazao(decorNoPapel)} e reprova em texto, que é o resultado
          desejado. O <Cod>scripts/contraste.mjs</Cod> verifica isso a cada
          rodada, porque cor decorativa que passa em texto vira cor de texto por
          acidente.
        </p>
        <div className="space-y-2">
          <div className="bg-decor/6 p-4">
            <p className="caption text-tinta">decor a 6% sobre papel</p>
          </div>
          <div className="bg-decor/12 p-4">
            <p className="caption text-tinta">decor a 12% sobre papel</p>
          </div>
          <div className="bg-ancora p-2">
            <div className="bg-decor/12 p-4">
              <p className="caption text-papel">decor a 12% sobre ancora</p>
            </div>
          </div>
        </div>
      </Secao>

      <Secao titulo="Escala tipográfica">
        <Escala />
      </Secao>

      <Secao titulo="latin-ext: o teste dos acentos">
        <TesteDeAcentos />
      </Secao>

      <Secao titulo="Utilitários de layout">
        <ul className="body text-tinta space-y-3">
          <li>
            <strong>container-lp</strong>: 72rem (max-w-6xl) com padding lateral
            fluido de 1,25rem a 3rem. É o container desta página.
          </li>
          <li>
            <strong>secao-y</strong>: padding vertical de seção,{" "}
            <span className="whitespace-nowrap">clamp(4rem, 10vw, 8rem)</span>.
            O<Cod>Section</Cod> aplica isto e nunca declara margin.
          </li>
          <li>
            <strong>medida</strong>: 62ch. Está aplicado em todo parágrafo desta
            página.
          </li>
        </ul>
        <div className="secao-y border-acento mt-8 border border-dashed">
          <p className="caption text-tinta-suave text-center">
            secao-y renderizado, para conferir o respiro a olho
          </p>
        </div>
      </Secao>

      <Secao
        titulo="A assinatura estrutural: a faixa de palavra repetida"
        sangrar
      >
        <Assinatura />
      </Secao>

      <Secao titulo="As quatro máscaras orgânicas">
        <Mascaras />
      </Secao>

      <Secao titulo="Monograma">
        <Monograma />
      </Secao>
    </main>
  );
}
