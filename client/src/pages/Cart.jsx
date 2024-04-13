import React, { useState } from 'react';
import CartItem from "../components/Cart/CartItem";
import { Steps } from 'antd';
import AddressPage from '../components/Cart/AddressPage';
import PaymentPage from '../components/Cart/PaymentPage';

const Cart = () => {
  const [current, setCurrent] = useState(0);
  const [isAddress, setIsAddress] = useState(false);
  const [isPayment, setIsPayment] = useState(false);

  const onChange = (value) => {

    console.log('onChange:', value);
    setCurrent(value);
  };

  return (
    <>
      <Steps
        type="navigation"
        size="small"
        style={{ width: "50%", display: "flex", justifyContent: "center", alignItems: "center", margin: "2% 25%" }}
        current={current}
        onChange={onChange}
        className="site-navigation-steps"
        items={[
          {
            title: 'CART',
            status: isAddress ? 'finish' : 'wait',
          },
          {
            title: 'ADDRESS',
            status: isPayment ? 'finish' : 'wait',
            disabled: !isAddress
          },
          {
            title: 'PAYMENT',
            status: 'wait',
            disabled: !isAddress || !isPayment

          },
        ]}
      />
      {current === 0 &&
        <div>
          <CartItem setCurrent={setCurrent} setIsAddress={setIsAddress} />
        </div>}
      {current === 1 &&
        <div>
          <AddressPage setCurrent={setCurrent} setIsPayment={setIsPayment} />
        </div>}
      {current === 2 &&
        <PaymentPage setCurrent={setCurrent} />
      }
    </>
  );
};
export default Cart;