import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "@views/App/Home";
import Login from "@views/Auth/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
