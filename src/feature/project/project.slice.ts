import { createSlice } from "@reduxjs/toolkit";

export interface ProjectState {}

const initialState: ProjectState = {};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default projectSlice.reducer;
