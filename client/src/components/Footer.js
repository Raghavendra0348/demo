import React from 'react';
import Newsletter from './Newsletter';

const Footer = () => {
        const showComingSoon = () => {
                alert('🎉 Coming Soon! \n\nBloomer will be available for download very soon. Stay tuned for updates!');
        };

        return (
                <footer className="footer-section" id="contact">
                        <div className="container">
                                <div className="row">
                                        {/* Company Info */}
                                        <div className="col-lg-4 col-md-6 mb-5">
                                                <div className="footer-brand mb-4">
                                                        <h1 className="fw-bold mb-3" style={{ fontFamily: 'Genty, sans-serif' }}>Bloomer</h1>
                                                        <p className="footer-description mb-4">
                                                                The future of social commerce. Shop through stories, connect with creators, and discover
                                                                products in a whole new way. Join millions of users transforming how they shop online.
                                                        </p>
                                                </div>

                                                {/* Newsletter Signup */}
                                                <div className="newsletter-section">
                                                        <h6 className="fw-bold mb-3">Stay Updated</h6>
                                                        <p className="small text-muted mb-3">Get the latest updates, features, and exclusive offers.</p>
                                                        <Newsletter source="footer" />
                                                </div>
                                        </div>

                                        {/* Quick Links */}
                                        <div className="col-lg-2 col-md-6 col-6 mb-4">
                                                <h6 className="footer-heading fw-bold mb-3">Product</h6>
                                                <ul className="footer-links list-unstyled">
                                                        <li><a href="#features" className="footer-link">Features</a></li>
                                                        <li><a href="#" className="footer-link">How It Works</a></li>
                                                        <li><a href="#" className="footer-link">Pricing</a></li>
                                                        <li><a href="#" className="footer-link">API</a></li>
                                                        <li><a href="#" className="footer-link">Integrations</a></li>
                                                        <li><a href="#" className="footer-link">Security</a></li>
                                                </ul>
                                        </div>

                                        <div className="col-lg-2 col-md-6 col-6 mb-4">
                                                <h6 className="footer-heading fw-bold mb-3">Company</h6>
                                                <ul className="footer-links list-unstyled">
                                                        <li><a href="#" className="footer-link">About Us</a></li>
                                                        <li><a href="#" className="footer-link">Careers</a></li>
                                                        <li><a href="#" className="footer-link">Press Kit</a></li>
                                                        <li><a href="#" className="footer-link">Blog</a></li>
                                                        <li><a href="#" className="footer-link">Investors</a></li>
                                                        <li><a href="#" className="footer-link">Partners</a></li>
                                                </ul>
                                        </div>

                                        <div className="col-lg-2 col-md-6 col-6 mb-4">
                                                <h6 className="footer-heading fw-bold mb-3">Support</h6>
                                                <ul className="footer-links list-unstyled">
                                                        <li><a href="#" className="footer-link">Help Center</a></li>
                                                        <li><a href="#" className="footer-link">Contact Us</a></li>
                                                        <li><a href="#" className="footer-link">Community</a></li>
                                                        <li><a href="#" className="footer-link">Status</a></li>
                                                        <li><a href="#" className="footer-link">Bug Reports</a></li>
                                                        <li><a href="#" className="footer-link">Feature Requests</a></li>
                                                </ul>
                                        </div>

                                        {/* Contact & Social */}
                                        <div className="col-lg-2 col-md-6 mb-4">
                                                <h6 className="footer-heading fw-bold mb-3">Connect</h6>

                                                <div className="contact-info mb-4">
                                                        <div className="contact-item mb-2">
                                                                <i className="fas fa-envelope me-2 text-primary"></i>
                                                                <a href="mailto:bloomer.7b@gmail.com" className="footer-link">bloomer.7b@gmail.com</a>
                                                        </div>

                                                        <div className="contact-item mb-3">
                                                                <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                                                                <span className="footer-text">India</span>
                                                        </div>
                                                </div>

                                                {/* Social Media */}
                                                <div className="social-links">
                                                        <h6 className="fw-bold mb-3">Follow Us</h6>
                                                        <div className="d-flex flex-wrap">
                                                                <a href="https://www.instagram.com/joinbloomer?igsh=MTA4cm1zeG51OXB1Yg==&utm_source=ig_contact_invite"
                                                                        className="social-link me-3 mb-2" title="Instagram" target="_blank" rel="noopener noreferrer">
                                                                        <i className="fab fa-instagram"></i>
                                                                </a>
                                                                <a href="https://www.linkedin.com/company/bloomer-startup" target="_blank"
                                                                        rel="noopener noreferrer" className="social-link me-3 mb-2" title="LinkedIn">
                                                                        <i className="fab fa-linkedin fa-2x"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                        </div>
                                </div>

                                {/* App Download Section */}
                                <div className="app-download-section">
                                        <div className="row align-items-center">
                                                <div className="col-md-6 mb-3">
                                                        <h6 className="fw-bold mb-2">Download Our App</h6>
                                                        <p className="mb-0">Get the full Bloomer experience on your mobile device</p>
                                                </div>
                                                <div className="col-md-6 text-md-end">
                                                        <div className="app-buttons">
                                                                <button onClick={showComingSoon} className="app-store-btn me-3 mb-2">
                                                                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='40' viewBox='0 0 120 40'%3E%3Crect width='120' height='40' rx='8' fill='%23000'/%3E%3Ctext x='60' y='25' text-anchor='middle' fill='white' font-family='Arial' font-size='12'%3EApp Store%3C/text%3E%3C/svg%3E"
                                                                                alt="Download on App Store" className="app-store-image" />
                                                                </button>
                                                                <button onClick={showComingSoon} className="app-store-btn mb-2">
                                                                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='40' viewBox='0 0 120 40'%3E%3Crect width='120' height='40' rx='8' fill='%23000'/%3E%3Ctext x='60' y='25' text-anchor='middle' fill='white' font-family='Arial' font-size='12'%3EGoogle Play%3C/text%3E%3C/svg%3E"
                                                                                alt="Get it on Google Play" className="app-store-image" />
                                                                </button>
                                                        </div>
                                                </div>
                                        </div>
                                </div>

                                {/* Footer Bottom */}
                                <div className="footer-bottom">
                                        <div className="row align-items-center">
                                                <div className="col-md-6 mb-3 mb-md-0">
                                                        <p className="copyright-text mb-0">
                                                                &copy; 2025 Bloomer Inc. All rights reserved.
                                                        </p>
                                                </div>
                                                <div className="col-md-6 text-md-end">
                                                        <div className="footer-legal-links">
                                                                <a href="#" className="legal-link me-3">Terms of Service</a>
                                                                <a href="#" className="legal-link me-3">Privacy Policy</a>
                                                                <a href="#" className="legal-link me-3">Cookie Policy</a>
                                                                <a href="#" className="legal-link">Accessibility</a>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </footer>
        );
};

export default Footer;
