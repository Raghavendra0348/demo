#!/usr/bin/env node

/**
 * Newsletter API Test - Tests your deployed backend
 */

const https = require('https');

const BACKEND_URL = 'https://demo-xy2c.onrender.com';
const TEST_EMAIL = 'bloomer.7b@gmail.com'; // Your email

function testNewsletterAPI() {
        console.log('\n📧 NEWSLETTER API TEST');
        console.log('=====================\n');

        console.log(`🎯 Testing backend: ${BACKEND_URL}`);
        console.log(`📧 Test email: ${TEST_EMAIL}`);

        const postData = JSON.stringify({
                email: TEST_EMAIL,
                source: 'api-test'
        });

        const options = {
                hostname: 'demo-xy2c.onrender.com',
                port: 443,
                path: '/api/newsletter/subscribe',
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': postData.length
                }
        };

        console.log('\n⏳ Sending subscription request...\n');

        const req = https.request(options, (res) => {
                let data = '';

                console.log(`📊 Status Code: ${res.statusCode}`);
                console.log(`📋 Headers:`, res.headers);

                res.on('data', (chunk) => {
                        data += chunk;
                });

                res.on('end', () => {
                        console.log('\n📥 Response:');
                        try {
                                const response = JSON.parse(data);
                                console.log(JSON.stringify(response, null, 2));

                                if (response.success) {
                                        console.log('\n✅ SUCCESS! Newsletter subscription worked!');
                                        console.log('📧 Check your email inbox for welcome message');
                                        console.log('📱 Also check spam folder just in case');

                                        console.log('\n📧 Email should contain:');
                                        console.log('   ✓ Subject: "Welcome to Bloomer - Subscription Confirmed"');
                                        console.log('   ✓ Professional design (no emojis/icons)');
                                        console.log('   ✓ Bloomer platform information');
                                        console.log('   ✓ 5 key benefits listed');
                                        console.log('   ✓ Call-to-action button');

                                } else {
                                        console.log('\n❌ FAILED! Newsletter subscription failed');
                                        console.log(`Error: ${response.message}`);
                                }

                        } catch (error) {
                                console.log('\n💥 ERROR parsing response:');
                                console.log('Raw response:', data);
                        }

                        console.log('\n=====================\n');
                });
        });

        req.on('error', (error) => {
                console.log('\n💥 REQUEST ERROR:');
                console.log(error.message);

                console.log('\n🔍 Possible Issues:');
                console.log('1. Backend server is down');
                console.log('2. Network connectivity issues');
                console.log('3. Wrong URL or endpoint');

                console.log('\n📝 Check:');
                console.log(`1. Visit: ${BACKEND_URL}/api/health`);
                console.log('2. Ensure backend is deployed and running');

                console.log('\n=====================\n');
        });

        req.write(postData);
        req.end();
}

console.log('🚀 Starting newsletter API test...');
testNewsletterAPI();
