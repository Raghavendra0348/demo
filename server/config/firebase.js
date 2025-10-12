const admin = require('firebase-admin');
require('dotenv').config();

/**
 * Firebase Admin SDK Configuration
 * 
 * For local development without service account:
 * Use Firebase Emulator or set FIRESTORE_EMULATOR_HOST
 * 
 * For production:
 * Set FIREBASE_PRIVATE_KEY and FIREBASE_CLIENT_EMAIL in .env
 */

let db;

try {
        // Check if already initialized
        if (!admin.apps.length) {
                const projectId = process.env.FIREBASE_PROJECT_ID || 'bloomer-3d7ed';

                // Check if we have service account credentials
                const hasServiceAccount = process.env.FIREBASE_PRIVATE_KEY &&
                        process.env.FIREBASE_CLIENT_EMAIL;

                if (hasServiceAccount) {
                        // Production: Use service account credentials
                        admin.initializeApp({
                                credential: admin.credential.cert({
                                        projectId: projectId,
                                        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                                        clientEmail: process.env.FIREBASE_CLIENT_EMAIL
                                }),
                                projectId: projectId
                        });
                        console.log('✅ Firebase Admin initialized with service account');
                } else {
                        // Development: Use emulator
                        console.log('⚠️  No service account credentials found');
                        console.log('🔧 Setting up Firestore emulator for local development...');

                        // Set emulator host for local development
                        process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
                        process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';

                        admin.initializeApp({
                                projectId: projectId
                        });

                        console.log('✅ Firebase Admin initialized with emulator');
                        console.log('📍 Firestore Emulator: 127.0.0.1:8080');
                        console.log('📍 Auth Emulator: 127.0.0.1:9099');
                        console.log('💡 Data will be stored locally (not in cloud)');
                }

                console.log(`📦 Project ID: ${projectId}`);
        }

        // Initialize Firestore
        db = admin.firestore();

        // Firestore settings
        db.settings({
                ignoreUndefinedProperties: true
        });

        console.log('✅ Firestore database ready');

} catch (error) {
        console.error('❌ Firebase initialization error:', error.message);
        console.log('💡 To fix this:');
        console.log('   1. Run: npm install -g firebase-tools');
        console.log('   2. Run: firebase emulators:start --only firestore');
        console.log('   3. Or add service account credentials to .env');

        // Try to initialize Firestore anyway
        if (!db && admin.apps.length > 0) {
                db = admin.firestore();
        }
}

// Export Firebase Admin and Firestore instance
module.exports = { admin, db };
