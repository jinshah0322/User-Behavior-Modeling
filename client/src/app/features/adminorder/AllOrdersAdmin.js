import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "antd";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVERURL}/order`);
      setOrders(response.data.orders);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Error fetching orders.");
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const currentPageOrders = orders.slice(startIndex, endIndex);

  useEffect(() => {
    fetchOrders();
  }, []);
  
  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      ) : (
        <>
          <h2 className="mt-4 text-xl font-semibold">Orders List</h2>

          <table className="w-full mt-4 bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Order Id</th>
                <th className="px-4 py-2 text-left">Order Date</th>
                <th className="px-4 py-2 text-left">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentPageOrders.map((order, index) => (
                <tr key={order.orderId} className="text-gray-700">
                  <td className="px-4 py-2">{startIndex + index + 1}</td>
                  <td className="px-4 py-2">
                    {" "}
                    <Link to={`/dashboard/order/orderDetails/${order.orderId}`}>
                      {order.orderId}
                    </Link>
                  </td>
                  <td className="px-4 py-2">
                    {" "}
                    {new Date(order.orderDate).toDateString()}
                  </td>
                  <td className="px-4 py-2">₹ {order.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            current={currentPage}
            total={orders.length}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
            className="mt-4 flex justify-center"
          />
        </>
      )}
    </div>
  );
};

export default AllOrders;