const mongoose = require('mongoose');
const validator = require('validator');

const newsletterSchema = new mongoose.Schema({
        email: {
                type: String,
                required: [true, 'Email is required'],
                unique: true,
                lowercase: true,
                trim: true,
                validate: {
                        validator: (value) => validator.isEmail(value),
                        message: 'Please provide a valid email address'
                }
        },
        subscribedAt: {
                type: Date,
                default: Date.now
        },
        isActive: {
                type: Boolean,
                default: true
        },
        source: {
                type: String,
                enum: ['homepage', 'footer', 'popup', 'other'],
                default: 'footer'
        },
        ipAddress: {
                type: String,
                default: null
        },
        userAgent: {
                type: String,
                default: null
        }
}, {
        timestamps: true
});

// Index for faster queries
newsletterSchema.index({ email: 1 });
newsletterSchema.index({ subscribedAt: -1 });

// Method to unsubscribe
newsletterSchema.methods.unsubscribe = function () {
        this.isActive = false;
        return this.save();
};

const Newsletter = mongoose.model('Newsletter', newsletterSchema);

module.exports = Newsletter;
