#!/usr/bin/env node

/**
 * Direct SMTP Test - Tests email sending without dependencies
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const nodemailer = require('nodemailer');

async function testSMTP() {
        console.log('\n🔧 SMTP CONFIGURATION TEST');
        console.log('==========================\n');

        console.log('📋 SMTP Settings:');
        console.log(`   Host: ${process.env.SMTP_HOST}`);
        console.log(`   Port: ${process.env.SMTP_PORT}`);
        console.log(`   User: ${process.env.SMTP_USER}`);
        console.log(`   Pass: ${process.env.SMTP_PASS ? '✓ (hidden)' : '❌ Not set'}`);
        console.log(`   From: ${process.env.SMTP_FROM}`);

        console.log('\n⚙️ Creating SMTP transporter...');

        try {
                const transporter = nodemailer.createTransport({
                        host: process.env.SMTP_HOST,
                        port: process.env.SMTP_PORT || 587,
                        secure: process.env.SMTP_SECURE === 'true',
                        auth: {
                                user: process.env.SMTP_USER,
                                pass: process.env.SMTP_PASS
                        }
                });

                console.log('✅ Transporter created successfully');

                console.log('\n📧 Sending test email...');

                const testEmail = {
                        from: process.env.SMTP_FROM,
                        to: process.env.SMTP_USER, // Send to yourself
                        subject: '🧪 Bloomer Email Test - ' + new Date().toISOString(),
                        html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h1 style="color: #4f46e5;">Bloomer Email Test</h1>
                    <p>This is a test email to verify your SMTP configuration is working.</p>
                    
                    <div style="background: #f9fafb; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h3>Test Details:</h3>
                        <ul>
                            <li><strong>Time:</strong> ${new Date().toISOString()}</li>
                            <li><strong>SMTP Host:</strong> ${process.env.SMTP_HOST}</li>
                            <li><strong>From:</strong> ${process.env.SMTP_FROM}</li>
                            <li><strong>To:</strong> ${process.env.SMTP_USER}</li>
                        </ul>
                    </div>
                    
                    <p>If you received this email, your SMTP configuration is working correctly!</p>
                    
                    <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
                        This is a test email from Bloomer newsletter system.
                    </p>
                </div>
            `,
                        text: `
BLOOMER EMAIL TEST
==================

This is a test email to verify your SMTP configuration.

Test Details:
- Time: ${new Date().toISOString()}
- SMTP Host: ${process.env.SMTP_HOST}
- From: ${process.env.SMTP_FROM}
- To: ${process.env.SMTP_USER}

If you received this email, your SMTP configuration is working correctly!
            `
                };

                const info = await transporter.sendMail(testEmail);

                console.log('✅ EMAIL SENT SUCCESSFULLY!');
                console.log(`📬 Message ID: ${info.messageId}`);
                console.log(`📧 Sent to: ${process.env.SMTP_USER}`);

                console.log('\n📱 Next Steps:');
                console.log('1. Check your email inbox');
                console.log('2. Look for subject: "🧪 Bloomer Email Test"');
                console.log('3. Check spam folder if not in inbox');
                console.log('4. Verify the email content looks good');

                console.log('\n✅ SMTP Configuration is working! Your newsletter emails will be sent successfully.');

        } catch (error) {
                console.log('❌ EMAIL SENDING FAILED!');
                console.log(`Error: ${error.message}`);

                console.log('\n🔍 Common Issues:');
                console.log('1. Check Gmail App Password (16 digits, no spaces)');
                console.log('2. Make sure 2FA is enabled on Gmail account');
                console.log('3. Verify SMTP credentials are correct');
                console.log('4. Check if Gmail is blocking the connection');

                console.log('\n📝 Gmail App Password Setup:');
                console.log('1. Go to: https://myaccount.google.com/apppasswords');
                console.log('2. Create new app password for "Mail"');
                console.log('3. Copy the 16-digit password');
                console.log('4. Update SMTP_PASS in your .env file');
        }

        console.log('\n==========================\n');
}

// Run the test
testSMTP().catch(console.error);
