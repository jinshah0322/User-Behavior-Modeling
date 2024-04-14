const Razorpay = require('razorpay');
const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const crypto = require('crypto');
const Product = require('../models/productModel');

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_ID_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
    // Add other options as needed
});

exports.createOrder = async (req, res) => {
    try {
        let { userId, address, items, totalAmount } = req.body;
        const user = await User.findOne({ _id: userId });
        const amount = totalAmount * 100;
        const options = {
            amount,
            currency: 'INR',
            receipt: user.email,
        };

        razorpayInstance.orders.create(options, async (err, razorpayOrder) => {
            if (err) {
                console.error(err);
                return res.send({ success: false, msg: 'Error creating Razorpay order', status: 400});
            }

            if (razorpayOrder.status === 'created') {
                    const order = new Order({
                        orderId:razorpayOrder.id,
                        userId,
                        method:razorpayOrder.method,
                        address,
                        items,
                        totalAmount
                    });
                await order.save();

                res.status(200).send({
                    success: true,
                    msg: 'Order Created',
                    order_id: razorpayOrder.id,
                    amount,
                    key_id: process.env.RAZORPAY_ID_KEY,
                    contact: user.phonenumber,
                    name: user.name,
                    email: user.email
                });
            } else {
                res.send({ success: false, msg: 'Payment creation failed', status:400 });
            }
        });

    } catch (error) {
        console.error(error);
        res.send({ msg: 'Internal server error', success: false, status: 500 });
    }
};

exports.paymentVerification = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const order = await Order.findOne({orderId:razorpay_order_id }); 
        if (!order) {
            return res.json({ msg: 'Order not found', success: false, status: 404});
        }
        const generatedSignature = crypto.createHmac('sha256',
            process.env.RAZORPAY_SECRET_KEY)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex'); 
        if (generatedSignature === razorpay_signature) {
            order.paymentId = razorpay_payment_id;
            order.paymentStatus = 'Paid';
            await order.save(); 

            for (const item of order.items) {
                const product = await Product.findById(item.productId);
                if (product) {
                    product.quantity -= item.quantity;
                    product.sold += item.quantity;
                    await product.save();
                }
            }

            const userId = order.userId;
            await Order.deleteMany({ userId: userId, paymentStatus: 'Pending' });
            await Cart.deleteMany({ userId: userId });
            res.json({ msg: 'Payment successful', success: true, status: 200 });
        } else {
            res.json({ msg: 'Payment verification failed', success: false, status: 400});
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

exports.getAllOrder = async (req, res) => {
    try {
        const orders = await Order.find({ paymentStatus: 'Paid' });
        const formattedOrders = orders.map(order => ({
            orderId: order._id,
            paymentId: order.paymentId,
            totalAmount: order.totalAmount,
            orderDate: order.createdAt
        }));

        res.json({ orders: formattedOrders, success: true, status: 200 });
    } catch (error) {
        console.error(error);
        res.json({ msg: 'Internal server error', success: false, status: 500 });
    }
};

exports.getOrderByUserId = async (req, res) => {
    try {
        const userId = req.params.id;
        const orders = await Order.find({ userId: userId, paymentStatus: 'Paid' });

        // Format the orders array to include the desired fields
        const formattedOrders = orders.map(order => ({
            orderId: order._id,
            paymentId: order.paymentId,
            totalAmount: order.totalAmount,
            orderDate: order.createdAt
        }));

        res.json({ orders: formattedOrders, success: true, status: 200 });
    } catch (error) {
        console.error(error);
        res.json({ msg: 'Internal server error', success: false, status: 500 });
    }
};

exports.getOrderDetailsByOrderId = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findOne({ _id: orderId }).populate({
            path: 'items.productId',
            select: 'title price'
        });
        if (!order) {
            return res.json({ msg: 'Order not found', success: false, status: 404 });
        }

        const itemsWithSubtotal = order.items.map(item => ({
            productId: item.productId._id,
            title: item.productId.title,
            price: item.productId.price,
            quantity: item.quantity,
            subtotal: item.quantity * item.productId.price
        }));

        const orderWithSubtotal = {
            address: order.address,
            paymentId: order.paymentId,
            orderDate: order.createdAt,
            totalItems: order.items.length,
            totalAmount: order.totalAmount,
            items: itemsWithSubtotal
        };

        res.json({ order: orderWithSubtotal, success: true, status: 200 });
    } catch (error) {
        console.error(error);
        res.json({ msg: 'Internal server error', success: false, status: 500 });
    }
}