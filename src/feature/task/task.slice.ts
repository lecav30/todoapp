import { createSlice } from "@reduxjs/toolkit";

export interface TaskState {}

const initialState: TaskState = {};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default taskSlice.reducer;
