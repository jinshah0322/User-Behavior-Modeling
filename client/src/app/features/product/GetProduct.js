import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync } from "./productSlice";
import { Pagination } from "antd";
import Loader from "../../../components/Loader/Loader";

const GetProduct = () => {
  const dispatch = useDispatch();
  const { productList, loading, error } = useSelector((state) => state.product);
  const categoryList = useSelector((state) => state.category.categoryList);
  const [pagination, setPagination] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const limit = 10;

  // Function to get category name from category ID
  const getCategoryName = (categoryId) => {
    const category = categoryList.find(
      (category) => category.id === categoryId
    );
    return category ? category.name : "Unknown Category";
  };

  const handlePaginationChange = (page) => {
    setPagination(page);
    setSkip((page - 1) * limit);
  };

  const displayProducts = productList.slice(skip, skip + limit);

  useEffect(() => {
    dispatch(fetchProductsAsync()).then(() => {
      setTotalCount(productList.length);
    });
  }, [dispatch]);

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
      ) : displayProducts && displayProducts.length > 0 ? (
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
              {displayProducts.map((product, index) => (
                <tr key={index} className="text-gray-700">
                  <td className="px-4 py-2">{skip + index + 1}</td>
                  <td className="px-4 py-2">{product.title}</td>
                  <td className="px-4 py-2">{product.price}</td>
                  <td className="px-4 py-2">
                    {product?.category && getCategoryName(product.category)}
                  </td>
                  <td className="px-4 py-2 max-w-xs overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {product.description}
                  </td>
                  <td className="px-4 py-2">{product.brand}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            current={pagination}
            total={totalCount}
            pageSize={limit}
            onChange={handlePaginationChange}
            className="mt-4 flex justify-center"
          />
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