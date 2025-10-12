import React, { useState } from 'react';

const Hero = () => {
        const [email, setEmail] = useState('');
        const [loading, setLoading] = useState(false);
        const [message, setMessage] = useState('');

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
                        const response = await fetch('/api/newsletter/subscribe', {
                                method: 'POST',
                                headers: {
                                        'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ email, source: 'coming-soon' }),
                        });

                        const data = await response.json();

                        if (data.success) {
                                // Show positive message with appropriate emoji
                                const emoji = data.alreadySubscribed ? '�' : '🎉';
                                setMessage(`${emoji} ${data.message}`);
                                if (!data.alreadySubscribed) {
                                        setEmail(''); // Only clear email for new subscriptions
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
                        <section className="coming">
                                <div className="container-coming">
                                        <h2 className="coming-soon-text">COMING<br />SOON</h2>
                                        <p className="tagline">
                                                Bloomer is revolutionizing shopping with video-first experiences.<br />
                                                Watch, swipe, and shop instantly from creators you trust.
                                        </p>
                                        <form className="form" onSubmit={handleComingSoonSubmit}>
                                                <input
                                                        type="email"
                                                        placeholder="Enter your email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                        disabled={loading}
                                                />
                                                <button className="get-notified-btn" type="submit" disabled={loading}>
                                                        {loading ? 'Submitting...' : 'Get Notified'}
                                                </button>
                                        </form>
                                        {message && (
                                                <div className={`alert ${message.includes('❌') ? 'alert-danger' : 'alert-success'} mt-3`}>
                                                        {message}
                                                </div>
                                        )}
                                        <p className="note">Be the first to know when we launch!</p>
                                </div>
                        </section>

                        <section className="hero-section">
                                <div className="container">
                                        <div className="row align-items-center">
                                                <div className="col-lg-6">
                                                        <div className="hero-content">
                                                                <h1 className="hero-title">Shop Through Stories</h1>
                                                                <p className="hero-subtitle">The Future of Social Commerce</p>
                                                                <p className="hero-description">
                                                                        Discover products through engaging video reels. Swipe, watch, and shop instantly in a
                                                                        fun, authentic, and trust-driven experience.
                                                                </p>
                                                                <div className="cta-buttons">
                                                                        <div className="feature-btn">
                                                                                <button className="btn btn-primary-custom" onClick={() => scrollToSection('download')}>
                                                                                        <i className="fas fa-download me-2"></i>Download App
                                                                                </button>
                                                                        </div>
                                                                        <div className="learn-btn">
                                                                                <button className="btn btn-outline-custom" onClick={() => scrollToSection('features')}>
                                                                                        <i className="fas fa-play me-2"></i>Learn More
                                                                                </button>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>

                                                <div className="col-lg-6 d-flex justify-content-center gap-3">
                                                        <div className="phone-mockup">
                                                                <div className="phone-frame">
                                                                        <div className="phone-screen">
                                                                                <img src="/screen_shot.png" alt="App Screenshot 1" className="img-fluid rounded" />
                                                                        </div>
                                                                </div>
                                                        </div>

                                                        <div className="phone-mockup">
                                                                <div className="phone-frame">
                                                                        <div className="phone-screen">
                                                                                <img src="/screen_shot1.png" alt="App Screenshot 2" className="img-fluid rounded" />
                                                                        </div>
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
