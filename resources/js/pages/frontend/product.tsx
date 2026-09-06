import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import FrontendBreadcrumb from '@/components/frontend/breadcrumb';
import FrontendButton from '@/components/frontend/button';

type Product = { id: number; title: string; slug: string; art_no: string; short_desc?: string; desc?: string; thumbnail?: string | null; images?: string[]; sizes?: string[]; colors?: string[]; meta_title?: string | null; meta_description?: string | null; meta_keywords?: string[]; category?: { name: string; slug: string; parent?: { slug: string } | null } };
const imageUrl = (path?: string | null) => path ? (path.startsWith('http') || path.startsWith('/') ? path : `/storage/${path}`) : '';

export default function Product({ product, relatedProducts }: { product: Product; relatedProducts: Product[] }) {
    const gallery = [product.thumbnail, ...(product.images ?? [])].filter(Boolean) as string[];
    const [selectedImage, setSelectedImage] = useState(gallery[0]);
    const [quantity, setQuantity] = useState(1);

    return <>
        <Head title={product.meta_title || product.title}>
            {product.meta_description && <meta name="description" content={product.meta_description} />}
            {product.meta_keywords?.length ? <meta name="keywords" content={product.meta_keywords.join(', ')} /> : null}
            <meta property="og:title" content={product.meta_title || product.title} />
            {product.meta_description && <meta property="og:description" content={product.meta_description} />}
            {product.thumbnail && <meta property="og:image" content={imageUrl(product.thumbnail)} />}
        </Head>
        <FrontendBreadcrumb name={product.title} />
        <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
            <Link href={product.category ? product.category.parent ? `/category/${product.category.parent.slug}/${product.category.slug}` : `/category/${product.category.slug}` : '/'} className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-red-600"><ArrowLeft className="h-4 w-4" /> Back to products</Link>
            <section className="grid gap-10 lg:grid-cols-2 lg:gap-16">
                <div className="flex flex-col-reverse gap-4 sm:flex-row"><div className="flex gap-3 sm:w-20 sm:flex-col">{gallery.map((image) => <button key={image} type="button" onClick={() => setSelectedImage(image)} className={`h-16 w-16 shrink-0 overflow-hidden rounded-md border p-1 ${selectedImage === image ? 'border-red-600' : 'border-zinc-200'}`}><img src={imageUrl(image)} alt="" className="h-full w-full object-contain" /></button>)}</div><div className="flex aspect-square flex-1 items-center justify-center overflow-hidden rounded-xl bg-zinc-50 p-5">{selectedImage ? <img src={imageUrl(selectedImage)} alt={product.title} className="h-full w-full object-contain" /> : <span className="text-sm text-zinc-400">No image available</span>}</div></div>
                <div className="flex flex-col justify-center"><p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">{product.art_no}</p><h1 className="mt-3 text-3xl font-bold text-zinc-950 md:text-4xl">{product.title}</h1><p className="mt-5 text-sm leading-7 text-zinc-600">{product.short_desc || 'Designed for movement, comfort, and reliable performance.'}</p><div className="prose prose-sm mt-5 max-w-none text-zinc-600" dangerouslySetInnerHTML={{ __html: product.desc ?? '' }} />
                    {product.sizes?.length ? <div className="mt-6"><p className="mb-2 text-sm font-bold text-zinc-950">Available sizes</p><div className="flex flex-wrap gap-2">{product.sizes.map((size) => <span key={size} className="rounded-md border px-3 py-1.5 text-xs text-zinc-600">{size}</span>)}</div></div> : null}
                    {product.colors?.length ? <div className="mt-5"><p className="mb-2 text-sm font-bold text-zinc-950">Colors</p><div className="flex flex-wrap gap-2">{product.colors.map((color) => <span key={color} className="rounded-md border px-3 py-1.5 text-xs text-zinc-600">{color}</span>)}</div></div> : null}
                    <div className="mt-7 flex flex-wrap items-center gap-3"><div className="flex h-11 items-center rounded-md border"><button type="button" className="p-3" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus className="h-3 w-3" /></button><span className="w-8 text-center text-sm">{quantity}</span><button type="button" className="p-3" onClick={() => setQuantity(quantity + 1)}><Plus className="h-3 w-3" /></button></div><FrontendButton>Request a quote</FrontendButton></div>
                </div>
            </section>
            {relatedProducts.length ? <section className="mt-20 border-t pt-12"><div className="mb-8 text-center"><p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">You may also like</p><h2 className="mt-2 text-3xl font-bold text-zinc-950">Related Products</h2></div><div className="grid grid-cols-2 gap-5 md:grid-cols-4">{relatedProducts.map((related) => <Link key={related.id} href={`/product/${related.slug}`} className="group text-center"><div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-zinc-200 p-2">{related.thumbnail ? <img src={imageUrl(related.thumbnail)} alt={related.title} className="h-full w-full object-contain transition duration-500 group-hover:scale-105" /> : <span className="text-xs text-zinc-400">No image</span>}</div><h3 className="mt-3 text-sm font-bold">{related.title}</h3><p className="text-xs text-zinc-500">{related.art_no}</p></Link>)}</div></section> : null}
        </main>
    </>;
}
