import MainView from "@views/MainView";
import Navbar from "@components/Navbar";
import "./App.css";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";

function App() {
  const activeSidebar = useSelector(
    (state: RootState) => state.sidebar.activeSidebar,
  );

  return (
    <div className={`${activeSidebar && "ml-80"} h-screen`}>
      <Navbar />
      <MainView />
    </div>
  );
}

export default App;
