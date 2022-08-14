import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  show: false,
};
const showCartSlice = createSlice({
  name: "showCart",
  initialState,
  reducers: {
    toggleShow: (state) => {
      state.show = !state.show;
    },
  },
});
export default showCartSlice.reducer;
export const { toggleShow } = showCartSlice.actions;
