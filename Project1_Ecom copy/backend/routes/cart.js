const express = require('express');
const Cart = require('../models/Cart'); // Your Cart model
const { authenticate, authorizeRole } = require('./middleware'); // Import middlewares

const router = express.Router();

// Get Cart (Fetch cart items for authenticated user)
router.get('/', authenticate, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).send({ message: 'Cart not found', items: [] });
        res.send(cart);  // Send entire cart data, including items
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Add product to cart
router.post('/add', authenticate, async (req, res) => {
    const { productId, name, image, price, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId: req.user.id });

        // Create new cart if not found
        if (!cart) {
            cart = new Cart({ userId: req.user.id, items: [] });
        }

        // Check if product already exists in cart
        const existingItem = cart.items.find(item => item.product._id.toString() === productId);

        if (existingItem) {
            existingItem.quantity += quantity; // Increase quantity if product exists
        } else {
            cart.items.push({ product: { _id: productId, name, image, price }, quantity });
        }

        await cart.save();
        res.send(cart);  // Return updated cart
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Remove product from cart
router.delete('/:productId', authenticate, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).send({ message: 'Cart not found' });

        // Remove item from cart
        cart.items = cart.items.filter(item => item.product._id.toString() !== req.params.productId);
        await cart.save();
        res.send(cart);  // Return updated cart
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
// Increase product quantity
router.post('/increase/:productId', authenticate, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).send({ message: 'Cart not found' });

        const item = cart.items.find(item => item.product._id.toString() === req.params.productId);
        if (!item) return res.status(404).send({ message: 'Product not found in cart' });

        item.quantity += 1;  // Increase the quantity
        await cart.save();
        res.send({ updatedQuantity: item.quantity, cart });  // Return updated quantity and cart
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Decrease product quantity
router.post('/decrease/:productId', authenticate, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).send({ message: 'Cart not found' });

        const item = cart.items.find(item => item.product._id.toString() === req.params.productId);
        if (!item) return res.status(404).send({ message: 'Product not found in cart' });

        if (item.quantity > 1) {
            item.quantity -= 1;  // Decrease quantity by 1
        } else {
            // If quantity is 1, remove the product from the cart
            cart.items = cart.items.filter(item => item.product._id.toString() !== req.params.productId);
        }

        await cart.save();
        res.send({ updatedQuantity: item ? item.quantity : 0, cart });  // Return updated quantity and cart
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
