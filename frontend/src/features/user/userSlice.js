import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

// Get users from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
 user: user ? user : null,
 isError: false,
 isSuccess: false,
 isLoading: false,
 message: "",
};

// Log user
export const log = createAsyncThunk("user/log", async (userName, thunkAPI) => {
 try {
  return await userService.log(userName);
 } catch (error) {
  const message =
   (error.response && error.response.data && error.response.data.message) ||
   error.message ||
   error.toString();
  return thunkAPI.rejectWithValue(message);
 }
});



export const userSlice = createSlice({
 name: "user",
 initialState,
 reducers: {
  reset: (state) => {
   state.isLoading = false;
   state.isSuccess = false;
   state.isError = false;
   state.message = "";
  },
 },
 extraReducers: (builder) => {
  builder
   .addCase(log.pending, (state) => {
    state.isLoading = true;
   })
   .addCase(log.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.user = action.payload;
   })
   .addCase(log.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;
    state.user = null;
   })
 },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
