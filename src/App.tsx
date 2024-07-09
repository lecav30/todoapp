import Navbar from "@components/Navbar";
import Sidebar from "@components/Sidebar";
import { RootState } from "@redux/store";
import MainView from "@views/MainView";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "./App.css";

function App() {
  const activeSidebar = useSelector(
    (state: RootState) => state.sidebar.activeSidebar,
  );

  return (
    <>
      <div className="h-screen">
        <Sidebar />
        <div
          className={`${activeSidebar && "sm:ml-80 hidden sm:block"} h-full`}
        >
          <Navbar />
          <MainView />
        </div>
      </div>

      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
