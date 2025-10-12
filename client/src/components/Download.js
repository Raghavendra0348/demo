import React from 'react';

const Download = () => {
        const showComingSoon = () => {
                alert('🎉 Coming Soon! \n\nBloomer will be available for download very soon. Stay tuned for updates!');
        };

        return (
                <section id="download" className="download-section py-5">
                        <div className="container">
                                <div className="row align-items-center">
                                        <div className="col-lg-6 mb-4 mb-lg-0">
                                                <h2 className="display-5 fw-bold mb-4">
                                                        Ready to Transform Your Shopping Experience?
                                                </h2>
                                                <p className="lead mb-4">
                                                        Join thousands of shoppers discovering products through engaging video content.
                                                        Download Bloomer today and start shopping in a whole new way.
                                                </p>
                                                <div className="app-buttons d-flex flex-wrap gap-3">
                                                        <button onClick={showComingSoon} className="btn btn-dark btn-lg d-flex align-items-center">
                                                                <i className="fab fa-apple fa-2x me-3"></i>
                                                                <div className="text-start">
                                                                        <small className="d-block">Download on the</small>
                                                                        <strong>App Store</strong>
                                                                </div>
                                                        </button>
                                                        <button onClick={showComingSoon} className="btn btn-dark btn-lg d-flex align-items-center">
                                                                <i className="fab fa-google-play fa-2x me-3"></i>
                                                                <div className="text-start">
                                                                        <small className="d-block">Get it on</small>
                                                                        <strong>Google Play</strong>
                                                                </div>
                                                        </button>
                                                </div>
                                                <p className="text-muted mt-3">
                                                        <i className="fas fa-check-circle text-success me-2"></i>
                                                        Free to download • No credit card required
                                                </p>
                                        </div>
                                        <div className="col-lg-6 text-center">
                                                <div className="position-relative">
                                                        <i className="fas fa-mobile-alt" style={{ fontSize: '15rem', color: 'var(--primary-color)', opacity: 0.1 }}></i>
                                                        <div className="position-absolute top-50 start-50 translate-middle">
                                                                <i className="fas fa-download" style={{ fontSize: '5rem', color: 'var(--primary-color)' }}></i>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </section>
        );
};

export default Download;
