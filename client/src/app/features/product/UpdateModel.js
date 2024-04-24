import React from "react";
import { useSelector } from "react-redux";

const UpdateModal = ({
  selectedProduct,
  closeModal,
  handleUpdate,
  handleImageChange,
}) => {
  const categoryList = useSelector((state) => state.category.categoryList);
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white max-h-[80vh] p-8 rounded shadow-lg w-full sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%]">
        <h2 className="text-xl font-bold mb-4">Update Product</h2>
        <form onSubmit={handleUpdate} className="max-h-[60vh] overflow-auto">
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
            <label htmlFor="price" className="block text-sm font-semibold mb-1">
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
            <label htmlFor="des" className="block text-sm font-semibold mb-1">
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
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-semibold mb-1">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              className="block w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="flex justify-end space-y-2 sm:space-y-0 sm:space-x-4">
            {/* Mobile View Buttons */}
            <div className="sm:hidden flex">
              <button
                type="submit"
                className="flex-grow bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={closeModal}
                className="flex-grow bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>

            {/* Desktop View Buttons */}
            <div className="hidden sm:flex sm:items-center">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
              <button
                onClick={closeModal}
                className="w-full bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ml-4"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;