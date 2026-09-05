import FrontendBreadcrumb from '@/components/frontend/breadcrumb'
import { Head } from '@inertiajs/react'
import { PageType } from '@/types'

const Page = ({ data }: { data: PageType }) => {
    const title = data.meta_title || data.name
    const description =
        data.meta_description ||
        `${data.name} - Learn more about First Fitness and our products and services.`

    const ogTitle = data.og_title || title
    const ogDescription = data.og_description || description

    return (
        <div>
            <Head>
                {/* Basic SEO */}
                <title>{title}</title>

                <meta
                    name="description"
                    content={description}
                />

                <meta
                    name="robots"
                    content={data.status === 'publish' ? 'index, follow' : 'noindex, nofollow'}
                />

                {/* Canonical */}
                {data.canonical_url && (
                    <link
                        rel="canonical"
                        href={data.canonical_url}
                    />
                )}

                {/* Open Graph */}
                <meta
                    property="og:title"
                    content={ogTitle}
                />

                <meta
                    property="og:description"
                    content={ogDescription}
                />

                <meta
                    property="og:type"
                    content="website"
                />

                {data.canonical_url && (
                    <meta
                        property="og:url"
                        content={data.canonical_url}
                    />
                )}

                {data.og_image && (
                    <meta
                        property="og:image"
                        content={data.og_image}
                    />
                )}

                {/* Twitter / X */}
                <meta
                    name="twitter:card"
                    content={data.og_image ? 'summary_large_image' : 'summary'}
                />

                <meta
                    name="twitter:title"
                    content={ogTitle}
                />

                <meta
                    name="twitter:description"
                    content={ogDescription}
                />

                {data.og_image && (
                    <meta
                        name="twitter:image"
                        content={data.og_image}
                    />
                )}
            </Head>

            <FrontendBreadcrumb name={data.name} />

            <main
                className="
                    max-w-5xl
                    mx-auto
                    w-full
                    my-15
                    [&_h1]:text-4xl
                    [&_h1]:font-bold
                    [&_h1]:mb-6
                    [&_h2]:text-2xl
                    [&_h2]:font-bold
                    [&_h2]:mt-8
                    [&_h2]:mb-4
                    [&_h3]:text-xl
                    [&_h3]:font-bold
                    [&_h3]:mt-6
                    [&_h3]:mb-3
                    [&_p]:my-4
                    [&_ul]:list-disc
                    [&_ul]:ml-6
                    [&_ol]:list-decimal
                    [&_ol]:ml-6
                    [&_li]:my-1
                    [&_a]:underline
                "
                dangerouslySetInnerHTML={{
                    __html: data.content || '',
                }}
            />
        </div>
    )
}

export default Page