import { createSlice } from "@reduxjs/toolkit";

export interface GroupState {}

const initialState: GroupState = {};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default groupSlice.reducer;
