import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductAsync } from "./productSlice";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    quantity: "",
    image: null,
  });

  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.category.categoryList);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      const formDataToSend = {
        title: formData.title,
        description: formData.description,
        price: parseInt(formData.price),
        category: formData.category,
        brand: formData.brand,
        quantity: parseInt(formData.quantity),
        image: base64String,
      };
      dispatch(addProductAsync(formDataToSend));
    };
    reader.readAsDataURL(formData.image);
  };

  React.useEffect(() => {
    if (!loading && !error) {
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        quantity: "",
        image: null,
      });
    }
  }, [loading, error]);

  return (
    <div className="container mx-auto">
      <div className="bg-white-200 p-4 rounded-lg ">
        <h1 className="text-4xl pb-4 text-center tracking-tight text-gray-900">
          Add Product
        </h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={formData.title}
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
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 mt-2 py-2 rounded border focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Category</option>
            {categoryList.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
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
            // required
            className="w-full px-3 mt-2 py-2 rounded border focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
