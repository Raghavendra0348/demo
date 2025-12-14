import React, { useState } from 'react';
import './Newsletter.css';

const Newsletter = ({ source = 'footer' }) => {
        const [email, setEmail] = useState('');
        const [loading, setLoading] = useState(false);
        const [message, setMessage] = useState('');
        const [isFocused, setIsFocused] = useState(false);

        const handleSubmit = async (e) => {
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
                                body: JSON.stringify({ email, source }),
                        });

                        const data = await response.json();

                        if (data.success) {
                                const emoji = data.alreadySubscribed ? '🌸' : '🎉';
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
                <div className={`newsletter-wrapper ${isFocused ? 'focused' : ''}`}>
                        <div className="newsletter-glow"></div>
                        <form onSubmit={handleSubmit} className="newsletter-form">
                                <div className="newsletter-input-group">
                                        <div className="input-icon">
                                                <i className="fas fa-envelope"></i>
                                        </div>
                                        <input
                                                type="email"
                                                className="newsletter-input"
                                                placeholder="Enter your email address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                onFocus={() => setIsFocused(true)}
                                                onBlur={() => setIsFocused(false)}
                                                required
                                                disabled={loading}
                                        />
                                        <button
                                                className="newsletter-submit"
                                                type="submit"
                                                disabled={loading}
                                        >
                                                {loading ? (
                                                        <i className="fas fa-spinner fa-spin"></i>
                                                ) : (
                                                        <>
                                                                <span className="btn-text">Subscribe</span>
                                                                <i className="fas fa-arrow-right btn-icon"></i>
                                                        </>
                                                )}
                                        </button>
                                </div>
                        </form>
                        {message && (
                                <div className={`newsletter-message ${message.includes('❌') ? 'error' : 'success'}`}>
                                        {message}
                                </div>
                        )}
                </div>
        );
};

export default Newsletter;
