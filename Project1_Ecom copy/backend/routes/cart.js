const express = require('express');
const Cart = require('../models/Cart'); // Your Cart model
const Product = require("../models/Product");
const { authenticate, authorizeRole } = require('./middleware'); // Import middlewares

const router = express.Router();


router.get("/",authenticate, async (req, res) => {

    try {
        // Find the cart for the user
        const cart = await Cart.findOne({ userId:req.user.id });
        if (!cart) {
            return res.status(404).json({ message: "Cart is empty" });
        }

        // Fetch detailed product information for each cart item
        const cartWithDetails = await Promise.all(
            cart.items.map(async (item) => {
                const product = await Product.findOne({ customId: item.product._id ,available:true});
                if (!product) {
                    return null; // Handle case where product no longer exists
                }
                return {
                    productId: item.product._id,
                    name: product.name,
                    image:product.image,
                    price: product.price,
                    description: product.description,
                    quantity: item.quantity,
                };
            })
        );

        // Filter out null values for any missing products
        const filteredCart = cartWithDetails.filter((item) => item !== null);

        res.status(200).json(filteredCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});





router.post('/add', authenticate, async (req, res) => {
    const { productId, quantity = 1 } = req.body; // Default quantity to 1 if not provided

    // Validate input
    if (!productId || quantity <= 0) {
        return res.status(400).send({ error: 'Invalid productId or quantity' });
    }

    try {
        // Find the cart for the user
        let cart = await Cart.findOne({ userId: req.user.id });

        // Create new cart if not found
        if (!cart) {
            cart = new Cart({ userId: req.user.id, items: [] });
        }

        // Check if product already exists in cart
        const existingItem = cart.items.find(
            (item) => item.product._id.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += quantity; // Increase quantity if product exists
        } else {
            // Validate that the product exists
            const productExists = await Product.findOne({ customId: productId });
            if (!productExists) {
                return res.status(404).send({ error: 'Product not found' });
            }

            // Add the new product to the cart
            cart.items.push({ product: { _id: productId }, quantity });
        }

        // Save the cart
        await cart.save();

        // Respond with the updated cart
        res.status(200).send(cart);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server Error' });
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

router.delete('/clear', authenticate, async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.user.id });
      if (!cart) return res.status(404).send({ message: 'Cart not found' });
  
      cart.items = [];
      await cart.save();
  
      res.send({ message: 'Cart cleared successfully', cart });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
  


module.exports = router;
