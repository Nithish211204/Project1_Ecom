const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User =require('../models/User');
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

  router.get('/place', authenticate, authorizeRole('admin', 'vendor'), async (req, res) => {
    try {
      // Fetch the first placed order
      const order = await Order.findOne({ status: "Placed" })
        .populate('userId', 'name location phone'); // Populate user fields
 
      if (!order) {
        return res.status(404).json({ message: "No placed orders found" });
      }
 
      // Prepare the response with user details and product details
      const response = {
        orderId: order._id,
        status: order.status,
        customer: {
          name: order.userId.name,
          location: order.userId.location,
          contact: order.userId.phone,
        },
        items: order.items.map((item) => ({
          productId: item.product._id,
          name: item.product.name,
          image: item.product.image,
          price: item.product.price,
          description: item.product.description,
          quantity: item.product.quantity,
        })),
      };
 
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching placed orders:", error); // Log error on the server side
      return res.status(500).json({ message: "An error occurred while fetching orders", error: error.message });
    }
 });
 
  

// Endpoint to change order status to 'Out for Delivery'
router.patch('/:orderId', authenticate,authorizeRole('admin', 'vendor'), async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
  
    if (status !== 'Out for Delivery') {
      return res.status(400).json({ message: 'Invalid status update' });
    }
  
    try {
      const order = await Order.findById(orderId);
      
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      order.status = status;
      await order.save(); // Save the updated order
  
      res.status(200).json({ message: 'Order status updated to Out for Delivery' });
    } catch (error) {
      console.error("Error updating order status:", error);
      return res.status(500).json({ message: "Error updating order status" });
    }
  });

module.exports = router;
