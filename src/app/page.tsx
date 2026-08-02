import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { FaixaClientes } from "@/components/sections/FaixaClientes";
import { Manifesto } from "@/components/sections/Manifesto";
import { Momentos } from "@/components/sections/Momentos";
import { Servicos } from "@/components/sections/Servicos";
import { Resultados } from "@/components/sections/Resultados";
import { Processo } from "@/components/sections/Processo";
import { Sobre } from "@/components/sections/Sobre";
import { Faq } from "@/components/sections/Faq";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCta } from "@/components/layout/StickyMobileCta";
import { jsonLd } from "@/lib/schema";

export default function Home() {
  return (
    <>
      {/* O grafo vai na PÁGINA e não no `layout.tsx` porque o nó `FAQPage` é
          específico desta rota: emiti-lo no layout o colocaria também no 404,
          que não tem FAQ nenhum.

          `dangerouslySetInnerHTML` é o caminho correto aqui, não um atalho: como
          filho de texto, o React escaparia as aspas do JSON e o bloco deixaria de
          ser JSON válido. O escape que importa (`<`) é feito no `jsonLd()`. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd() }}
      />

      <Header />
      <main id="conteudo">
        <Hero />
        <FaixaClientes />
        <Manifesto />
        <Momentos />
        <Servicos />
        {/* `Resultados` não renderiza: `exibir: false` e nenhum número
            autorizado. Seção desligada é estado final legítimo. */}
        <Resultados />
        <Processo />
        <Sobre />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
