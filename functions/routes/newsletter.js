const express = require('express');
const router = express.Router();
const validator = require('validator');
const { admin, db } = require('../config/firebase');
const { sendWelcomeEmail } = require('../services/emailService');

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
                const existingSnapshot = await newslettersCollection
                        .where('email', '==', normalizedEmail)
                        .limit(1)
                        .get();

                if (!existingSnapshot.empty) {
                        const existingDoc = existingSnapshot.docs[0];
                        const existingData = existingDoc.data();

                        if (existingData.isActive) {
                                // Return positive message for already subscribed users
                                return res.status(200).json({
                                        success: true,
                                        alreadySubscribed: true,
                                        message: "You're already part of our Bloomer family! 🌸 We'll keep you updated on all the exciting things coming your way.",
                                        data: {
                                                email: normalizedEmail,
                                                authUser: existingData.authUid ? true : false
                                        }
                                });
                        } else {
                                // Reactivate subscription
                                await existingDoc.ref.update({
                                        isActive: true,
                                        subscribedAt: new Date().toISOString(),
                                        updatedAt: new Date().toISOString()
                                });

                                // Send welcome back email
                                sendWelcomeEmail(normalizedEmail, source).catch(err =>
                                        console.error('Email send failed:', err)
                                );

                                return res.status(200).json({
                                        success: true,
                                        message: 'Welcome back! Your subscription has been reactivated.',
                                        data: { email: normalizedEmail }
                                });
                        }
                }

                // Create Firebase Auth user (for authentication)
                let authUser = null;
                try {
                        // Create auth user with email (no password - they'll set it later if they want to login)
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

                // Send welcome email (async - don't wait for it)
                sendWelcomeEmail(normalizedEmail, source).catch(err =>
                        console.error('Email send failed:', err)
                );

                res.status(201).json({
                        success: true,
                        message: 'Successfully subscribed to our newsletter! 🎉',
                        data: {
                                email: normalizedEmail,
                                authUser: authUser ? true : false,
                                authUid: authUser ? authUser.uid : null
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

// Unsubscribe from newsletter
router.post('/unsubscribe', async (req, res) => {
        try {
                const { email } = req.body;

                if (!email) {
                        return res.status(400).json({
                                success: false,
                                message: 'Email is required'
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
                                message: 'Email not found in our subscriber list'
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
                        message: 'Successfully unsubscribed from newsletter'
                });

        } catch (error) {
                console.error('Newsletter unsubscribe error:', error);
                res.status(500).json({
                        success: false,
                        message: 'Failed to unsubscribe. Please try again later.'
                });
        }
});

// Get all subscribers (admin only - add authentication in production)
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

module.exports = router;
