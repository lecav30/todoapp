import SidebarOnIcon from "@assets/svg_components/SidebarOn";
import SidebarOffIcon from "@assets/svg_components/SidebarOff";
import AccountIcon from "@assets/svg_components/Account";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "@feature/sidebar/sidebar.slice";
import { IRootState } from "@core/store";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useAuth } from "@context/AuthContext";

const Navbar = () => {
  const dispatch = useDispatch();
  const { handleLogout } = useAuth();

  const activeSidebar = useSelector(
    (state: IRootState) => state.sidebar.activeSidebar,
  );

  const handleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <nav className="flex justify-between py-5 px-10">
      <button className="cursor-pointer" onClick={handleSidebar}>
        {activeSidebar ? (
          <SidebarOnIcon width="20" height="20" fill="#f1f1f1" />
        ) : (
          <SidebarOffIcon width="20" height="20" fill="#f1f1f1" />
        )}
      </button>
      <Menu>
        <MenuButton>
          <AccountIcon width="20" height="20" fill="#f1f1f1" />
        </MenuButton>
        <MenuItems
          transition
          anchor="bottom end"
          className="w-36 border bg-primary rounded-md shadow-xl 
          p-2 text-sm/6 text-white transition duration-100 ease-out origin-top-right
          [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95
          data-closed:opacity-0"
        >
          <MenuItem>
            <button className="cursor-pointer w-full" onClick={handleLogout}>
              Logout
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </nav>
  );
};

export default Navbar;
