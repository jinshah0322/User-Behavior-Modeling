import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategoriesAsync } from "../app/features/category/categorySlice";
import { fetchProductsAsync } from "../app/features/product/productSlice";
import { fetchUsersAsync } from "../app/features/users/userSlice";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const LandingPage = () => {
  const dispatch = useDispatch();
  const categoryCount = useSelector(
    (state) => state.category.categoryList.length
  );
  const productCount = useSelector((state) => state.product.productList.length);
  const userCount = useSelector((state) => state.users.userList.length);
  const [orders, setOrders] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVERURL}/order`
      );
      setOrders(response.data.orders.length);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    Promise.all([
      dispatch(fetchCategoriesAsync()),
      dispatch(fetchProductsAsync()),
      dispatch(fetchUsersAsync()),
      fetchOrders(), 
    ]).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="bg-white p-8 rounded-md shadow-md">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Admin Dashboard
          </h1>
          <p className="text-lg text-center text-gray-600 mb-8">
            Welcome back, Admin!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-6 bg-blue-200 rounded-lg text-center">
              <h2 className="text-2xl font-semibold mb-4 text-purple-800">
                Users
              </h2>
              <p className="text-lg text-blue-700">
                You have {userCount} users
              </p>
            </div>
            <div className="p-6 bg-purple-200 rounded-lg text-center">
              <h2 className="text-2xl font-semibold mb-4 text-purple-800">
                Categories
              </h2>
              <p className="text-lg text-purple-700">
                You have {categoryCount} categories
              </p>
            </div>
            <div className="p-6 bg-pink-200 rounded-lg text-center">
              <h2 className="text-2xl font-semibold mb-4 text-pink-800">
                Products
              </h2>
              <p className="text-lg text-pink-700">
                You have {productCount} products
              </p>
            </div>
            <div className="p-6 bg-yellow-200 rounded-lg text-center">
              <h2 className="text-2xl font-semibold mb-4 text-yellow-800">
                Orders
              </h2>
              <p className="text-lg text-yellow-700">
                You have {orders} orders
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
