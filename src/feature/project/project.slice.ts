import { IProject } from "@models/Project";
import { createSlice } from "@reduxjs/toolkit";
import {
  changeProject,
  createProject,
  getOwnProjects,
  getProjectById,
} from "./project.thunk";

export interface ProjectState {
  projects: IProject[];
  loading: boolean;
  selectedProject: IProject | null;
}

const initialState: ProjectState = {
  projects: [],
  loading: false,
  selectedProject: null,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changeProject, (state, action) => {
      state.selectedProject = action.payload;
    });

    builder
      .addCase(getOwnProjects.fulfilled, (state, action: any) => {
        state.projects = action.payload;
        state.loading = false;
      })
      .addCase(getOwnProjects.rejected, (state) => {
        state.projects = [];
        state.loading = false;
      })
      .addCase(getOwnProjects.pending, (state) => {
        state.loading = true;
      });

    builder
      .addCase(createProject.fulfilled, (state, action: any) => {
        state.selectedProject = action.payload;
        state.loading = false;
      })
      .addCase(createProject.rejected, (state) => {
        state.selectedProject = null;
        state.loading = false;
      })
      .addCase(createProject.pending, (state) => {
        state.loading = true;
      });

    builder
      .addCase(getProjectById.fulfilled, (state, action: any) => {
        state.selectedProject = action.payload;
        state.loading = false;
      })
      .addCase(getProjectById.rejected, (state) => {
        state.selectedProject = null;
        state.loading = false;
      })
      .addCase(getProjectById.pending, (state) => {
        state.loading = true;
      });
  },
});

export default projectSlice.reducer;
