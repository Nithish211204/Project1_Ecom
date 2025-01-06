
// module.exports = router;
const express = require('express');
const Cart = require('../models/Cart');  // Your Cart model
const { authenticate, authorizeRole } = require('./middleware');  // Import middlewares

const router = express.Router();

// Add a product to the cart

// router.post('/add', authenticate, async (req, res) => {
//     const { productId, quantity } = req.body;  // productId is a string like "Tomato23"
//     const userId = req.user.id;

//     try {
//         // Check if you have a 'productId' or 'name' field in your Product schema
//         const product = await Product.findOne({ customId: productId }); // Query using the correct field

//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         let cart = await Cart.findOne({ userId });

//         if (!cart) {
//             cart = new Cart({ userId, items: [] });
//         }

//         const existingItem = cart.items.find(item => item.product.toString() === product._id.toString());

//         if (existingItem) {
//             existingItem.quantity += quantity;
//         } else {
//             cart.items.push({ product: product._id, quantity });
//         }

//         await cart.save();
//         res.status(200).json({ message: 'Product added to cart', cart });
//     } catch (error) {
//         console.error(error);  // Log the error for debugging
//         res.status(500).json({ message: 'Server error' });
//     }
// });
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

module.exports = router;
// // Get the user's cart
// // router.get('/', authenticate, async (req, res) => {
// //     const userId = req.user.id;

// //     try {
// //         // Get cart for the user
// //         const cart = await Cart.findOne({ userId }).populate('items.product');
// //         if (!cart) {
// //             return res.status(404).json({ message: 'Cart is empty' });
// //         }
// //         res.status(200).json(cart);
// //     } catch (error) {
// //         res.status(500).json({ message: 'Server error' });
// //     }
// // });
// router.get('/', authenticate, async (req, res) => {
//     try {
//         const userId = req.user.id; // Ensure user is authenticated and has a valid token
//         const cart = await Cart.findOne({ userId }).populate('items.product'); // Populate items with product details
//         if (!cart) {
//             return res.status(404).json({ message: 'Cart not found' });
//         }
//         res.json(cart);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });


// router.delete('/remove/:productId', authenticate, async (req, res) => {
//     const { productId } = req.params;
//     const userId = req.user.id;

//     try {
//         let cart = await Cart.findOne({ userId });
//         if (!cart) {
//             return res.status(404).json({ message: 'Cart not found' });
//         }

//         // Find the item and remove it
//         cart.items = cart.items.filter(item => item.product.toString() !== productId);
//         await cart.save();

//         res.status(200).json({ message: 'Item removed from cart', cart });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });


// router.put('/update', authenticate, async (req, res) => {
//     const { productId, quantity } = req.body;
//     const userId = req.user.id;

//     try {
//         let cart = await Cart.findOne({ userId });
//         if (!cart) {
//             return res.status(404).json({ message: 'Cart not found' });
//         }

//         // Find the item and update the quantity
//         const item = cart.items.find(item => item.product.toString() === productId);
//         if (item) {
//             item.quantity = quantity;
//         }

//         await cart.save();
//         res.status(200).json({ message: 'Cart updated', cart });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });




// module.exports = router;
