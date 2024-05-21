import { BsPeople } from "react-icons/bs";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHomeModern,
  HiOutlineUser,
  HiOutlineUsers,
} from "react-icons/hi2";
import { RxDashboard } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";

const listElStyles =
  "flex transition-all rounded-lg group hover:bg-hover_sidebar";

const iconStyles = "w-6 h-6 group-hover:text-active transition-colors";

function MobileNav() {
  return (
    <nav className="sm:hidden bottom-0 sm:px-4 h-[50px] bg-background_secondary">
      <ul className="flex justify-between items-center h-full p-2">
        <div className="flex gap-3">
          <li className={listElStyles}>
            <NavLink to="/dashboard">
              <RxDashboard className={iconStyles} />
            </NavLink>
          </li>
          <li className={`${listElStyles}`}>
            <NavLink to="/bookings">
              <HiOutlineCalendarDays className={iconStyles} />
            </NavLink>
          </li>
          <li className={listElStyles}>
            <NavLink to="/cabins">
              <HiOutlineHomeModern className={iconStyles} />
            </NavLink>
          </li>
          <li className={listElStyles}>
            <NavLink to="/guests">
              <BsPeople className={iconStyles} />
            </NavLink>
          </li>
          <li className={listElStyles}>
            <NavLink to="/settings">
              <HiOutlineCog6Tooth className={iconStyles} />
            </NavLink>
          </li>

          <li className={listElStyles}>
            <NavLink to="/users">
              <HiOutlineUsers className={iconStyles} />
            </NavLink>
          </li>
        </div>

        <div className="flex gap-4">
          <li>
            <Link className="flex" to="/account">
              <ButtonIcon>
                <HiOutlineUser className="w-6 h-6 hover:text-active transition-colors" />
              </ButtonIcon>
            </Link>
          </li>

          <li className={listElStyles}>
            <DarkModeToggle />
          </li>
          <li className={listElStyles}>
            <Logout />
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default MobileNav;
