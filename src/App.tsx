import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "@views/App/Home";
import Login from "@views/Auth/Login";
import ProtectedLayout from "./layouts/ProtectedLayout";
import { AuthProvider } from "@context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
