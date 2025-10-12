import React from 'react';

const Features = () => {
        const features = [
                {
                        icon: 'fa-video',
                        color: 'text-primary',
                        title: 'Video-First Shopping',
                        description: 'Browse products through engaging short video reels. See items in action before you buy.'
                },
                {
                        icon: 'fa-heart',
                        color: 'text-danger',
                        title: 'Social Engagement',
                        description: 'Connect with creators and sellers. Like, comment, and share your favorite product discoveries.'
                },
                {
                        icon: 'fa-shopping-cart',
                        color: 'text-success',
                        title: 'Instant Shopping',
                        description: 'Swipe and shop instantly. One-tap purchasing makes buying your favorite items effortless.'
                },
                {
                        icon: 'fa-shield-alt',
                        color: 'text-info',
                        title: 'Trust & Safety',
                        description: 'Verified sellers and secure transactions ensure a safe and trustworthy shopping experience.'
                },
                {
                        icon: 'fa-users',
                        color: 'text-warning',
                        title: 'Creator Community',
                        description: 'Join a vibrant community of creators and sellers sharing authentic product experiences.'
                },
                {
                        icon: 'fa-mobile-alt',
                        color: 'text-secondary',
                        title: 'Mobile-First',
                        description: 'Designed for mobile from the ground up. Shop anywhere, anytime with our intuitive app.'
                }
        ];

        return (
                <section id="features" className="features-section">
                        <div className="container">
                                <div className="row text-center mb-5">
                                        <div className="col-12">
                                                <div className="section-badge mb-4">
                                                        <span className="badge rounded-pill px-4 py-2"
                                                                style={{ background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)', color: 'white', fontSize: '1.3rem', fontWeight: '600' }}>
                                                                FEATURES
                                                        </span>
                                                </div>
                                                <h2 className="display-4 fw-bold mb-3"
                                                        style={{ background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--dark-color) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                                        Why Choose <span style={{ fontFamily: 'Genty' }}>Bloomer</span>?
                                                </h2>
                                                <p className="lead text-muted mb-0" style={{ maxWidth: '600px', margin: '0 auto' }}>
                                                        Experience shopping like never before with our innovative features designed for the modern consumer
                                                </p>
                                        </div>
                                </div>

                                <div className="row g-4">
                                        {features.map((feature, index) => (
                                                <div className="col-lg-4 col-md-6" key={index}>
                                                        <div className="feature-card h-100 p-4 text-center shadow-sm rounded">
                                                                <div className="feature-icon mb-3">
                                                                        <i className={`fas ${feature.icon} fa-2x ${feature.color}`}></i>
                                                                </div>
                                                                <h3 className="feature-title mb-2">{feature.title}</h3>
                                                                <p className="feature-description">{feature.description}</p>
                                                        </div>
                                                </div>
                                        ))}
                                </div>
                        </div>
                </section>
        );
};

export default Features;
