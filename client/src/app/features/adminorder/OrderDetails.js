import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Table } from "antd";
import ReactToPrint from "react-to-print";
import Loader from "../../../components/Loader/Loader";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState();
  const componentRef = useRef();
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      title: "Id",
      key: "id",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Product Name",
      dataIndex: "title",
      key: "productName",
      render: (text, record) => {
        return (
          <div>
            <Link to={`/shop/${record.productId}`}>{text}</Link>
          </div>
        );
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <p style={{ width: "70px" }}>₹ {text}</p>,
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      key: "subtotal",
      render: (text) => <p style={{ width: "70px" }}>₹ {text}</p>,
    },
  ];

  const fetchData = async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_SERVERURL}/order/orderDetails/${id}`
      );
      setOrder(data.data.order);
      console.log(data);
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);

    }
  };

  const fetchDate = (date) => {
    return new Date(date).toDateString();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="lg:px-32 px-8 py-8">
      {loading ? (
        <div className="flex justify-center items-center min-h-[70vh]">
          <Loader />
        </div>
      ) : (
        <div>
          <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item fs-3">
                    <Link to="/dashboard/order">Orders</Link>
                  </li>
                  <li class="breadcrumb-item active fs-3" aria-current="page">
                  #{id}
                  </li>
                </ol>
              </nav>
          <div className="w-full rounded-md border px-6 py-4" ref={componentRef}>
            <p className="border-b font-bold py-3 text-xl text-blue-500">
              Order #{id}
            </p>
            <div className="py-3 grid lg:grid-cols-3 grid-cols-1 gap-4">
              <div>
                <h1 className="font-bold text-xl mb-1">Order Details</h1>
                <p>Order Date: {fetchDate(order?.orderDate)}</p>
                <p>Total items: {order?.totalItems}</p>
              </div>
              <div>
                <h1 className="font-bold text-xl mb-1">Shipping Address</h1>
                <p>{order?.address}</p>
              </div>
              <div>
                <h1 className="font-bold text-xl mb-1">Transaction Details</h1>
                <p>Transaction ID: {order?.paymentId}</p>
                <p>Total Amount: ₹ {order?.totalAmount}</p>
              </div>
            </div>
            <div>
              <h1 className="font-bold py-3 text-lg text-blue-500">Order Items</h1>
              <div className="overflow-auto">
                <Table
                  dataSource={order?.items}
                  columns={columns}
                  pagination={false}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <ReactToPrint
              trigger={() => (
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                  Print
                </button>
              )}
              content={() => componentRef.current}
            />
          </div>
        </div>
      )}
    </div>
  );
  
};

export default OrderDetails;