
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            product: {
                _id: String,
                
            },
            quantity: { type: Number, default: 1 },
        },
    ],
});

module.exports = mongoose.model('Cart', cartSchema);
