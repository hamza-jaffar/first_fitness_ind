import { usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import React from 'react'

type Props = {
    name: string;
}

const FrontendBreadcrumb = ({ name }: Props) => {
    const { settings } = usePage().props;
    return (
        <div
            style={{
                backgroundImage: `${settings.breadcrumb_img ? `url(/storage/${settings.breadcrumb_img})` : ''}`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
            className="p-20 text-center text-white">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                {name}
            </h1>
            <p className='font-bold tracking-tight text-sm flex gap-2 text-center justify-center items-center'>{settings.name} <ChevronRight size={15} /> {name}</p>
        </div>
    )
}

export default FrontendBreadcrumb