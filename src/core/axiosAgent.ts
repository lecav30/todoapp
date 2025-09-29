import { logoutFromAnywhere } from "@context/AuthContext";
import { getLocalToken } from "@utils/storageUtil";
import axios, { AxiosResponse } from "axios";

axios.interceptors.request.use((config) => {
  const token = getLocalToken();

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      const token = getLocalToken();
      switch (status) {
        case 401:
          console.warn("No autorizado.");
          if (token) logoutFromAnywhere();
          break;
        case 403:
          console.error("Acceso denegado.");
          if (token) logoutFromAnywhere();
          break;
        case 404:
          // console.error("No encontrado.");
          break;
        default:
          console.error("Error inesperado:", error.response.data);
      }
    }
    return Promise.reject(error);
  },
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.defaults.baseURL = import.meta.env.VITE_PUBLIC_API_URL || "";

const requests = {
  get: <T>(url: string) =>
    axios.get<T>(url, { withCredentials: true }).then(responseBody),
  getBlob: <T>(url: string) =>
    axios
      .get<T>(url, { withCredentials: true, responseType: "blob" })
      .then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body, { withCredentials: true }).then(responseBody),
  postWithoutBody: <T>(url: string) =>
    axios.post<T>(url, { withCredentials: true }).then(responseBody),
  put: <T>(url: string, body: {}) =>
    axios.put<T>(url, body, { withCredentials: true }).then(responseBody),
  patch: <T>(url: string, body: {}) =>
    axios.patch<T>(url, body, { withCredentials: true }).then(responseBody),
  patchWithoutBody: <T>(url: string) =>
    axios.patch<T>(url, { withCredentials: true }).then(responseBody),
  delete: <T>(url: string) =>
    axios.delete<T>(url, { withCredentials: true }).then(responseBody),
};

export { requests };
