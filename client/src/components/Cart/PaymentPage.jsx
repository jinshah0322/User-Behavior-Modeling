import React, { useState } from 'react';
import { useSelector,useDispatch } from "react-redux";
import axios from 'axios';
import { toast } from 'react-toastify';
import { deleteCart } from '../../app/features/cart/cartSlice';
const PaymentPage = ({setCurrent}) => {
    const { cartList, total } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
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
                    name: "Quickmart",
                    "image": "",
                    "order_id": response.data.order_id,
                    prefill: {
                        contact: response.data.contact,
                        name: response.data.name,
                        email: response.data.email
                    },
                    handler: function (response) {
                        const razorpay_order_id = response.razorpay_order_id
                        const razorpay_payment_id = response.razorpay_payment_id
                        const razorpay_signature = response.razorpay_signature
                        axios.post(`${process.env.REACT_APP_SERVERURL}/order/paymentVerification`, {
                            razorpay_order_id,
                            razorpay_payment_id,
                            razorpay_signature
                        }).then((response) => {
                            if(response.data.success) {
                                dispatch(deleteCart());
                                window.location.href = "/";
                            } else {
                                toast.error("Payment Failed");
                                setCurrent(0);
                            }
                        }).catch((error) => {
                            toast.error("Payment Failed");
                            setCurrent(0);
                        });
                    },
                    notes: {
                        description: response.data.description
                    },
                    theme: {
                        color: "#000"
                    },                  
                    modal: {
                        ondismiss: function() {
                            toast.error("Payment Cancelled");                                                        
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
