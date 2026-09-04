import { usePage } from '@inertiajs/react'
import React, { useState } from 'react'
import { Link } from '@inertiajs/react'
import { Mail, Phone, ChevronDown, ChevronRight, Menu, X, Facebook, Instagram, Linkedin } from 'lucide-react'

const Navbar = () => {

    const { settings } = usePage().props;
    const [productsOpen, setProductsOpen] = useState<boolean>(false)
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
    const [mobileOpen, setMobileOpen] = useState<boolean>(false)
    const [mobileSubOpen, setMobileSubOpen] = useState<string | null>(null)

    const productLinks = [
        { label: 'Boxing Gear', href: '/category/boxing-gear' },
        { label: 'Martial Arts', href: '/category/martial-arts' },
        { label: 'MMA Gear', href: '/category/mma-gear' },
        { label: 'Casual Wears', href: '/category/casual-wears' },
        { label: 'Sports Uniforms', href: '/category/sports-uniforms' },
        { label: 'Fitness Wears', href: '/category/fitness-wears' },
        {
            label: 'Uniforms',
            href: '/category/uniforms',
            children: [
                { label: 'Company Uniforms', href: '/category/uniforms/company-uniforms' },
                { label: 'Corporate Uniforms', href: '/category/uniforms/corporate-uniforms' },
                { label: 'Hotel Uniforms', href: '/category/uniforms/hotel-uniforms' },
                { label: 'Industrial Uniforms', href: '/category/uniforms/industrial-uniforms' },
                { label: 'Medical Uniforms', href: '/category/uniforms/medical-uniforms' },
                { label: 'Labor Uniforms', href: '/category/uniforms/labor-uniforms' },
                { label: 'Militaria Uniforms', href: '/category/uniforms/militaria-uniforms' },
                { label: 'School Uniforms', href: '/category/uniforms/school-uniforms' },
                { label: 'Team Uniforms', href: '/category/uniforms/team-uniforms' },
            ],
        },
    ]

    return (
        <header className="w-full bg-white shadow-sm relative z-50">
            {/* Top strip */}
            <div className="relative border-b border-black/10 max-w-6xl mx-auto">
                <span
                    className="absolute -top-6 left-0 w-px h-16 bg-black/10 origin-top"
                    style={{ transform: 'rotate(-20deg)' }}
                />
                <span
                    className="absolute -top-6 right-0 w-px h-16 bg-black/20 origin-top"
                    style={{ transform: 'rotate(20deg)' }}
                />
                <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-6 text-red-600 font-medium">
                        <a
                            href={`mailto:${settings?.email ?? 'info@firstfitnessind.com'}`}
                            className="flex items-center gap-2 hover:text-red-700 transition-colors"
                        >
                            <Mail size={14} />
                            {settings?.email ?? 'info@firstfitnessind.com'}
                        </a>
                        <a
                            href={`tel:${settings?.phone ?? '+925200000'}`}
                            className="flex items-center gap-2 hover:text-red-700 transition-colors"
                        >
                            <Phone size={14} />
                            {settings?.phone ?? '+92 52 00000'}
                        </a>
                    </div>

                    <div className="flex items-center gap-4 text-red-600">
                        <a href={settings?.facebook ?? '#'} aria-label="Facebook" className="hover:text-red-700 transition-colors">
                            <Facebook size={13} />
                        </a>
                        <a href={settings?.instagram ?? '#'} aria-label="Instagram" className="hover:text-red-700 transition-colors">
                            <Instagram size={13} />
                        </a>
                        <a href={settings?.linkedin ?? '#'} aria-label="LinkedIn" className="hover:text-red-700 transition-colors">
                            <Linkedin size={13} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Main nav row */}
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
                {/* Logo */}
                <Link href="/" className="shrink-0">
                    <img
                        src={settings?.logo_black ? `/storage/${settings?.logo_black}` : '/assets/images/logo-white.png'}
                        alt={settings?.name ?? 'First Fitness'}
                        className="h-12 w-auto"
                    />
                </Link>

                {/* Desktop nav links */}
                <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold tracking-wide text-black">
                    <Link href="/" className="hover:text-red-600 transition-colors">HOME</Link>
                    <Link href="/about" className="hover:text-red-600 transition-colors">ABOUT</Link>

                    <div
                        className="relative"
                        onMouseEnter={() => setProductsOpen(true)}
                        onMouseLeave={() => {
                            setProductsOpen(false)
                            setActiveSubmenu(null)
                        }}
                    >
                        <button className="flex items-center gap-1 hover:text-red-600 transition-colors">
                            OUR PRODUCTS
                            <ChevronDown size={14} className={`transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {productsOpen && (
                            <div className="absolute top-full left-0 pt-3 w-56">
                                <ul className="bg-white shadow-lg rounded-md py-2 border border-black/5">
                                    {productLinks.map((link) => (
                                        <li
                                            key={link.label}
                                            className="relative"
                                            onMouseEnter={() => link.children && setActiveSubmenu(link.label)}
                                            onMouseLeave={() => link.children && setActiveSubmenu(null)}
                                        >
                                            <Link
                                                href={link.href}
                                                className={`flex items-center justify-between px-4 py-2 text-sm font-normal transition-colors ${activeSubmenu === link.label
                                                    ? 'text-red-600 bg-gray-50'
                                                    : 'text-black/80 hover:bg-gray-50 hover:text-red-600'
                                                    }`}
                                            >
                                                {link.label}
                                                {link.children && <ChevronRight size={14} />}
                                            </Link>

                                            {/* Flyout submenu */}
                                            {link.children && activeSubmenu === link.label && (
                                                <div className="absolute top-0 left-full pl-1 w-56">
                                                    <ul className="bg-white shadow-lg rounded-md py-2 border border-black/5">
                                                        {link.children.map((child) => (
                                                            <li key={child.label}>
                                                                <Link
                                                                    href={child.href}
                                                                    className="block px-4 py-2 text-sm font-normal text-black/80 hover:bg-gray-50 hover:text-red-600 transition-colors"
                                                                >
                                                                    {child.label}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <Link href="/production-tour" className="hover:text-red-600 transition-colors">PRODUCTION TOUR</Link>
                    <Link href="/contact" className="hover:text-red-600 transition-colors">CONTACT US</Link>
                </nav>

                {/* Right side: CTA + hamburger */}
                <div className="flex items-center gap-3">
                    <a
                        href={settings?.phone ?? 'https://wa.me/925200000'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:flex items-center gap-2 bg-red-600 hover:bg-red-700 transition-colors text-white text-sm font-semibold px-5 py-3 rounded-full"
                    >
                        <Phone size={16} />
                        Get a Quote
                    </a>

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                        className="w-11 h-11 shrink-0 md:hidden rounded-full border border-black/15 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="lg:hidden border-t border-black/5 px-6 py-4 space-y-1 text-sm font-semibold text-black">
                    <Link href="/" className="block py-2 hover:text-red-600">HOME</Link>
                    <Link href="/about" className="block py-2 hover:text-red-600">ABOUT</Link>

                    <button
                        onClick={() => setProductsOpen(!productsOpen)}
                        className="w-full flex items-center justify-between py-2 hover:text-red-600"
                    >
                        OUR PRODUCTS
                        <ChevronDown size={14} className={`transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {productsOpen && (
                        <div className="pl-4">
                            {productLinks.map((link) => (
                                <div key={link.label}>
                                    {link.children ? (
                                        <>
                                            <button
                                                onClick={() => setMobileSubOpen(mobileSubOpen === link.label ? null : link.label)}
                                                className="w-full flex items-center justify-between py-2 text-sm font-normal text-black/70 hover:text-red-600"
                                            >
                                                {link.label}
                                                <ChevronDown
                                                    size={12}
                                                    className={`transition-transform ${mobileSubOpen === link.label ? 'rotate-180' : ''}`}
                                                />
                                            </button>
                                            {mobileSubOpen === link.label && (
                                                <div className="pl-4">
                                                    {link.children.map((child) => (
                                                        <Link
                                                            key={child.label}
                                                            href={child.href}
                                                            className="block py-2 text-sm font-normal text-black/60 hover:text-red-600"
                                                        >
                                                            {child.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className="block py-2 text-sm font-normal text-black/70 hover:text-red-600"
                                        >
                                            {link.label}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    <Link href="/production-tour" className="block py-2 hover:text-red-600">PRODUCTION TOUR</Link>
                    <Link href="/contact" className="block py-2 hover:text-red-600">CONTACT US</Link>

                    <a
                        href={settings?.phone ?? 'https://wa.me/925200000'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-red-600 text-white text-sm font-semibold px-5 py-3 rounded-full mt-3"
                    >
                        <Phone size={16} />
                        Get a Quote
                    </a>
                </div>
            )}
        </header>
    )
}

export default Navbar