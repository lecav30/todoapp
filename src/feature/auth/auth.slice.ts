import { createSlice } from "@reduxjs/toolkit";
import { login } from "./auth.thunk";

export interface AuthState {
  loading: boolean;
}

const initialState: AuthState = {
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action: any) => {
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      });
  },
});

export default authSlice.reducer;
