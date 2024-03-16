import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { updateProduct } from "./productSlice";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleUpdate = (productId, updatedProduct) => {
    // dispatch(updateProduct({ id: productId, ...updatedProduct }));
    closeModal();
  };

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      <>
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
                  <th className="px-4 py-2 text-left">Company</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product, index) => (
                  <tr key={index} className="text-gray-700">
                    <td className="px-4 py-2">{product.id}</td>
                    <td className="px-4 py-2">{product.product}</td>
                    <td className="px-4 py-2">{product.price}</td>
                    <td className="px-4 py-2">{product.category}</td>
                    <td className="px-4 py-2">{product.des}</td>
                    <td className="px-4 py-2">{product.company}</td>
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
      </>

      {selectedProduct && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Update Product</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updatedProduct = {
                  product: e.target.product.value,
                  price: e.target.price.value,
                  category: e.target.category.value,
                  des: e.target.des.value,
                  company: e.target.company.value,
                };
                handleUpdate(selectedProduct.id, updatedProduct);
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="product"
                  className="block text-sm font-semibold mb-1"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="product"
                  name="product"
                  defaultValue={selectedProduct.product}
                  placeholder="Product Name"
                  required
                  className="block w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-semibold mb-1"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  defaultValue={selectedProduct.price}
                  placeholder="Price"
                  required
                  className="block w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold mb-1"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  defaultValue={selectedProduct.category}
                  placeholder="Category"
                  required
                  className="block w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="des"
                  className="block text-sm font-semibold mb-1"
                >
                  Description
                </label>
                <textarea
                  id="des"
                  name="des"
                  defaultValue={selectedProduct.des}
                  placeholder="Description"
                  className="block w-full px-4 py-2 border rounded"
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="company"
                  className="block text-sm font-semibold mb-1"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  defaultValue={selectedProduct.company}
                  placeholder="Company"
                  required
                  className="block w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
                <button
                  onClick={closeModal}
                  className="ml-4 bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
