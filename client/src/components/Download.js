import React, { useState, useEffect, useRef } from 'react';
import './Download.css';

const Download = () => {
        const [isVisible, setIsVisible] = useState(false);
        const [activePhone, setActivePhone] = useState(0);
        const sectionRef = useRef(null);

        const showComingSoon = (platform) => {
                alert(`🎉 Coming Soon to ${platform}! \n\nBloomer will be available for download very soon. Stay tuned for updates!`);
        };

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

        useEffect(() => {
                const interval = setInterval(() => {
                        setActivePhone((prev) => (prev + 1) % 3);
                }, 3000);
                return () => clearInterval(interval);
        }, []);

        const phoneScreens = [
                { icon: 'fa-play-circle', label: 'Watch & Shop', color: '#ff6b9d' },
                { icon: 'fa-heart', label: 'Save Favorites', color: '#a855f7' },
                { icon: 'fa-shopping-bag', label: 'Easy Checkout', color: '#3b82f6' }
        ];

        return (
                <section id="download" className="download-section" ref={sectionRef}>
                        {/* Animated Background */}
                        <div className="download-bg-elements">
                                <div className="download-gradient-orb orb-1"></div>
                                <div className="download-gradient-orb orb-2"></div>
                                <div className="download-grid"></div>
                        </div>

                        <div className="container">
                                <div className="row align-items-center">
                                        {/* Left Content */}
                                        <div className={`col-lg-6 mb-5 mb-lg-0 download-content ${isVisible ? 'animate-in' : ''}`}>
                                                <div className="download-badge">
                                                        <span className="badge-icon">📱</span>
                                                        <span>Mobile App</span>
                                                </div>

                                                <h2 className="download-title">
                                                        Ready to Transform Your
                                                        <span className="gradient-text"> Shopping Experience?</span>
                                                </h2>

                                                <p className="download-description">
                                                        Join thousands of shoppers discovering products through engaging video content.
                                                        Download Bloomer today and start shopping in a whole new way.
                                                </p>

                                                {/* Feature Pills */}
                                                <div className="download-features">
                                                        <div className="feature-pill">
                                                                <i className="fas fa-video"></i>
                                                                <span>Video Commerce</span>
                                                        </div>
                                                        <div className="feature-pill">
                                                                <i className="fas fa-bolt"></i>
                                                                <span>Instant Buy</span>
                                                        </div>
                                                        <div className="feature-pill">
                                                                <i className="fas fa-users"></i>
                                                                <span>Social Shopping</span>
                                                        </div>
                                                </div>

                                                {/* Download Buttons */}
                                                <div className="download-buttons">
                                                        <button
                                                                onClick={() => showComingSoon('App Store')}
                                                                className="store-button apple-btn"
                                                        >
                                                                <div className="store-icon">
                                                                        <i className="fab fa-apple"></i>
                                                                </div>
                                                                <div className="store-text">
                                                                        <small>Download on the</small>
                                                                        <strong>App Store</strong>
                                                                </div>
                                                                <div className="store-glow"></div>
                                                        </button>

                                                        <button
                                                                onClick={() => showComingSoon('Google Play')}
                                                                className="store-button google-btn"
                                                        >
                                                                <div className="store-icon">
                                                                        <i className="fab fa-google-play"></i>
                                                                </div>
                                                                <div className="store-text">
                                                                        <small>Get it on</small>
                                                                        <strong>Google Play</strong>
                                                                </div>
                                                                <div className="store-glow"></div>
                                                        </button>
                                                </div>

                                                {/* Trust Indicators */}
                                                <div className="download-trust">
                                                        <div className="trust-item">
                                                                <i className="fas fa-check-circle"></i>
                                                                <span>Free Download</span>
                                                        </div>
                                                        <div className="trust-item">
                                                                <i className="fas fa-shield-alt"></i>
                                                                <span>Secure Payments</span>
                                                        </div>
                                                        <div className="trust-item">
                                                                <i className="fas fa-star"></i>
                                                                <span>5-Star Rated</span>
                                                        </div>
                                                </div>
                                        </div>

                                        {/* Right Phone Mockups */}
                                        <div className={`col-lg-6 download-visual ${isVisible ? 'animate-in' : ''}`}>
                                                <div className="phone-showcase">
                                                        {/* Floating Elements */}
                                                        <div className="floating-elements">
                                                                <div className="floating-icon icon-1">
                                                                        <i className="fas fa-heart"></i>
                                                                </div>
                                                                <div className="floating-icon icon-2">
                                                                        <i className="fas fa-shopping-cart"></i>
                                                                </div>
                                                                <div className="floating-icon icon-3">
                                                                        <i className="fas fa-play"></i>
                                                                </div>
                                                                <div className="floating-icon icon-4">
                                                                        <i className="fas fa-star"></i>
                                                                </div>
                                                        </div>

                                                        {/* Main Phone */}
                                                        <div className="phone-main">
                                                                <div className="phone-frame">
                                                                        <div className="phone-notch"></div>
                                                                        <div className="phone-screen">
                                                                                {phoneScreens.map((screen, index) => (
                                                                                        <div
                                                                                                key={index}
                                                                                                className={`screen-content ${activePhone === index ? 'active' : ''}`}
                                                                                                style={{ '--accent': screen.color }}
                                                                                        >
                                                                                                <i className={`fas ${screen.icon}`}></i>
                                                                                                <span>{screen.label}</span>
                                                                                        </div>
                                                                                ))}
                                                                        </div>
                                                                        <div className="phone-home-indicator"></div>
                                                                </div>
                                                                <div className="phone-glow"></div>
                                                        </div>

                                                        {/* Screen Indicators */}
                                                        <div className="screen-indicators">
                                                                {phoneScreens.map((_, index) => (
                                                                        <div
                                                                                key={index}
                                                                                className={`indicator ${activePhone === index ? 'active' : ''}`}
                                                                                onClick={() => setActivePhone(index)}
                                                                        ></div>
                                                                ))}
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </section>
        );
};

export default Download;
