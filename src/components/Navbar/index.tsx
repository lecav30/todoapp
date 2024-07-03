import SidebarOnIcon from "@assets/svg_components/SidebarOn";
import SidebarOffIcon from "@assets/svg_components/SidebarOff";
import AccountIcon from "@assets/svg_components/Account";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@redux/store";
import { toggleSidebar } from "@feature/sidebar/sidebarSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const activeSidebar = useSelector(
    (state: RootState) => state.sidebar.activeSidebar,
  );

  const handleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <nav className="flex justify-between py-5 px-10">
      <button onClick={handleSidebar}>
        {activeSidebar ? (
          <SidebarOnIcon width="20" height="20" fill="#f1f1f1" />
        ) : (
          <SidebarOffIcon width="20" height="20" fill="#f1f1f1" />
        )}
      </button>
      <button>
        <AccountIcon width="20" height="20" fill="#f1f1f1" />
      </button>
    </nav>
  );
};

export default Navbar;
