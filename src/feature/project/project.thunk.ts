import { createAsyncThunk } from "@reduxjs/toolkit";
import projectServices from "@services/project.services";
import { AxiosError } from "axios";

export const createProject = createAsyncThunk(
  "createProject",
  async (payload: any, { rejectWithValue, dispatch }) => {
    try {
      const response = await projectServices.createProject(payload);
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

export const getOwnProjects = createAsyncThunk(
  "getOwnProjects",
  async (_, { rejectWithValue, dispatch }) => {
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
