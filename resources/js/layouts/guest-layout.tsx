import Footer from '@/components/frontend/footer'
import Navbar from '@/components/frontend/navbar'
import React from 'react'

const GuestLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <section>
            <Navbar />
            <section className=''>
                {children}
            </section>
            <Footer />
        </section>
    )
}

export default GuestLayout