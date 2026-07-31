import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { FaixaClientes } from "@/components/sections/FaixaClientes";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <FaixaClientes />
        {/* Fases 5B-5D: Manifesto, Momentos, Serviços, Resultados, Processo, Sobre, FAQ, CtaFinal, Footer, StickyMobileCta */}
      </main>
    </>
  );
}
