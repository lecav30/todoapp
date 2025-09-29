import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "@views/App/Home";
import Login from "@views/Auth/Login";
import Register from "@views/Auth/Register";
import ProtectedLayout from "./layouts/ProtectedLayout";
import PublicLayout from "./layouts/PublicLayout";
import { AuthProvider } from "@context/AuthContext";
import { ModalProvider } from "@context/ModalContext";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <Routes>
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<PublicLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
