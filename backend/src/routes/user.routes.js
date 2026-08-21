const express = require('express');
const pool = require('../db');
const authenticate = require('../middleware/auth');

const router = express.Router();
router.use(authenticate); // every route below requires login

// ---------- PROFILE ----------
router.put('/profile', async (req, res) => {
  const { firstName, lastName, email, phone } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users SET first_name=$1, last_name=$2, email=$3, phone=$4, updated_at=NOW()
       WHERE id=$5
       RETURNING id, first_name, last_name, email, phone, avatar`,
      [firstName, lastName, email, phone, req.user.id]
    );
    const u = result.rows[0];
    res.json({ firstName: u.first_name, lastName: u.last_name, email: u.email, phone: u.phone, avatar: u.avatar });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update failed' });
  }
});

// ---------- ORDERS ----------
router.get('/orders', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT order_code AS id, status, total, items_count AS items, image, ordered_at
       FROM orders WHERE user_id = $1 ORDER BY ordered_at DESC`, [req.user.id]
    );
    const orders = result.rows.map((o) => ({
      id: o.id, status: o.status, total: Number(o.total), items: o.items, image: o.image,
      date: new Date(o.ordered_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    }));
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load orders' });
  }
});

// ---------- ADDRESSES ----------
router.get('/addresses', async (req, res) => {
  const r = await pool.query(
    `SELECT id, label, full_name AS "fullName", street, city, country, zip, is_default AS "isDefault"
     FROM addresses WHERE user_id = $1 ORDER BY is_default DESC, id`, [req.user.id]
  );
  res.json(r.rows);
});

router.post('/addresses', async (req, res) => {
  const { label, fullName, street, city, country, zip, isDefault } = req.body;
  if (isDefault) await pool.query('UPDATE addresses SET is_default=false WHERE user_id=$1', [req.user.id]);
  const r = await pool.query(
    `INSERT INTO addresses (user_id,label,full_name,street,city,country,zip,is_default)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     RETURNING id, label, full_name AS "fullName", street, city, country, zip, is_default AS "isDefault"`,
    [req.user.id, label, fullName, street, city, country, zip, !!isDefault]
  );
  res.status(201).json(r.rows[0]);
});

router.delete('/addresses/:id', async (req, res) => {
  await pool.query('DELETE FROM addresses WHERE id=$1 AND user_id=$2', [req.params.id, req.user.id]);
  res.json({ message: 'Address removed' });
});

// ---------- PAYMENTS ----------
router.get('/payments', async (req, res) => {
  const r = await pool.query(
    `SELECT id, type, last4, expiry, is_default AS "isDefault"
     FROM payment_methods WHERE user_id = $1 ORDER BY is_default DESC, id`, [req.user.id]
  );
  res.json(r.rows);
});

router.post('/payments', async (req, res) => {
  const { type, last4, expiry, isDefault } = req.body;
  if (isDefault) await pool.query('UPDATE payment_methods SET is_default=false WHERE user_id=$1', [req.user.id]);
  const r = await pool.query(
    `INSERT INTO payment_methods (user_id,type,last4,expiry,is_default)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING id, type, last4, expiry, is_default AS "isDefault"`,
    [req.user.id, type, last4, expiry, !!isDefault]
  );
  res.status(201).json(r.rows[0]);
});

router.delete('/payments/:id', async (req, res) => {
  await pool.query('DELETE FROM payment_methods WHERE id=$1 AND user_id=$2', [req.params.id, req.user.id]);
  res.json({ message: 'Payment method removed' });
});

module.exports = router;