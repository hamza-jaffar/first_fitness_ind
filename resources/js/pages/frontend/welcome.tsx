import { Head, Link } from '@inertiajs/react';

type Category = { id: number; name: string; slug: string; image?: string | null; desc?: string | null };
type Product = { id: number; title: string; slug: string; art_no: string; thumbnail?: string | null };

const imageUrl = (path?: string | null) => path ? (path.startsWith('http') || path.startsWith('/') ? path : `/storage/${path}`) : '';

export default function Welcome({ categories, featuredProducts }: { categories: Category[]; featuredProducts: Product[] }) {
    return <>
        <Head title="Home" />
        <main>
            <section className="bg-zinc-950 px-5 pb-16 pt-14 text-white lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 text-center"><p className="text-[9px] font-bold uppercase tracking-[0.18em] text-red-500">Built for performance and your active lifestyle</p><h1 className="mt-2 text-2xl font-black uppercase tracking-wide md:text-3xl">Our Categories</h1></div>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                        {categories.map((category) => <Link key={category.id} href={`/category/${category.slug}`} className="group overflow-hidden rounded-md bg-zinc-900"><div className="aspect-4/5 overflow-hidden bg-zinc-800">{category.image ? <img src={imageUrl(category.image)} alt={category.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center text-xs text-zinc-500">No image</div>}</div><div className="min-h-20 p-3"><h2 className="text-xs font-bold md:text-sm">{category.name}</h2><p className="mt-2 line-clamp-2 text-[10px] leading-4 text-zinc-400">{category.desc || 'Explore our performance collection.'}</p></div></Link>)}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><div className="mb-8 text-center"><p className="text-[9px] font-bold uppercase tracking-[0.18em] text-red-600">Made for movement and your active lifestyle</p><h2 className="mt-2 text-2xl font-black text-zinc-950 md:text-3xl">Featured Products</h2></div><div className="grid grid-cols-2 gap-4 md:grid-cols-4">{featuredProducts.map((product) => <Link key={product.id} href={`/product/${product.slug}`} className="group rounded-lg bg-zinc-50 p-2 text-center transition hover:-translate-y-1 hover:shadow-md"><div className="flex aspect-square items-center justify-center overflow-hidden rounded-md bg-white">{product.thumbnail ? <img src={imageUrl(product.thumbnail)} alt={product.title} className="h-full w-full object-contain transition duration-500 group-hover:scale-105" /> : <span className="text-xs text-zinc-400">No image</span>}</div><h3 className="mt-3 line-clamp-1 text-[10px] font-bold text-zinc-950 md:text-xs">{product.title}</h3><p className="mt-1 text-[9px] text-zinc-500">Art # {product.art_no}</p></Link>)}</div>{!featuredProducts.length && <p className="text-center text-sm text-zinc-500">Featured products will appear here soon.</p>}</section>
        </main>
    </>;
}

const Welcome = () => {
  return (
    <div>Welcome</div>
  )
}

export default Welcome