import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";


const initialState = {
  cartList: "",
  loading: false,
  error: null,
  total: "",
  totalItems:0,
};

export const createCart = createAsyncThunk(
  'cart/addToCartAsync',
  async (categoryData, { dispatch }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVERURL}/cart/`, {
         productId: categoryData.productId, quantity: categoryData.quantity, userId: categoryData.userId
      });
      if (response?.data?.status === 200) {
        localStorage.setItem("cartId", response?.data?.cart?._id)
        localStorage.setItem("cartItems", response?.data?.cart?.items.length)
        toast.success(categoryData.message);
      }
      else {
        toast.error(response?.data?.msg);
      }
      return response.data; // Return the new category data if needed
    } catch (error) {
      toast.error(`Error adding category: ${error.message}`);
      throw error;
    }
  }
);

export const getCart = createAsyncThunk(
  'cart/getCartAsync',
  async (userId, { dispatch }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVERURL}/cart/${userId}`);
      return response.data;
    } catch (error) {
      toast.error(`Error adding category: ${error.message}`);
      throw error;
    }
  }
);


export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    decreaseQty: (state, action) => {
      const productTodecreaseQnty = action.payload;
      const productExit = state.cartList.find(
        (item) => item.id === productTodecreaseQnty.id
      );
      if (productExit.qty === 1) {
        state.cartList = state.cartList.filter(
          (item) => item.id !== productExit.id
        );
      } else {
        state.cartList = state.cartList.map((item) =>
          item.id === productExit.id
            ? { ...productExit, qty: productExit.qty - 1 }
            : item
        );
      }
    },
    deleteProduct: (state, action) => {
      const productToDelete = action.payload;
      state.cartList = state.cartList.filter(
        (item) => item.id !== productToDelete.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.loading = false;
        state.totalItems = action.payload.cart.items.length;
      })
      .addCase(createCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartList = action.payload.cart.items; // Update productList with fetched products
        state.total = action.payload.cart.total; // Update productList with fetched products
        state.totalItems = action.payload.cart.items.length;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const cartMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith("cart/")) {
    const cartList = store.getState().cart.cartList;
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }
  return result;
};

export const { addToCart, decreaseQty, deleteProduct } = cartSlice.actions;

export default cartSlice.reducer;
