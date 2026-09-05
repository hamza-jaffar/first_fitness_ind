import type { ReactNode } from 'react';
import type { BreadcrumbItem } from '@/types/navigation';

export type AppLayoutProps = {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
};

export type AppVariant = 'header' | 'sidebar';

export type FlashToast = {
    type: 'success' | 'info' | 'warning' | 'error';
    message: string;
};

export type AuthLayoutProps = {
    children?: ReactNode;
    name?: string;
    title?: string;
    description?: string;
};

export type SettingType = {
    logo_white: string;
    logo_black: string;
    name: string;
    description: string;
    location: string;
    phone: string;
    email: string;
    instagram: string;
    facebook: string;
    linkedin: string;
    breadcrumb_img: string;
}

export type PageType = {
    id: number;
    name: string;
    slug: string;
    content: string | null;
    meta_title: string | null;
    meta_description: string | null;
    canonical_url: string | null;
    og_title: string | null;
    og_description: string | null;
    og_image: string | null;
    status: 'publish' | 'draft';
    created_at: string;
    updated_at: string;
};