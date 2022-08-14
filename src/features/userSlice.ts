import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserState } from "../types/stateTypes";
import { app } from "../firebase.config";
import { fetchUserDataFromLocalStorage } from "../utils/fetchLocalStorageData";
import { IUser } from "../types/interfaces";

const userFromLocal = fetchUserDataFromLocalStorage();
const initialState: IUserState = {
  user: userFromLocal,
  error: "",
};

export const getUser = createAsyncThunk("user/getUser", async () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const response = await (await signInWithPopup(auth, provider)).user;
  const { providerData } = response;
  localStorage.setItem("user", JSON.stringify(providerData[0]));
  return providerData[0];
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserNull: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getUser.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
      }
    );
    builder.addCase(getUser.rejected, (state, action) => {
      state.user = null;
      state.error = action.error.message || "An error occurred";
    });
  },
});

export default userSlice.reducer;
export const { setUserNull } = userSlice.actions;
