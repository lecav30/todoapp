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
import { login } from "@feature/auth/auth.thunk";

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
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getLocalToken();
    console.log(token);
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    removeLocalToken();
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleLogin = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    dispatch(login({ email, password })).then((e) => {
      if (e.meta.requestStatus === "fulfilled") {
        console.log("redirect success");
        setIsAuthenticated(true);
        navigate("/");
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, handleLogin, handleLogout }}
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
