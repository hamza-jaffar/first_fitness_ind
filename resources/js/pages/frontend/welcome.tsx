import React, { useState, useEffect } from 'react'
import { Head, Link, usePage } from '@inertiajs/react'
import {
    ChevronLeft,
    ChevronRight,
    Phone,
    CheckCircle2,
    Plus,
    Minus,
    Boxes,
    PencilRuler,
    Layers,
    Sparkles
} from 'lucide-react'
import FrontendButton from '@/components/frontend/button'

interface SliderItem {
    id: number
    badge_text?: string
    title?: string
    desc?: string
    button_text?: string
    button_url?: string
    image?: string
    status?: string
}

interface CategoryItem {
    id: number
    name: string
    slug: string
    image?: string | null
    desc?: string | null
}

interface ProductItem {
    id: number
    title: string
    slug: string
    art_no?: string
    thumbnail?: string
}

interface WhoWeAreTab {
    title: string
    description: string
}

interface WhoWeAreContent {
    badge_text?: string
    title?: string
    description?: string
    main_image?: string
    overflow_image?: string
    button?: {
        text?: string
        url?: string
    }
    tabs?: WhoWeAreTab[]
}

interface FeatureCard {
    title: string
    description: string
    image?: string
}

interface FeatureContent {
    badge_text?: string
    title?: string
    cards?: FeatureCard[]
}

interface WhyChooseUsCard {
    title: string
    description: string
}

interface WhyChooseUsContent {
    badge_text?: string
    title?: string
    description?: string
    image?: string
    cards?: WhyChooseUsCard[]
}

interface WelcomeProps {
    sliders?: SliderItem[]
    frontendData?: {
        'who-we-are'?: WhoWeAreContent
        'our-feature'?: FeatureContent
        'why-choose-us'?: WhyChooseUsContent
        'our-category'?: {
            badge_text?: string
            title?: string
        }
        'featured-products'?: {
            badge_text?: string
            title?: string
        }
    }
    categories?: CategoryItem[]
    featuredProducts?: ProductItem[]
}

const getImagePath = (path?: string) => {
    if (!path) return ''
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
        return path
    }
    if (path.startsWith('/storage/')) {
        return path
    }
    if (path.startsWith('/')) {
        return `/storage${path}`
    }
    return `/storage/${path}`
}

