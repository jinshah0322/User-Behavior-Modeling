import React from "react";
import { useSelector } from "react-redux";

const UpdateModal = ({ selectedProduct, closeModal, handleUpdate }) => {
  
  const categoryList = useSelector((state) => state.category.categoryList);
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white max-h-[400px] p-8 rounded shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">Update Product</h2>
        <form onSubmit={handleUpdate} className="max-h-[300px] overflow-auto">
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
              defaultValue={selectedProduct.title}
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
              htmlFor="des"
              className="block text-sm font-semibold mb-1"
            >
              Description
            </label>
            <textarea
              id="des"
              name="des"
              defaultValue={selectedProduct.description}
              placeholder="Description"
              className="block w-full px-4 py-2 border rounded"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="company"
              className="block text-sm font-semibold mb-1"
            >
              Brand
            </label>
            <input
              type="text"
              id="company"
              name="company"
              defaultValue={selectedProduct.brand}
              placeholder="Brand"
              required
              className="block w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-sm font-semibold mb-1"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              defaultValue={selectedProduct.quantity}
              placeholder="Quantity"
              required
              className="block w-full px-4 py-2 border rounded"
            />
          </div>
          {/* Category field */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-semibold mb-1"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              defaultValue={selectedProduct.category}
              required
              className="block w-full px-4 py-2 border rounded"
            >
              {categoryList.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
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
  );
};

export default UpdateModal;
