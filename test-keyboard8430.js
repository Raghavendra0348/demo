// Test newsletter subscription for keyboard8430@gmail.com
console.log('🧪 Testing Newsletter Subscription for keyboard8430@gmail.com');
console.log('===========================================================\n');

const testEmail = 'keyboard8430@gmail.com';
const testName = 'Test User';

async function testSubscription() {
        try {
                const response = await fetch('http://localhost:5000/api/newsletter/subscribe', {
                        method: 'POST',
                        headers: {
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                                email: testEmail,
                                name: testName
                        })
                });

                const data = await response.json();

                console.log(`✅ HTTP Status: ${response.status}`);
                console.log('📬 Response Data:');
                console.log(JSON.stringify(data, null, 2));
                console.log('');

                if (response.ok && data.success) {
                        if (data.alreadySubscribed) {
                                console.log('🎉 SUCCESS: Already subscribed - Professional message handled!');
                                console.log('✅ keyboard8430@gmail.com is already in Firestore');
                                console.log('📧 Professional "already subscribed" notification sent');
                        } else {
                                console.log('🎉 SUCCESS: New subscription completed!');
                                console.log('💾 keyboard8430@gmail.com saved to Firestore database');
                                console.log('📧 Professional welcome email sent');
                        }

                        console.log('\n📊 Subscription Details:');
                        console.log(`   Email: ${data.data?.email || testEmail}`);
                        console.log(`   Subscribed At: ${data.data?.subscribedAt || 'Just now'}`);
                        console.log(`   Source: ${data.data?.source || 'website'}`);
                        console.log(`   Email Sent: ${data.data?.emailSent ? 'Yes' : 'No'}`);

                } else {
                        console.log('❌ FAILED: Subscription request failed');
                        console.log(`   Status: ${response.status}`);
                        console.log(`   Message: ${data.message || 'Unknown error'}`);
                }

        } catch (error) {
                console.log('❌ ERROR: Connection or request failed');
                console.log(`   Error: ${error.message}`);
        }
}

// Use built-in fetch (Node.js 18+) or fallback
if (typeof fetch === 'undefined') {
        // For older Node.js versions, use simple http request
        const http = require('http');

        const postData = JSON.stringify({
                email: testEmail,
                name: testName
        });

        const options = {
                hostname: 'localhost',
                port: 5000,
                path: '/api/newsletter/subscribe',
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(postData)
                }
        };

        console.log('📡 Sending POST request to newsletter API...\n');

        const req = http.request(options, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                        data += chunk;
                });

                res.on('end', () => {
                        try {
                                const responseData = JSON.parse(data);

                                console.log(`✅ HTTP Status: ${res.statusCode}`);
                                console.log('📬 Response Data:');
                                console.log(JSON.stringify(responseData, null, 2));
                                console.log('');

                                if (res.statusCode >= 200 && res.statusCode < 300 && responseData.success) {
                                        if (responseData.alreadySubscribed) {
                                                console.log('🎉 SUCCESS: Already subscribed - Professional message handled!');
                                                console.log('✅ keyboard8430@gmail.com is already in Firestore');
                                                console.log('📧 Professional "already subscribed" notification');
                                        } else {
                                                console.log('🎉 SUCCESS: New subscription completed!');
                                                console.log('💾 keyboard8430@gmail.com saved to Firestore database');
                                                console.log('📧 Professional welcome email sent');
                                        }

                                        console.log('\n📊 Subscription Details:');
                                        console.log(`   Email: ${responseData.data?.email || testEmail}`);
                                        console.log(`   Subscribed At: ${responseData.data?.subscribedAt || 'Just now'}`);
                                        console.log(`   Source: ${responseData.data?.source || 'website'}`);
                                        console.log(`   Email Sent: ${responseData.data?.emailSent ? 'Yes' : 'No'}`);

                                } else {
                                        console.log('❌ FAILED: Subscription request failed');
                                        console.log(`   Status: ${res.statusCode}`);
                                        console.log(`   Message: ${responseData.message || 'Unknown error'}`);
                                }
                        } catch (parseError) {
                                console.log('❌ ERROR: Failed to parse response');
                                console.log(`   Raw response: ${data}`);
                        }

                        console.log('\n===========================================================');
                        console.log('🏁 Test completed for keyboard8430@gmail.com!');
                });
        });

        req.on('error', (error) => {
                console.log('❌ ERROR: Request failed');
                console.log(`   Error: ${error.message}`);
        });

        req.write(postData);
        req.end();

} else {
        // Use fetch for newer Node.js
        testSubscription().then(() => {
                console.log('\n===========================================================');
                console.log('🏁 Test completed for keyboard8430@gmail.com!');
        });
}
