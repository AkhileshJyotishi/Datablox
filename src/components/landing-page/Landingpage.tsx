import React from 'react'
import Header from './Header'
import HeroSection from './HeroSection'
import Section1 from './Section1'
import Features from './Features'
import JoiningPage from './JoiningPage'
import Footer from './Footer'

export default function Landingpage() {
    return (
        <div className='bg-[#130E1C]'>
            <Header />
            <HeroSection />
            <Features />
            <JoiningPage />
            <Footer />
        </div>
    )
}
