import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Download from '../components/Download';
import About from '../components/About';
import Footer from '../components/Footer';

const HomePage = () => {
        return (
                <div className="homepage">
                        <Navbar />
                        <Hero />
                        <Features />
                        <About />
                        <Download />
                        <Footer />
                </div>
        );
};

export default HomePage;
