import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "antd";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const pageSize = 5;
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    try {
      const id = localStorage.getItem("id");
      const response = await axios.get(
        `${process.env.REACT_APP_SERVERURL}/order/${id}`
      );
      const { orders, total } = response.data;
      setOrders(orders);
      setTotal(total);
      setTotalPages(Math.ceil(total / pageSize));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handlePagination = (page) => {
    setPage(page);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="lg:px-36 px-4">
      {loading ? (
        <div className="flex justify-center items-center min-h-[70vh]">
          <Loader />
        </div>
      ) : orders.length > 0 ? (
        <>
          <Link to="/profile">
            <h1 className="py-4 font-semibold text-xl">ALL ORDERS</h1>
          </Link>
          <div className="py-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 rounded-lg">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="px-4 py-2">Id</th>
                    <th className="px-4 py-2">Order Id</th>
                    <th className="px-4 py-2">Order Date</th>
                    <th className="px-4 py-2">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index} className="text-gray-700">
                      <td className="px-4 py-2">
                        {(page - 1) * pageSize + index + 1}
                      </td>
                      <td className="px-4 py-2">
                        <Link to={`/profile/orders/${order.orderId}`}>
                          {order.orderId}
                        </Link>
                      </td>
                      <td className="px-4 py-2">
                        {new Date(order.orderDate).toDateString()}
                      </td>
                      <td className="px-4 py-2">₹ {order.totalAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-4">
              {total > 0 && (
                <Pagination
                  current={page}
                  pageSize={pageSize}
                  total={totalPages * pageSize}
                  onChange={handlePagination}
                  showSizeChanger={false}
                  className="pagination"
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="w-full flex items-center justify-center min-h-[70vh]">
          <h1 className="text-xl font-semibold">No Orders Found</h1>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
