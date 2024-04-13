import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

// Define your async thunk for adding a category
export const addCategoryAsync = createAsyncThunk(
  'category/addCategoryAsync',
  async (categoryData, { dispatch }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVERURL}/category`, categoryData);
      if(response?.data?.status === 200){
      toast.success("Category added successfully!");
      fetchCategoriesAsync()
      }
      else{
        toast.error(response?.data?.msg);
      }
      return response.data; // Return the new category data if needed
    } catch (error) {
      toast.error(`Error adding category: ${error.message}`);
      throw error;
    }
  }
);

// Define your async thunk for deleting a category
export const deleteCategoryAsync = createAsyncThunk(
  'category/deleteCategoryAsync',
  async (categoryName, { dispatch }) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_SERVERURL}/category`, { data: { name: categoryName } });
      console.log(res)
      if(res?.data?.status === 200){

        toast.warning(res?.data?.msg);
      }
      else{
        toast.error("Oops! Something went wrong");
      }

      return categoryName; // Return the deleted category name if needed
    } catch (error) {
      toast.error(`Error deleting category: ${error.message}`);
      throw error;
    }
  }
);

export const updateCategoryAsync = createAsyncThunk(
  'category/updateCategoryAsync',
  async (categoryName,id, { dispatch }) => {
    try {
      const res = await axios.put(`${process.env.REACT_APP_SERVERURL}/category/${id}`,  { name: categoryName } );
      console.log(res)
      if(res?.data?.status === 200){

        toast.warning(res?.data?.msg);
      }
      else{
        toast.error("Oops! Something went wrong");
      }

      return categoryName; // Return the deleted category name if needed
    } catch (error) {
      toast.error(`Error deleting category: ${error.message}`);
      throw error;
    }
  }
);

// Define your async thunk for fetching categories
export const fetchCategoriesAsync = createAsyncThunk(
  'category/fetchCategoriesAsync',
  async (_, { dispatch }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVERURL}/category`);
      return response.data.categories; // Return the fetched categories array
    } catch (error) {
      toast.error(`Error fetching categories: ${error.message}`);
      throw error;
    }
  }
);

export const fetchProductCategory = createAsyncThunk(
  'category/fetchProductCategory',
  async (_, { dispatch },categoryList) => {
    try {
      console.log("cllaa")
      console.log(categoryList)
      const response = await axios.post(`${process.env.REACT_APP_SERVERURL}/admin`,{category:categoryList});
      return response.data.category; // Return the fetched categories array
    } catch (error) {
      toast.error(`Error fetching categories: ${error.message}`);
      throw error;
    }
  }
);

const initialState = {
  categoryList: [],
  loading: false,
  error: null
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryList = action.payload; // Update categoryList with fetched categories
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateCategoryAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategoryAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryList = action.payload; // Update categoryList with fetched categories
      })
      .addCase(updateCategoryAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCategoryAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategoryAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryList.push(action.payload); // Assuming the API returns the new category data
      })
      .addCase(addCategoryAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteCategoryAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryList = state.categoryList.filter(
          (category) => category.name.toLowerCase() !== action.payload.toLowerCase()
        );
      })
      .addCase(deleteCategoryAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const categoryMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith("category/")) {
    const categoryList = store.getState().category.categoryList || []; // Ensure categoryList is always an array
    localStorage.setItem("categoryList", JSON.stringify(categoryList));
  }
  return result;
};
export default categorySlice.reducer;
