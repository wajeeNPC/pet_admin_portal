import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind class names with full conflict resolution.
 */
export const cn = (...inputs) => twMerge(clsx(inputs));
