import { resetAreYouSureDialog } from "@feature/common/common.thunk";
import {
  IProject,
  IProjectRequest,
  IProjectUpdateRequest,
} from "@models/Project";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import projectServices from "@services/project.services";
import { AxiosError } from "axios";

export const changeProject = createAction<IProject>("changeProject");

export const createProject = createAsyncThunk(
  "createProject",
  async (payload: IProjectRequest, { rejectWithValue, dispatch }) => {
    try {
      const response = await projectServices.createProject(payload) as any;
      dispatch(getOwnProjects());
      return response.project;
    } catch (error) {
      const err = error as AxiosError;
      /* if (err.status === 403) {
        dispatch(
          setAlertDialog({
            open: true,
            message: "Usuario o contraseña incorrectos",
            type: "error",
          }),
        );
      } */
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  },
);

export const getOwnProjects = createAsyncThunk(
  "getOwnProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await projectServices.getOwnProjects();
      return response;
    } catch (error) {
      const err = error as AxiosError;
      /* if (err.status === 403) {
        dispatch(
          setAlertDialog({
            open: true,
            message: "Usuario o contraseña incorrectos",
            type: "error",
          }),
        );
      } */
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  },
);

export const getProjectById = createAsyncThunk(
  "getProjectById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await projectServices.getProjectById(id);
      return response;
    } catch (error) {
      const err = error as AxiosError;
      /* if (err.status === 403) {
        dispatch(
          setAlertDialog({
            open: true,
            message: "Usuario o contraseña incorrectos",
            type: "error",
          }),
        );
      } */
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  },
);

export const updateProjectById = createAsyncThunk(
  "updateProjectById",
  async (
    projectUpdateRequest: IProjectUpdateRequest,
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response =
        await projectServices.updateProjectById(projectUpdateRequest);
      dispatch(getOwnProjects());
      return response;
    } catch (error) {
      const err = error as AxiosError;
      /* if (err.status === 403) {
        dispatch(
          setAlertDialog({
            open: true,
            message: "Usuario o contraseña incorrectos",
            type: "error",
          }),
        );
      } */
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  },
);

export const deleteProject = createAsyncThunk(
  "deleteProject",
  async (projectId: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await projectServices.deleteProject(projectId);
      dispatch(getOwnProjects());
      dispatch(resetAreYouSureDialog());
      return response;
    } catch (error) {
      const err = error as AxiosError;
      /* if (err.status === 403) {
        dispatch(
          setAlertDialog({
            open: true,
            message: "Usuario o contraseña incorrectos",
            type: "error",
          }),
        );
      } */
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  },
);
