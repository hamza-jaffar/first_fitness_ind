import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import ProductForm from '@/components/product-form';
import { Button } from '@/components/ui/button';

export default function CreateProduct({ categories }: { categories: { id: number; name: string }[] }) {
    return <><Head title="Add Product" /><div className="flex flex-1 flex-col gap-6 p-4 lg:p-8"><div className="flex items-center gap-4"><Button variant="ghost" size="icon" asChild><Link href="/dashboard/products"><ArrowLeft /></Link></Button><div><h1 className="text-2xl font-bold tracking-tight">Add product</h1><p className="text-muted-foreground">Create a product record for the catalog.</p></div></div><ProductForm categories={categories} submitUrl="/dashboard/products" method="post" submitLabel="Create product" /></div></>;
}

CreateProduct.layout = { breadcrumbs: [{ title: 'Dashboard', href: '/dashboard' }, { title: 'Products', href: '/dashboard/products' }, { title: 'Add product', href: '/dashboard/products/create' }] };