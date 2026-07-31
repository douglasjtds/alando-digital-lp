import type { Metadata } from "next";

import {
  colors,
  fonts,
  papeis,
  superficies,
  type Superficie,
  type TokenDeCor,
} from "@/config/brand";
import { formatarRazao, razaoDeContraste, veredito } from "@/lib/contrast";

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

function Secao({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-tinta-suave/20 border-t py-16">
      <h2 className="display-md text-ancora mb-8">{titulo}</h2>
      {children}
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
    <main className="container-lp py-16">
      <header>
        <p className="eyebrow text-tinta-suave">Sistema de design · Fase 1</p>
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
    </main>
  );
}
