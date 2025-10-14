const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
// Load environment variables from root .env file
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Import Firebase config
const { admin, db } = require('./config/firebase');

// Import routes
const newsletterRoutes = require('./routes/newsletter-firestore');
const contactRoutes = require('./routes/contact');

const app = express();

// Middleware
app.use(helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(compression());
app.use(morgan('dev'));

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
        : ['http://localhost:3000', 'http://localhost:5000'];

console.log('🌐 Allowed Origins:', allowedOrigins);

// Enable pre-flight across all routes
app.options('*', cors({
        origin: function (origin, callback) {
                if (!origin) return callback(null, true);
                if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins[0] === '*') {
                        callback(null, true);
                } else {
                        console.log('❌ CORS blocked origin:', origin);
                        callback(new Error('Not allowed by CORS'));
                }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
        exposedHeaders: ['Content-Length', 'X-Request-Id'],
        maxAge: 86400 // 24 hours
}));

app.use(cors({
        origin: function (origin, callback) {
                // Allow requests with no origin (mobile apps, curl, etc.)
                if (!origin) return callback(null, true);

                if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins[0] === '*') {
                        callback(null, true);
                } else {
                        console.log('❌ CORS blocked origin:', origin);
                        callback(new Error('Not allowed by CORS'));
                }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
        exposedHeaders: ['Content-Length', 'X-Request-Id']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Firebase is already initialized in config/firebase.js
console.log('✅ Firebase initialized and ready');

// Request logging middleware
app.use((req, res, next) => {
        console.log(`${req.method} ${req.path} - Origin: ${req.get('origin') || 'none'}`);
        next();
});

// API Routes
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
        res.json({
                status: 'OK',
                message: 'Bloomer API is running',
                timestamp: new Date().toISOString(),
                environment: process.env.NODE_ENV
        });
});

// Serve static files from the root directory in development
if (process.env.NODE_ENV !== 'production') {
        app.use(express.static(path.join(__dirname, '..')));

        app.get('/', (req, res) => {
                res.sendFile(path.join(__dirname, '..', 'index.html'));
        });
}

// // Serve React build in production
// if (process.env.NODE_ENV === 'production') {
//         app.use(express.static(path.join(__dirname, '../client/build')));

//         app.get('*', (req, res) => {
//                 res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
//         });
// }

// Error handling middleware
app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(err.status || 500).json({
                success: false,
                message: err.message || 'Internal Server Error',
                ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        });
});

// 404 handler
app.use((req, res) => {
        console.log(`❌ 404 - Route not found: ${req.method} ${req.path}`);
        res.status(404).json({
                success: false,
                message: 'Route not found',
                path: req.path,
                method: req.method
        });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📝 Environment: ${process.env.NODE_ENV}`);
        console.log(`🌐 API available at http://localhost:${PORT}/api`);
});

module.exports = app;
