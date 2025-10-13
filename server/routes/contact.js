const express = require('express');
const router = express.Router();
const validator = require('validator');
const { db } = require('../config/firebase');

/**
 * Contact Form Routes using Firestore
 */

// Submit contact form
router.post('/submit', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    const errors = [];

    if (!name || name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }

    if (!email || !validator.isEmail(email)) {
      errors.push('Please provide a valid email address');
    }

    if (!subject || subject.trim().length < 3) {
      errors.push('Subject must be at least 3 characters long');
    }

    if (!message || message.trim().length < 10) {
      errors.push('Message must be at least 10 characters long');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    // Create contact message
    const contactData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subject: subject.trim(),
      message: message.trim(),
      status: 'new',
      priority: 'medium',
      createdAt: new Date().toISOString(),
      ipAddress: req.ip || req.connection.remoteAddress || null,
      userAgent: req.get('user-agent') || null
    };

    const contactRef = await db.collection('contacts').add(contactData);

    res.status(201).json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.',
      id: contactRef.id
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again later.'
    });
  }
});

// Get all messages (admin only)
router.get('/messages', async (req, res) => {
  try {
    const { page = 1, limit = 20, status = 'all' } = req.query;

    const contactsRef = db.collection('contacts');
    let query = contactsRef;

    if (status !== 'all') {
      query = query.where('status', '==', status);
    }

    const snapshot = await query.orderBy('createdAt', 'desc').get();

    const messages = [];
    snapshot.forEach(doc => {
      messages.push({
        id: doc.id,
        ...doc.data()
      });
    });

    // Simple pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedMessages = messages.slice(startIndex, endIndex);

    res.json({
      success: true,
      count: paginatedMessages.length,
      total: messages.length,
      page: parseInt(page),
      totalPages: Math.ceil(messages.length / limit),
      data: paginatedMessages
    });

  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch messages'
    });
  }
});

// Update message status (admin only)
router.patch('/messages/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['new', 'in-progress', 'resolved', 'closed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: new, in-progress, resolved, closed'
      });
    }

    const contactRef = db.collection('contacts').doc(id);
    const doc = await contactRef.get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    await contactRef.update({
      status: status,
      updatedAt: new Date().toISOString()
    });

    res.json({
      success: true,
      message: 'Status updated successfully'
    });

  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update status'
    });
  }
});

module.exports = router;
