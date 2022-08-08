import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const indexItem = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      console.log("indexItem", indexItem);
      if (indexItem >= 0) {
        state.cart[indexItem].qty += 1;
      } else {
        const temp = { ...action.payload, qty: 1 };
        state.cart.push(temp);
      }
    },
    increaseCartItem: (state, action) => {
      const itemIdex = state.cart.findIndex(
        (item) => item.id === action.payload
      );
      state.cart[itemIdex].qty += 1;
    },
    decreaseCartItem: (state, action) => {
      const itemIdex = state.cart.findIndex(
        (item) => item.id === action.payload
      );
      state.cart[itemIdex].qty -= 1;
      if (state.cart[itemIdex].qty === 0) {
        state.cart.splice(itemIdex, 1);
      }
    },
  },
});

export const { addToCart, increaseCartItem, decreaseCartItem } =
  cartSlice.actions;
export const selectCart = (state) => state.cart.cart;
export default cartSlice.reducer;
