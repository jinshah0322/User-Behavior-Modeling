import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxMinus, RxPlus } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Spin } from "antd";

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
    await dispatch(
      createCart({
        productId: item,
        quantity: qty,
        userId: userId,
        message:
          qty === -1
            ? "Cart Updated Successfully"
            : "Product Removed Successfully",
      })
    );
    await dispatch(getCart(userId));
    setLoading(false);
  };

  const handleIncreaseQty = async (item, qty) => {
    setLoading(true);
    const userId = localStorage.getItem("id");
    await dispatch(
      createCart({
        productId: item,
        quantity: qty,
        userId: userId,
        message: "Cart Updated Successfully",
      })
    );
    await dispatch(getCart(userId));
    setLoading(false);
  };

  const handleCheckout = async () => {
    setCurrent(1);
    setIsAddress(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (cartList?.length === 0) {
    return (
      <h1 className="no-items min-h-[76vh] product w-full flex justify-center items-center">
        No Items are add in Cart
      </h1>
    );
  }
  return (
    <section className="cart-items min-h-[90vh] pl-10">
      <h1 className="text-2xl font-semibold py-4 mt-2 mb-6 ">
        {cartList.length} {cartList.length > 1 ? "Items" : "Item"} in your cart
      </h1>
      <div className="lg:flex gap-16">
        <section className="w-full lg:w-[70%]">
          <div className="lg:grid lg:grid-cols-1 md:grid-cols-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:w-[90%]">
            {cartList?.map((item, index) => (
              <div key={index} className="mb-8">
                <div className="border border-[#eee] rounded-md p-3">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-24 h-24">
                      <img
                        src={item?.image}
                        alt="product"
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div className="flex-grow ml-3">
                      <h1 className="text-xl font-semibold">{item?.title}</h1>
                      <p className="text-gray-500">Price: ₹ {item?.price}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div
                      className={`flex items-center border px-4 py-2 ${
                        loading ? "bg-gray-200" : ""
                      }`}
                    >
                      <button
                        onClick={() => handleDecreaseQty(item?._id, -1)}
                        disabled={loading}
                      >
                        <RxMinus />
                      </button>
                      <p className="px-4 text-lg">{item?.quantity}</p>
                      <button
                        onClick={() => handleIncreaseQty(item?._id, 1)}
                        disabled={loading}
                      >
                        <RxPlus />
                      </button>
                    </div>
                    <span className="text-black text-xl font-semibold ml-4">
                      {loading ? <Spin /> : `₹ ${item.subtotal}`}
                    </span>
                    <button
                      onClick={() =>
                        handleIncreaseQty(item?._id, -item?.quantity)
                      }
                      className="text-red-500 font-semibold ml-auto w-8 h-8"
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="border w-full lg:w-[23%] mt-8 lg:mt-0">
          <h1 className="text-2xl font-semibold py-4 mt-2 ml-3">
            Cart Summary
          </h1>
          <div className="border-b mx-3 mb-2">
            {cartList?.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2"
              >
                <p className="text-md">{item?.title}</p>
                <p className="text-gray-500">
                  {loading ? <Spin /> : `+ ₹ ${item.subtotal}`}
                </p>
              </div>
            ))}
          </div>
          <div className="px-3 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Total </h1>
            <p className="text-gray-500">{loading ? <Spin /> : `₹ ${total}`}</p>
          </div>
          <div className="flex items-center justify-center my-4">
            <button
              disabled={loading}
              className={`bg-blue-500 text-white rounded-md px-8 py-2 ${
                loading ? "bg-gray-200" : ""
              }`}
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </section>
      </div>
    </section>
  );
};

export default CartItem;