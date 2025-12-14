import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import './Hero.css';

const Hero = () => {
        const [email, setEmail] = useState('');
        const [loading, setLoading] = useState(false);
        const [message, setMessage] = useState('');
        const [isVisible, setIsVisible] = useState(false);
        const particlesRef = useRef(null);

        useEffect(() => {
                setIsVisible(true);

                // Create floating particles
                if (particlesRef.current) {
                        const particleCount = 60;
                        particlesRef.current.innerHTML = '';

                        for (let i = 0; i < particleCount; i++) {
                                const particle = document.createElement('div');
                                particle.className = 'particle';
                                particle.style.left = `${Math.random() * 100}%`;
                                particle.style.top = `${Math.random() * 100}%`;
                                const size = Math.random() * 6 + 2;
                                particle.style.width = `${size}px`;
                                particle.style.height = `${size}px`;
                                particlesRef.current.appendChild(particle);
                        }

                        // Animate particles with Anime.js
                        anime({
                                targets: '.particle',
                                translateY: () => anime.random(-150, 150),
                                translateX: () => anime.random(-80, 80),
                                scale: () => anime.random(0.3, 2),
                                opacity: [0, () => anime.random(0.2, 0.7), 0],
                                duration: () => anime.random(4000, 8000),
                                delay: () => anime.random(0, 3000),
                                easing: 'easeInOutQuad',
                                loop: true
                        });
                }

                // Animate glowing orbs with more movement
                anime({
                        targets: '.glow-orb',
                        translateX: () => anime.random(-50, 50),
                        translateY: () => anime.random(-50, 50),
                        scale: [1, 1.3, 0.9, 1.1, 1],
                        opacity: [0.2, 0.5, 0.3, 0.6, 0.2],
                        duration: 6000,
                        easing: 'easeInOutSine',
                        loop: true,
                        delay: anime.stagger(800)
                });

                // Animate morphing blobs
                anime({
                        targets: '.morph-blob',
                        borderRadius: ['30% 70% 70% 30% / 30% 30% 70% 70%', '70% 30% 30% 70% / 70% 70% 30% 30%', '30% 70% 70% 30% / 30% 30% 70% 70%'],
                        rotate: [0, 180, 360],
                        scale: [1, 1.1, 1],
                        duration: 10000,
                        easing: 'easeInOutQuad',
                        loop: true,
                        delay: anime.stagger(2000)
                });

                // Animate aurora waves
                anime({
                        targets: '.aurora-wave',
                        translateX: ['-100%', '100%'],
                        opacity: [0, 0.5, 0],
                        duration: 8000,
                        easing: 'easeInOutSine',
                        loop: true,
                        delay: anime.stagger(2000)
                });

        }, []);

        const scrollToSection = (sectionId) => {
                const element = document.getElementById(sectionId);
                if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
        };

        const handleComingSoonSubmit = async (e) => {
                e.preventDefault();
                setLoading(true);
                setMessage('');

                try {
                        const API_URL = process.env.REACT_APP_API_URL || '/api';
                        const response = await fetch(`${API_URL}/newsletter/subscribe`, {
                                method: 'POST',
                                headers: {
                                        'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ email, source: 'coming-soon' }),
                        });

                        const data = await response.json();

                        if (data.success) {
                                const emoji = data.alreadySubscribed ? '' : '🎉';
                                setMessage(`${emoji} ${data.message}`);
                                if (!data.alreadySubscribed) {
                                        setEmail('');
                                }
                        } else {
                                setMessage('❌ ' + data.message);
                        }
                } catch (error) {
                        setMessage('❌ Failed to subscribe. Please try again later.');
                } finally {
                        setLoading(false);
                }
        };

        return (
                <>
                        {/* Coming Soon Section - Creative Design */}
                        <section className="coming-section">
                                {/* Creative Animated Background */}
                                <div className="hero-bg-animation">
                                        {/* Floating Particles */}
                                        <div className="particles-container" ref={particlesRef}></div>

                                        {/* Morphing Blobs */}
                                        <div className="morph-blob blob-1"></div>
                                        <div className="morph-blob blob-2"></div>
                                        <div className="morph-blob blob-3"></div>

                                        {/* Glowing Orbs */}
                                        <div className="glow-orb orb-1"></div>
                                        <div className="glow-orb orb-2"></div>
                                        <div className="glow-orb orb-3"></div>
                                        <div className="glow-orb orb-4"></div>

                                        {/* Aurora Waves */}
                                        <div className="aurora-container">
                                                <div className="aurora-wave wave-1"></div>
                                                <div className="aurora-wave wave-2"></div>
                                                <div className="aurora-wave wave-3"></div>
                                        </div>

                                        {/* Gradient Mesh */}
                                        <div className="gradient-mesh"></div>

                                        {/* Grid Pattern */}
                                        <div className="grid-pattern"></div>

                                        {/* Noise Overlay */}
                                        <div className="noise-overlay"></div>
                                </div>

                                <div className={`coming-content ${isVisible ? 'visible' : ''}`}>
                                        {/* Badge */}
                                        <div className="launch-badge">
                                                <span className="badge-dot"></span>
                                                <span>Launching Soon</span>
                                        </div>

                                        {/* Main Heading with Creative Typography */}
                                        <h1 className="coming-title">
                                                <span className="title-line animate-word" style={{ '--delay': '0s' }}>Shop Like You</span>
                                                <span className="title-line gradient-text animate-word" style={{ '--delay': '0.2s' }}>Scroll</span>
                                        </h1>

                                        {/* Animated Underline */}
                                        <div className="creative-underline">
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                        </div>

                                        {/* Tagline */}
                                        <p className="coming-tagline">
                                                <span className="highlight">Bloomer</span> is revolutionizing shopping with video-first experiences.
                                                <br />
                                                Watch, swipe, and shop instantly from creators you trust.
                                        </p>

                                        {/* Feature Pills */}
                                        <div className="feature-pills">
                                                <span className="pill">
                                                        <i className="fas fa-play-circle"></i> Video Shopping
                                                </span>
                                                <span className="pill">
                                                        <i className="fas fa-heart"></i> Creator-Led
                                                </span>
                                                <span className="pill">
                                                        <i className="fas fa-bolt"></i> Instant Checkout
                                                </span>
                                        </div>

                                        {/* Email Form */}
                                        <form className="subscribe-form" onSubmit={handleComingSoonSubmit}>
                                                <div className="input-wrapper">
                                                        <i className="fas fa-envelope input-icon"></i>
                                                        <input
                                                                type="email"
                                                                placeholder="Enter your email address"
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                required
                                                                disabled={loading}
                                                        />
                                                        <button className="submit-btn" type="submit" disabled={loading}>
                                                                {loading ? (
                                                                        <span className="loading-spinner"></span>
                                                                ) : (
                                                                        <>
                                                                                Get Early Access
                                                                                <i className="fas fa-arrow-right"></i>
                                                                        </>
                                                                )}
                                                        </button>
                                                </div>
                                        </form>

                                        {/* Message */}
                                        {message && (
                                                <div className={`message-alert ${message.includes('❌') ? 'error' : 'success'}`}>
                                                        {message}
                                                </div>
                                        )}

                                        {/* Trust Indicators */}

                                </div>

                                {/* Scroll Indicator */}
                                <div className="scroll-indicator" onClick={() => scrollToSection('hero-main')}>
                                        <span>Discover More</span>
                                        <i className="fas fa-chevron-down"></i>
                                </div>
                        </section>

                        {/* Main Hero Section */}
                        <section className="hero-section" id="hero-main">
                                <div className="container">
                                        <div className="row align-items-center">
                                                <div className="col-lg-6">
                                                        <div className="hero-content">
                                                                <div className="hero-badge">
                                                                        <i className="fas fa-fire"></i> Trending Now
                                                                </div>
                                                                <h1 className="hero-title">Shop Through Stories</h1>
                                                                <p className="hero-subtitle">The Future of Social Commerce</p>
                                                                <p className="hero-description">
                                                                        Discover products through engaging video reels. Swipe, watch, and shop instantly in a
                                                                        fun, authentic, and trust-driven experience.
                                                                </p>

                                                                {/* Stats Row */}
                                                                {/* <div className="hero-stats">
                                                                        <div className="stat-item">
                                                                                <span className="stat-number">50K+</span>
                                                                                <span className="stat-label">Products</span>
                                                                        </div>
                                                                        <div className="stat-divider"></div>
                                                                        <div className="stat-item">
                                                                                <span className="stat-number">100+</span>
                                                                                <span className="stat-label">Creators</span>
                                                                        </div>
                                                                        <div className="stat-divider"></div>
                                                                        <div className="stat-item">
                                                                                <span className="stat-number">4.9★</span>
                                                                                <span className="stat-label">Rating</span>
                                                                        </div>
                                                                </div> */}

                                                                <div className="cta-buttons">
                                                                        <button className="btn btn-primary-custom" onClick={() => scrollToSection('download')}>
                                                                                <i className="fas fa-download me-2"></i>Download App
                                                                        </button>
                                                                        <button className="btn btn-outline-custom" onClick={() => scrollToSection('features')}>
                                                                                <i className="fas fa-play me-2"></i>Learn More
                                                                        </button>
                                                                </div>
                                                        </div>
                                                </div>

                                                <div className="col-lg-6">
                                                        <div className="phones-container">
                                                                <div className="phone-mockup phone-left">
                                                                        <div className="phone-frame">
                                                                                <div className="phone-notch"></div>
                                                                                <div className="phone-screen">
                                                                                        <img src="/screen_shot.png" alt="Bloomer App - Shopping Feed" />
                                                                                </div>
                                                                        </div>
                                                                        <div className="phone-shadow"></div>
                                                                </div>

                                                                <div className="phone-mockup phone-right">
                                                                        <div className="phone-frame">
                                                                                <div className="phone-notch"></div>
                                                                                <div className="phone-screen">
                                                                                        <img src="/screen_shot1.png" alt="Bloomer App - Product View" />
                                                                                </div>
                                                                        </div>
                                                                        <div className="phone-shadow"></div>
                                                                </div>

                                                                {/* Floating Elements */}
                                                                <div className="floating-card card-1">
                                                                        <i className="fas fa-shopping-bag"></i>
                                                                        <span>Easy Checkout</span>
                                                                </div>
                                                                <div className="floating-card card-2">
                                                                        <i className="fas fa-heart"></i>
                                                                        <span>2.5k Likes</span>
                                                                </div>
                                                                <div className="floating-card card-3">
                                                                        <i className="fas fa-star"></i>
                                                                        <span>Top Rated</span>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </section>
                </>
        );
};

export default Hero;
