import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsAsync } from './productSlice';

const GetProduct = () => {
  const dispatch = useDispatch();
  const { productList, loading, error } = useSelector(state => state.product);
  
  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center">
          <p className="text-lg text-gray-700">Loading...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      ) : productList && productList.length > 0 ? (
        <>
          <h2 className="mt-4 text-xl font-semibold">Product Table</h2>

          <table className="w-full mt-4 bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Product</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Brand</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product, index) => (
                <tr key={index} className="text-gray-700">
                  <td className="px-4 py-2">{product._id}</td>
                  <td className="px-4 py-2">{product.title}</td>
                  <td className="px-4 py-2">{product.price}</td>
                  <td className="px-4 py-2">{product.category}</td>
                  <td className="px-4 py-2">{product.description}</td>
                  <td className="px-4 py-2">{product.brand}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="flex justify-center items-center">
          <div className="text-center">
            <p className="text-4xl text-gray-700 font-bold mb-4">Oops!</p>
            <p className="text-lg text-red-600">No records found.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetProduct;
