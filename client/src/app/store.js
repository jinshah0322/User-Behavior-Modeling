import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { cartMiddleware } from "./features/cart/cartSlice";
import categorySlice , {categoryMiddleware} from "./features/category/categorySlice";
import productSlice , {productMiddleware} from "./features/product/productSlice";
import userSlice , {userMiddleware} from "./features/users/userSlice"; 

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    category: categorySlice,
    product: productSlice,
    users: userSlice 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartMiddleware , categoryMiddleware , productMiddleware , userMiddleware),
});