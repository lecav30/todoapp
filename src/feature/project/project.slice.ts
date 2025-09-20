import { IProject } from "@models/Project";
import { createSlice } from "@reduxjs/toolkit";
import {
  changeProject,
  createProject,
  deleteProject,
  getOwnProjects,
  getProjectById,
  updateProjectById,
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
      .addCase(createProject.fulfilled, (state, action) => {
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

    builder
      .addCase(updateProjectById.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProjectById.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateProjectById.pending, (state) => {
        state.loading = true;
      });

    builder
      .addCase(deleteProject.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteProject.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
      });
  },
});

export default projectSlice.reducer;
