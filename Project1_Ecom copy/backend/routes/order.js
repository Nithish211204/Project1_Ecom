const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const {authenticate,authorizeRole}= require('./middleware'); // Middleware to validate user authentication

// POST /orders/add - Create an order from frontend data
router.post('/add', authenticate, async (req, res) => {
    const { items, paymentMethod } = req.body;

    // Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).send({ error: 'Order items are required' });
    }
    if (!paymentMethod) {
        return res.status(400).send({ error: 'Payment method is required' });
    }

    try {
        // Validate each product in the items
        for (const item of items) {
            if (
                !item.product._id ||
                !item.product.name ||
                !item.product.image ||
                !item.product.price ||
                !item.product.quantity ||
                item.product.quantity <= 0
            ) {
                return res.status(400).send({ error: 'Invalid product data in order items' });
            }
        }

        // Calculate the total for each item and overall total
        const orderItems = items.map((item) => ({
            product: {
                _id: item.product._id,
                name: item.product.name,
                image: item.product.image,
                price: item.product.price,
                quantity: item.product.quantity,
            },
            total: item.product.price * item.product.quantity,
        }));
        const orderTotal = orderItems.reduce((sum, item) => sum + item.total, 0);

        // Create a new order
        const newOrder = new Order({
            userId: req.user.id,
            items: orderItems,
            paymentMethod,
            status: 'Placed',
        });

        // Save the order in the database
        const savedOrder = await newOrder.save();

        // Respond with the created order
        res.status(201).send({ message: 'Order placed successfully', order: savedOrder });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server error while placing the order' });
    }
});

// Fetch all orders for the logged-in user
router.get('/', authenticate, async (req, res) => {
    try {
      const orders = await Order.find({ userId: req.user.id });
      if (!orders || orders.length === 0) {
        return res.status(404).send({ message: 'No orders found' });
      }
      res.status(200).send(orders);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });


module.exports = router;
