const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    paymentId: {
        type: String,
        default: null,
    },  
    method:{
        type: String,
    },
    address:{
        type: String,
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
            }
        }
    ],
    totalAmount: {
        type: Number,
    },
    paymentStatus: {
        type: String,
        default: "Pending",
    }
},{timestamps: true});

module.exports = mongoose.model('Order', orderSchema);