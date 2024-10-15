import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType, ProductState } from "../../types/types";

const initialState: ProductState = {
  products: [] as ProductType[],
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchProduct: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchProductSuccess: (state, action: PayloadAction<ProductType[]>) => {
      state.products = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchProductFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchProduct, fetchProductSuccess, fetchProductFailed } =
  productSlice.actions;

export default productSlice.reducer;
