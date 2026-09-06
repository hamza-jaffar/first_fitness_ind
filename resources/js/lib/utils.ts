import { CategoryType } from '@/types/data';
import type { InertiaLinkProps } from '@inertiajs/react';
import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
  return typeof url === 'string' ? url : url.url;
}

export const generateCaptcha = (length = 6) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export const structureCategories = (categories: CategoryType[]) => {
  return categories
    .filter((category) => category.parent_category_id === null)
    .map((category) => ({
      label: category.name,
      href: `/category/${category.slug}`,
      ...(categories.some(
        (child) => child.parent_category_id === category.id
      )
        ? {
          children: categories
            .filter(
              (child) =>
                child.parent_category_id === category.id
            )
            .map((child) => ({
              label: child.name,
              href: `/category/${category.slug}/${child.slug}`,
            })),
        }
        : {}),
    }))
}