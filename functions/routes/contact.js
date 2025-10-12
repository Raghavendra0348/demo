const express = require('express');
const router = express.Router();
const validator = require('validator');
const { db } = require('../config/firebase');

// Firestore collection reference
const contactsCollection = db.collection('contacts');

// Submit contact form
router.post('/submit', async (req, res) => {
        try {
                const { name, email, subject, message } = req.body;

                // Validate required fields
                if (!name || !email || !subject || !message) {
                        return res.status(400).json({
                                success: false,
                                message: 'All fields are required'
                        });
                }

                // Validate email
                if (!validator.isEmail(email)) {
                        return res.status(400).json({
                                success: false,
                                message: 'Please provide a valid email address'
                        });
                }

                // Create new contact message
                const contactData = {
                        name: name.trim(),
                        email: email.toLowerCase().trim(),
                        subject: subject.trim(),
                        message: message.trim(),
                        status: 'new',
                        priority: 'medium',
                        ipAddress: req.ip || null,
                        userAgent: req.headers['user-agent'] || null,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                };

                const docRef = await contactsCollection.add(contactData);

                res.status(201).json({
                        success: true,
                        message: 'Thank you for contacting us! We will get back to you soon.',
                        data: {
                                id: docRef.id,
                                name: contactData.name,
                                email: contactData.email
                        }
                });

        } catch (error) {
                console.error('Contact form error:', error);
                res.status(500).json({
                        success: false,
                        message: 'Failed to submit contact form. Please try again later.'
                });
        }
});

// Get all contact messages (admin only - add authentication in production)
router.get('/messages', async (req, res) => {
        try {
                const { page = 1, limit = 20, status = 'all' } = req.query;

                let query = contactsCollection;

                if (status !== 'all') {
                        query = query.where('status', '==', status);
                }

                const snapshot = await query
                        .orderBy('createdAt', 'desc')
                        .limit(parseInt(limit))
                        .offset((parseInt(page) - 1) * parseInt(limit))
                        .get();

                const messages = [];
                snapshot.forEach(doc => {
                        messages.push({
                                id: doc.id,
                                ...doc.data()
                        });
                });

                // Get total count
                const countSnapshot = await (status !== 'all'
                        ? contactsCollection.where('status', '==', status).get()
                        : contactsCollection.get());

                const total = countSnapshot.size;

                res.status(200).json({
                        success: true,
                        data: messages,
                        totalPages: Math.ceil(total / parseInt(limit)),
                        currentPage: parseInt(page),
                        total
                });

        } catch (error) {
                console.error('Get messages error:', error);
                res.status(500).json({
                        success: false,
                        message: 'Failed to fetch messages'
                });
        }
});

// Update contact message status (admin only)
router.patch('/messages/:id/status', async (req, res) => {
        try {
                const { id } = req.params;
                const { status } = req.body;

                if (!['new', 'in-progress', 'resolved', 'closed'].includes(status)) {
                        return res.status(400).json({
                                success: false,
                                message: 'Invalid status value'
                        });
                }

                const docRef = contactsCollection.doc(id);
                const doc = await docRef.get();

                if (!doc.exists) {
                        return res.status(404).json({
                                success: false,
                                message: 'Contact message not found'
                        });
                }

                await docRef.update({
                        status,
                        updatedAt: new Date().toISOString()
                });

                const updatedDoc = await docRef.get();

                res.status(200).json({
                        success: true,
                        message: 'Status updated successfully',
                        data: {
                                id: updatedDoc.id,
                                ...updatedDoc.data()
                        }
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
