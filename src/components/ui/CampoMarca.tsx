import Image from "next/image";

import { marca } from "@/config/brand";
import { renderizarPendencia } from "@/lib/pendencia";

/**
 * O SLOT VAGO, ocupado pela marca até a foto definitiva chegar.
 *
 * Nasceu inline no `Sobre` em 09/09, para "Nossa história", e saiu de lá em
 * 09/09 quando o Douglas pediu o mesmo tratamento em "Identidade Visual", na
 * seção `Servicos`. Dois lugares com a mesma regra querem o mesmo componente:
 * duas cópias divergem na terceira vez que alguém mexe numa delas.
 *
 * Desde 10/09 só o `Sobre` o usa, porque Identidade Visual ganhou as fotos. O
 * componente continua no `Servicos` como o estado de qualquer serviço com
 * `fotoPendencia` e sem `foto`.
 *
 * ── Por que a marca é EMOLDURADA e não recortada ─────────────────────────────
 *
 * `.campo-marca` (globals.css) centra o lockup dentro da máscara em vez de
 * passá-lo por baixo dela: logo dentro de `clipPath` é logo deformado, e a §5 da
 * DESIGN-GUIDELINES é explícita, "nunca esticado, nunca rotacionado". A caixa é
 * 4/5 e a marca ocupa 56% dela, os dois números medidos rasterizando a máscara
 * nesta proporção. As contas e as candidatas descartadas estão no bloco
 * `.campo-marca` do `globals.css`.
 *
 * ⚠️ NUNCA combinar com `.foto-textura`. O parallax translada e amplia, e o que
 * está aqui dentro é a marca.
 *
 * ⚠️ O literal `[clip-path:url(#crista-serra)]` mora AQUI, e este é o único
 * lugar do código onde ele aparece por extenso. O Tailwind gera classe
 * arbitrária varrendo o código atrás do literal: apagá-lo daqui apagaria a
 * máscara dos dois campos SEM ERRO NENHUM. O mesmo vale, em outros arquivos,
 * para `[clip-path:url(#crista-vale)]` (`Sobre.tsx` e `Servicos.tsx`),
 * `[clip-path:url(#crista-retrato)]` (`Servicos.tsx`) e
 * `[clip-path:url(#crista-faixa)]` (`SequenciaDeQuadros.tsx`).
 *
 * A `crista-serra` apareceu DUAS vezes na página de 09/09 a 10/09, uma em cada
 * slot vago, e o argumento era que repetir a forma fazia o campo da marca ler
 * como UMA convenção da página, e não como duas improvisações para o mesmo
 * problema. Desde 10/09 ela aparece uma vez só, no `Sobre`, e o argumento volta
 * a valer se outro slot vago nascer.
 *
 * ── A legenda de pendência não é decoração de processo ───────────────────────
 *
 * É a regra 1 do `CLAUDE.md` aplicada: placeholder sem marcador chega em
 * produção sem ninguém notar, e nos dois casos este é o slot mais visível do
 * bloco. Ela sai numa linha quando a foto chegar, junto com o componente.
 *
 * O campo é `aria-hidden`: quem usa leitor de tela não recebe "logo da Alando"
 * onde a página promete uma foto que ainda não existe. O que ele recebe é o
 * marcador, que é a verdade do slot.
 */
type Props = {
  /** O texto com o `<<A CONFIRMAR>>`, vindo do `content.ts`. */
  pendencia: string;
  /** Medido por slot: a marca ocupa 56% da caixa, não a largura da coluna. */
  sizes: string;
};

export function CampoMarca({ pendencia, sizes }: Props) {
  return (
    <div>
      <div
        className="campo-marca bg-decor/12 [clip-path:url(#crista-serra)]"
        aria-hidden="true"
      >
        <Image
          src={marca.lockupVertical.escuro}
          alt=""
          width={marca.lockupVertical.largura}
          height={marca.lockupVertical.altura}
          sizes={sizes}
        />
      </div>

      <p className="caption text-tinta-suave mt-4">
        {renderizarPendencia(pendencia)}
      </p>
    </div>
  );
}
