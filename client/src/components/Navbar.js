import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
        const [isOpen, setIsOpen] = useState(false);
        const [scrolled, setScrolled] = useState(false);
        const [activeSection, setActiveSection] = useState('');

        // Handle scroll effects
        useEffect(() => {
                const handleScroll = () => {
                        const offset = window.scrollY;
                        setScrolled(offset > 50);

                        // Determine active section
                        const sections = ['features', 'about', 'download', 'contact'];
                        for (const section of sections) {
                                const element = document.getElementById(section);
                                if (element) {
                                        const rect = element.getBoundingClientRect();
                                        if (rect.top <= 150 && rect.bottom >= 150) {
                                                setActiveSection(section);
                                                break;
                                        }
                                }
                        }
                };

                window.addEventListener('scroll', handleScroll);
                return () => window.removeEventListener('scroll', handleScroll);
        }, []);

        // Close menu when clicking outside
        useEffect(() => {
                const handleClickOutside = (e) => {
                        if (isOpen && !e.target.closest('.navbar-modern')) {
                                setIsOpen(false);
                        }
                };
                document.addEventListener('click', handleClickOutside);
                return () => document.removeEventListener('click', handleClickOutside);
        }, [isOpen]);

        const scrollToSection = (sectionId) => {
                const element = document.getElementById(sectionId);
                if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        setIsOpen(false);
                }
        };

        const navItems = [
                { id: 'features', label: 'Features', icon: 'fas fa-sparkles' },
                { id: 'about', label: 'About', icon: 'fas fa-heart' },
                { id: 'download', label: 'Download', icon: 'fas fa-mobile-alt' },
                { id: 'contact', label: 'Contact', icon: 'fas fa-envelope' },
        ];

        return (
                <nav className={`navbar-modern ${scrolled ? 'scrolled' : ''} ${isOpen ? 'menu-open' : ''}`}>
                        <div className="nav-container">
                                {/* Logo */}
                                <a className="nav-logo" href="/">
                                        {/* <span className="logo-icon">
                                                <i className="fas fa-leaf"></i>
                                        </span> */}
                                        <span className="logo-text">Bloomer</span>
                                </a>

                                {/* Desktop Navigation */}
                                <div className="nav-menu">
                                        {navItems.map((item) => (
                                                <button
                                                        key={item.id}
                                                        className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                                                        onClick={() => scrollToSection(item.id)}
                                                >
                                                        <span className="nav-item-text">{item.label}</span>
                                                        <span className="nav-item-indicator"></span>
                                                </button>
                                        ))}
                                </div>

                                {/* CTA Button */}
                                <div className="nav-cta">
                                        <button
                                                className="cta-button"
                                                onClick={() => scrollToSection('download')}
                                        >
                                                <span>Get App</span>
                                                <i className="fas fa-arrow-right"></i>
                                        </button>
                                </div>

                                {/* Mobile Toggle */}
                                <button
                                        className={`nav-toggle ${isOpen ? 'active' : ''}`}
                                        onClick={(e) => {
                                                e.stopPropagation();
                                                setIsOpen(!isOpen);
                                        }}
                                        aria-label="Toggle navigation"
                                >
                                        <span className="toggle-line"></span>
                                        <span className="toggle-line"></span>
                                        <span className="toggle-line"></span>
                                </button>
                        </div>

                        {/* Mobile Menu */}
                        <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                                <div className="mobile-menu-content">
                                        {navItems.map((item, index) => (
                                                <button
                                                        key={item.id}
                                                        className={`mobile-nav-item ${activeSection === item.id ? 'active' : ''}`}
                                                        onClick={() => scrollToSection(item.id)}
                                                        style={{ animationDelay: `${index * 0.1}s` }}
                                                >
                                                        <i className={item.icon}></i>
                                                        <span>{item.label}</span>
                                                        <i className="fas fa-chevron-right arrow"></i>
                                                </button>
                                        ))}
                                        <button
                                                className="mobile-cta-button"
                                                onClick={() => scrollToSection('download')}
                                        >
                                                <i className="fas fa-download"></i>
                                                <span>Download App</span>
                                        </button>
                                </div>
                        </div>
                </nav>
        );
};

export default Navbar;
