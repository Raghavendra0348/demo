const sgMail = require('@sendgrid/mail');
const { getProfessionalWelcomeEmail } = require('./professionalEmailTemplate');
require('dotenv').config();

/**
 * Email Service for Bloomer Newsletter
 * 
 * Uses SendGrid Web API (more reliable than SMTP on Render)
 */

// Initialize SendGrid
let isInitialized = false;
const initializeSendGrid = () => {
  const apiKey = process.env.SENDGRID_API_KEY || process.env.SMTP_PASS;
  
  if (!apiKey) {
    console.log('📧 Email service in DEVELOPMENT mode (no SendGrid API key)');
    return false;
  }

  if (!apiKey.startsWith('SG.')) {
    console.log('⚠️  Warning: SENDGRID_API_KEY does not look like a valid SendGrid key');
    return false;
  }

  try {
    sgMail.setApiKey(apiKey);
    console.log('📧 Email service in PRODUCTION mode (using SendGrid Web API)');
    isInitialized = true;
    return true;
  } catch (error) {
    console.error('❌ Failed to initialize SendGrid:', error.message);
    return false;
  }
};

/**
 * Send welcome email to new subscriber
 */
const sendWelcomeEmail = async (email, source = 'footer') => {
  try {
    // Initialize SendGrid if not already done
    if (!isInitialized) {
      const initialized = initializeSendGrid();
      if (!initialized) {
        // Development mode: Log to console
        console.log('\n' + '='.repeat(80));
        console.log('📧 EMAIL SENT (DEVELOPMENT MODE)');
        console.log('='.repeat(80));
        console.log(`To: ${email}`);
        console.log(`Subject: Welcome to Bloomer! `);
        console.log(`From: ${process.env.SMTP_FROM || 'Bloomer Team <hello@bloomer.com>'}`);
        console.log('='.repeat(80) + '\n');
        return { success: true, mode: 'development', email };
      }
    }

    // Get professional email template
    const emailTemplate = getProfessionalWelcomeEmail(email);

    const msg = {
      to: email,
      from: process.env.SMTP_FROM || 'Bloomer Team <bloomer.7b@gmail.com>',
      subject: emailTemplate.subject,
      text: emailTemplate.text,
      html: emailTemplate.html,
    };

    // Send email via SendGrid Web API
    const response = await sgMail.send(msg);
    
    console.log(`✅ Welcome email sent to ${email} via SendGrid Web API`);
    console.log(`   Response status: ${response[0].statusCode}`);
    
    return { 
      success: true, 
      mode: 'production',
      provider: 'sendgrid-api',
      statusCode: response[0].statusCode,
      email 
    };

  } catch (error) {
    console.error(`❌ Failed to send welcome email to ${email}:`, error.message);
    
    // Log more details for debugging
    if (error.response) {
      console.error('   SendGrid error details:', {
        statusCode: error.response.statusCode,
        body: error.response.body
      });
    }
    
    // Don't throw error - newsletter subscription should still succeed even if email fails
    return { success: false, error: error.message, email };
  }
};

/**
 * Send notification when product launches
 */
const sendLaunchNotification = async (email) => {
  // TODO: Implement launch notification email
  console.log(`📧 Launch notification for ${email} (not implemented yet)`);
};

module.exports = {
  sendWelcomeEmail,
  sendLaunchNotification
};
