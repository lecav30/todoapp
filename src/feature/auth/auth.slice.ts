import { createSlice } from "@reduxjs/toolkit";
import { login } from "./auth.thunk";

export interface AuthState {}

const initialState: AuthState = {};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(login.pending, (state) => {
        console.log("pending");
      });
  },
});

export default authSlice.reducer;
