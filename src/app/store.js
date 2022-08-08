import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import productsSilce from "../features/products/productsSilce";
import cartSlice from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    products: productsSilce,
    user: userSlice,
    cart: cartSlice,
  },
});