const Welcome = ({ sliders = [], frontendData = {}, categories = [], featuredProducts = [] }: WelcomeProps) => {
    const { settings } = usePage().props as { settings?: Record<string, string> }

    // Fallback Sliders if DB sliders empty
    const defaultSliders: SliderItem[] = [
        {
            id: 1,
            badge_text: 'WELCOME TO FIRST FITNESS',
            title: 'Fitness Equipment .',
            desc: 'CUSTOM MADE BOXING GLOVES EQUIPMENT WHOLESALE MANUFACTURER SUPPLIER',
            button_text: 'Explore Product',
            button_url: '/products',
            image: '/banners/PoDKswyqkum60JkNO6o2CE3GfskyrhxBayvkI2d0.png'
        },
        {
            id: 2,
            badge_text: 'WELCOME TO FIRST FITNESS',
            title: 'Boxing Gloves and Equipment .',
            desc: 'CUSTOM MADE BOXING GLOVES EQUIPMENT WHOLESALE MANUFACTURER SUPPLIER',
            button_text: 'Explore Product',
            button_url: '/products',
            image: '/banners/uJjUl1r1bnrISUULwphPH5CfQiSgz7hDlCUhYJ2X.png'
        }
    ]

    const activeSliders = sliders.length > 0 ? sliders : defaultSliders

    // Slider State
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

    useEffect(() => {
        if (activeSliders.length <= 1) return
        const timer = setInterval(() => {
            setCurrentSlideIndex((prev) => (prev + 1) % activeSliders.length)
        }, 6000)
        return () => clearInterval(timer)
    }, [activeSliders.length])

    const nextSlide = () => {
        setCurrentSlideIndex((prev) => (prev + 1) % activeSliders.length)
    }

    const prevSlide = () => {
        setCurrentSlideIndex((prev) => (prev - 1 + activeSliders.length) % activeSliders.length)
    }

    // Who We Are Section Data
    const whoWeAreData = frontendData['who-we-are'] || {}
    const [activeTab, setActiveTab] = useState(0)

    // Categories Section Data
    const categoryHeader = frontendData['our-category'] || {}
    const fallbackCategories: CategoryItem[] = [
        {
            id: 1,
            name: 'Boxing Gear',
            slug: 'boxing-gear',
            image: 'categories/cat1.jpg',
            desc: 'We aim to provide premium quality combat gear'
        },
        {
            id: 2,
            name: 'Martial Arts',
            slug: 'martial-arts',
            image: 'categories/cat3.jpg',
            desc: 'We aim to provide premium quality martial arts uniforms'
        },
        {
            id: 3,
            name: 'MMA Gear',
            slug: 'mma-gear',
            image: 'categories/cat4.jpg',
            desc: 'We aim to provide premium quality MMA equipment'
        },
        {
            id: 4,
            name: 'Weight Lifting',
            slug: 'casual-wears',
            image: 'categories/cat2.jpg',
            desc: 'We aim to provide premium quality lifting accessories'
        }
    ]

    const displayCategories = categories.length > 0
        ? categories.filter(c => c.image).slice(0, 4)
        : fallbackCategories

    // Featured Products Header Data
    const featuredHeader = frontendData['featured-products'] || {}

    // Our Features / Work Flow Data
    const workFlowData = frontendData['our-feature'] || {}
    const workFlowCards = workFlowData.cards || [
        {
            title: 'Mockup',
            description: 'Our skilled designers produce a mockup prototype for samples of your brand to have a more realistic appearance.',
            image: '/frontend/icon1.png'
        },
        {
            title: 'Alteration and approval',
            description: 'Our top priority is your satisfaction and approval. Initiate the sample manufacturing if any adjustments are needed.',
            image: '/frontend/icon2.png'
        },
        {
            title: 'Designing',
            description: 'Our experienced Team provides OEM/ODM Customization services to bring your ideas to reality.',
            image: '/frontend/icon3.png'
        },
        {
            title: 'Mass Production',
            description: 'We start mass manufacturing within the given timeline once your prototype or samples have been approved.',
            image: '/frontend/icon4.png'
        }
    ]

    // Why Choose Us Data
    const whyChooseUsData = frontendData['why-choose-us'] || {}
    const whyChooseUsCards = whyChooseUsData.cards || [
        {
            title: 'Quality Focus',
            description: 'We aim to provide the best quality as per our customer expectations.'
        },
        {
            title: 'Best Prices',
            description: 'We offer premium products at the lowest price as per our customer expectations.'
        },
        {
            title: 'Worldwide Shipping',
            description: 'We offer worldwide shipping using top services like DHL / Fedex.'
        },
        {
            title: 'Free Expert Help',
            description: 'Need a quick hand to start? Get Free Consultation with our experts via WhatsApp.'
        }
    ]

    const [expandedAccordion, setExpandedAccordion] = useState<number | null>(3) // Free Expert Help open by default

    const currentSlide = activeSliders[currentSlideIndex] || defaultSliders[0]

    return (
        <div className="min-h-screen bg-white text-zinc-900 overflow-x-hidden font-sans">
            <Head>
                <title>First Fitness Industries | Wholesale Boxing & Fitness Equipment Manufacturer</title>
                <meta
                    name="description"
                    content="First Fitness Industries is a leading manufacturer and exporter of wholesale boxing equipment, martial arts, MMA gear, and fitness equipment in Sialkot, Pakistan."
                />
            </Head>

            {/* ==================== 1. HERO SLIDER SECTION ==================== */}
            <section className="relative w-full h-[650px] sm:h-[720px] lg:h-[800px] bg-zinc-950 overflow-hidden flex items-center">
                {/* Background Slide Image with Fade Animation */}
                {activeSliders.map((slide, idx) => (
                    <div
                        key={slide.id || idx}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                            idx === currentSlideIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                        }`}
                    >
                        <img
                            src={getImagePath(slide.image)}
                            alt={slide.title || 'First Fitness'}
                            className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000 ease-linear"
                        />
                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/30" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                    </div>
                ))}

                {/* Left / Right Slider Controls */}
                {activeSliders.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            aria-label="Previous Slide"
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/20 bg-black/40 text-white flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300 backdrop-blur-sm group"
                        >
                            <ChevronLeft size={22} className="group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                        <button
                            onClick={nextSlide}
                            aria-label="Next Slide"
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/20 bg-black/40 text-white flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300 backdrop-blur-sm group"
                        >
                            <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </>
                )}

                {/* Slide Text Content Container */}
                <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-12">
                    <div className="max-w-2xl text-white space-y-6">
                        {/* Red Badge */}
                        <div className="inline-flex items-center gap-2 text-red-500 text-xs sm:text-sm font-bold tracking-widest uppercase">
                            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                            {currentSlide.badge_text || 'WELCOME TO FIRST FITNESS'}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none">
                            {currentSlide.title ? (
                                <>
                                    {currentSlide.title.replace(/\.$/, '')}
                                    <span className="text-red-600">.</span>
                                </>
                            ) : (
                                <>
                                    Fitness <br />
                                    <span className="text-transparent border-text stroke-white">Equipment</span>
                                    <span className="text-red-600">.</span>
                                </>
                            )}
                        </h1>

                        {/* Description Subtext */}
                        <p className="text-gray-300 text-xs sm:text-sm font-semibold tracking-wider uppercase leading-relaxed max-w-xl flex items-start gap-2">
                            <span className="text-red-600 font-bold mt-1">•</span>
                            {currentSlide.desc || 'CUSTOM MADE BOXING GLOVES EQUIPMENT WHOLESALE MANUFACTURER SUPPLIER'}
                        </p>

                        {/* Action Buttons */}
                        <div className="pt-4 flex flex-wrap items-center gap-4">
                            <FrontendButton href={currentSlide.button_url || '/products'}>
                                {currentSlide.button_text || 'Explore Product'}
                            </FrontendButton>

                            <a
                                href="/contact-us"
                                className="inline-flex items-center justify-center bg-red-600 hover:bg-[#202020] text-white text-sm font-bold px-7 py-3.5 rounded-[7px] duration-300 -skew-x-12 hover:skew-x-12 transition-all"
                            >
                                Inquire Product
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Jagged Brush Divider */}
                <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none overflow-hidden leading-none">
                    <svg className="w-full h-8 sm:h-14 text-white fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0 C150,90 350,-40 500,50 C650,140 900,10 1200,40 L1200,120 L0,120 Z" />
                    </svg>
                </div>
            </section>

            {/* ==================== 2. WHO WE ARE SECTION ==================== */}
            <section className="py-20 lg:py-28 px-6 max-w-7xl mx-auto bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Left Side: Images */}
                    <div className="lg:col-span-5 relative">
                        <div className="relative mx-auto max-w-md lg:max-w-none">
                            {/* Main Image */}
                            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-100">
                                <img
                                    src={getImagePath(whoWeAreData.main_image || '/frontend/about_1-1.jpg')}
                                    alt={whoWeAreData.title || 'First Fitness Industry Factory'}
                                    className="w-full h-[450px] sm:h-[520px] object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            {/* Secondary Overlapping Image */}
                            <div className="absolute -bottom-8 -right-4 sm:-bottom-10 sm:-right-8 w-3/5 sm:w-1/2 rounded-xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                                <img
                                    src={getImagePath(whoWeAreData.overflow_image || '/frontend/about_1-2.jpg')}
                                    alt="First Fitness Workshop"
                                    className="w-full h-36 sm:h-44 object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Content */}
                    <div className="lg:col-span-7 space-y-6 pt-6 lg:pt-0">
                        {/* Red Badge */}
                        <div className="inline-flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-red-600" />
                            {whoWeAreData.badge_text || 'Who We Are'}
                        </div>

                        {/* Main Title */}
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight">
                            {whoWeAreData.title || 'Wholesale Boxing Gloves Manufacturers & Supplier'}
                        </h2>

                        {/* Description */}
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                            {whoWeAreData.description ||
                                'Most manufacturing relationships fail not because of a lack of machinery, but because of a breakdown in translation. You send a detailed design file; what arrives months later feels like a compromise. At First Fitness Industries, we have spent over 15 years rewriting that narrative from Sialkot, Pakistan.'}
                        </p>

                        {/* Tabs (Mission, Vision, Goal) */}
                        {whoWeAreData.tabs && whoWeAreData.tabs.length > 0 && (
                            <div className="pt-4 space-y-4">
                                {/* Tab Header Buttons */}
                                <div className="flex border-b border-gray-200 gap-2 sm:gap-6 overflow-x-auto pb-1">
                                    {whoWeAreData.tabs.map((tab, index) => (
                                        <button
                                            key={tab.title}
                                            onClick={() => setActiveTab(index)}
                                            className={`py-2 px-3 sm:px-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap relative ${
                                                activeTab === index
                                                    ? 'text-red-600 border-b-2 border-red-600'
                                                    : 'text-gray-500 hover:text-zinc-900'
                                            }`}
                                        >
                                            {tab.title}
                                        </button>
                                    ))}
                                </div>

                                {/* Active Tab Content Box */}
                                <div className="p-5 sm:p-6 bg-red-50/60 rounded-xl border border-red-100 flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                                        <Sparkles size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-zinc-900 mb-1">
                                            {whoWeAreData.tabs[activeTab]?.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                            {whoWeAreData.tabs[activeTab]?.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Bottom Row: Button & Phone Callout */}
                        <div className="pt-6 flex flex-wrap items-center gap-6">
                            <FrontendButton href={whoWeAreData.button?.url || '/about-us'}>
                                {whoWeAreData.button?.text || 'Learn More'}
                            </FrontendButton>

                            <a
                                href={`tel:${settings?.phone || '+923186157947'}`}
                                className="flex items-center gap-3 text-zinc-900 group hover:text-red-600 transition-colors"
                            >
                                <span className="w-12 h-12 rounded-full border border-red-600/30 bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                                    <Phone size={18} />
                                </span>
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold uppercase">Have Questions?</p>
                                    <p className="text-sm font-extrabold">{settings?.phone || '+92 318 6157947'}</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== 3. OUR CATEGORIES SECTION (CURVED ARCH DARK CONTAINER) ==================== */}
            <section className="relative w-full bg-[#111111] text-white pt-20 pb-28 px-6 rounded-t-[40px] md:rounded-t-[100px] shadow-2xl">
                <div className="max-w-7xl mx-auto text-center space-y-4 mb-16">
                    {/* Badge */}
                    <div className="inline-block">
                        <span className="text-xs uppercase font-bold text-red-500 bg-red-950/60 border border-red-800/40 px-5 py-2 rounded-full tracking-wider">
                            {categoryHeader.badge_text || 'We Build premium quality as per our customer expectations.'}
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-wider text-white">
                        {categoryHeader.title || 'OUR CATEGORIES'}
                    </h2>
                </div>

                {/* Categories Cards Grid */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayCategories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/products?category=${cat.slug}`}
                            className="group relative h-96 sm:h-[420px] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-xl flex flex-col justify-end p-6 hover:border-red-600/60 transition-all duration-500"
                        >
                            {/* Category Background Image */}
                            <img
                                src={getImagePath(cat.image || 'categories/cat1.jpg')}
                                alt={cat.name}
                                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                            />

                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:via-black/50 transition-colors" />

                            {/* Category Title & Desc */}
                            <div className="relative z-10 space-y-2 transform group-hover:-translate-y-1 transition-transform duration-300">
                                <h3 className="text-xl font-black text-white uppercase group-hover:text-red-500 transition-colors">
                                    {cat.name}
                                </h3>
                                <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed font-medium">
                                    {cat.desc || 'We aim to provide premium quality as per customer specifications.'}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ==================== 4. FEATURED PRODUCTS SECTION ==================== */}
            <section className="py-20 lg:py-28 px-6 max-w-7xl mx-auto bg-white">
                <div className="text-center space-y-4 mb-16">
                    {/* Badge */}
                    <div className="inline-block">
                        <span className="text-xs uppercase font-semibold text-gray-700 bg-gray-100 border border-gray-200 px-5 py-2 rounded-full tracking-wider">
                            {featuredHeader.badge_text || 'We aim to provide the best quality as per our customer expectations.'}
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900">
                        {featuredHeader.title || 'Featured Products'}
                    </h2>
                </div>

                {/* Products Grid */}
                {featuredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {featuredProducts.map((prod) => (
                            <Link
                                key={prod.id}
                                href={`/product/${prod.slug}`}
                                className="group bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                            >
                                <div className="h-56 w-full bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center p-4 mb-4 relative group-hover:bg-gray-100/80 transition-colors">
                                    <img
                                        src={getImagePath(prod.thumbnail)}
                                        alt={prod.title}
                                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="text-center space-y-1">
                                    <h3 className="text-sm font-bold text-zinc-900 group-hover:text-red-600 transition-colors capitalize line-clamp-1">
                                        {prod.title}
                                    </h3>
                                    {prod.art_no && (
                                        <p className="text-xs text-gray-400 font-medium">
                                            Art# {prod.art_no}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 text-sm py-12">
                        No featured products found.
                    </div>
                )}
            </section>

            {/* ==================== 5. OUR WORK FLOW SECTION ==================== */}
            <section className="relative bg-[#0d0d0d] text-white py-20 lg:py-28 px-6 border-t border-zinc-900">
                {/* Section Header */}
                <div className="max-w-7xl mx-auto space-y-4 mb-16">
                    <div className="inline-flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-red-600" />
                        {workFlowData.badge_text || 'OUR FEATURES'}
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                        {workFlowData.title || 'Our Work Flow'}
                    </h2>
                </div>

                {/* Workflow Cards Grid */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {workFlowCards.map((card, idx) => (
                        <div
                            key={card.title || idx}
                            className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-6 hover:border-red-600/60 transition-all duration-300 flex flex-col justify-between group"
                        >
                            <div className="space-y-4">
                                {/* Card Icon */}
                                <div className="w-12 h-12 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-all duration-300">
                                    {card.image ? (
                                        <img
                                            src={getImagePath(card.image)}
                                            alt={card.title}
                                            className="w-6 h-6 object-contain filter invert brightness-200 group-hover:invert-0"
                                        />
                                    ) : (
                                        idx === 0 ? <PencilRuler size={22} /> :
                                        idx === 1 ? <CheckCircle2 size={22} /> :
                                        idx === 2 ? <Layers size={22} /> : <Boxes size={22} />
                                    )}
                                </div>

                                {/* Title */}
                                <h3 className="text-base font-bold text-white group-hover:text-red-500 transition-colors">
                                    {card.title}
                                </h3>

                                {/* Description */}
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ==================== 6. WHY CHOOSE US SECTION ==================== */}
                <div className="max-w-7xl mx-auto mt-24 pt-16 border-t border-zinc-800/80 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Left Column: Workshop Image */}
                    <div className="lg:col-span-5 relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 bg-zinc-900">
                            <img
                                src={getImagePath(whyChooseUsData.image || '/frontend/wcu_1-2.jpg')}
                                alt={whyChooseUsData.title || 'Why Choose Us'}
                                className="w-full h-[400px] sm:h-[480px] object-cover"
                            />

                            {/* Floating Red Badge */}
                            <div className="absolute -bottom-4 -right-4 sm:bottom-6 sm:right-6 bg-red-600 text-white rounded-xl p-4 sm:p-5 shadow-2xl border-2 border-red-500 flex items-center gap-4">
                                <span className="text-3xl sm:text-4xl font-black">25+</span>
                                <div className="text-xs font-bold uppercase leading-tight">
                                    Years <br /> Experience
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Content & Accordions */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Red Badge */}
                        <div className="inline-flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-red-600" />
                            {whyChooseUsData.badge_text || 'WHY CHOOSE US?'}
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                            {whyChooseUsData.title || 'Why Choose Us?'}
                        </h2>

                        {/* Description */}
                        <p className="text-sm text-gray-300 leading-relaxed">
                            {whyChooseUsData.description ||
                                'We offer low minimum order quantity and the best lead time. We have strict quality control checks to ensure customer satisfaction.'}
                        </p>

                        {/* Accordion / Cards List */}
                        <div className="space-y-3 pt-2">
                            {whyChooseUsCards.map((item, index) => {
                                const isExpanded = expandedAccordion === index
                                return (
                                    <div
                                        key={item.title || index}
                                        className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                                            isExpanded
                                                ? 'bg-zinc-900 border-red-600/70 shadow-lg'
                                                : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                                        }`}
                                    >
                                        <button
                                            onClick={() => setExpandedAccordion(isExpanded ? null : index)}
                                            className="w-full p-4 flex items-center justify-between text-left focus:outline-none"
                                        >
                                            <span className="text-sm font-bold text-white flex items-center gap-3">
                                                <span className={`w-2 h-2 rounded-full ${isExpanded ? 'bg-red-600' : 'bg-zinc-600'}`} />
                                                {item.title}
                                            </span>
                                            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-colors ${
                                                isExpanded ? 'bg-red-600 text-white' : 'bg-zinc-800 text-gray-400'
                                            }`}>
                                                {isExpanded ? <Minus size={14} /> : <Plus size={14} />}
                                            </span>
                                        </button>

                                        {isExpanded && (
                                            <div className="px-4 pb-4 pt-1 text-xs text-gray-400 leading-relaxed border-t border-zinc-800/50">
                                                {item.description}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Bottom Brush Edge Transition */}
                <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none overflow-hidden leading-none">
                    <svg className="w-full h-8 sm:h-12 text-[#1a1a1a] fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0 C150,90 350,-40 500,50 C650,140 900,10 1200,40 L1200,120 L0,120 Z" />
                    </svg>
                </div>
            </section>
        </div>
    )
}

export default Welcome