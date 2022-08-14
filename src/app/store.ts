import { configureStore } from "@reduxjs/toolkit";
import cartItemsSlice from "../features/cartItemsSlice";
import foodItemsSlice from "../features/foodItemsSlice";
import loadingSlice from "../features/loadingSlice";
import showCartSlice from "../features/showCartSlice";
import userSlice from "../features/userSlice";

const store = configureStore({
  reducer: {
    userState: userSlice,
    loadingState: loadingSlice,
    foodItems: foodItemsSlice,
    showCart: showCartSlice,
    cartItems: cartItemsSlice,
  },
  devTools: true,
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
