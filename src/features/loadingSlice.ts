import {
  AnyAction,
  createSlice,
  PayloadAction,
  AsyncThunk,
} from "@reduxjs/toolkit";
import { ILoadingState } from "../types/stateTypes";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

/**
 * If needed to record which action is pending,
 * use ILoadingState : Record<string,string>
 * Read about Record Types
 */
const initialState: ILoadingState = {
  loading: false,
};

const isPendingAction = (action: AnyAction): action is PendingAction =>
  action.type.endsWith("/pending");
const isFulfilledAction = (action: AnyAction): action is FulfilledAction =>
  action.type.endsWith("/fulfilled");

const isRejectedAction = (action: AnyAction): action is RejectedAction =>
  action.type.endsWith("/rejected");

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isPendingAction, (state) => {
      state.loading = true;
    });
    builder.addMatcher(isFulfilledAction, (state) => {
      state.loading = false;
    });
    builder.addMatcher(isRejectedAction, (state) => {
      state.loading = false;
    });
  },
});

export default loadingSlice.reducer;
export const { setLoading } = loadingSlice.actions;
