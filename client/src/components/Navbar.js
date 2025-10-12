import React, { useState } from 'react';

const Navbar = () => {
        const [isOpen, setIsOpen] = useState(false);

        const scrollToSection = (sectionId) => {
                const element = document.getElementById(sectionId);
                if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        setIsOpen(false);
                }
        };

        return (
                <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-custom" id="mainNavbar">
                        <div className="container">
                                <a className="navbar-brand fw-bold" href="/">Bloomer</a>

                                <button
                                        className="navbar-toggler custom-toggler"
                                        type="button"
                                        onClick={() => setIsOpen(!isOpen)}
                                        aria-controls="navbarNav"
                                        aria-expanded={isOpen}
                                        aria-label="Toggle navigation"
                                >
                                        <span className="toggler-icon"></span>
                                </button>

                                <div className={`collapse navbar-collapse mobile-menu ${isOpen ? 'show' : ''}`} id="navbarNav">
                                        <ul className="navbar-nav ms-auto">
                                                <li className="nav-item">
                                                        <button className="nav-link" onClick={() => scrollToSection('features')}>Features</button>
                                                </li>
                                                <li className="nav-item">
                                                        <button className="nav-link" onClick={() => scrollToSection('contact')}>Contact</button>
                                                </li>
                                                <li className="nav-item">
                                                        <button className="nav-link" onClick={() => scrollToSection('download')}>Get Started</button>
                                                </li>
                                                <li className="nav-item">
                                                        <button className="nav-link" onClick={() => scrollToSection('about')}>About</button>
                                                </li>
                                        </ul>
                                </div>
                        </div>
                </nav>
        );
};

export default Navbar;
