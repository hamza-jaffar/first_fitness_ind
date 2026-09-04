import type { Auth } from '@/types/auth';
import { SettingType } from '@/types/ui';

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
            sidebarOpen: boolean;
            [key: string]: unknown;
        };
    }
}
