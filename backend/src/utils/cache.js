const redis = require('./redis');

const getCache = async (key) => {
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.warn(`Redis GET failed for key "${key}". Falling back to DB.`);
    return null;
  }
};

const setCache = async (key, value, ttlSeconds = 60) => {
  try {
    await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
  } catch (error) {
    console.warn(`Redis SET failed for key "${key}". Skipping cache set.`);
  }
};

const deleteCache = async (key) => {
  try {
    await redis.del(key);
  } catch (error) {
    console.warn(`Redis DEL failed for key "${key}".`);
  }
};

module.exports = {
  getCache,
  setCache,
  deleteCache,
};