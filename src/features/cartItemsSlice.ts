import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFoodItem } from "../types/interfaces";
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
    addItemInCart: (state, action: PayloadAction<IFoodItem>) => {
      if (state.cartItems.find((item) => item.id === action.payload.id)) {
        cartItemsSlice.caseReducers.increaseItemQuantity(state, {
          type: "cartItems/increaseItemQuantity",
          payload: action.payload.id,
        });
      } else state.cartItems = [...state.cartItems, action.payload];
    },
    increaseItemQuantity: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === action.payload && item.qty < 9) {
          item.qty += 1;
        }
        return item;
      });
    },
    decreaseItemQuantity: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === action.payload && item.qty > 1) {
          item.qty -= 1;
        }
        return item;
      });
    },
    setCartEmpty: (state) => {
      state.cartItems = [];
    },
  },
});
export default cartItemsSlice.reducer;
export const {
  addItemInCart,
  setCartEmpty,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartItemsSlice.actions;
