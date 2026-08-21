const { Router } = require('express');
const pool = require('../db/index');
const { getCache, setCache } = require('../utils/cache');

const router = Router();

router.get('/category/:category', async (req, res) => {
  const { category } = req.params;
  const cacheKey = `products:${category.toLowerCase()}`;

  try {
    // 1. Try reading from cache (returns null safely if cache misses or fails)
    const cachedProducts = await getCache(cacheKey);
    if (cachedProducts) {
      return res.json({ source: 'cache', data: cachedProducts });
    }

    // 2. Query PostgreSQL Database
    const query = 'SELECT * FROM products WHERE LOWER(category) = $1';
    const { rows } = await pool.query(query, [category.toLowerCase()]);

    // 3. Save result back to cache asynchronously
    await setCache(cacheKey, rows, 60);

    return res.json({ source: 'database', data: rows });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;