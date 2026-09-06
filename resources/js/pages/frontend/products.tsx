import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import FrontendBreadcrumb from '@/components/frontend/breadcrumb';

type Category = { id: number; name: string; slug: string; parent_category_id: number | null; children?: Category[]; parent?: Category | null };
type Product = { id: number; title: string; slug: string; art_no: string; thumbnail?: string | null };

type Props = {
    category: Category;
    products: { data: Product[]; links: { url: string | null; label: string; active: boolean }[]; from: number | null; to: number | null; total: number };
};

const imageUrl = (path?: string | null) => path ? (path.startsWith('http') || path.startsWith('/') ? path : `/storage/${path}`) : '';

export default function Products({ category, products }: Props) {
    const sidebarCategory = category.parent ?? category;
    const children = sidebarCategory.children ?? [];

    return <>
        <FrontendBreadcrumb name={category.name} />
        <section className="mx-auto flex w-full max-w-7xl gap-8 px-5 py-12 lg:px-8">
            <aside className="hidden h-fit w-60 shrink-0 rounded-2xl bg-zinc-100 p-6 md:block">
                <h1 className="mb-3 text-lg font-bold text-zinc-950">{sidebarCategory.name}</h1>
                {children.length ? children.map((child) => <Link key={child.id} href={sidebarCategory.id === category.id ? `/category/${category.slug}/${child.slug}` : `/category/${sidebarCategory.slug}/${child.slug}`} className={`flex items-center gap-3 border-b border-zinc-200 py-4 text-sm font-medium transition-colors last:border-0 hover:text-red-600 ${child.id === category.id ? 'text-red-600' : 'text-zinc-500'}`}><ArrowRight className="h-4 w-4" />{child.name}</Link>) : <p className="text-sm text-zinc-500">Browse all products</p>}
            </aside>

            <div className="min-w-0 flex-1">
                <div className="mb-8 flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Our collection</p><h2 className="mt-2 text-2xl font-bold text-zinc-950 md:text-3xl">{category.name}</h2></div><p className="text-sm text-zinc-500">{products.total} products</p></div>
                <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                    {products.data.map((product) => <Link key={product.id} href={`/product/${product.slug}`} className="group text-center"><div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 p-2">{product.thumbnail ? <img src={imageUrl(product.thumbnail)} alt={product.title} className="h-full w-full object-contain transition duration-500 group-hover:scale-105" /> : <span className="text-xs text-zinc-400">No image</span>}</div><h3 className="mt-3 text-sm font-bold text-zinc-950">{product.title}</h3><p className="mt-1 text-xs text-zinc-600">Art # {product.art_no}</p></Link>)}
                </div>
                {!products.data.length && <div className="rounded-xl border border-dashed p-12 text-center text-zinc-500">No products are available in this category yet.</div>}
                {products.links.length > 3 && <div className="mt-12 flex items-center justify-center gap-2">{products.links.map((link, index) => <Link key={index} href={link.url ?? '#'} preserveScroll className={`flex h-9 min-w-9 items-center justify-center rounded-md border px-3 text-sm transition-colors ${link.active ? 'border-red-600 bg-red-600 text-white' : link.url ? 'border-zinc-200 text-zinc-600 hover:border-red-600 hover:text-red-600' : 'pointer-events-none border-zinc-100 text-zinc-300'}`} dangerouslySetInnerHTML={{ __html: link.label.includes('Previous') ? '&lt;' : link.label.includes('Next') ? '&gt;' : link.label }} />)}</div>}
            </div>
        </section>
    </>;
}
