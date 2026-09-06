import React from 'react'

interface QuoteButtonProps {
    children: React.ReactNode
    className?: string
    href?: string
    target?: string
    rel?: string
}

const FrontendButton = ({ children, className = '', href, target, rel }: QuoteButtonProps) => {
    const classes = `
                inline-flex items-center justify-center
                bg-red-600 hover:bg-[#202020]
                text-white text-sm font-bold
                px-7 py-3.5
                rounded-[7px] duration-300
                -skew-x-12
                hover:skew-x-12
                transition-all
                ${className}
            `;

    if (href) {
        return <a href={href} target={target} rel={rel} className={classes}>{children}</a>;
    }

    return (
        <button className={classes}>
            {children}
        </button>
    )
}

export default FrontendButton