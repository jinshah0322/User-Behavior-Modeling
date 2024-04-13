const Razorpay = require('razorpay');
const Order = require('../models/orderModel');
const User = require('../models/userModel');

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_ID_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
    // Add other options as needed
});

exports.createOrder = async (req, res) => {
    try {
        let { userId, address, items, totalAmount } = req.body;
        const user = await User.findOne({ _id: userId });
        
        if(!address){
            address = user.address;
        }
        
        console.log(req.body);
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
                console.log(razorpayOrder);
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
                    order_id: razorpayOrder.order_id,
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
