const express = require('express');
const router = express.Router();
const validator = require('validator');
const { db } = require('../config/firebase');
const { sendWelcomeEmail } = require('../services/emailService');

/**
 * Newsletter Routes using Firestore
 */

// Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email, source = 'footer' } = req.body;

    // Validate email
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if email already exists
    const subscribersRef = db.collection('newsletter');
    const existingDoc = await subscribersRef.doc(normalizedEmail).get();

    if (existingDoc.exists) {
      const data = existingDoc.data();
      
      if (data.isActive) {
        // Already subscribed and active
        return res.status(200).json({
          success: true,
          message: "You're already part of our community! 🎉 Stay tuned for exciting updates!",
          alreadySubscribed: true
        });
      } else {
        // Reactivate subscription
        await subscribersRef.doc(normalizedEmail).update({
          isActive: true,
          resubscribedAt: new Date().toISOString(),
          source: source
        });

        // Send welcome email
        try {
          await sendWelcomeEmail(normalizedEmail, source);
        } catch (emailError) {
          console.error('Email sending failed:', emailError.message);
        }

        return res.status(200).json({
          success: true,
          message: 'Welcome back! 🎉 Your subscription has been reactivated!'
        });
      }
    }

    // Create new subscription
    const subscriberData = {
      email: normalizedEmail,
      subscribedAt: new Date().toISOString(),
      isActive: true,
      source: source,
      ipAddress: req.ip || req.connection.remoteAddress || null,
      userAgent: req.get('user-agent') || null
    };

    await subscribersRef.doc(normalizedEmail).set(subscriberData);

    // Send welcome email (non-blocking)
    try {
      await sendWelcomeEmail(normalizedEmail, source);
    } catch (emailError) {
      console.error('Email sending failed:', emailError.message);
      // Don't fail the subscription if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for subscribing! 🎉 Check your email for a warm welcome!'
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

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const subscribersRef = db.collection('newsletter');
    const docRef = subscribersRef.doc(normalizedEmail);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Email not found in our newsletter list'
      });
    }

    await docRef.update({
      isActive: false,
      unsubscribedAt: new Date().toISOString()
    });

    res.json({
      success: true,
      message: 'You have been successfully unsubscribed'
    });

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to unsubscribe. Please try again later.'
    });
  }
});

// Get all subscribers (admin only)
router.get('/subscribers', async (req, res) => {
  try {
    const { page = 1, limit = 50, active = 'true' } = req.query;
    const isActive = active === 'true';

    const subscribersRef = db.collection('newsletter');
    let query = subscribersRef.where('isActive', '==', isActive);
    
    const snapshot = await query.orderBy('subscribedAt', 'desc').get();
    
    const subscribers = [];
    snapshot.forEach(doc => {
      subscribers.push({
        id: doc.id,
        ...doc.data()
      });
    });

    // Simple pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedSubscribers = subscribers.slice(startIndex, endIndex);

    res.json({
      success: true,
      count: paginatedSubscribers.length,
      total: subscribers.length,
      page: parseInt(page),
      totalPages: Math.ceil(subscribers.length / limit),
      data: paginatedSubscribers
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
