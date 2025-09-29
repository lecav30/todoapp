import { useAppDispatch } from "@core/store";
import { getLocalToken, removeLocalToken } from "@utils/storageUtil";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "@feature/auth/auth.thunk";
import { getOwnProjects } from "@feature/project/project.thunk";

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  handleLogin: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => void;
  handleRegister: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => void;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

let globalLogout: (() => void) | null = null;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getLocalToken();
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getOwnProjects());
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    console.log("logout");
    removeLocalToken();
    setIsAuthenticated(false);
    navigate("/login");
  };

  globalLogout = handleLogout;

  const handleLogin = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    dispatch(login({ email, password })).then((e) => {
      if (e.meta.requestStatus === "fulfilled") {
        setIsAuthenticated(true);
        navigate("/");
      }
    });
  };

  const handleRegister = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    dispatch(register({ email, password })).then((e) => {
      if (e.meta.requestStatus === "fulfilled") {
        handleLogin({ email, password });
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        handleLogin,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const logoutFromAnywhere = () => {
  if (globalLogout) globalLogout();
};
