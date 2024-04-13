import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

// Define your async thunk for adding a product
export const addProductAsync = createAsyncThunk(
  'product/addProductAsync',
  async (productData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVERURL}/product`, productData);
      console.log(response)
      toast.success("Product added successfully!");
      return response.data; // Return the new product data if needed
    } catch (error) {
      toast.error(`Error adding product: ${error.message}`);
      throw error;
    }
  }
);

// Define your async thunk for deleting a product
export const deleteProductAsync = createAsyncThunk(
  'product/deleteProductAsync',
  async (productId, { dispatch }) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVERURL}/product/${productId}`);
      toast.warning("Product deleted successfully!");
      return productId; // Return the deleted product id if needed
    } catch (error) {
      toast.error(`Error deleting product: ${error.message}`);
      throw error;
    }
  }
);

// Define your async thunk for updating a product
export const updateProductAsync = createAsyncThunk(
  'product/updateProductAsync',
  async ({ productId, productData }, { dispatch }) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_SERVERURL}/product/${productId}`, productData);
      toast.success("Product updated successfully!");
      return response.data; // Return the updated product data if needed
    } catch (error) {
      toast.error(`Error updating product: ${error.message}`);
      throw error;
    }
  }
);

export const fetchProductsAsync = createAsyncThunk(
    'product/fetchProductsAsync',
    async () => {
      try {
        console.log("Fetching products...");
        const response = await axios.get(`${process.env.REACT_APP_SERVERURL}/product`);
        console.log("Products fetched successfully:", response.data.products);
        return response.data.products; // Return the fetched products array
      } catch (error) {
        console.error("Error fetching products:", error.message);
        throw error;
      }
    }
  );
  

const initialState = {
  productList: [],
  loading: false,
  error: null
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.productList = action.payload; // Update productList with fetched products
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProductAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.productList.push(action.payload); // Assuming the API returns the new product data
      })
      .addCase(addProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProductAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.productList = state.productList.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Update the product in productList with the updated data
        state.productList = state.productList.map(product =>
          product.id === action.payload.id ? action.payload : product
        );
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      
  },
});

export const productMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type?.startsWith("product/")) {
      const productList = store.getState().product.productList || []; // Ensure productList is always an array
      localStorage.setItem("productList", JSON.stringify(productList));
    }
    return result;
  };
export default productSlice.reducer;
