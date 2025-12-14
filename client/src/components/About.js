import React, { useState, useEffect, useRef } from 'react';
import './About.css';

const About = () => {
        const [isVisible, setIsVisible] = useState(false);
        const sectionRef = useRef(null);

        useEffect(() => {
                const observer = new IntersectionObserver(
                        ([entry]) => {
                                if (entry.isIntersecting) {
                                        setIsVisible(true);
                                }
                        },
                        { threshold: 0.2 }
                );

                if (sectionRef.current) {
                        observer.observe(sectionRef.current);
                }

                return () => observer.disconnect();
        }, []);

        const cards = [
                {
                        icon: 'fa-bullseye',
                        title: 'Our Mission',
                        description: 'To create the most engaging and trustworthy video-first shopping experience, connecting creators, sellers, and shoppers in an authentic way.',
                        gradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                        delay: 0
                },
                {
                        icon: 'fa-eye',
                        title: 'Our Vision',
                        description: 'To become the leading platform where social media meets e-commerce, making every product discovery an exciting experience.',
                        gradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                        delay: 0.1
                },
                {
                        icon: 'fa-heart',
                        title: 'Our Values',
                        description: 'Trust, authenticity, and innovation drive everything we do. We\'re committed to creating a safe and enjoyable shopping environment.',
                        gradient: 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
                        delay: 0.2
                }
        ];

        return (
                <section id="about" className="about-section" ref={sectionRef}>
                        {/* Background Elements */}
                        <div className="about-bg-elements">
                                <div className="about-gradient-orb orb-1"></div>
                                <div className="about-gradient-orb orb-2"></div>
                                <div className="about-lines"></div>
                        </div>

                        <div className="container">
                                {/* Section Header */}
                                <div className={`about-header ${isVisible ? 'animate-in' : ''}`}>
                                        <div className="about-badge">
                                                <span className="badge-dot"></span>
                                                <span>About Us</span>
                                        </div>
                                        <h2 className="about-title">
                                                Revolutionizing
                                                <span className="gradient-text"> Social Commerce</span>
                                        </h2>
                                        <p className="about-subtitle">
                                                Bloomer is on a mission to transform the way people discover and shop for products online
                                        </p>
                                </div>

                                {/* Cards Grid */}
                                <div className="about-cards-grid">
                                        {cards.map((card, index) => (
                                                <div
                                                        key={index}
                                                        className={`about-card ${isVisible ? 'animate-in' : ''}`}
                                                        style={{ '--delay': `${card.delay}s` }}
                                                >
                                                        <div className="card-icon-wrapper" style={{ background: card.gradient }}>
                                                                <i className={`fas ${card.icon}`}></i>
                                                        </div>
                                                        <h3 className="card-title">{card.title}</h3>
                                                        <p className="card-description">{card.description}</p>
                                                        <div className="card-shine"></div>
                                                </div>
                                        ))}
                                </div>

                                {/* Stats Section */}
                                {/* <div className={`about-stats ${isVisible ? 'animate-in' : ''}`}>
                                        <div className="stat-item">
                                                <div className="stat-number">10K+</div>
                                                <div className="stat-label">Early Subscribers</div>
                                        </div>
                                        <div className="stat-divider"></div>
                                        <div className="stat-item">
                                                <div className="stat-number">500+</div>
                                                <div className="stat-label">Creators Ready</div>
                                        </div>
                                        <div className="stat-divider"></div>
                                        <div className="stat-item">
                                                <div className="stat-number">1000+</div>
                                                <div className="stat-label">Products Listed</div>
                                        </div>
                                </div> */}
                        </div>
                </section>
        );
};

export default About;
