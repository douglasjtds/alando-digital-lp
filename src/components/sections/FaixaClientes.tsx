import { content } from "@/config/content";

export function FaixaClientes() {
  if (!content.faixaClientes.exibir) {
    return null;
  }

  return (
    <section className="bg-superficie-2 secao-y">
      <div className="container-lp">
        <h2 className="display-md text-ancora mb-8 text-center">
          {content.faixaClientes.titulo}
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {/* Logos virão aqui quando autorizados pela cliente. */}
        </div>
      </div>
    </section>
  );
}
