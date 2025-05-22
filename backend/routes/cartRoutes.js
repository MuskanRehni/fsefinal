const express = require("express");
const router = express.Router();
const db = require("../config/db");
const auth = require("../middleware/auth");
const cuid = require("cuid");

// Get user's cart
router.get("/", auth, async (req, res) => {
    try {
        const [cartItems] = await db.execute(
            `
            SELECT c.id, c.quantity, p.*, c.created_at
            FROM cart c
            JOIN products p ON c.product_id = p.id
            WHERE c.user_id = ?
            ORDER BY c.created_at DESC
        `,
            [req.user.id]
        );
        res.json(cartItems);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Add item to cart
router.post("/", auth, async (req, res) => {
    try {
        const { product_id, quantity } = req.body;

        console.log("Adding to cart:", req.body);

        if (!product_id || quantity <= 0 || isNaN(quantity)) {
            return res
                .status(400)
                .json({ message: "Invalid product_id or quantity" });
        }

        // Check if product exists
        const [productExists] = await db.execute(
            "SELECT id FROM products WHERE id = ?",
            [product_id]
        );
        if (productExists.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if item already exists
        const [existingItem] = await db.execute(
            "SELECT * FROM cart WHERE user_id = ? AND product_id = ?",
            [req.user.id, product_id]
        );

        if (existingItem.length > 0) {
            await db.execute(
                "UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?",
                [quantity, req.user.id, product_id]
            );
        } else {
            const id = cuid(); // Generate a unique ID for the cart item

            await db.execute(
                "INSERT INTO cart (id, user_id, product_id, quantity) VALUES (?, ?, ?, ?)",
                [id, req.user.id, product_id, quantity]
            );
        }

        res.json({ message: "Item added to cart" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Update cart item quantity
// Update cart item quantity
router.put("/:id", auth, async (req, res) => {
    try {
        const { quantity } = req.body;
        const cartItemId = req.params.id;

        console.log("Quantity to update:", quantity);
        console.log("Cart item ID:", cartItemId);

        // Validate input
        if (!cartItemId) {
            return res.status(400).json({ message: "Invalid cart item ID" });
        }

        console.log("User ID:", req.user.id);

        if (!quantity || isNaN(quantity) || quantity <= 0) {
            return res.status(400).json({
                message: "Invalid quantity. Quantity must be a positive number",
            });
        }

        console.log("Updating quantity to:", quantity);

        // Update cart item quantity
        const [result] = await db.execute(
            "UPDATE cart SET quantity = ? WHERE product_id = ? AND user_id = ?",
            [quantity, cartItemId, req.user.id]
        );

        console.log("Update result:", result);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        console.log("Cart item updated successfully");

        // Optionally, get the updated cart item to return
        const [updatedItem] = await db.execute(
            "SELECT c.*, p.name, p.price FROM cart c JOIN products p ON c.product_id = p.id WHERE c.id = ? AND c.user_id = ?",
            [cartItemId, req.user.id]
        );

        console.log("Updated cart item:", updatedItem);

        res.status(200).send({
            message: "Cart updated successfully",
            cartItem: updatedItem[0] || null,
        });
    } catch (err) {
        console.error("Error updating cart:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Remove item from cart
// DELETE /api/cart/:productId
router.delete("/:productId", auth, async (req, res) => {
    try {
        const { productId } = req.params;

        // Delete based on product_id and user_id
        const [result] = await db.execute(
            "DELETE FROM cart WHERE product_id = ? AND user_id = ?",
            [productId, req.user.id]
        );

        if (result.affectedRows === 0) {
            return res
                .status(404)
                .json({ message: "Cart item not found or already removed" });
        }

        res.json({ message: "Item removed from cart successfully" });
    } catch (err) {
        console.error("Error removing item from cart:", err);
        res.status(500).json({ message: "Server error while removing item" });
    }
});

module.exports = router;
