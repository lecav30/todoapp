import { createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "@services/auth.services";
import { saveLocalToken } from "@utils/storageUtil";
import { AxiosError } from "axios";

export const login = createAsyncThunk(
  "login",
  async (
    payload: {
      email: string;
      password: string;
    },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = (await authServices.login(
        payload.email,
        payload.password,
      )) as { message: string; token: string };

      if (response?.token) {
        saveLocalToken(response?.token);
        return response?.token;
      }
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
