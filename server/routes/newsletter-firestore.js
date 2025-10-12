const express = require('express');
const router = express.Router();
const validator = require('validator');
const { admin, db } = require('../config/firebase');

// Import email service with error handling
let sendWelcomeEmail = null;
try {
        const { sendWelcomeEmail: emailFunc } = require('../services/emailService');
        sendWelcomeEmail = emailFunc;
        console.log('✅ Email service imported successfully');
} catch (error) {
        console.log('❌ Failed to import email service:', error.message);
}

// Firestore collection reference
const newslettersCollection = db.collection('newsletters');

// Subscribe to newsletter - FIRESTORE VERSION WITH PROFESSIONAL MESSAGING
router.post('/subscribe', async (req, res) => {
        try {
                console.log('📧 Newsletter subscription request received');
                const { email, source = 'website' } = req.body;

                // Validate email
                if (!email) {
                        return res.status(400).json({
                                success: false,
                                message: 'Email address is required to subscribe to our newsletter'
                        });
                }

                if (!validator.isEmail(email)) {
                        return res.status(400).json({
                                success: false,
                                message: 'Please provide a valid email address'
                        });
                }

                const normalizedEmail = email.toLowerCase().trim();
                console.log(`📧 Processing subscription for: ${normalizedEmail}`);

                // Check if email already exists in Firestore
                const existingSnapshot = await newslettersCollection
                        .where('email', '==', normalizedEmail)
                        .limit(1)
                        .get();

                if (!existingSnapshot.empty) {
                        const existingDoc = existingSnapshot.docs[0];
                        const existingData = existingDoc.data();

                        if (existingData.isActive) {
                                console.log(`⚠️  ${normalizedEmail} is already subscribed`);
                                // PROFESSIONAL MESSAGE for already subscribed users
                                return res.status(200).json({
                                        success: true,
                                        alreadySubscribed: true,
                                        message: "Thank you for your interest! You're already subscribed to receive Bloomer updates. We appreciate your continued engagement with our platform.",
                                        data: {
                                                email: normalizedEmail,
                                                status: 'active_subscriber',
                                                subscribedAt: existingData.subscribedAt || 'previously',
                                                note: 'Your subscription is active and you will continue to receive our latest updates'
                                        }
                                });
                        } else {
                                // Reactivate subscription
                                await existingDoc.ref.update({
                                        isActive: true,
                                        subscribedAt: new Date().toISOString(),
                                        updatedAt: new Date().toISOString(),
                                        source: source
                                });

                                console.log(`✅ Reactivated subscription for ${normalizedEmail}`);

                                // Send welcome back email
                                if (sendWelcomeEmail && typeof sendWelcomeEmail === 'function') {
                                        try {
                                                await sendWelcomeEmail(normalizedEmail, source);
                                                console.log(`📧 Welcome back email sent to ${normalizedEmail}`);
                                        } catch (emailError) {
                                                console.log(`❌ Welcome back email failed: ${emailError.message}`);
                                        }
                                }

                                return res.status(200).json({
                                        success: true,
                                        message: 'Welcome back! Your newsletter subscription has been successfully reactivated.',
                                        data: {
                                                email: normalizedEmail,
                                                status: 'reactivated',
                                                subscribedAt: new Date().toISOString()
                                        }
                                });
                        }
                }

                // Create Firebase Auth user (optional - for future authentication features)
                let authUser = null;
                try {
                        authUser = await admin.auth().createUser({
                                email: normalizedEmail,
                                emailVerified: false,
                                disabled: false,
                                displayName: normalizedEmail.split('@')[0] // Use part before @ as display name
                        });
                        console.log(`✅ Created Firebase Auth user: ${authUser.uid}`);
                } catch (authError) {
                        // If user already exists in Auth, get their UID
                        if (authError.code === 'auth/email-already-exists') {
                                try {
                                        authUser = await admin.auth().getUserByEmail(normalizedEmail);
                                        console.log(`ℹ️  Auth user already exists: ${authUser.uid}`);
                                } catch (err) {
                                        console.error('Error fetching existing auth user:', err);
                                }
                        } else {
                                console.error('Auth user creation error:', authError);
                                // Continue anyway - we'll still save to Firestore
                        }
                }

                // Create new subscriber in Firestore
                const subscriberData = {
                        email: normalizedEmail,
                        authUid: authUser ? authUser.uid : null, // Link to Firebase Auth user
                        subscribedAt: new Date().toISOString(),
                        isActive: true,
                        source,
                        ipAddress: req.ip || null,
                        userAgent: req.headers['user-agent'] || null,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                };

                await newslettersCollection.add(subscriberData);
                console.log(`✅ Saved ${normalizedEmail} to Firestore`);

                // Send welcome email
                let emailResult = null;
                if (sendWelcomeEmail && typeof sendWelcomeEmail === 'function') {
                        console.log('📧 Sending welcome email...');
                        try {
                                emailResult = await sendWelcomeEmail(normalizedEmail, source);
                                console.log('📧 Email result:', emailResult);
                        } catch (emailError) {
                                console.log('❌ Email sending failed:', emailError.message);
                                emailResult = { success: false, error: emailError.message };
                        }
                } else {
                        console.log('❌ Email service not available');
                        emailResult = { success: false, error: 'Email service not available' };
                }

                // Professional success response
                const response = {
                        success: true,
                        message: emailResult?.success
                                ? 'Subscription confirmed! You have been successfully added to our newsletter and will receive a welcome email shortly.'
                                : 'Subscription confirmed! You have been successfully added to our newsletter. Welcome email will be delivered shortly.',
                        data: {
                                email: normalizedEmail,
                                source: source,
                                subscribedAt: subscriberData.subscribedAt,
                                authUser: authUser ? true : false,
                                authUid: authUser ? authUser.uid : null,
                                emailSent: emailResult?.success || false
                        }
                };

                if (emailResult?.success) {
                        console.log(`✅ Complete success: ${normalizedEmail} subscribed and email sent`);
                } else {
                        console.log(`⚠️  Partial success: ${normalizedEmail} subscribed but email failed`);
                }

                res.status(201).json(response);

        } catch (error) {
                console.error('Newsletter subscription error:', error);
                res.status(500).json({
                        success: false,
                        message: 'We encountered an issue processing your subscription. Please try again in a moment.',
                        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
                });
        }
});

