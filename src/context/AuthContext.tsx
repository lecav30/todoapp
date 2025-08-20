import { useAppDispatch } from "@core/store";
import { getLocalToken, removeLocalToken } from "@utils/storageUtil";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@feature/auth/auth.thunk";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getLocalToken();
    setIsAuthenticated(!!token);
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    removeLocalToken();
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const resultAction = await dispatch(login({ email, password }));

    if (login.fulfilled.match(resultAction)) {
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
