const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('🔧 Loading email service...');

// Check if SMTP credentials are available
const hasCredentials = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

if (!hasCredentials) {
  console.log('📧 Email service in DEVELOPMENT mode (no SMTP credentials)');
} else {
  console.log('📧 Email service in PRODUCTION mode (using Gmail SMTP)');
}

// Create email transporter
const createTransporter = () => {
  if (!hasCredentials) {
    return null; // Will log to console instead
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Simple professional email template
const getWelcomeEmailContent = (email) => {
  return {
    subject: 'Welcome to Bloomer - Subscription Confirmed',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #e91e63; margin-bottom: 20px;">Welcome to Bloomer!</h2>
        <p>Thank you for subscribing to our newsletter. You're now part of the Bloomer family!</p>
        <p>We'll keep you updated on our exciting video-first shopping platform.</p>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #e91e63;">What to Expect:</h3>
          <ul>
            <li>Early access to new features</li>
            <li>Exclusive content from creators</li>
            <li>Special offers and promotions</li>
            <li>Platform updates and news</li>
          </ul>
        </div>
        <p>Best regards,<br>The Bloomer Team</p>
        <hr style="margin: 30px 0;">
        <p style="font-size: 12px; color: #666;">
          You're receiving this because you subscribed at ${email}. 
          <a href="mailto:hello@bloomer.in?subject=Unsubscribe">Unsubscribe</a>
        </p>
      </div>
    `,
    text: `
Welcome to Bloomer!

Thank you for subscribing to our newsletter. You're now part of the Bloomer family!

What to Expect:
- Early access to new features
- Exclusive content from creators  
- Special offers and promotions
- Platform updates and news

Best regards,
The Bloomer Team

You're receiving this because you subscribed at ${email}.
    `
  };
};

// Send welcome email function
const sendWelcomeEmail = async (email, source = 'website') => {
  console.log(`📧 sendWelcomeEmail called for ${email} from ${source}`);
  
  try {
    const transporter = createTransporter();
    
    if (!transporter) {
      console.log('📧 Development mode - email would be sent in production');
      return { 
        success: true, 
        message: 'Email simulated in development mode',
        development: true 
      };
    }

    const emailContent = getWelcomeEmailContent(email);
    
    const mailOptions = {
      from: process.env.SMTP_FROM || '"Bloomer Team" <bloomer.7b@gmail.com>',
      to: email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text
    };

    console.log(`📧 Sending email to ${email}...`);
    const result = await transporter.sendMail(mailOptions);
    
    console.log(`✅ Email sent successfully! Message ID: ${result.messageId}`);
    return { 
      success: true, 
      messageId: result.messageId,
      message: 'Welcome email sent successfully'
    };

  } catch (error) {
    console.log(`❌ Email sending failed: ${error.message}`);
    return { 
      success: false, 
      error: error.message 
    };
  }
};

console.log('✅ Email service functions defined');

module.exports = {
  sendWelcomeEmail
};

console.log('✅ Email service module exported');
