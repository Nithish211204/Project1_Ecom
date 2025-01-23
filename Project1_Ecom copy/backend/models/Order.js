const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Refers to the User who placed the order
  items: [
    {
      product: {
        _id: { type: String, required: true }, // Product ID
        name: { type: String, required: true }, // Product name
        image: { type: String, required: true }, // Product image URL
        price: { type: Number, required: true }, // Product price
        quantity: { type: Number, required: true }, // Quantity purchased
      },
      total: { type: Number, required: true }, // Total for this specific item
    },
  ],
  paymentMethod: { type: String, required: true }, // Payment method for the entire order
  status: {
    type: String,
    enum: ['Placed', 'Out for Delivery', 'Delivered', 'Cancelled'], // Order status options
    default: 'Placed',
  },
  createdAt: { type: Date, default: Date.now }, // Timestamp for order creation
});

module.exports = mongoose.model('Order', orderSchema);
