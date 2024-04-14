const Razorpay = require('razorpay');
const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Cart = require('../models/cartModel');

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
                        // paymentId:razorpayOrder.id,
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
                    // product_name: req.body.name,
                    // description: req.body.description,
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


exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId', 'username email').populate('items.productId', 'name price');
        res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

exports.paymentVerification = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const order = await Order.findOne({ razorpay_order_id }); 
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