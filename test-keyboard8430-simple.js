const http = require('http');

function testKeyboard8430Newsletter() {
        console.log('🧪 Testing Newsletter Subscription for keyboard8430@gmail.com');
        console.log('===========================================================\n');

        const data = JSON.stringify({
                email: 'keyboard8430@gmail.com',
                name: 'Test User'
        });

        const options = {
                hostname: 'localhost',
                port: 5000,
                path: '/api/newsletter/subscribe',
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(data)
                }
        };

        console.log('📡 Sending POST request to:', `http://localhost:5000${options.path}`);
        console.log('📦 Payload:', data);
        console.log('');

        const req = http.request(options, (res) => {
                let responseData = '';

                res.on('data', (chunk) => {
                        responseData += chunk;
                });

                res.on('end', () => {
                        console.log(`✅ HTTP Status: ${res.statusCode}`);
                        console.log('📬 Response:');

                        try {
                                const parsed = JSON.parse(responseData);
                                console.log(JSON.stringify(parsed, null, 2));

                                if (parsed.success) {
                                        if (parsed.alreadySubscribed) {
                                                console.log('\n🎉 SUCCESS: Already subscribed - Professional message!');
                                                console.log('✅ keyboard8430@gmail.com is already in Firestore');
                                                console.log('📧 Professional already-subscribed notification sent');
                                        } else {
                                                console.log('\n🎉 SUCCESS: New subscription completed!');
                                                console.log('💾 keyboard8430@gmail.com saved to Firestore database');
                                                console.log('📧 Professional welcome email sent');
                                        }
                                } else {
                                        console.log('\n❌ FAILED: Subscription unsuccessful');
                                        console.log('🔍 Check server logs for more details');
                                }
                        } catch (e) {
                                console.log('Raw response:', responseData);
                        }

                        console.log('\n===========================================================');
                        console.log('🏁 Test completed for keyboard8430@gmail.com!');
                        console.log('💾 Check Firestore console: https://console.firebase.google.com/project/bloomer-3d7ed/firestore');
                        console.log('📧 Check email inbox for professional welcome message');
                });
        });

        req.on('error', (error) => {
                console.error('❌ Connection error:', error.message);
                console.log('🔍 Make sure the server is running on http://localhost:5000');
        });

        req.write(data);
        req.end();
}

// Run the test
testKeyboard8430Newsletter();
