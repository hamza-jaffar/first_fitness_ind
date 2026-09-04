import Footer from '@/components/frontend/footer'
import Navbar from '@/components/frontend/navbar'
import React from 'react'

const GuestLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <section>
            <Navbar />
            <section className='p-4 max-w-7xl mx-auto w-full'>
                {children}
            </section>
            <Footer />
        </section>
    )
}

export default GuestLayout