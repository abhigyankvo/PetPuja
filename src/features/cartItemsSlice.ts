import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItemState } from "../types/stateTypes";
import { fetchCartFromLocalStorage } from "../utils/fetchLocalStorageData";

const cartItemsFromLocal = fetchCartFromLocalStorage();
const initialState: ICartItemState = {
  cartItems: cartItemsFromLocal,
};
const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addItemInCart: (state, payload: PayloadAction<any>) => {
      //store in local storage
      //set in state
    },
  },
});
export default cartItemsSlice.reducer;
export const { addItemInCart } = cartItemsSlice.actions;
