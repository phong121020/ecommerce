import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  singleProduct: localStorage.getItem("singleProduct")
    ? JSON.parse(localStorage.getItem("singleProduct"))
    : null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProducts: (state, action) => void (state.categories = action.payload),
    fetchSingleProduct: (state, action) => {
      state.singleProduct = action.payload;
    },
  },
});

export const { fetchProducts, fetchSingleProduct } = productsSlice.actions;
export const selectProducts = (state) => state.products.categories;
export const selectSingleProduct = (state) => state.products.singleProduct;
export default productsSlice.reducer;
