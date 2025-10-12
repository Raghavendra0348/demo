import React from 'react';

const About = () => {
        return (
                <section id="about" className="about-section py-5 bg-light">
                        <div className="container">
                                <div className="row text-center mb-5">
                                        <div className="col-12">
                                                <div className="section-badge mb-4">
                                                        <span className="badge rounded-pill px-4 py-2"
                                                                style={{ background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)', color: 'white', fontSize: '1.3rem', fontWeight: '600' }}>
                                                                ABOUT US
                                                        </span>
                                                </div>
                                                <h2 className="display-4 fw-bold mb-3"
                                                        style={{ background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--dark-color) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                                        Revolutionizing Social Commerce
                                                </h2>
                                                <p className="lead text-muted mb-0" style={{ maxWidth: '800px', margin: '0 auto' }}>
                                                        Bloomer is on a mission to transform the way people discover and shop for products online
                                                </p>
                                        </div>
                                </div>

                                <div className="row g-4">
                                        <div className="col-lg-4 col-md-6">
                                                <div className="about-card h-100 p-4 text-center bg-white shadow-sm rounded">
                                                        <div className="about-icon mb-3">
                                                                <i className="fas fa-bullseye fa-3x" style={{ color: 'var(--primary-color)' }}></i>
                                                        </div>
                                                        <h3 className="h5 fw-bold mb-3">Our Mission</h3>
                                                        <p className="text-muted">
                                                                To create the most engaging and trustworthy video-first shopping experience,
                                                                connecting creators, sellers, and shoppers in an authentic way.
                                                        </p>
                                                </div>
                                        </div>

                                        <div className="col-lg-4 col-md-6">
                                                <div className="about-card h-100 p-4 text-center bg-white shadow-sm rounded">
                                                        <div className="about-icon mb-3">
                                                                <i className="fas fa-eye fa-3x" style={{ color: 'var(--primary-color)' }}></i>
                                                        </div>
                                                        <h3 className="h5 fw-bold mb-3">Our Vision</h3>
                                                        <p className="text-muted">
                                                                To become the leading platform where social media meets e-commerce,
                                                                making every product discovery an exciting experience.
                                                        </p>
                                                </div>
                                        </div>

                                        <div className="col-lg-4 col-md-6">
                                                <div className="about-card h-100 p-4 text-center bg-white shadow-sm rounded">
                                                        <div className="about-icon mb-3">
                                                                <i className="fas fa-heart fa-3x" style={{ color: 'var(--primary-color)' }}></i>
                                                        </div>
                                                        <h3 className="h5 fw-bold mb-3">Our Values</h3>
                                                        <p className="text-muted">
                                                                Trust, authenticity, and innovation drive everything we do.
                                                                We're committed to creating a safe and enjoyable shopping environment.
                                                        </p>
                                                </div>
                                        </div>
                                </div>

                                <div className="row mt-5">
                                        <div className="col-12 text-center">
                                                <div className="stats-container d-flex justify-content-around flex-wrap gap-4 py-4">
                                                        <div className="stat-item">
                                                                <h3 className="display-4 fw-bold" style={{ color: 'var(--primary-color)' }}>10K+</h3>
                                                                <p className="text-muted">Early Subscribers</p>
                                                        </div>
                                                        <div className="stat-item">
                                                                <h3 className="display-4 fw-bold" style={{ color: 'var(--primary-color)' }}>500+</h3>
                                                                <p className="text-muted">Creators Ready</p>
                                                        </div>
                                                        <div className="stat-item">
                                                                <h3 className="display-4 fw-bold" style={{ color: 'var(--primary-color)' }}>1000+</h3>
                                                                <p className="text-muted">Products Listed</p>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </section>
        );
};

export default About;
