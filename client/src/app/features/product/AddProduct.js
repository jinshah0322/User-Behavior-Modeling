import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { addProductAsync } from "./productSlice";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    quantity: "",
    image: null, // For storing image file
  });

  const dispatch = useDispatch();
//   const loading = useSelector((state) => state.product.loading);
//   const error = useSelector((state) => state.product.error);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    // dispatch(addProductAsync(formDataToSend));
  };

  return (
    <div className="container mx-auto">
      <div className="bg-white-200 p-4 rounded-lg ">
        <h1 className="text-4xl pb-4 text-center tracking-tight text-gray-900">
          Add Product
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded border focus:outline-none focus:border-blue-500"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-3 mt-2 py-2 rounded border focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-3 mt-2 py-2 rounded border focus:outline-none focus:border-blue-500"
          />
          {/* Add other input fields for category, brand, quantity */}
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 mt-2 py-2 rounded border focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleChange}
            required
            className="w-full px-3 mt-2 py-2 rounded border focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full px-3 mt-2 py-2 rounded border focus:outline-none focus:border-blue-500"
          />

          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleImageChange}
            required
            className="w-full px-3 mt-2 py-2 rounded border focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            // disabled={loading} // Disable button while loading
          >
            {/* {loading ? "Adding..." : "Add Product"} */}
          </button>
          {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
