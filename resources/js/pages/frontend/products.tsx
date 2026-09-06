import FrontendBreadcrumb from "@/components/frontend/breadcrumb"
import { CategoryType } from "@/types/data"
import { usePage } from "@inertiajs/react"
import { ArrowRight } from "lucide-react"

type Props = {
    category: CategoryType
}

const Products = ({ category }: Props) => {
    const { categories } = usePage().props

    return (
        <section>
            <FrontendBreadcrumb name={category.name} />

            <section className="flex gap-2 w-full max-w-6xl mx-auto my-15">
                <div className="p-7 rounded-2xl bg-gray-100">
                    <h1 className="font-bold text-lg">
                        {category.name}
                    </h1>

                    <div>
                        {categories
                            .filter(
                                (child) =>
                                    child.parent_category_id === category.id
                            )
                            .map((child) => (
                                <a
                                    key={child.id}
                                    href={`/category/${category.slug}/${child.slug}`}
                                    className="flex items-center gap-3 py-3 text-sm text-gray-400 font-medium border-b border-gray-200 last:border-b-0 hover:text-black transition-colors"
                                >
                                    <ArrowRight size={15} />
                                    <span>{child.name}</span>
                                </a>
                            ))}
                    </div>
                </div>
            </section>
        </section>
    )
}

export default Products