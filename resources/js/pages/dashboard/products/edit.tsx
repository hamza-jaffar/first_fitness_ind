import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import ProductForm from '@/components/product-form';
import { Button } from '@/components/ui/button';

export default function EditProduct({ product, categories }: { product: any; categories: { id: number; name: string }[] }) {
    return <><Head title={`Edit ${product.title}`} /><div className="flex flex-1 flex-col gap-6 p-4 lg:p-8"><div className="flex items-center gap-4"><Button variant="ghost" size="icon" asChild><Link href={`/dashboard/products/${product.id}`}><ArrowLeft /></Link></Button><div><h1 className="text-2xl font-bold tracking-tight">Edit product</h1><p className="text-muted-foreground">Update {product.title}.</p></div></div><ProductForm product={product} categories={categories} submitUrl={`/dashboard/products/${product.id}`} method="put" submitLabel="Save changes" /></div></>;
}

EditProduct.layout = { breadcrumbs: [{ title: 'Dashboard', href: '/dashboard' }, { title: 'Products', href: '/dashboard/products' }, { title: 'Edit product', href: '#' }] };