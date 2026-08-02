import { local, redes, whatsapp } from "@/config/brand";
import { content } from "@/config/content";
import { criarColeta } from "@/lib/pendencias";
import { canonicalPendente, siteUrl, urlAbsoluta } from "@/lib/site-url";

/**
 * Os dados estruturados da página: um `@graph` só, quatro nós.
 *
 * ── Por que um grafo, e não nós soltos ───────────────────────────────────────
 *
 * Nós soltos são quatro entidades sem relação declarada. Num `@graph` com `@id`,
 * o Google entende que a `Person` é `founder` do negócio e que os `Service` são
 * oferecidos por ele. É a diferença entre listar fatos e descrever uma empresa.
 *
 * ── A regra que manda aqui ───────────────────────────────────────────────────
 *
 * **Todo campo passa por `coleta.confirmado()`.** Marcador de pendência não entra
 * em JSON-LD: ali ele é dado falso em formato legível por máquina, reprova no
 * Rich Results Test e pode ser indexado como se fosse verdade. Schema.org aceita
 * ausência; não aceita mentira. Ver `lib/pendencias.ts`.
 */

/**
 * ⚠️ Desvio DELIBERADO do catálogo da skill, que manda `ProfessionalService` para
 * "qualquer outra".
 *
 * `AdvertisingAgency` existe em schema.org, é subtipo de `LocalBusiness` e diz
 * muito mais sobre o negócio. Fica isolada no topo porque é o ponto de troca da
 * fronteira white-label (landing-page-structure.md §3): outro cliente, outro
 * tipo, uma linha.
 */
export const TIPO_NEGOCIO = "AdvertisingAgency";

const ID_NEGOCIO = `${siteUrl}/#organizacao`;
const ID_FUNDADORA = `${siteUrl}/#andressa`;
const ID_CATALOGO = `${siteUrl}/#servicos`;

/**
 * URL absoluta de um asset, ou `undefined` enquanto o domínio for provisório.
 *
 * Sem isto, uma build de preview publicaria `logo: "https://preview-abc.vercel.app/..."`
 * como o logo oficial da marca, ou pior, um `http://localhost:3000/...` que não
 * resolve para ninguém. A ausência do domínio é uma pendência de dado, e o jeito
 * de tratá-la é o mesmo de qualquer outra: omitir e reportar.
 */
function urlPublica(caminho: string): string | undefined {
  return canonicalPendente ? undefined : urlAbsoluta(caminho);
}

/** Primeiro parágrafo de um corpo em prosa. É o que vira `description` de `Service`. */
function primeiroParagrafo(texto: string): string {
  return texto.split("\n\n")[0] ?? texto;
}

/**
 * Monta o grafo e devolve, junto, o que ficou de fora.
 *
 * Os dois saem da MESMA passagem de propósito. Se `pendenciasDoSchema()` montasse
 * a lista por conta própria, existiriam duas descrições dos campos do grafo, e a
 * lista passaria a mentir sobre o JSON-LD assim que uma das duas mudasse.
 */
