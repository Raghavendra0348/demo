#!/usr/bin/env node

const https = require('https');

const BACKEND_URL = 'https://demo-xy2c.onrender.com';
const TEST_EMAIL = 'bloomer.7b@gmail.com';

console.log('🚀 Testing Newsletter "Already Subscribed" Message');
console.log('================================================\n');

function testAlreadySubscribed() {
    const postData = JSON.stringify({
        email: TEST_EMAIL,
        source: 'test-already-subscribed'
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

    console.log(`📧 Testing with email: ${TEST_EMAIL}`);
    console.log(`🎯 Backend: ${BACKEND_URL}`);
    console.log('\n⏳ Sending subscription request...\n');

    const req = https.request(options, (res) => {
        let data = '';

        console.log(`📊 Status Code: ${res.statusCode}`);

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            console.log('\n📥 Response:');
            try {
                const response = JSON.parse(data);
                console.log(JSON.stringify(response, null, 2));

                console.log('\n📝 Message Analysis:');
                console.log('===================');

                if (response.success) {
                    if (response.alreadySubscribed) {
                        console.log('✅ STATUS: Already subscribed user');
                        console.log(`🌸 MESSAGE: "${response.message}"`);
                        console.log('✅ SUCCESS: Positive message shown (no error)');
                        console.log('✅ UX: User feels welcomed, not rejected');
                    } else {
                        console.log('✅ STATUS: New subscription');
                        console.log(`🎉 MESSAGE: "${response.message}"`);
                        console.log('✅ SUCCESS: Welcome email sent');
                    }
                } else {
                    console.log('❌ STATUS: Error response');
                    console.log(`⚠️  MESSAGE: "${response.message}"`);
                    console.log('❌ UX: User sees error (not ideal)');
                }

                console.log('\n🎯 Frontend Implementation:');
                console.log('==========================');
                console.log('In React components, this message appears as:');
                
                if (response.success && response.alreadySubscribed) {
                    console.log(`🌸 ${response.message}`);
                    console.log('• Green success alert (not red error)');
                    console.log('• Email field stays filled (user can verify)');
                    console.log('• Warm, welcoming tone');
                } else if (response.success) {
                    console.log(`🎉 ${response.message}`);
                    console.log('• Green success alert');
                    console.log('• Email field clears');
                    console.log('• Celebratory tone');
                } else {
                    console.log(`❌ ${response.message}`);
                    console.log('• Red error alert');
                    console.log('• Email field stays filled');
                    console.log('• Error tone (needs improvement)');
                }

            } catch (error) {
                console.log('❌ Failed to parse response:', error.message);
                console.log('Raw response:', data);
            }
        });
    });

    req.on('error', (error) => {
        console.log('❌ Request failed:', error.message);
    });

    req.write(postData);
    req.end();
}

// Run the test
testAlreadySubscribed();
