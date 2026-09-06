import { structureCategories } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react'
import { MapPin, Mail, Phone, Instagram, Facebook, Linkedin, ChevronsRight } from 'lucide-react'

const Footer = () => {

    const { settings, categories } = usePage().props;
    const categoryLinks = structureCategories(categories);

    const quickLinks = [
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/about-us' },
        { label: 'Contact Us', href: '/contact-us' },
        { label: 'Fair & Exhibitions', href: '/production-tour' },
        { label: 'Sublimation Process', href: '/sublimation-process' },
        { label: 'Terms & Condition', href: '/terms-and-conditions' },
        { label: 'Privacy Policy', href: '/privacy-policy' }
    ]


    return (
        <footer
            style={{
                backgroundImage: `url('/assets/images/footer-bg.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
            className="w-full bg-[#1a1a1a] text-white relative"
        >
            <div className="border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
                    <div className="flex items-center gap-4 py-4 md:py-0 md:pr-6">
                        <span className="shrink-0 w-14 h-14 rounded-full bg-[#2a2a2a] flex items-center justify-center">
                            <MapPin size={22} />
                        </span>
                        <div>
                            <p className="text-xs uppercase tracking-wide text-white/60 font-semibold ">
                                Gym Location
                            </p>
                            <p className="text-lg font-bold hover:text-primary">
                                {settings?.location ?? '8th Km, Pasrur Road, Sialkot– 51310, Pakistan'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 py-4 md:py-0 md:px-6">
                        <span className="shrink-0 w-14 h-14 rounded-full bg-[#2a2a2a] flex items-center justify-center">
                            <Mail size={22} />
                        </span>
                        <div>
                            <p className="text-xs uppercase tracking-wide text-white/60 font-semibold ">
                                Email Address
                            </p>
                            <p className="text-lg font-bold hover:text-primary">
                                {settings?.email ?? 'info@firstfitnessind.com'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 py-4 md:py-0 md:pl-6">
                        <span className="shrink-0 w-14 h-14 rounded-full bg-[#2a2a2a] flex items-center justify-center">
                            <Phone size={22} />
                        </span>
                        <div>
                            <p className="text-xs uppercase tracking-wide text-white/60 font-semibold ">
                                Phone Number
                            </p>
                            <Link
                                href={`tel:${settings?.phone ?? '+925200000'}`}
                                className="text-lg font-bold hover:text-primary"
                            >
                                {settings?.phone ?? '+92 52 00000'}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-12">
                {/* Brand column */}
                <div>
                    <img
                        src={settings?.logo_white ? `/storage/${settings?.logo_white}` : '/assets/images/logo-white.png'}
                        alt={settings?.name ?? 'First Fitness'}
                        className="h-20 w-auto mb-5"
                    />
                    <p className="text-white/60 leading-relaxed max-w-xs">
                        We are one of the best Manufacturers and Exporters in the field of Boxing Equipment,
                        Martial Arts, MMA Gear and Fitness Equipment in Sialkot-Pakistan
                    </p>
                    <div className="flex items-center gap-3 mt-6">
                        <Link
                            href={settings?.instagram ?? '#'}
                            aria-label="Instagram"
                            className="w-9 h-9 rounded bg-white text-black flex items-center justify-center hover:bg-white/80 transition-colors"
                        >
                            <Instagram size={16} />
                        </Link>
                        <Link
                            href={settings?.facebook ?? '#'}
                            aria-label="Facebook"
                            className="w-9 h-9 rounded bg-white text-black flex items-center justify-center hover:bg-white/80 transition-colors"
                        >
                            <Facebook size={16} />
                        </Link>
                        <Link
                            href={settings?.linkedin ?? '#'}
                            aria-label="LinkedIn"
                            className="w-9 h-9 rounded bg-white text-black flex items-center justify-center hover:bg-white/80 transition-colors"
                        >
                            <Linkedin size={16} />
                        </Link>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-bold mb-2">Quick Links</h3>
                    <span className="block w-10 h-0.75 bg-primary mb-5" />
                    <ul className="space-y-3">
                        {quickLinks.map((link) => (
                            <li key={link.label}>
                                <Link
                                    href={link.href}
                                    className="flex items-center gap-2 text-white/50 hover:text-primary text-sm transition-colors"
                                >
                                    <ChevronsRight size={14} className="text-primary" />
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Categories Links */}
                <div>
                    <h3 className="text-lg font-bold mb-2">Categories Links</h3>
                    <span className="block w-10 h-0.75 bg-primary mb-5" />
                    <ul className="space-y-3">
                        {categoryLinks.map((link) => (
                            <li key={link.label}>
                                <Link
                                    href={link.href}
                                    className="flex items-center gap-2 text-white/50 hover:text-primary text-sm transition-colors"
                                >
                                    <ChevronsRight size={14} className="text-primary" />
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='bg-black/70 p-8 w-full text-center'>
                © 2026 First Fitness. All Rights Reserved. Designed By: <a href="https://www.degvora.com" className='hover:underline hover:text-primary'>Degvora</a>
            </div>
        </footer>
    )
}

export default Footer