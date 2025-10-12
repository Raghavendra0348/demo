import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Download from '../components/Download';
import About from '../components/About';
import Footer from '../components/Footer';

const HomePage = () => {
        useEffect(() => {
                // Navbar scroll effect
                const handleScroll = () => {
                        const navbar = document.querySelector('.navbar-custom');
                        if (navbar) {
                                if (window.scrollY > 50) {
                                        navbar.style.background = 'rgba(255,255,255,0.98)';
                                        navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.15)';
                                } else {
                                        navbar.style.background = 'rgba(255,255,255,0.95)';
                                        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
                                }
                        }
                };

                window.addEventListener('scroll', handleScroll);

                // Intersection Observer for animations
                const observerOptions = {
                        threshold: 0.1,
                        rootMargin: '0px 0px -50px 0px'
                };

                const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                        if (entry.target.classList.contains('feature-card')) {
                                                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                                        }
                                }
                        });
                }, observerOptions);

                // Observe feature cards
                document.querySelectorAll('.feature-card').forEach(card => {
                        observer.observe(card);
                });

                return () => {
                        window.removeEventListener('scroll', handleScroll);
                        observer.disconnect();
                };
        }, []);

        return (
                <div className="HomePage">
                        <Navbar />
                        <Hero />
                        <Features />
                        <Download />
                        <About />
                        <Footer />
                </div>
        );
};

export default HomePage;
