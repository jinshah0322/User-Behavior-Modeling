const Cart = require('../models/cartModel');

exports.addCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        console.log(req.body)
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [{ productId, quantity }] });
            await cart.save();
        } else {
            const itemIndex = cart.items.findIndex(item => item.productId === productId);

            if (itemIndex !== -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }

            await cart.save();
        }

        res.send({ msg: 'Item added to cart successfully', success: true, status: 200 });
    } catch (error) {
        console.error(error);
        res.send({ message: 'Internal server error', success: false, status: 500 });
    }
}

exports.getCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        const cart = await Cart.findOne({ userId }).populate({
            path: 'items.productId',
            select: 'title image price',
        });

        if (!cart) {
            return res.send({ msg: 'Cart not found', success: false, status: 404 });
        }

        const formattedItems = cart.items.map(item => ({
            _id: item.productId._id,
            title: item.productId.title,
            image: item.productId.image,
            price: item.productId.price,
            quantity: item.quantity,
            subtotal: item.productId.price * item.quantity,
        }));

        const cartTotal = formattedItems.reduce((total, item) => total + item.subtotal, 0);

        const formattedCart = {
            _id: cart._id,
            items: formattedItems,
            total: cartTotal,
        };

        res.send({ cart: formattedCart, msg: 'Get all products', success: true, status: 200 });
    } catch (error) {
        console.error(error);
        res.send({ msg: 'Internal server error', success: false, status: 500 });
    }
};