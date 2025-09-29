import { requests } from "@core/axiosAgent";

const login = (email: string, password: string) =>
  requests.post("/auth/login", { email, password });

const register = (email: string, password: string) =>
  requests.post("/auth/register", { email, password });

export default {
  login,
  register,
};
