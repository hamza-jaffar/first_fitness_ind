import type { Auth } from '@/types/auth';
import { SettingType } from '@/types/ui';
import { CategoryType } from './data';

declare module 'react' {
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            settings: SettingType;
            categories: CategoryType[];
            sidebarOpen: boolean;
            [key: string]: unknown;
        };
    }
}
