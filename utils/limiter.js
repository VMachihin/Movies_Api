const { RateLimiter } = require('limiter');

const limiter = new RateLimiter({ tokensPerInterval: 150, interval: 'hour' });

module.exports = limiter;
