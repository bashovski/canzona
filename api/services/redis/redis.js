const redis = require('redis');
const client = redis.createClient();

client.on('connect', () => {
    console.log('[canzona-api]: successfully connected to redis server.');
});

client.on('error', (err) => {
    console.log(err);
});

module.exports = client;
