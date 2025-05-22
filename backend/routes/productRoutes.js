// const express = require('express');
// const router = express.Router();
// const db = require('../config/db');
// const auth = require('../middleware/auth');

// // Get all products
// router.get('/', async (req, res) => {
//     try {
//         const [products] = await db.execute('SELECT * FROM products');
//         res.json(products);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// // Get product by id
// router.get('/:id', async (req, res) => {
//     try {
//         const [products] = await db.execute('SELECT * FROM products WHERE id = ?', [req.params.id]);
//         if (products.length === 0) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.json(products[0]);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../config/db");
const auth = require("../middleware/auth");
const cuid = require("cuid");

// Get all products
router.get("/", async (req, res) => {
    try {
        const [products] = await db.execute("SELECT * FROM products");
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/", async (req, res) => {
    const products = req.body;

    try {
        const insertPromises = products.map((product) => {
            
            const id = cuid(); // Generate a unique ID for each product
         
            return db.execute(
                "INSERT INTO products (id, name, description, price, image_url, category, section) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [
                    id, // Use the generated ID
                    product.name,
                    product.description,
                    product.price,
                    product.image, // assuming `image` in payload maps to `image_url` in DB
                    product.category, // MUST be present in the request body
                    product.section, // MUST be present in the request body
                ]
            );
        });

        await Promise.all(insertPromises);

        res.status(201).json({ message: "Products added successfully" });
    } catch (err) {
        console.error("Database Insertion Error:", err);
        res.status(500).json({
            message: "Server error during product insertion",
        });
    }
});

// Get product by id
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        // select product by id
        const [products] = await db.execute(
            "SELECT * FROM products WHERE id = ?",
            [id]
        );

        // Check if product exists
        const product = products[0];
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        console.log("Product found:", product);

        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
