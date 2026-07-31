import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Concatena classes condicionais e resolve conflito entre utilitários do Tailwind.
 *
 * É a única "biblioteca de componentes" do projeto: shadcn/ui está fora por decisão
 * de arquitetura (landing-page-structure.md §2.3), porque esta página não tem
 * formulário, dialog, dropdown, tabela nem date picker, e o FAQ é `<details>` nativo.
 *
 * `tailwind-merge` entra porque, sem ele, `cn("px-4", props.className)` não resolve
 * quando `className` traz `px-8`: quem vence passa a ser a ordem no stylesheet, não a
 * intenção de quem chamou. As duas dependências somam pouco e evitam variante
 * implementada com template string ilegível.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
