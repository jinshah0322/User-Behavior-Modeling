import React from 'react';
import axios from 'axios';

const PaymentVerification = () => {
    const fetchData = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVERURL}/order/paymentVerification`);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    
    }
    fetchData();
  return (
    <div>
      HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
    </div>
  );
}

export default PaymentVerification;