// Get subscribers count (admin endpoint)
router.get('/count', async (req, res) => {
        try {
                const snapshot = await newslettersCollection
                        .where('isActive', '==', true)
                        .get();

                res.json({
                        success: true,
                        count: snapshot.size,
                        message: `Currently ${snapshot.size} active subscribers`
                });
        } catch (error) {
                console.error('Get subscribers count error:', error);
                res.status(500).json({
                        success: false,
                        message: 'Unable to retrieve subscriber count'
                });
        }
});

// Get all subscribers (admin endpoint)
router.get('/subscribers', async (req, res) => {
        try {
                const { page = 1, limit = 50, active = 'true' } = req.query;

                let query = newslettersCollection;

                if (active === 'true') {
                        query = query.where('isActive', '==', true);
                }

                const snapshot = await query
                        .orderBy('subscribedAt', 'desc')
                        .limit(parseInt(limit))
                        .offset((parseInt(page) - 1) * parseInt(limit))
                        .get();

                const subscribers = [];
                snapshot.forEach(doc => {
                        subscribers.push({
                                id: doc.id,
                                ...doc.data()
                        });
                });

                // Get total count
                const countSnapshot = await (active === 'true'
                        ? newslettersCollection.where('isActive', '==', true).get()
                        : newslettersCollection.get());

                const total = countSnapshot.size;

                res.status(200).json({
                        success: true,
                        data: subscribers,
                        totalPages: Math.ceil(total / parseInt(limit)),
                        currentPage: parseInt(page),
                        total
                });

        } catch (error) {
                console.error('Get subscribers error:', error);
                res.status(500).json({
                        success: false,
                        message: 'Failed to fetch subscribers'
                });
        }
});

// Unsubscribe from newsletter
router.post('/unsubscribe', async (req, res) => {
        try {
                const { email } = req.body;

                if (!email) {
                        return res.status(400).json({
                                success: false,
                                message: 'Email address is required for unsubscription'
                        });
                }

                const normalizedEmail = email.toLowerCase().trim();

                const snapshot = await newslettersCollection
                        .where('email', '==', normalizedEmail)
                        .limit(1)
                        .get();

                if (snapshot.empty) {
                        return res.status(404).json({
                                success: false,
                                message: 'This email address was not found in our subscriber list'
                        });
                }

                const doc = snapshot.docs[0];
                await doc.ref.update({
                        isActive: false,
                        unsubscribedAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                });

                res.status(200).json({
                        success: true,
                        message: 'You have been successfully unsubscribed from our newsletter. We appreciate the time you spent with us.'
                });

        } catch (error) {
                console.error('Newsletter unsubscribe error:', error);
                res.status(500).json({
                        success: false,
                        message: 'We encountered an issue processing your unsubscribe request. Please try again.'
                });
        }
});

module.exports = router;
