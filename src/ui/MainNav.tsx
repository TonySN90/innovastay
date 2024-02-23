import { NavLink } from "react-router-dom";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

const listElStyles =
  "mb-3 hover:text-indigo-500 transition-colors hover:bg-stone-100";

function MainNav() {
  return (
    <nav className="m-auto">
      <ul className=" p-5">
        <li className={listElStyles}>
          <NavLink className={"flex px-5 py-3"} to="/dashboard">
            <HiOutlineHome className="w-6 h-6 mr-2" />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li className={listElStyles}>
          <NavLink className={"flex px-5 py-3"} to="/bookings">
            <HiOutlineCalendarDays className="w-6 h-6 mr-2" />
            <span>Buchungen</span>
          </NavLink>
        </li>
        <li className={listElStyles}>
          <NavLink className={"flex px-5 py-3"} to="/cabins">
            <HiOutlineHomeModern className="w-6 h-6 mr-2" />
            <span>Zimmer</span>
          </NavLink>
        </li>
        <li className={listElStyles}>
          <NavLink className={"flex px-5 py-3"} to="/users">
            <HiOutlineUsers className="w-6 h-6 mr-2" />
            <span>Mitarbeiter</span>
          </NavLink>
        </li>
        <li className={listElStyles}>
          <NavLink className={"flex px-5 py-3"} to="/settings">
            <HiOutlineCog6Tooth className="w-6 h-6 mr-2" />
            <span>Einstellungen</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
