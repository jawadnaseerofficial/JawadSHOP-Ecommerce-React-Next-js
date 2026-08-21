require('dotenv').config();
const pool = require('./index');
const bcrypt = require('bcryptjs');

(async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Demo user (password: "password123")
    const hash = await bcrypt.hash('password123', 10);
    const userRes = await client.query(
      `INSERT INTO users (first_name, last_name, email, phone, password_hash, reward_points)
       VALUES ($1,$2,$3,$4,$5,$6)
       ON CONFLICT (email) DO UPDATE SET phone = EXCLUDED.phone
       RETURNING id`,
      ['Jawad', 'Ahmed', 'jawad@shop.com', '+92 300 1234567', hash, 1240]
    );
    const userId = userRes.rows[0].id;

    // Orders
    const orders = [
      ['#ORD-7842', 'Delivered', 325, 3, '/images/clothes/Frame1.png'],
      ['#ORD-7791', 'Shipping', 180, 1, '/images/clothes/Frame2.png'],
      ['#ORD-7655', 'Processing', 540, 4, '/images/clothes/Frame3.png'],
      ['#ORD-7520', 'Delivered', 120, 1, '/images/clothes/image-1.png'],
    ];
    for (const o of orders) {
      await client.query(
        `INSERT INTO orders (user_id, order_code, status, total, items_count, image)
         VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (order_code) DO NOTHING`,
        [userId, ...o]
      );
    }

    // Addresses
    await client.query(`DELETE FROM addresses WHERE user_id = $1`, [userId]);
    await client.query(
      `INSERT INTO addresses (user_id,label,full_name,street,city,country,zip,is_default) VALUES
       ($1,'Home','Jawad Ahmed','24 Street, Block D','Lahore','Pakistan','54000',true),
       ($1,'Office','Jawad Ahmed','12 I.I. Chundrigar Road','Karachi','Pakistan','74000',false)`,
      [userId]
    );

    // Payments
    await client.query(`DELETE FROM payment_methods WHERE user_id = $1`, [userId]);
    await client.query(
      `INSERT INTO payment_methods (user_id,type,last4,expiry,is_default) VALUES
       ($1,'Visa','4242','09/28',true),
       ($1,'Mastercard','8831','03/27',false)`,
      [userId]
    );

    await client.query('COMMIT');
    console.log('🌱 Seed complete — demo user: jawad@shop.com / password123');
    process.exit(0);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Seed failed:', err.message);
    process.exit(1);
  } finally {
    client.release();
  }
})();