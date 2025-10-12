const nodemailer = require('nodemailer');
require('dotenv').config();

/**
 * Email Service for Bloomer Newsletter
 * 
 * Sends professional welcome emails to new subscribers
 */

// Create email transporter
const createTransporter = () => {
        // For development: Use ethereal email (fake SMTP)
        // For production: Use real SMTP (Gmail, SendGrid, etc.)

        const isDevelopment = !process.env.SMTP_HOST;

        if (isDevelopment) {
                // Development: Log email to console
                console.log('📧 Email service in DEVELOPMENT mode (emails logged to console)');
                return null; // We'll handle dev mode separately
        }

        // Production: Real SMTP
        return nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT || 587,
                secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
                auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASS
                }
        });
};

/**
 * Send welcome email to new subscriber
 */
const sendWelcomeEmail = async (email, source = 'footer') => {
        try {
                const transporter = createTransporter();

                const emailContent = {
                        from: process.env.SMTP_FROM || '"Bloomer Team " <hello@bloomer.com>',
                        to: email,
                        subject: ' Welcome to the Bloomer Family!',
                        html: `
                <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Bloomer</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 20px;
      line-height: 1.6;
    }
    .email-wrapper {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 48px 36px;
      text-align: center;
      position: relative;
    }
    .logo-container { margin-bottom: 18px; }
    .logo {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      background: white;
      padding: 8px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.15);
      object-fit: cover;
      display: inline-block;
    }
    .header h1 {
      color: #ffffff; font-size: 32px; font-weight: 700; margin: 18px 0 8px; letter-spacing: -0.4px;
    }
    .header p { color: rgba(255,255,255,0.95); font-size: 16px; font-weight: 400; margin: 0; }
    .content { padding: 40px 36px; }
    .greeting { font-size: 24px; color: #2d3748; margin-bottom: 14px; font-weight: 600; }
    .intro-text { font-size: 15px; color: #4a5568; margin-bottom: 20px; line-height: 1.7; }
    .product-blurb {
      background: linear-gradient(135deg,#f7fbff 0%,#eef6ff 100%);
      border-left: 5px solid #667eea;
      border-radius: 8px;
      padding: 18px;
      margin: 18px 0;
      font-size: 15px;
      color: #2f3a56;
    }
    .features {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
      margin: 18px 0;
    }
    .feature-card {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      background: #ffffff;
      border: 1px solid #edf2f7;
      border-radius: 10px;
      padding: 14px;
      box-shadow: 0 6px 18px rgba(99,102,241,0.06);
    }
    .feature-icon {
      font-size: 22px;
      flex-shrink: 0;
      width: 36px;
      height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      background: linear-gradient(135deg, #e9eefb, #eef2ff);
    }
    .feature-text { font-size: 14px; color: #334155; line-height: 1.5; }
    .feature-text strong { color: #1f2937; font-weight: 600; }
    .highlight-box {
      background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%);
      border-left: 4px solid #fc8181;
      border-radius: 8px;
      padding: 14px;
      margin: 20px 0;
      font-size: 14px;
      color: #742a2a;
    }
    .cta-section { text-align: center; margin: 28px 0 8px; }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #ffffff; text-decoration: none;
      padding: 14px 44px; border-radius: 50px;
      font-size: 15px; font-weight: 600;
      box-shadow: 0 8px 20px rgba(102,126,234,0.28);
      transition: transform 0.18s;
    }
    .cta-button:hover { transform: translateY(-3px); }
    .quote-section {
      margin-top: 22px; padding: 18px;
      background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
      border-radius: 8px; text-align: center;
    }
    .quote-text { font-size: 16px; font-style: italic; color: #4c51bf; line-height: 1.5; }
    .footer {
      background: #2d3748; color: #e2e8f0; padding: 28px 20px; text-align: center;
    }
    .footer-logo { font-size: 20px; font-weight: 700; margin-bottom: 8px; }
    .footer-info { font-size: 13px; color: #cbd5e0; margin: 8px 0; }
    .footer-links { margin: 18px 0; }
    .footer-links a { color: #a0aec0; text-decoration: none; margin: 0 8px; font-size: 13px; }
    .footer-links a:hover { color: #ffffff; }
    .social-links { margin: 14px 0; }
    .social-icon { display: inline-block; margin: 0 6px; font-size: 18px; text-decoration: none; color: #cbd5e0; }
    .copyright { font-size: 12px; color: #718096; margin-top: 12px; }
    @media only screen and (max-width: 600px) {
      .content { padding: 22px 18px; }
      .header { padding: 28px 18px; }
      .header h1 { font-size: 24px; }
      .greeting { font-size: 20px; }
    }
  </style>
</head>
<body>
  <div class="email-wrapper" role="article" aria-label="Welcome to Bloomer">
    <!-- Header -->
    <div class="header">
      <div class="logo-container">
        <!-- Replace src with your hosted logo URL -->
        <img src="https://via.placeholder.com/220x220.png?text=Bloomer+Logo" alt="Bloomer logo" class="logo" />
      </div>
      <h1>Welcome to Bloomer</h1>
      <p>Video-first shopping — discover, swipe, and shop.</p>
    </div>

    <!-- Main Content -->
    <div class="content">
      <div class="greeting">Hey there!</div>

      <div class="intro-text">
        We're thrilled to have you in the Bloomer community. Bloomer is a video-first shopping app that blends social engagement with e-commerce — sellers and creators upload short product reels while buyers swipe, watch, and shop instantly.
      </div>

      <!-- Product Blurb -->
      <div class="product-blurb">
        <strong>What is Bloomer?</strong><br>
        Bloomer is a trust-driven shopping experience combining short-form product videos, creator commerce, and effortless checkout — crafted to make discovery and buying both fun and authentic.
      </div>

      <!-- Features -->
      <div class="benefits-title" style="font-size:18px; color:#2d3748; font-weight:600; margin-bottom:12px;">
        Key features you'll love:
      </div>

      <div class="features" role="list">
        <div class="feature-card" role="listitem">
          <div class="feature-icon">🎥</div>
          <div class="feature-text"><strong>Video-first shopping</strong> — browse short product reels showing real experiences, not static photos.</div>
        </div>

        <div class="feature-card" role="listitem">
          <div class="feature-icon">🛒</div>
          <div class="feature-text"><strong>Seamless checkout</strong> — add to cart & complete your purchase directly from the video feed.</div>
        </div>

        <div class="feature-card" role="listitem">
          <div class="feature-icon">🤝</div>
          <div class="feature-text"><strong>Creator-friendly</strong> — sellers and influencers can upload authentic reels to showcase products and earn trust.</div>
        </div>

        <div class="feature-card" role="listitem">
          <div class="feature-icon">🔎</div>
          <div class="feature-text"><strong>Smart discovery</strong> — swipe through trending, recommended, and new arrivals tailored to your taste.</div>
        </div>
      </div>

      <!-- Highlight -->
      <div class="highlight-box">
        <strong>Our promise:</strong> We respect your inbox — no spam, only useful updates and early access to new features and offers.
      </div>

      <div class="intro-text">
        Stay tuned — we’re building something special. As a subscriber you’ll get early access to new features, creator drops, and exclusive offers.
      </div>

      <!-- CTA -->
      <div class="cta-section">
        <a href="https://your-bloomer-app.example.com" class="cta-button" target="_blank" rel="noopener noreferrer">Explore Bloomer →</a>
      </div>

      <!-- Quote -->
      <div class="quote-section">
        <div class="quote-text">
          "Every product tells a story — experience shopping redefined."<br>
          <div style="font-size:13px; margin-top:8px; color:#2d3748; font-weight:600;">— The Bloomer Team</div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer" role="contentinfo">
      <div class="footer-logo">Bloomer</div>
      <div class="footer-info">Empowering discovery through short, authentic video shopping.</div>

      <div class="footer-links" aria-label="Footer links">
        <a href="https://your-bloomer-app.example.com">Website</a>
        <a href="mailto:bloomer.7b@gmail.com">Contact</a>
        <a href="https://your-bloomer-app.example.com/unsubscribe">Unsubscribe</a>
        <a href="https://your-bloomer-app.example.com/privacy">Privacy Policy</a>
      </div>

      <div class="social-links" aria-label="Social links">
        <a href="#" class="social-icon">📘</a>
        <a href="#" class="social-icon">🐦</a>
        <a href="#" class="social-icon">📷</a>
        <a href="#" class="social-icon">💼</a>
      </div>

      <div class="copyright">
        © 2025 Bloomer. All rights reserved.<br>
        Built with passion for creators and shoppers.
      </div>
    </div>
  </div>
</body>
</html>

            `,
                        text: `
╔══════════════════════════════════════════════════════════════════════╗
║                    WELCOME TO BLOOMER! 🌸                            ║
║              You're now part of something extraordinary              ║
╚══════════════════════════════════════════════════════════════════════╝

Hey there! 👋

We're absolutely thrilled to have you join the Bloomer family! Thank you for 
trusting us with your inbox. You've just taken the first step towards staying 
connected with all the amazing things we're creating.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT'S COMING YOUR WAY:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 EXCLUSIVE EARLY ACCESS
   Be the first to try new features and products before anyone else

📰 INSIDER UPDATES
   Get behind-the-scenes stories about Bloomer's journey and what's next

💡 EXPERT TIPS & INSIGHTS
   Valuable knowledge delivered straight to your inbox

🎁 SPECIAL PERKS & OFFERS
   Exclusive deals and surprises just for our community members

🌟 COMMUNITY CONNECTION
   Join a network of innovators and early adopters

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OUR PROMISE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

We respect your inbox. No spam, no noise—just valuable content that matters 
to you. You can unsubscribe anytime, no questions asked.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT'S NEXT?

Stay tuned for our official launch announcement! We're working hard on 
something truly special, and you'll be among the first to know when we're 
ready to unveil it.

🌐 Visit us: http://localhost:3000

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"Every flower blooms in its own time." 🌺
We're growing something beautiful together!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Bloomer 🌸
Empowering growth, one bloom at a time

You're receiving this email because you subscribed${source !== 'footer' ? ` via ${source}` : ''} at: ${email}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Website: http://localhost:3000
Contact: bloomer.7b@gmail.com
Unsubscribe: http://localhost:3000/unsubscribe
Privacy Policy: http://localhost:3000/privacy

© ${new Date().getFullYear()} Bloomer. All rights reserved.
Made with ❤️ for our amazing community
            `
                };

                if (!transporter) {
                        // Development mode: Log to console
                        console.log('\n' + '='.repeat(80));
                        console.log('📧 EMAIL SENT (DEVELOPMENT MODE)');
                        console.log('='.repeat(80));
                        console.log(`To: ${emailContent.to}`);
                        console.log(`Subject: ${emailContent.subject}`);
                        console.log(`From: ${emailContent.from}`);
                        console.log('─'.repeat(80));
                        console.log('Plain text version:');
                        console.log(emailContent.text);
                        console.log('='.repeat(80) + '\n');
                        return { success: true, mode: 'development', email };
                }

                // Production mode: Actually send email
                const info = await transporter.sendMail(emailContent);
                console.log(`✅ Welcome email sent to ${email} (ID: ${info.messageId})`);
                return { success: true, mode: 'production', messageId: info.messageId, email };

        } catch (error) {
                console.error(`❌ Failed to send welcome email to ${email}:`, error.message);
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
