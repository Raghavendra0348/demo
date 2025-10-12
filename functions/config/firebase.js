const admin = require('firebase-admin');

// Initialize Firebase Admin
// In Cloud Functions, credentials are automatically provided
admin.initializeApp();

const db = admin.firestore();
const auth = admin.auth();

module.exports = {
    admin,
    db,
    auth
};
