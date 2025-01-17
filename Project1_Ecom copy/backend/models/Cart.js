
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            product: {
                _id: String,
                name: String,
                image: String,
                price: Number,
            },
            quantity: { type: Number, default: 1 },
        },
    ],
});

module.exports = mongoose.model('Cart', cartSchema);
