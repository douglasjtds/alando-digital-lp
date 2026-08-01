import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { FaixaClientes } from "@/components/sections/FaixaClientes";
import { Manifesto } from "@/components/sections/Manifesto";
import { Momentos } from "@/components/sections/Momentos";
import { Servicos } from "@/components/sections/Servicos";
import { Resultados } from "@/components/sections/Resultados";
import { Processo } from "@/components/sections/Processo";
import { Sobre } from "@/components/sections/Sobre";

export default function Home() {
  return (
    <>
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
        {/* Fase 5D: Faq, CtaFinal, Footer, StickyMobileCta */}
      </main>
    </>
  );
}
