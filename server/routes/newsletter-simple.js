const express = require('express');
const router = express.Router();
const validator = require('validator');
const { admin, db } = require('../config/firebase');

// Import the email service
let sendWelcomeEmail;
try {
        const emailService = require('../services/emailService');
        sendWelcomeEmail = emailService.sendWelcomeEmail;
        console.log('✅ Email service loaded successfully');
} catch (error) {
        console.log('❌ Email service failed to load:', error.message);
        sendWelcomeEmail = null;
}

// Firestore collection reference
const newslettersCollection = db.collection('newsletters');

// Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
        try {
                const { email, source = 'footer' } = req.body;

                if (!email) {
                        return res.status(400).json({
                                success: false,
                                message: 'Email is required'
                        });
                }

                // Validate email
                if (!validator.isEmail(email)) {
                        return res.status(400).json({
                                success: false,
                                message: 'Please provide a valid email address'
                        });
                }

                const normalizedEmail = email.toLowerCase().trim();

                // Check if email already exists
                try {
                        const existingSubscriber = await newslettersCollection
                                .where('email', '==', normalizedEmail)
                                .where('active', '==', true)
                                .get();

                        if (!existingSubscriber.empty) {
                                return res.status(409).json({
                                        success: false,
                                        message: 'Email is already subscribed to our newsletter'
                                });
                        }
                } catch (firestoreError) {
                        console.log('Firestore check failed, continuing...', firestoreError.message);
                }

                // Prepare subscriber data
                const subscriberData = {
                        email: normalizedEmail,
                        source: source,
                        active: true,
                        subscribed: true,
                        subscribedAt: new Date().toISOString(),
                        ipAddress: req.ip || 'unknown',
                        userAgent: req.get('User-Agent') || 'unknown',
                        updatedAt: new Date().toISOString()
                };

                // Save to Firestore
                try {
                        await newslettersCollection.add(subscriberData);
                        console.log(`✅ Saved subscriber: ${normalizedEmail}`);
                } catch (firestoreError) {
                        console.log('Firestore save failed, but continuing...', firestoreError.message);
                }

                // Send welcome email
                if (sendWelcomeEmail && typeof sendWelcomeEmail === 'function') {
                        console.log('📧 Attempting to send welcome email...');
                        sendWelcomeEmail(normalizedEmail, source).then(result => {
                                if (result.success) {
                                        console.log(`✅ Welcome email sent to ${normalizedEmail}`);
                                } else {
                                        console.log(`❌ Welcome email failed: ${result.error}`);
                                }
                        }).catch(err => {
                                console.error('Email send error:', err.message);
                        });
                } else {
                        console.log('❌ Email service not available');
                }

                res.status(201).json({
                        success: true,
                        message: 'Successfully subscribed to newsletter! Welcome email sent.',
                        data: {
                                email: normalizedEmail,
                                source: source,
                                subscribedAt: subscriberData.subscribedAt
                        }
                });

        } catch (error) {
                console.error('Newsletter subscription error:', error);
                res.status(500).json({
                        success: false,
                        message: 'Failed to subscribe. Please try again later.'
                });
        }
});

module.exports = router;
