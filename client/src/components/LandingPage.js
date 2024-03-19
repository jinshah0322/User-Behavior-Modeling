import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoriesAsync } from '../app/features/category/categorySlice';
import { fetchProductsAsync } from '../app/features/product/productSlice';

const LandingPage = () => {
  const dispatch = useDispatch();
  const categoryCount = useSelector(state => state.category.categoryList.length);
  const productCount = useSelector(state => state.product.productList.length);

  // Fetch categories and products data when the component mounts
  useEffect(() => {
    dispatch(fetchCategoriesAsync());
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Admin Dashboard</h1>
        <p className="text-lg text-center text-gray-600 mb-8">Welcome back, Admin!</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 bg-purple-200 rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-4 text-purple-800">Categories</h2>
            <p className="text-lg text-purple-700">You have {categoryCount} categories</p>
          </div>
          <div className="p-6 bg-pink-200 rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-4 text-pink-800">Products</h2>
            <p className="text-lg text-pink-700">You have {productCount} products</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
