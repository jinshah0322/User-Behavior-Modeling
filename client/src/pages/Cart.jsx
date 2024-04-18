import React, { useState, useEffect } from "react";
import CartItem from "../components/Cart/CartItem";
import { Steps } from "antd";
import AddressPage from "../components/Cart/AddressPage";
import PaymentPage from "../components/Cart/PaymentPage";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../app/features/cart/cartSlice";
import Loader from "../components/Loader/Loader";

const Cart = () => {
  const [current, setCurrent] = useState(0);
  const [isAddress, setIsAddress] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { cartList, total } = useSelector((state) => state.cart);

  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const userId = localStorage.getItem("id");
    if (userId) {
      dispatch(getCart(userId)).then(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : cartList?.length > 0 ? (
        <>
          <Steps
            type="navigation"
            size="small"
            current={current}
            onChange={onChange}
            className="site-navigation-steps my-4"
            items={[
              {
                title: "CART",
                status: isAddress ? "finish" : "wait",
              },
              {
                title: "ADDRESS",
                status: isPayment ? "finish" : "wait",
                disabled: !isAddress,
              },
              {
                title: "PAYMENT",
                status: "wait",
                disabled: !isAddress || !isPayment,
              },
            ]}
          />
          {current === 0 && (
            <div>
              <CartItem
                setCurrent={setCurrent}
                setIsAddress={setIsAddress}
                cartList={cartList}
              />
            </div>
          )}
          {current === 1 && (
            <div>
              <AddressPage
                setCurrent={setCurrent}
                setIsPayment={setIsPayment}
              />
            </div>
          )}
          {current === 2 && <PaymentPage setCurrent={setCurrent} />}
        </>
      ) : (
        <div className="no-items min-h-[76vh] product w-full flex justify-center items-center bg-gray-100">
          <h1 className="text-4xl text-gray-800 font-bold border-2 border-gray-300 p-4 rounded-lg">
            Your Cart is Empty
          </h1>
        </div>
      )}
    </>
  );
};

export default Cart;