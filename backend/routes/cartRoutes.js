const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// Get user's cart
router.get('/', auth, async (req, res) => {
    try {
        const [cartItems] = await db.execute(
            'SELECT * FROM cart WHERE user_id = ?',
            [req.user.id]
        );
        res.json(cartItems);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add item to cart
router.post('/', auth, async (req, res) => {
    try {
        const { product_id, quantity } = req.body;
        await db.execute(
            'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
            [req.user.id, product_id, quantity]
        );
        res.json({ message: 'Item added to cart' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Remove item from cart
router.delete('/:id', auth, async (req, res) => {
    try {
        await db.execute(
            'DELETE FROM cart WHERE id = ? AND user_id = ?',
            [req.params.id, req.user.id]
        );
        res.json({ message: 'Item removed from cart' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;