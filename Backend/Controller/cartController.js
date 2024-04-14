const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

exports.addCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        let cart = await Cart.findOne({ userId });
        const product = await Product.findById(productId);
        
        if (!product) {
            return res.send({ message: 'Product not found', success: false, status: 404 });
        }

        if (quantity > product.quantity) {
            return res.send({ message: 'Not enough quantity available', quantity: product.quantity, success: false, status: 400 });
        }

        if (!cart) {
            cart = new Cart({ userId, items: [{ productId, quantity }] });
        } else {
            let itemIndex = -1;
            for (let i = 0; i < cart.items.length; i++) {
                if (cart.items[i].productId.toString() === productId) {
                    itemIndex = i;
                    break;
                }
            }

            if (itemIndex !== -1) {
                // Update quantity
                cart.items[itemIndex].quantity += quantity;

                // Delete item if quantity is less than or equal to 0
                if (cart.items[itemIndex].quantity <= 0) {
                    cart.items.splice(itemIndex, 1);
                }
            } else {
                // Add new item to cart
                cart.items.push({ productId, quantity });
            }
        }
        
        await cart.save();
        
        res.send({ msg: 'Item added to cart successfully', success: true, status: 200, cart });
    } catch (error) {
        console.error(error);
        res.send({ message: 'Internal server error', success: false, status: 500 });
    }
};



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