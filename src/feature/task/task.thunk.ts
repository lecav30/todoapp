import { ITaskRequest } from "@models/Task";
import { createAsyncThunk } from "@reduxjs/toolkit";
import taskServices from "@services/task.services";
import { AxiosError } from "axios";

export const createTask = createAsyncThunk(
  "createTask",
  async (payload: ITaskRequest, { rejectWithValue, dispatch }) => {
    try {
      const newPayload = {
        ...payload,
        deadline: payload.deadline
          ? new Date(payload.deadline).toISOString()
          : undefined,
      };
      const response = await taskServices.createTask(newPayload);
      dispatch(getTasksByGroupId(payload.groupId));
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

export const getTasksByGroupId = createAsyncThunk(
  "getTasksByGroupId",
  async (groupId: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await taskServices.getTasksByGroupId(groupId);
      return {
        groupId,
        tasks: response,
      };
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

export const getTaskById = createAsyncThunk(
  "getTaskById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await taskServices.getTaskById(id);
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
