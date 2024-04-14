// import React from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import axios from 'axios';
// import { useCustomEffect } from '../../hooks/useCustomEffect';
// import { useEffect } from 'react';

// const PaymentPage = () => {
//     const { cartList, total } = useSelector((state) => state.cart);
//     const id = localStorage.getItem("id");
    
//     useEffect(() => {
//         const fetchOrder = async () => {
//             try {
//                 const items = cartList.map((item) => ({
//                     productId: item._id,
//                     quantity: item.quantity
//                 }));
                
//                 const response = await axios.post(`${process.env.REACT_APP_SERVERURL}/order`, {
//                     userId: id,
//                     items: items,
//                     totalAmount: total
//                 });

//                 console.log(response);

//                 if (response.data.success) {
//                     const options = {
//                         key: response.data.key_id,
//                         amount: response.data.amount,
//                         currency: "INR",
//                         name: response.data.product_name,
//                         description: response.data.description,
//                         handler: function (response) {
//                             alert("Payment Succeeded");
//                             // Optionally, you can perform additional actions upon successful payment
//                         },
//                         prefill: {
//                             contact: response.data.contact,
//                             name: response.data.name,
//                             email: response.data.email
//                         },
//                         notes: {
//                             description: response.data.description
//                         },
//                         theme: {
//                             color: "#2300a3"
//                         }
//                     };

//                     var razorpayObject = new window.Razorpay(options);
// 					razorpayObject.on('payment.failed', function (response){
// 							alert("Payment Failed");
// 					});
// 					razorpayObject.open();
//                 } else {
//                     // Handle unsuccessful order creation
//                     console.log("Failed to create order:", response.data.msg);
//                 }
//             } catch (error) {
//                 // Handle errors during order creation
//                 console.error("Error creating order:", error);
//             }
//         };

//         fetchOrder();
//     }, []);

//     return (
//         <div>
//             {/* You can add any additional UI elements or loading indicators here */}
//         </div>
//     );
// };

// export default PaymentPage;

import React, { useState } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';

const PaymentPage = ({setCurrent}) => {
    const { cartList, total } = useSelector((state) => state.cart);
    // const id = localStorage.getItem("id");
    const fetchOrder = async () => {
        try {
            const items = cartList.map((item) => ({
                productId: item._id,
                quantity: item.quantity
            }));
            
            const address = localStorage.getItem("address");
            const add = address && JSON.parse(address);
            const id = localStorage.getItem("id");
            const res = await axios.get(`${process.env.REACT_APP_SERVERURL}/user/profile/${id}`);
            const address_api = `${res.data.user.streetAddress}, ${res.data.user.city}, ${res.data.user.state},${res.data.user.country} - ${res.data.user.postalcode}`            
            // fullAddress = fullAddress.flat().join(", ");
            const fullAddress = address?`${add.streetAddress}, ${add.city}, ${add.state}, ${add.country} - ${add.postalcode}`:address_api;
            
            const response = await axios.post(`${process.env.REACT_APP_SERVERURL}/order`, {
                userId: id,
                items: items,
                address:fullAddress,
                totalAmount: total
            });

            console.log(response);

            if (response.data.success) {
                const options = {
                    key: response.data.key_id,
                    amount: response.data.amount,
                    currency: "INR",
                    name: response.data.product_name,
                    description: response.data.description,
                    callback_url: `/order/paymentVerification`,
                    prefill: {
                        contact: response.data.contact,
                        name: response.data.name,
                        email: response.data.email
                    },
                    notes: {
                        description: response.data.description
                    },
                    theme: {
                        color: "#000"
                    },                  
                    modal: {
                        ondismiss: function() {
                            alert("Payment Cancelled");
                            setCurrent(0);
                        }
                    },
                    payment_method: {
                        card: true,                        
                    }
                };

                const razorpayObject = new window.Razorpay(options);
                const res = razorpayObject.open();
                console.log(res);
            } else {
                // Handle unsuccessful order creation
                console.log("Failed to create order:", response.data.msg);
            }
        } catch (error) {
            // Handle errors during order creation
            console.error("Error creating order:", error);
        }
    };    

    return (
        <div className="bg-gray-100 min-h-[70vh] mt-4 flex flex-col justify-center items-center">
        <div className="max-w-lg mx-auto mt-8 p-3 bg-white rounded-lg shadow-md text-center">
            <h1 className="text-3xl font-semibold mb-4">Payment Details</h1>
            <p className="text-lg mb-6">Please review your total bill before proceeding with the payment.</p>
            <div className="mb-4 flex items-center justify-center gap-2">
                <h2 className="text-xl font-semibold">Total Bill:</h2>
                <p className="text-xl">₹ {total}</p>
            </div>
            <p className="text-lg mb-6">Once you click "Pay Now", your payment process will begin.</p>
            <button 
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                onClick={fetchOrder}
            >
                Pay Now
            </button>
            <p className="mt-6 text-gray-600 text-sm">Secure payments with SSL encryption</p>
        </div>
    </div>
    );
};

export default PaymentPage;
