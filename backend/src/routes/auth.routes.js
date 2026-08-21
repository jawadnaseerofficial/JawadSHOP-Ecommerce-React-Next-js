const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../db');
const authenticate = require('../middleware/auth');
const { signAccess, signRefresh } = require('../utils/tokens');

const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const exists = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (exists.rows.length) return res.status(409).json({ message: 'Email already registered' });

    const hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (first_name,last_name,email,password_hash)
       VALUES ($1,$2,$3,$4) RETURNING id, first_name, last_name, email`,
      [firstName, lastName, email, hash]
    );
    const user = result.rows[0];
    const payload = { id: user.id, email: user.email };

    const accessToken = signAccess(payload);
    const refreshToken = signRefresh(payload);

    await pool.query(
      `INSERT INTO refresh_tokens (user_id, token, expires_at)
       VALUES ($1,$2, NOW() + INTERVAL '7 days')`,
      [user.id, refreshToken]
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000, path: '/',
    });

    res.status(201).json({ accessToken, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (!result.rows.length) return res.status(401).json({ message: 'Invalid credentials' });
    const user = result.rows[0];

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const payload = { id: user.id, email: user.email };
    const accessToken = signAccess(payload);
    const refreshToken = signRefresh(payload);

    await pool.query(
      `INSERT INTO refresh_tokens (user_id, token, expires_at)
       VALUES ($1,$2, NOW() + INTERVAL '7 days')`,
      [user.id, refreshToken]
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000, path: '/',
    });

    res.json({
      accessToken,
      user: { id: user.id, firstName: user.first_name, lastName: user.last_name, email: user.email, avatar: user.avatar },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// REFRESH (uses httpOnly cookie)
router.post('/refresh', async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: 'No refresh token' });
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const stored = await pool.query('SELECT * FROM refresh_tokens WHERE token = $1 AND expires_at > NOW()', [refreshToken]);
    if (!stored.rows.length) return res.status(401).json({ message: 'Refresh token revoked' });

    const accessToken = signAccess({ id: decoded.id, email: decoded.email });
    res.json({ accessToken });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
});

// LOGOUT
router.post('/logout', async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (refreshToken) {
    await pool.query('DELETE FROM refresh_tokens WHERE token = $1', [refreshToken]).catch(() => {});
  }
  res.clearCookie('refreshToken', { path: '/' });
  res.json({ message: 'Logged out' });
});

// GET CURRENT USER
router.get('/me', authenticate, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, first_name, last_name, email, phone, avatar, reward_points
       FROM users WHERE id = $1`, [req.user.id]
    );
    if (!result.rows.length) return res.status(404).json({ message: 'User not found' });
    const u = result.rows[0];
    res.json({
      id: u.id, firstName: u.first_name, lastName: u.last_name,
      email: u.email, phone: u.phone, avatar: u.avatar, rewardPoints: u.reward_points,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;