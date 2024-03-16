import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { cartMiddleware } from "./features/cart/cartSlice";
import categorySlice , {categoryMiddleware} from "./features/category/categorySlice";
export const store = configureStore({
  reducer: {
    cart: cartSlice,
    category: categorySlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartMiddleware , categoryMiddleware),
});
