import { createAsyncThunk } from "@reduxjs/toolkit";
import groupServices from "@services/group.services";
import { AxiosError } from "axios";

export const createGroup = createAsyncThunk(
  "createGroup",
  async (payload: any, { rejectWithValue, dispatch }) => {
    try {
      const response = await groupServices.createGroup(payload);
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

export const getGroupsByProjectId = createAsyncThunk(
  "getGroupsByProjectId",
  async (projectId: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await groupServices.getGroupsByProjectId(projectId);
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

export const getGroupById = createAsyncThunk(
  "getGroupById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await groupServices.getGroupById(id);
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
