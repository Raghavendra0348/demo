import React from 'react';
import Newsletter from './Newsletter';
import './Footer.css';

const Footer = () => {
        const showComingSoon = () => {
                alert('🎉 Coming Soon! \n\nBloomer will be available for download very soon. Stay tuned for updates!');
        };

        const quickLinks = [
                { title: 'Product', links: ['Features', 'How It Works', 'Pricing', 'API', 'Integrations'] },
                { title: 'Company', links: ['About Us', 'Careers', 'Press Kit', 'Blog', 'Partners'] },
                { title: 'Support', links: ['Help Center', 'Contact Us', 'Community', 'Status', 'FAQ'] }
        ];

        return (
                <footer className="footer-section" id="contact">
                        {/* Background Elements */}
                        <div className="footer-bg-elements">
                                <div className="footer-gradient-orb"></div>
                                <div className="footer-grid-pattern"></div>
                        </div>

                        <div className="container">
                                <div className="footer-main">
                                        <div className="row">
                                                {/* Brand Column */}
                                                <div className="col-lg-4 col-md-6 mb-5">
                                                        <div className="footer-brand">
                                                                <h1 className="brand-name">Bloomer</h1>
                                                                <p className="brand-description">
                                                                        The future of social commerce. Shop through stories, connect with creators,
                                                                        and discover products in a whole new way.
                                                                </p>

                                                                {/* Social Links */}
                                                                <div className="social-links">
                                                                        <a href="https://www.instagram.com/joinbloomer" target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram">
                                                                                <i className="fab fa-instagram"></i>
                                                                        </a>
                                                                        <a href="https://www.linkedin.com/company/bloomer-startup" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                                                                                <i className="fab fa-linkedin-in"></i>
                                                                        </a>
                                                                        <a href="#" className="social-link" title="Twitter">
                                                                                <i className="fab fa-twitter"></i>
                                                                        </a>
                                                                        <a href="#" className="social-link" title="YouTube">
                                                                                <i className="fab fa-youtube"></i>
                                                                        </a>
                                                                </div>
                                                        </div>
                                                </div>

                                                {/* Quick Links */}
                                                {quickLinks.map((section, index) => (
                                                        <div key={index} className="col-lg-2 col-md-3 col-6 mb-4">
                                                                <h6 className="footer-heading">{section.title}</h6>
                                                                <ul className="footer-links">
                                                                        {section.links.map((link, i) => (
                                                                                <li key={i}>
                                                                                        <a href="#" className="footer-link">{link}</a>
                                                                                </li>
                                                                        ))}
                                                                </ul>
                                                        </div>
                                                ))}

                                                {/* Newsletter Column */}
                                                <div className="col-lg-4 col-md-6 mb-4">
                                                        <h6 className="footer-heading">Stay Updated</h6>
                                                        <p className="newsletter-text">Get the latest updates, features, and exclusive offers.</p>
                                                        <Newsletter source="footer" />

                                                        {/* Contact Info */}
                                                        <div className="contact-info">
                                                                <a href="mailto:bloomer.7b@gmail.com" className="contact-item">
                                                                        <i className="fas fa-envelope"></i>
                                                                        <span>bloomer.7b@gmail.com</span>
                                                                </a>
                                                                <div className="contact-item">
                                                                        <i className="fas fa-map-marker-alt"></i>
                                                                        <span>India</span>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>

                                {/* App Download Banner */}
                                <div className="app-download-banner">
                                        <div className="banner-content">
                                                <div className="banner-text">
                                                        <h6>Download Our App</h6>
                                                        <p>Get the full Bloomer experience on your mobile device</p>
                                                </div>
                                                <div className="banner-buttons">
                                                        <button onClick={showComingSoon} className="app-btn apple">
                                                                <i className="fab fa-apple"></i>
                                                                <div className="btn-text">
                                                                        <small>Download on</small>
                                                                        <span>App Store</span>
                                                                </div>
                                                        </button>
                                                        <button onClick={showComingSoon} className="app-btn google">
                                                                <i className="fab fa-google-play"></i>
                                                                <div className="btn-text">
                                                                        <small>Get it on</small>
                                                                        <span>Google Play</span>
                                                                </div>
                                                        </button>
                                                </div>
                                        </div>
                                </div>

                                {/* Footer Bottom */}
                                <div className="footer-bottom">
                                        <div className="row align-items-center">
                                                <div className="col-md-6 mb-3 mb-md-0">
                                                        <p className="copyright">
                                                                © 2025 Bloomer Inc. All rights reserved.
                                                        </p>
                                                </div>
                                                <div className="col-md-6">
                                                        <div className="legal-links">
                                                                <a href="#">Terms</a>
                                                                <a href="#">Privacy</a>
                                                                <a href="#">Cookies</a>
                                                                <a href="#">Accessibility</a>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </footer>
        );
};

export default Footer;
