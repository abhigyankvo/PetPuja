import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from "../firebase.config";
import { IFoodItem } from "../types/interfaces";
import { IFoodItemState } from "../types/stateTypes";
const initialState: IFoodItemState = {
  foodItems: [],
};

export const getFoodItems = createAsyncThunk(
  "foodItems/getFoodItems",
  async () => {
    const response = await getDocs(
      query(collection(firestore, "foodItems"), orderBy("id", "desc"))
    );
    const foodItem = response.docs.map((doc) => doc.data() as IFoodItem);
    return foodItem;
  }
);

const foodItemsSlice = createSlice({
  name: "foodItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getFoodItems.fulfilled,
      (state, action: PayloadAction<IFoodItem[]>) => {
        state.foodItems = action.payload;
      }
    );
    builder.addCase(getFoodItems.rejected, (state, action) => {
      state.foodItems = [];
      console.log(action.error.message);
    });
  },
});

export default foodItemsSlice.reducer;
