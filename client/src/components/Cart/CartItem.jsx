import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxMinus, RxPlus } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Spin } from 'antd';

import {
    addToCart,
    createCart,
    getCart,
    decreaseQty,
    deleteProduct,
} from "../../app/features/cart/cartSlice";

const CartItem = ({ setCurrent, setIsAddress, cartList }) => {
    const { total } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleDecreaseQty = async (item, qty) => {
        setLoading(true);
        const userId = localStorage.getItem("id");
        await dispatch(createCart({ productId: item, quantity: qty, userId: userId, message: qty === -1 ? "Cart Updated Successfully" : "Product Removed Successfully" }));
        await dispatch(getCart(userId));
        setLoading(false);
    }

    const handleIncreaseQty = async (item, qty) => {
        setLoading(true);
        const userId = localStorage.getItem("id");
        await dispatch(createCart({ productId: item, quantity: qty, userId: userId, message: "Cart Updated Successfully" }));
        await dispatch(getCart(userId));
        setLoading(false);
    }

    const handleCheckout = async () => {
        setCurrent(1);
        setIsAddress(true);
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    if (cartList?.length === 0) {
        return <h1 className="no-items min-h-[76vh] product w-full flex justify-center items-center">No Items are add in Cart</h1>
    }



    return (
        <section className="cart-items min-h-[90vh]">
            <h1 className="text-2xl font-semibold py-4 mt-2 mb-6 ml-12">{cartList.length} {cartList.length > 1 ? "Items" : "Item"} in your cart </h1>
            <div className="lg:flex gap-16">
                <section className="w-[70%] lg:grid lg:grid-cols-1 md:grid-cols-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:w-[90%]">
                    {
                        cartList?.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div className="grid justify-between items-center border border-[#eee] rounded-md w-full my-2 py-6 ml-8">
                                        <div className="lg:flex items-center w-full">
                                            <div className="h-[100px] w-[200px]" >
                                                <img src={item?.image} alt="product" className="max-h-[100px] max-w-[200px] min-h-[100px] min-w-[200px]" />
                                            </div>
                                            <div className="there lg:max-w-[350px] lg:min-w-[350px] max-w-[200px] min-w-[200px] lg:ml-4 ml-3 p-3">
                                                <h1 className="text-xl font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis">{item?.title}</h1>
                                                <p className="text-gray-500">Price: ₹ {item?.price}</p>
                                            </div>
                                            <div className="lg:ml-8 lg:flex items-center justify-center lg:max-w-full max-w-[190px] sm:max-w-[190px] ml-3 p-3">
                                                <div className={`flex items-center justify-center lg:mb-0 mb-3 border px-4 py-2 ${loading ? "bg-gray-200" : ""}`}>
                                                    <button onClick={() => handleDecreaseQty(item?._id, -1)} className="text-xl" disabled={loading}><RxMinus /></button>
                                                    <p className="px-4 text-lg">{item?.quantity}</p>
                                                    <button onClick={() => handleIncreaseQty(item?._id, 1)} className="text-xl" disabled={loading}><RxPlus /></button>
                                                </div>
                                                <span className="text-black font-semibold lg:ml-8">{loading ? <Spin /> : `₹ ${item.subtotal}`}</span>
                                                <button onClick={() => handleIncreaseQty(item?._id, -item?.quantity)} className="text-red-500 font-semibold ml-8 w-[10px]"><RiDeleteBin6Line /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })

                    }
                </section>
                <section className="border lg:w-[23%] mt-2 mx-8 mt-12 lg:mt-0 lg:mx-0">
                    <h1 className="text-2xl font-semibold py-4 mt-2 ml-12">Cart Summary</h1>
                    <div className="border-b mx-12 mb-2">
                        {
                            cartList?.map((item, index) => {
                                return (
                                    <div key={index} className="flex justify-between items-center py-2">
                                        <p className="text-md overflow-hidden whitespace-nowrap overflow-ellipsis min-w-[60%] w-[60%] max-w-[60%]">{item?.title}</p>
                                        <p className="text-gray-500">{loading ? <Spin /> : `+ ₹ ${item.subtotal}`}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="px-12 flex justify-between items-center">
                        <h1 className="text-xl font-semibold">Total </h1>
                        <p className="text-gray-500">{loading ? <Spin /> : `₹ ${total}`}</p>
                    </div>
                    <div className="flex items-center justify-center my-4">
                        <button disabled={loading} className={`bg-blue-500 text-white rounded-md px-8 py-2 ${loading ? "bg-gray-200" : ""}`}
                            onClick={handleCheckout}
                        >Proceed to Checkout</button>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default CartItem;
