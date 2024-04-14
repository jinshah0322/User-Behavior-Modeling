import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { useCustomEffect } from '../../hooks/useCustomEffect';
import { useEffect } from 'react';

const PaymentPage = () => {
    const { cartList, total } = useSelector((state) => state.cart);
    const id = localStorage.getItem("id");
    
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const items = cartList.map((item) => ({
                    productId: item._id,
                    quantity: item.quantity
                }));
                
                const response = await axios.post(`${process.env.REACT_APP_SERVERURL}/order`, {
                    userId: id,
                    items: items,
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
                        handler: function (response) {
                            alert("Payment Succeeded");
                            // Optionally, you can perform additional actions upon successful payment
                        },
                        prefill: {
                            contact: response.data.contact,
                            name: response.data.name,
                            email: response.data.email
                        },
                        notes: {
                            description: response.data.description
                        },
                        theme: {
                            color: "#2300a3"
                        }
                    };

                    var razorpayObject = new window.Razorpay(options);
					razorpayObject.on('payment.failed', function (response){
							alert("Payment Failed");
					});
					razorpayObject.open();
                } else {
                    // Handle unsuccessful order creation
                    console.log("Failed to create order:", response.data.msg);
                }
            } catch (error) {
                // Handle errors during order creation
                console.error("Error creating order:", error);
            }
        };

        fetchOrder();
    }, []);

    return (
        <div>
            {/* You can add any additional UI elements or loading indicators here */}
        </div>
    );
};

export default PaymentPage;
