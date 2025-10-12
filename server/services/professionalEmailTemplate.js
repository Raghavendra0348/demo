/**
 * Professional Email Template for Bloomer Newsletter
 * Clean, professional design without emojis or icons
 */

const getProfessionalWelcomeEmail = (email) => {
        return {
                subject: 'Welcome to Bloomer - Subscription Confirmed',
                html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Bloomer</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background-color: #f8f9fa;
            color: #333333;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #e91e63, #f06292);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 32px;
            font-weight: 300;
            letter-spacing: 2px;
        }
        .content {
            padding: 40px 30px;
        }
        .welcome-message {
            font-size: 18px;
            color: #e91e63;
            margin-bottom: 20px;
            font-weight: 600;
        }
        .description {
            font-size: 16px;
            margin-bottom: 30px;
            color: #666666;
        }
        .benefits {
            background-color: #f8f9fa;
            padding: 25px;
            border-radius: 8px;
            margin: 30px 0;
        }
        .benefits h3 {
            color: #e91e63;
            margin-top: 0;
            font-size: 18px;
        }
        .benefit-list {
            margin: 20px 0;
            padding: 0;
            list-style: none;
        }
        .benefit-list li {
            padding: 8px 0;
            border-bottom: 1px solid #eeeeee;
            font-size: 15px;
        }
        .benefit-list li:last-child {
            border-bottom: none;
        }
        .cta-section {
            text-align: center;
            margin: 40px 0;
        }
        .cta-button {
            display: inline-block;
            background-color: #e91e63;
            color: white;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 25px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        .footer {
            background-color: #2c2c2c;
            color: #ffffff;
            padding: 30px;
            text-align: center;
            font-size: 14px;
        }
        .footer a {
            color: #f06292;
            text-decoration: none;
        }
        .social-links {
            margin: 20px 0;
        }
        .social-links a {
            margin: 0 10px;
            color: #f06292;
            text-decoration: none;
        }
        @media (max-width: 600px) {
            .container {
                width: 100%;
            }
            .header, .content, .footer {
                padding: 20px;
            }
            .header h1 {
                font-size: 24px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>BLOOMER</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Video-First Shopping Experience</p>
        </div>
        
        <div class="content">
            <div class="welcome-message">
                Welcome to the Bloomer Family!
            </div>
            
            <p class="description">
                Thank you for subscribing to our newsletter. You're now part of an exclusive community that will be the first to experience the future of shopping.
            </p>
            
            <p>
                Bloomer is revolutionizing e-commerce through video-first experiences. Watch, swipe, and shop instantly from creators and brands you trust.
            </p>
            
            <div class="benefits">
                <h3>What You Can Expect:</h3>
                <ul class="benefit-list">
                    <li><strong>Early Access:</strong> Be first to try new features and experiences</li>
                    <li><strong>Exclusive Content:</strong> Behind-the-scenes videos from top creators</li>
                    <li><strong>Special Offers:</strong> Member-only discounts and promotions</li>
                    <li><strong>Product Updates:</strong> Latest news about platform developments</li>
                    <li><strong>Creator Spotlights:</strong> Discover amazing products and stories</li>
                </ul>
            </div>
            
            <div class="cta-section">
                <a href="https://www.bloomer.in" class="cta-button">Explore Bloomer</a>
            </div>
            
            <p style="color: #999999; font-size: 14px; margin-top: 30px;">
                We're committed to bringing you valuable content. You'll hear from us with important updates, exclusive features, and exciting product launches.
            </p>
        </div>
        
        <div class="footer">
            <p><strong>Bloomer Team</strong></p>
            <p>The Future of Video Commerce</p>
            
            <div class="social-links">
                <a href="https://www.bloomer.in">Website</a> |
                <a href="mailto:hello@bloomer.in">Contact</a> |
                <a href="https://www.bloomer.in/privacy">Privacy</a>
            </div>
            
            <p style="font-size: 12px; color: #888888; margin-top: 20px;">
                You're receiving this email because you subscribed to Bloomer newsletter at ${email}.<br>
                <a href="mailto:hello@bloomer.in?subject=Unsubscribe" style="color: #f06292;">Unsubscribe here</a> if you no longer wish to receive these emails.
            </p>
        </div>
    </div>
</body>
</html>
    `,
                text: `
Welcome to Bloomer!

Thank you for subscribing to our newsletter. You're now part of an exclusive community that will be the first to experience the future of shopping.

Bloomer is revolutionizing e-commerce through video-first experiences. Watch, swipe, and shop instantly from creators and brands you trust.

What You Can Expect:
• Early Access: Be first to try new features and experiences
• Exclusive Content: Behind-the-scenes videos from top creators
• Special Offers: Member-only discounts and promotions
• Product Updates: Latest news about platform developments
• Creator Spotlights: Discover amazing products and stories

Visit us at: https://www.bloomer.in

Best regards,
The Bloomer Team

---
You're receiving this email because you subscribed to Bloomer newsletter at ${email}.
Reply to this email with "unsubscribe" if you no longer wish to receive these emails.
    `
        };
};

module.exports = {
        getProfessionalWelcomeEmail
};
