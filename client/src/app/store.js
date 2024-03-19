import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { cartMiddleware } from "./features/cart/cartSlice";
import categorySlice , {categoryMiddleware} from "./features/category/categorySlice";
import productSlice , {productMiddleware} from "./features/product/productSlice";
export const store = configureStore({
  reducer: {
    cart: cartSlice,
    category: categorySlice,
    product: productSlice

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartMiddleware , categoryMiddleware , productMiddleware),
});
