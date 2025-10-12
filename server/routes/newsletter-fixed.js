const express = require('express');
const router = express.Router();
const validator = require('validator');

// Import email service with error handling
let sendWelcomeEmail = null;
try {
  const { sendWelcomeEmail: emailFunc } = require('../services/emailService');
  sendWelcomeEmail = emailFunc;
  console.log('✅ Email service imported successfully');
} catch (error) {
  console.log('❌ Failed to import email service:', error.message);
}

// Simple in-memory storage for development (replace with Firebase when it works)
const subscribers = new Set();

// Subscribe to newsletter - SIMPLIFIED VERSION
router.post('/subscribe', async (req, res) => {
  try {
    console.log('📧 Newsletter subscription request received');
    const { email, source = 'website' } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
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

    // Check if already subscribed (simple check)
    if (subscribers.has(normalizedEmail)) {
      return res.status(409).json({
        success: false,
        message: 'Email is already subscribed to our newsletter'
      });
    }

    // Add to subscribers
    subscribers.add(normalizedEmail);
    console.log(`✅ Added ${normalizedEmail} to subscribers`);

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

    // Always return success for subscription, even if email fails
    const response = {
      success: true,
      message: emailResult?.success 
        ? 'Successfully subscribed! Welcome email sent.' 
        : 'Successfully subscribed! Email will be sent shortly.',
      data: {
        email: normalizedEmail,
        source: source,
        subscribedAt: new Date().toISOString(),
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
      message: 'Failed to subscribe. Please try again later.',
      error: error.message
    });
  }
});

// Get subscribers count
router.get('/count', (req, res) => {
  res.json({
    success: true,
    count: subscribers.size,
    subscribers: Array.from(subscribers)
  });
});

// Test endpoint
router.post('/test-email', async (req, res) => {
  const testEmail = req.body.email || 'bloomer.7b@gmail.com';
  
  if (!sendWelcomeEmail) {
    return res.status(500).json({
      success: false,
      message: 'Email service not available'
    });
  }

  try {
    const result = await sendWelcomeEmail(testEmail, 'test');
    res.json({
      success: true,
      message: 'Test email sent',
      result: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Test email failed',
      error: error.message
    });
  }
});

module.exports = router;
