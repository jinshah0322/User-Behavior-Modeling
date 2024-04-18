import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCategoryAsync,
  deleteCategoryAsync,
  fetchCategoriesAsync,
} from "./categorySlice";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../components/Loader/Loader";

const CategoryList = () => {
  const categoryList = useSelector((state) => state.category.categoryList);
  const [loading, setLoading] = useState(false);
  const [newCategory, setnewCategory] = useState({ name: "" });
  const [selectedId, setSelectedId] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [delLoading, setdelLoading] = useState(false);
  const error = useSelector((state) => state.category.error);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    category: "",
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
    setLoading(true);

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
          })
        );
        dispatch(fetchCategoriesAsync());
        setFormData({
          category: "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error adding category:", error.message);
        setLoading(false);
      }
    }
  };

  const handleDeleteCategory = (categoryName) => {
    setdelLoading(true);
    dispatch(deleteCategoryAsync(categoryName)); 
    setdelLoading(false);
  };
  const handleUpdatedCategory = async () => {
    if (newCategory?.name === "")
      return toast.error("Category name is required");
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_SERVERURL}/category/${selectedId}`,
        { name: newCategory?.name }
      );
      console.log(res);
      if (res?.data?.status === 200) {
        toast.success(res?.data?.msg);
        dispatch(fetchCategoriesAsync());
        setIsEdit("");
      } else {
        toast.error(res?.data?.msg || "Oops! Something went wrong");
        setIsEdit("");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleUpdateCategory = (categoryName, categoryId) => {
    setSelectedId(categoryId);
    setIsEdit(categoryName);
    setnewCategory({ ...newCategory, name: categoryName });
    setdelLoading(true);
    setdelLoading(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const newName = e.target.value;
    setnewCategory({ ...newCategory, name: newName });
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
          <button
            onClick={handleAddCategory}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
      <h2 className="mt-4 text-xl font-semibold">Category Table</h2>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : categoryList?.length > 0 ? (
        <>
          <table className="w-full mt-4 bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left	">#</th>
                <th className="px-4 py-2 text-left	">Category</th>
                <th className="px-4 py-2 text-left	">Products</th>
                <th className="px-4 py-2 text-left	">Action</th>
              </tr>
            </thead>
            <tbody>
              {categoryList?.map((category, index) => (
                <tr key={category._id} className="text-gray-700">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2 capitalize">
                    {isEdit !== category?.name ? (
                      category?.name
                    ) : (
                      <input
                        value={newCategory?.name}
                        onChange={handleUpdate}
                      />
                    )}
                  </td>
                  <td className="px-4 py-2">{category?.totalProducts}</td>
                  <td className="px-4 py-2">
                    {category?.name === isEdit ? (
                      <>
                        <button
                          type="button"
                          onClick={handleUpdatedCategory}
                          disabled={category?.name === newCategory?.name}
                          className="mr-3 mb-2 md:mb-0 md:mr-3 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded focus:outline-none focus:bg-green-600"
                          style={{ width: "6rem" }}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEdit("")}
                          className="mr-3 mb-2 md:mb-0 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded focus:outline-none focus:bg-red-600"
                          style={{ width: "6rem" }} 
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() =>
                            handleUpdateCategory(category?.name, category?.id)
                          }
                          className="mr-3 mb-2 md:mb-0 md:mr-3 bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded focus:outline-none focus:bg-green-600"
                          style={{ width: "6rem" }}
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.name)}
                          className="mb-2 md:mb-0 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded focus:outline-none focus:bg-red-600"
                          disabled={delLoading}
                          style={{ width: "6rem" }}
                        >
                          {delLoading ? "Deleting..." : "Delete"}
                        </button>
                      </>
                    )}
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
