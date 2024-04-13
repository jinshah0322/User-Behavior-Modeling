const Cart = require('../models/cartModel');

exports.addCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

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

        re.send({ msg: 'Item added to cart successfully', success: true, status: 200 });
    } catch (error) {
        console.error(error);
        res.send({ message: 'Internal server error', success: false, status: 500 });
    }
}

exports.getCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        const cart = await Cart.findOne({ userId }).populate('items.productId', 'name price');

        res.send({cart,msg:"Get all products",success:true,status:200});
    } catch (error) {
        console.error(error);
        res.send({ msg: 'Internal server error',success:false,status:500 });
    }
}