const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: {
      _id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
    total: { type: Number, required: true },
  }],
  address: [{
    phone: { type: Number, required: true },
    name: { type: String, required: true },
    location: { type: String, required: true }
  }],
  paymentMethod: { type: String, required: true },
  status: { type: String, default: 'Placed', enum: ['Placed', 'Shipped', 'Delivered', 'Cancelled'] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
