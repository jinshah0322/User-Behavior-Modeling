import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProductAsync , fetchProductsAsync } from "./productSlice";
import UpdateModal from "./UpdateModel";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList);
  const categoryList = useSelector((state) => state.category.categoryList);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };
  console.log(categoryList)

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      id: selectedProduct._id, // Use _id instead of id if your product objects have an _id field
      title: e.target.product.value,
      price: e.target.price.value,
      category: e.target.category.value,
      description: e.target.des.value,
      brand: e.target.company.value,
      quantity: e.target.quantity.value,
    };
    try {
      await dispatch(updateProductAsync({ productId: selectedProduct._id, productData: updatedProduct }));
      closeModal();
      dispatch(fetchProductsAsync());
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  
  return (
    <div>
      {productList && productList.length > 0 ? (
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
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Sold</th>
                <th className="px-4 py-2 text-left">Rating</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product, index) => (
                <tr key={index} className="text-gray-700">
                  <td className="px-4 py-2">{index+1}</td>
                  <td className="px-4 py-2">{product.title}</td>
                  <td className="px-4 py-2">{product.price}</td>
                  <td className="px-4 py-2">
                    {categoryList.find(cat => cat.id === product.category)?.name}
                  </td>
                  <td className="px-4 py-2 truncate max-w-[20px]">{product.description}</td>
                  <td className="px-4 py-2">{product.brand}</td>
                  <td className="px-4 py-2">{product.quantity}</td>
                  <td className="px-4 py-2">{product.sold}</td>
                  <td className="px-4 py-2">{product.totalrating}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => openModal(product)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Update
                    </button>
                  </td>
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
      {selectedProduct && (
        <UpdateModal
          selectedProduct={selectedProduct}
          closeModal={closeModal}
          handleUpdate={handleUpdate}
          categoryList={categoryList}
        />
      )}
    </div>
  );
};

export default UpdateProduct;
