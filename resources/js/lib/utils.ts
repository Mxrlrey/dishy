import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Função utilitária para combinar classes Tailwind
 * sem conflitos e com suporte a condicionais.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
