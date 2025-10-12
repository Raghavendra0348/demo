import React, { useState } from 'react';

const Newsletter = ({ source = 'footer' }) => {
        const [email, setEmail] = useState('');
        const [loading, setLoading] = useState(false);
        const [message, setMessage] = useState('');

        const handleSubmit = async (e) => {
                e.preventDefault();
                setLoading(true);
                setMessage('');

                try {
                        const response = await fetch('/api/newsletter/subscribe', {
                                method: 'POST',
                                headers: {
                                        'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ email, source }),
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
                <div className="newsletter-section">
                        <form onSubmit={handleSubmit}>
                                <div className="input-group">
                                        <input
                                                type="email"
                                                className="form-control newsletter-input"
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                disabled={loading}
                                        />
                                        <button
                                                className="btn newsletter-btn"
                                                type="submit"
                                                disabled={loading}
                                        >
                                                {loading ? (
                                                        <i className="fas fa-spinner fa-spin"></i>
                                                ) : (
                                                        <i className="fas fa-paper-plane"></i>
                                                )}
                                        </button>
                                </div>
                        </form>
                        {message && (
                                <div className={`alert ${message.includes('❌') ? 'alert-danger' : 'alert-success'} mt-3`}>
                                        {message}
                                </div>
                        )}
                </div>
        );
};

export default Newsletter;
