import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { FaixaClientes } from "@/components/sections/FaixaClientes";
import { Manifesto } from "@/components/sections/Manifesto";
import { Momentos } from "@/components/sections/Momentos";
import { Servicos } from "@/components/sections/Servicos";

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
        {/* Fases 5C-5D: Resultados, Processo, Sobre, FAQ, CtaFinal, Footer, StickyMobileCta */}
      </main>
    </>
  );
}
