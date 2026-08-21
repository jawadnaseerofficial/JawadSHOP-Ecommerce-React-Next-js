require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Database & Cache Connections
const pool = require('./src/db/index');
const redis = require('./src/utils/redis');

// Route Imports
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const productRoutes = require('./src/routes/product.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Base Route & Safe Health Check
app.get('/', async (req, res) => {
  let postgresConnected = false;
  let redisConnected = false;

  try {
    await pool.query('SELECT 1');
    postgresConnected = true;
  } catch (err) {
    postgresConnected = false;
  }

  try {
    const ping = await redis.ping();
    redisConnected = ping === 'PONG';
  } catch (err) {
    redisConnected = false;
  }

  res.json({
    status: 'JAWADSHOP API running 🚀',
    postgres: postgresConnected ? 'Connected 🟢' : 'Disconnected 🔴',
    redis: redisConnected ? 'Connected 🟢' : 'Disconnected 🔴',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/products', productRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Server Initialization
const server = app.listen(PORT, () => {
  console.log(`🚀 Backend listening on http://localhost:${PORT}`);
});

// Graceful Shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down server gracefully...');
  server.close(async () => {
    try {
      await pool.end();
      await redis.quit();
    } catch (err) {
      console.error('Error during connection closure:', err.message);
    }
    console.log('Database and Redis connections closed. Exiting.');
    process.exit(0);
  });
});