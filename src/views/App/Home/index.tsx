import Navbar from "@components/Navbar";
import Sidebar from "@components/Sidebar";
import { ToastContainer } from "react-toastify";
import { IRootState, useAppSelector } from "@core/store";
import MainView from "./components/MainView";

const Home = () => {
  const activeSidebar = useAppSelector(
    (state: IRootState) => state.sidebar.activeSidebar,
  );

  return (
    <div>
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
    </div>
  );
};

export default Home;
