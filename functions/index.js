const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

// Import Firebase Admin (already initialized)
const { admin, db } = require('./config/firebase');

// Import routes
const newsletterRoutes = require('./routes/newsletter');
const contactRoutes = require('./routes/contact');

const app = express();

// Middleware
app.use(helmet());
app.use(compression());

// CORS configuration
app.use(cors({
    origin: [
        'http://localhost:3000',
        /\.vercel\.app$/,
        /\.firebaseapp\.com$/
    ],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/newsletter', newsletterRoutes);
app.use('/contact', contactRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Bloomer API on Firebase Functions',
        timestamp: new Date().toISOString()
    });
});

// Root
app.get('/', (req, res) => {
    res.json({
        message: 'Bloomer API',
        version: '1.0.0',
        endpoints: ['/health', '/newsletter', '/contact']
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

// Export as Firebase Function
exports.api = functions.https.onRequest(app);
