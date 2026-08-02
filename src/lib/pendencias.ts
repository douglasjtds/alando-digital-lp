/**
 * A regra assimétrica dos marcadores, que é a decisão mais importante da Fase 6.
 *
 * > **Na PÁGINA o `<<A CONFIRMAR>>` aparece. Nos DADOS ESTRUTURADOS o campo é
 * > OMITIDO.**
 *
 * Na página o marcador é útil: alguém abre o site, vê o realce e substitui. No
 * JSON-LD ele é dado falso publicado em formato legível por máquina. Reprova no
 * Rich Results Test, e pior: um `telephone: "<<A CONFIRMAR: telefone>>"` pode ser
 * indexado como se fosse o telefone dela.
 *
 * **Schema.org aceita ausência. Não aceita mentira.**
 *
 * Este arquivo é o lado puro da regra (sem JSX, importável pelo `schema.ts`, que
 * roda no servidor). O lado visual, que realça o marcador na tela, é o
 * `pendencia.tsx` ao lado, e ele lê o padrão daqui: duas definições do que conta
 * como marcador divergem na primeira mudança.
 */

/**
 * O padrão, em fonte de texto, para quem precisar de uma instância própria.
 *
 * Exportar o regex pronto com a flag `g` seria bug esperando acontecer: regex
 * global guarda `lastIndex` entre chamadas, e dois módulos compartilhando a mesma
 * instância pulam ocorrências de forma intermitente.
 */
export const PADRAO_MARCADOR = "<<([^>]*)>>";

/** Instância nova, com `g`, para varrer um texto inteiro. */
export function marcadorGlobal(): RegExp {
  return new RegExp(PADRAO_MARCADOR, "g");
}

/** Sem `g`, então `test()` não carrega estado. */
const MARCADOR = new RegExp(PADRAO_MARCADOR);

/** O valor é (ou contém) um marcador de pendência? */
export function ehPendencia(valor: unknown): boolean {
  return typeof valor === "string" && MARCADOR.test(valor);
}

/**
 * O portão do JSON-LD: devolve o valor, ou `undefined` se ele for pendência.
 *
 * ⚠️ `undefined`, nunca `null` e nunca `""`. É o único valor que o
 * `JSON.stringify` REMOVE da saída: `null` viraria `"telephone": null` e `""`
 * viraria `"telephone": ""`, que são dois jeitos diferentes de publicar um campo
 * vazio em vez de não publicar campo nenhum.
 *
 * String vazia na entrada também conta como pendência: no `content.ts` existem
 * campos que nascem `""` (o `fechamento` de quatro dos cinco serviços), e um
 * `description` vazio no grafo não é melhor que um marcador.
 */
export function confirmado<T>(valor: T): T | undefined {
  if (valor === undefined || valor === null) return undefined;
  if (typeof valor === "string") {
    const limpo = valor.trim();
    if (limpo === "" || ehPendencia(limpo)) return undefined;
  }
  return valor;
}

/**
 * Uma coleta de pendências, com escopo.
 *
 * Existe para o `pendenciasDoSchema()` poder dizer **o que** foi omitido, e não
 * só que algo foi. A alternativa era um registro no escopo do módulo, mas ele
 * acumularia entre renderizações do servidor e passaria a reportar pendência
 * repetida (ou pendência de um render anterior) sem nada acusar.
 *
 * Uso, no `schema.ts`:
 *
 * ```ts
 * const coleta = criarColeta();
 * const telephone = coleta.confirmado(telefone, "Organization.telephone");
 * // ...
 * coleta.pendencias(); // ["Organization.telephone", ...]
 * ```
 */
export function criarColeta() {
  const omitidos: string[] = [];

  return {
    /** Igual ao `confirmado()` acima, e anota o rótulo quando omite. */
    confirmado<T>(valor: T, rotulo: string): T | undefined {
      const resultado = confirmado(valor);
      if (resultado === undefined && !omitidos.includes(rotulo)) {
        omitidos.push(rotulo);
      }
      return resultado;
    },
    /** Os campos que ficaram de fora do grafo, na ordem em que apareceram. */
    pendencias(): readonly string[] {
      return omitidos;
    },
  };
}
