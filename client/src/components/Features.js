import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import './Features.css';

const Features = () => {
        const [isVisible, setIsVisible] = useState(false);
        const [hoveredCard, setHoveredCard] = useState(null);
        const [animationPlayed, setAnimationPlayed] = useState(false);
        const sectionRef = useRef(null);
        const cardsRef = useRef([]);

        const features = [
                {
                        icon: 'fa-video',
                        title: 'Video-First Shopping',
                        description: 'Browse products through engaging short video reels. See items in action before you buy.',
                        color: '#FF6B6B',
                        accent: '#FF8E8E'
                },
                {
                        icon: 'fa-heart',
                        title: 'Social Engagement',
                        description: 'Connect with creators and sellers. Like, comment, and share your favorite discoveries.',
                        color: '#4ECDC4',
                        accent: '#7EDDD6'
                },
                {
                        icon: 'fa-shopping-cart',
                        title: 'Instant Shopping',
                        description: 'Swipe and shop instantly. One-tap purchasing makes buying effortless.',
                        color: '#7B4F8D',
                        accent: '#A87BC9'
                },
                {
                        icon: 'fa-shield-alt',
                        title: 'Trust & Safety',
                        description: 'Verified sellers and secure transactions ensure a safe shopping experience.',
                        color: '#45B7D1',
                        accent: '#6DCAE0'
                },
                {
                        icon: 'fa-users',
                        title: 'Creator Community',
                        description: 'Join a vibrant community sharing authentic product experiences.',
                        color: '#F7DC6F',
                        accent: '#F9E79F'
                },
                {
                        icon: 'fa-mobile-alt',
                        title: 'Mobile-First',
                        description: 'Designed for mobile. Shop anywhere, anytime with our intuitive app.',
                        color: '#BB8FCE',
                        accent: '#D2B4DE'
                }
        ];

        // Card positions for fan layout
        const getCardPosition = (index) => {
                const positions = [
                        { x: -230, rotate: -18 },
                        { x: -140, rotate: -10 },
                        { x: -50, rotate: -3 },
                        { x: 50, rotate: 3 },
                        { x: 140, rotate: 10 },
                        { x: 230, rotate: 18 }
                ];
                return positions[index] || { x: 0, rotate: 0 };
        };

        useEffect(() => {
                const observer = new IntersectionObserver(
                        ([entry]) => {
                                if (entry.isIntersecting && !animationPlayed) {
                                        setIsVisible(true);
                                        setAnimationPlayed(true);

                                        // Anime.js card animation
                                        anime({
                                                targets: '.feature-card-new',
                                                translateY: [200, 0],
                                                translateX: (el, i) => [0, getCardPosition(i).x],
                                                rotate: (el, i) => [0, getCardPosition(i).rotate],
                                                scale: [0.5, 1],
                                                opacity: [0, 1],
                                                duration: 1200,
                                                delay: anime.stagger(100, { start: 200 }),
                                                easing: 'spring(1, 80, 10, 0)'
                                        });

                                        // Animate header
                                        anime({
                                                targets: '.features-header',
                                                translateY: [50, 0],
                                                opacity: [0, 1],
                                                duration: 800,
                                                easing: 'easeOutExpo'
                                        });
                                }
                        },
                        {
                                threshold: 0.1,
                                rootMargin: '50px 0px 0px 0px'
                        }
                );

                if (sectionRef.current) {
                        observer.observe(sectionRef.current);
                }

                return () => observer.disconnect();
        }, [animationPlayed]);

        // Hover animation with Anime.js
        const handleCardHover = (index) => {
                setHoveredCard(index);
                anime({
                        targets: cardsRef.current[index],
                        translateY: -40,
                        scale: 1.08,
                        rotate: 0,
                        duration: 400,
                        easing: 'easeOutBack'
                });
        };

        const handleCardLeave = (index) => {
                setHoveredCard(null);
                const pos = getCardPosition(index);
                anime({
                        targets: cardsRef.current[index],
                        translateY: 0,
                        scale: 1,
                        rotate: pos.rotate,
                        duration: 400,
                        easing: 'easeOutBack'
                });
        };

        return (
                <section id="features" className="features-section-new" ref={sectionRef}>
                        {/* Background Elements */}
                        <div className="features-bg">
                                <div className="bg-circle circle-1"></div>
                                <div className="bg-circle circle-2"></div>
                                <div className="bg-gradient-overlay"></div>
                        </div>

                        <div className="features-container">
                                {/* Section Header */}
                                <div className={`features-header ${isVisible ? 'visible' : ''}`}>
                                        <span className="features-badge">
                                                <i className="fas fa-sparkles"></i>
                                                Features
                                        </span>
                                        <h2 className="features-title">
                                                Why Choose <span className="brand-text">Bloomer</span>?
                                        </h2>
                                        <p className="features-subtitle">
                                                Experience shopping like never before with our innovative features
                                        </p>
                                </div>

                                {/* Card Fan Container */}
                                <div className={`card-fan-container ${isVisible ? 'visible' : ''}`}>
                                        <div className="card-fan">
                                                {features.map((feature, index) => (
                                                        <div
                                                                key={index}
                                                                ref={el => cardsRef.current[index] = el}
                                                                className={`feature-card-new ${hoveredCard === index ? 'hovered' : ''} ${hoveredCard !== null && hoveredCard !== index ? 'dimmed' : ''}`}
                                                                style={{
                                                                        '--card-index': index,
                                                                        '--card-color': feature.color,
                                                                        '--card-accent': feature.accent,
                                                                        '--total-cards': features.length,
                                                                        opacity: 0
                                                                }}
                                                                onMouseEnter={() => handleCardHover(index)}
                                                                onMouseLeave={() => handleCardLeave(index)}
                                                        >
                                                                {/* Card Corner Decorations */}
                                                                <div className="card-corner top-left">
                                                                        <span className="corner-symbol">
                                                                                <i className={`fas ${feature.icon}`}></i>
                                                                        </span>
                                                                </div>
                                                                <div className="card-corner bottom-right">
                                                                        <span className="corner-symbol rotated">
                                                                                <i className={`fas ${feature.icon}`}></i>
                                                                        </span>
                                                                </div>

                                                                {/* Card Content */}
                                                                <div className="card-content">
                                                                        <div className="card-icon-wrapper">
                                                                                <div className="card-icon" style={{ background: feature.color }}>
                                                                                        <i className={`fas ${feature.icon}`}></i>
                                                                                </div>
                                                                        </div>
                                                                        <h3 className="card-title">{feature.title}</h3>
                                                                        <p className="card-description">{feature.description}</p>
                                                                        <div className="card-divider"></div>
                                                                        <span className="card-number">{String(index + 1).padStart(2, '0')}</span>
                                                                </div>

                                                                {/* Card Shine Effect */}
                                                                <div className="card-shine"></div>
                                                        </div>
                                                ))}
                                        </div>
                                </div>

                                {/* Mobile Grid View */}
                                <div className={`features-grid-mobile ${isVisible ? 'visible' : ''}`}>
                                        {features.map((feature, index) => (
                                                <div
                                                        key={index}
                                                        className="feature-card-mobile"
                                                        style={{
                                                                '--card-color': feature.color,
                                                                animationDelay: `${index * 0.1}s`
                                                        }}
                                                >
                                                        <div className="mobile-card-icon" style={{ background: feature.color }}>
                                                                <i className={`fas ${feature.icon}`}></i>
                                                        </div>
                                                        <div className="mobile-card-content">
                                                                <h4>{feature.title}</h4>
                                                                <p>{feature.description}</p>
                                                        </div>
                                                </div>
                                        ))}
                                </div>
                        </div>
                </section>
        );
};

export default Features;
