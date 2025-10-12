#!/usr/bin/env node

/**
 * Quick Email Test - Uses your actual SMTP configuration
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { sendWelcomeEmail } = require('./server/services/emailService');

async function quickEmailTest() {
        console.log('\n🧪 QUICK EMAIL TEST');
        console.log('==================\n');

        // Use your SMTP_USER email as test recipient
        const testEmail = process.env.SMTP_USER || 'your-email@gmail.com';

        console.log(`📧 Sending test email to: ${testEmail}`);
        console.log(`📬 From: ${process.env.SMTP_FROM}`);
        console.log(`🖥️  SMTP Host: ${process.env.SMTP_HOST}`);

        console.log('\n⏳ Sending email...\n');

        try {
                const result = await sendWelcomeEmail(testEmail, 'email-test');

                if (result.success) {
                        console.log('✅ SUCCESS! Email sent successfully!');
                        console.log(`📊 Mode: ${result.mode}`);

                        if (result.mode === 'production') {
                                console.log('📬 Check your inbox! Email should arrive shortly.');
                                console.log('📱 Also check spam/junk folder just in case.');
                        }

                        console.log('\n📧 What to check in the email:');
                        console.log('   ✓ Subject: "Welcome to Bloomer - Subscription Confirmed"');
                        console.log('   ✓ No emojis or icons in content');
                        console.log('   ✓ Professional design and layout');
                        console.log('   ✓ Clear Bloomer platform description');
                        console.log('   ✓ 5 detailed benefits listed');
                        console.log('   ✓ Visit Bloomer Platform button');
                        console.log('   ✓ Footer with contact info');

                } else {
                        console.log('❌ FAILED to send email');
                        console.log(`Error: ${result.error}`);
                }

        } catch (error) {
                console.log('💥 ERROR occurred:');
                console.log(error.message);
        }

        console.log('\n==================\n');
}

// Run the test
quickEmailTest();
