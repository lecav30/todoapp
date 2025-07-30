import { createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "@services/auth.services";
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
      )) as { token: string };

      if (response?.token) {
        // store.dispatch(setToken(response.token));

        window.location.replace("/");
        return response.token;
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
