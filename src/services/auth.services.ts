import { requests } from "@core/axiosAgent";

const login = (email: string, password: string) =>
  requests.post("/auth/login", { email, password });

export default {
  login,
};
