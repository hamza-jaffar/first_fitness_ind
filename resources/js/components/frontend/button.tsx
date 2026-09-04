import React from 'react'

interface QuoteButtonProps {
    children: React.ReactNode
    className?: string
}

const FrontendButton = ({ children, className = '' }: QuoteButtonProps) => {
    return (
        <button
            className={`
                inline-flex items-center justify-center
                bg-red-600 hover:bg-[#202020]
                text-white text-sm font-bold
                px-7 py-3.5
                rounded-[7px] duration-300
                -skew-x-12
                hover:skew-x-12
                transition-all
                ${className}
            `}
        >
            {children}
        </button>
    )
}

export default FrontendButton