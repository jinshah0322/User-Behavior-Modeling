import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCategoryAsync,
  deleteCategoryAsync,
  fetchCategoriesAsync,
} from "./categorySlice";

const CategoryList = () => {
  const categoryList = useSelector((state) => state.category.categoryList);

  console.log(categoryList);
  const loading = useSelector((state) => state.category.loading);
  const error = useSelector((state) => state.category.error);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    category: "",
    description: "",
  });

  const [formErrors, setFormErrors] = useState({
    category: false,
    description: false,
  });

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  const handleAddCategory = async (event) => {
    event.preventDefault();
    const hasEmptyField = Object.values(formData).some(
      (value) => value.trim() === ""
    );
  
    if (hasEmptyField) {
      setFormErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        for (const key in formData) {
          newErrors[key] = formData[key].trim() === "";
        }
        return newErrors;
      });
    } else {
      try {
        await dispatch(
          addCategoryAsync({
            name: formData.category,
            description: formData.description,
          })
        );
        // Fetch categories after adding a new category
        dispatch(fetchCategoriesAsync());
        setFormData({
          category: "",
          description: "",
        });
      } catch (error) {
        console.error("Error adding category:", error.message);
      }
    }
  };
  

  const handleDeleteCategory = (categoryName) => {
    dispatch(deleteCategoryAsync(categoryName)); // Pass category name instead of ID
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  return (
    <div className="container mx-auto">
      <div className="bg-white-200 p-4 rounded-lg ">
        <h1 className="text-4xl pb-4 text-center tracking-tight text-gray-900">
          Manage Categories
        </h1>
        <form>
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            required
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded border focus:outline-none focus:border-blue-500 ${
              formErrors.category ? "border-red-500" : ""
            }`}
          />
          {formErrors.category && (
            <p className="text-red-500">Category is required.</p>
          )}
          <input
            type="text"
            name="description"
            placeholder="Description"
            required
            value={formData.description}
            onChange={handleChange}
            className={`w-full px-3 mt-2 py-2 rounded border focus:outline-none focus:border-blue-500 ${
              formErrors.description ? "border-red-500" : ""
            }`}
          />
          {formErrors.description && (
            <p className="text-red-500">Description is required.</p>
          )}
          <button
            onClick={handleAddCategory}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
      <h2 className="mt-4 text-xl font-semibold">Category Table</h2>

      {categoryList?.length > 0 ? (
        <>
          <table className="w-full mt-4 bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left	">#</th>
                <th className="px-4 py-2 text-left	">Category</th>
                <th className="px-4 py-2 text-left	">Description</th>
                <th className="px-4 py-2 text-left	">Action</th>
              </tr>
            </thead>
            <tbody>
              {categoryList.map((category) => (
                <tr key={category._id} className="text-gray-700">
                  <td className="px-4 py-2">{category._id}</td>
                  <td className="px-4 py-2">{category.name}</td>
                  <td className="px-4 py-2">{category.description}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeleteCategory(category.name)} // Pass category name
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded focus:outline-none focus:bg-red-600"
                      disabled={loading} // Disable button while loading
                    >
                      {loading ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="flex justify-center items-center ">
          <div className="text-center">
            <p className="text-4xl text-gray-700 font-bold mb-4">Oops!</p>
            <p className="text-lg text-red-600">No records found.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;