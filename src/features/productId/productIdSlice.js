import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productId: null,
};

export const productIdSlice = createSlice({
  name: "productId",
  initialState,
  reducers: {
    enterProduct: (state, action) => {
      state.productId = action.payload; //**.productId */
    },
  },
});
export const { enterProduct } = productIdSlice.actions;
export const selectProductId = (state) => state.productId.productId;
export default productIdSlice.reducer;
