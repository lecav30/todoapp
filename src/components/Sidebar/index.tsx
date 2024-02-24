import { RootState } from "@redux/store";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const activeSidebar = useSelector(
    (state: RootState) => state.sidebar.activeSidebar,
  );

  return (
    <aside
      className={`${activeSidebar ? "opacity-100" : "opacity-0"}
      absolute top-0 left-0 w-80`}
    >
      <h1>Sidebar</h1>
    </aside>
  );
};

export default Sidebar;
