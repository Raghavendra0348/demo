const mongoose = require('mongoose');
const validator = require('validator');

const contactSchema = new mongoose.Schema({
        name: {
                type: String,
                required: [true, 'Name is required'],
                trim: true,
                minlength: [2, 'Name must be at least 2 characters long'],
                maxlength: [100, 'Name cannot exceed 100 characters']
        },
        email: {
                type: String,
                required: [true, 'Email is required'],
                lowercase: true,
                trim: true,
                validate: {
                        validator: (value) => validator.isEmail(value),
                        message: 'Please provide a valid email address'
                }
        },
        subject: {
                type: String,
                required: [true, 'Subject is required'],
                trim: true,
                maxlength: [200, 'Subject cannot exceed 200 characters']
        },
        message: {
                type: String,
                required: [true, 'Message is required'],
                trim: true,
                minlength: [10, 'Message must be at least 10 characters long'],
                maxlength: [2000, 'Message cannot exceed 2000 characters']
        },
        status: {
                type: String,
                enum: ['new', 'in-progress', 'resolved', 'closed'],
                default: 'new'
        },
        priority: {
                type: String,
                enum: ['low', 'medium', 'high'],
                default: 'medium'
        },
        ipAddress: {
                type: String,
                default: null
        },
        userAgent: {
                type: String,
                default: null
        },
        respondedAt: {
                type: Date,
                default: null
        }
}, {
        timestamps: true
});

// Indexes
contactSchema.index({ email: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ status: 1 });

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
