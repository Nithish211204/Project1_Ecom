
// module.exports = router;
const express = require('express');
const Cart = require('../models/Cart');  // Your Cart model
const { authenticate, authorizeRole } = require('./middleware');  // Import middlewares

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).send({ cart: { items: [] } });
        res.send(cart);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add product to cart
router.post('/add', authenticate, async (req, res) => {
    const { productId, name, image, price, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            cart = new Cart({ userId: req.user.id, items: [] });
        }

        const existingItem = cart.items.find(item => item.product._id === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ product: { _id: productId, name, image, price }, quantity });
        }

        await cart.save();
        res.send(cart);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Remove product from cart
router.delete('/:productId', authenticate, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).send('Cart not found');

        cart.items = cart.items.filter(item => item.product._id !== req.params.productId);
        await cart.save();
        res.send(cart);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});
// Increase product quantity
router.post('/increase/:productId', authenticate, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).send('Cart not found');

        const item = cart.items.find(item => item.product._id.toString() === req.params.productId);
        if (!item) return res.status(404).send('Product not found in cart');

        item.quantity += 1; // Increase the quantity
        await cart.save();
        res.send(cart);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Decrease product quantity
router.post('/decrease/:productId', authenticate, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).send('Cart not found');

        const item = cart.items.find(item => item.product._id.toString() === req.params.productId);
        if (!item) return res.status(404).send('Product not found in cart');

        if (item.quantity > 1) {
            item.quantity -= 1; // Decrease the quantity
        } else {
            cart.items = cart.items.filter(item => item.product._id.toString() !== req.params.productId); // Remove product
        }

        await cart.save();
        res.send(cart);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});


module.exports = router;
