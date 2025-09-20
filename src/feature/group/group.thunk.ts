import { resetAreYouSureDialog } from "@feature/common/common.thunk";
import { IGroupRequest, IGroupUpdateRequest } from "@models/Group";
import { createAsyncThunk } from "@reduxjs/toolkit";
import groupServices from "@services/group.services";
import { AxiosError } from "axios";

export const createGroup = createAsyncThunk(
  "createGroup",
  async (payload: IGroupRequest, { rejectWithValue, dispatch }) => {
    try {
      const response = await groupServices.createGroup(payload);
      dispatch(getGroupsByProjectId(payload.projectId));
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
  async (projectId: number, { rejectWithValue }) => {
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

export const updateGroupById = createAsyncThunk(
  "updateGroupById",
  async (
    payload: {
      projectId: number;
      groupUpdateRequest: IGroupUpdateRequest;
    },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await groupServices.updateGroupById(payload.groupUpdateRequest);
      dispatch(getGroupsByProjectId(payload.projectId));
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

export const deleteGroup = createAsyncThunk(
  "deleteGroup",
  async (
    payload: {
      groupId: number;
      projectId: number;
    },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await groupServices.deleteGroup(payload.groupId);
      dispatch(getGroupsByProjectId(payload.projectId));
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
