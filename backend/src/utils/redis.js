const Redis = require('ioredis');

const redis = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: Number(process.env.REDIS_PORT) || 6379,
  maxRetriesPerRequest: 1, // Fail fast so route requests do not hang
  retryStrategy(times) {
    if (times > 3) {
      return null; // Stop retrying after 3 failed attempts
    }
    return Math.min(times * 200, 1000);
  },
});

redis.on('connect', () => {
  console.log('Redis client connected successfully 🟢');
});

redis.on('error', (err) => {
  if (err.code === 'ECONNREFUSED') {
    console.error('Redis connection refused: Server offline on port 6379 🔴');
  } else {
    console.error('Redis error:', err.message);
  }
});

module.exports = redis;