export function construirGrafo() {
  const coleta = criarColeta();
  const c = coleta.confirmado.bind(coleta);

  const endereco = {
    "@type": "PostalAddress",
    addressLocality: c(local.cidade, "Organization.address.addressLocality"),
    addressRegion: c(local.uf, "Organization.address.addressRegion"),
    addressCountry: "BR",
  };

  const negocio = {
    "@type": TIPO_NEGOCIO,
    "@id": ID_NEGOCIO,
    name: c(content.footer.nome, "Organization.name"),
    alternateName: "Alando",
    description: c(content.seo.bio, "Organization.description"),
    slogan: c(content.hero.h1, "Organization.slogan"),
    url: c(canonicalPendente ? "" : siteUrl, "Organization.url"),
    logo: c(urlPublica("/brand/monograma-escuro.png"), "Organization.logo"),
    image: c(urlPublica("/og-image.jpg"), "Organization.image"),
    /* 2022 é literal da copy: "A Alando nasceu oficialmente em 2022". */
    foundingDate: "2022",
    /* E.164. O `phone` do `brand.ts` já é só dígitos, com país e DDD. */
    telephone: c(
      whatsapp.phone ? `+${whatsapp.phone}` : "",
      "Organization.telephone",
    ),
    address: endereco,
    /* ⚠️ Só a cidade, e isso é conservador de propósito. Se ela atende remoto
       para outros estados, o campo vira `Country` / "Brasil", mas afirmar
       alcance nacional sem confirmar seria inventar dado da cliente. */
    areaServed: {
      "@type": "City",
      name: c(local.cidade, "Organization.areaServed"),
    },
    sameAs: [redes.instagram],
    founder: { "@id": ID_FUNDADORA },
    hasOfferCatalog: { "@id": ID_CATALOGO },
  };

  /**
   * ⚠️ `sameAs` está AUSENTE de propósito. O único perfil que temos é
   * `@alandodigital`, que é da agência e já está no nó do negócio. Repeti-lo aqui
   * afirmaria que o Instagram da empresa é o perfil pessoal dela.
   *
   * Os três campos vêm literais da copy em `sobre.equipe`: "fundada por Andressa
   * Lando, estrategista de marketing e especialista em Branding, com MBA pela
   * ESPM".
   */
  const fundadora = {
    "@type": "Person",
    "@id": ID_FUNDADORA,
    name: "Andressa Lando",
    jobTitle: "Estrategista de marketing",
    alumniOf: { "@type": "CollegeOrUniversity", name: "ESPM" },
    worksFor: { "@id": ID_NEGOCIO },
  };

  /**
   * Extensão em relação ao catálogo da skill, que assume um serviço só. Para
   * agência é ganho real de SEO e descreve o negócio com honestidade: são cinco,
   * e eles vêm do `content.ts`, não de uma lista escrita aqui.
   *
   * O `Offer` em volta de cada `Service` não é cerimônia: `OfferCatalog` é uma
   * `ItemList` de ofertas, e `Service` cru como item é o erro mais comum deste nó.
   */
  const catalogo = {
    "@type": "OfferCatalog",
    "@id": ID_CATALOGO,
    name: c(content.servicosTitulo, "OfferCatalog.name"),
    itemListElement: content.servicos.map((servico, i) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: c(servico.titulo, `Service[${i}].name`),
        description: c(
          primeiroParagrafo(servico.corpo),
          `Service[${i}].description`,
        ),
        provider: { "@id": ID_NEGOCIO },
      },
    })),
  };

  /**
   * ⚠️ Hoje este nó NÃO é emitido, e isso é o comportamento certo.
   *
   * O `content.faq` tem um par só, e os dois campos são marcador. `FAQPage` com
   * `mainEntity` vazio é inválido, então emitir um nó vazio seria trocar "não
   * tenho FAQ" por "tenho um FAQ quebrado".
   *
   * ⚠️ Quando as perguntas reais chegarem, elas têm que bater PALAVRA POR PALAVRA
   * com o `<details>` da tela. É por isso que este `map` lê o mesmo
   * `content.faq.perguntas` que o componente: uma fonte só não tem como divergir.
   * Se as duas divergissem, o Google passaria a ignorar o markup inteiro.
   */
  const perguntas = content.faq.perguntas
    .map(({ pergunta, resposta }) => ({
      pergunta: coleta.confirmado(pergunta, "FAQPage.mainEntity"),
      resposta: coleta.confirmado(resposta, "FAQPage.acceptedAnswer"),
    }))
    .filter((p) => p.pergunta !== undefined && p.resposta !== undefined);

  const faq =
    perguntas.length > 0
      ? {
          "@type": "FAQPage",
          "@id": `${siteUrl}/#faq`,
          mainEntity: perguntas.map(({ pergunta, resposta }) => ({
            "@type": "Question",
            name: pergunta,
            acceptedAnswer: { "@type": "Answer", text: resposta },
          })),
        }
      : undefined;

  const grafo = {
    "@context": "https://schema.org",
    "@graph": [negocio, fundadora, catalogo, faq].filter(Boolean),
  };

  return { grafo, pendencias: coleta.pendencias() };
}

/**
 * O que está sendo OMITIDO do grafo, e por quê alguém deveria se importar.
 *
 * Mora aqui e não no `pendencias.ts` porque quem conhece os campos do grafo é o
 * grafo. Colocá-la lá criaria um ciclo de import (`schema` precisa de
 * `confirmado`, `pendencias` precisaria do grafo) e uma segunda lista de campos
 * para manter em dia.
 */
export function pendenciasDoSchema(): readonly string[] {
  return construirGrafo().pendencias;
}

/**
 * O grafo pronto para ir no `<script type="application/ld+json">`.
 *
 * Duas coisas acontecem aqui, e as duas importam:
 *
 * 1. `JSON.stringify` remove os `undefined`, que é exatamente o que o
 *    `confirmado()` produz. É por isso que ele devolve `undefined` e não `null`.
 * 2. O `<` vira `<`. Sem isso, um `</script>` que aparecesse dentro de
 *    qualquer texto do `content.ts` fecharia a tag no meio do JSON e o resto do
 *    grafo viraria HTML. É injeção, não detalhe de escape.
 */
export function jsonLd(): string {
  return JSON.stringify(construirGrafo().grafo).replace(/</g, "\\u003c");
}
