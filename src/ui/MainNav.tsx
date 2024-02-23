import { NavLink } from "react-router-dom";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

function MainNav() {
  return (
    <nav className="m-auto w-[80%]">
      <ul className=" p-5">
        <li className="mb-7">
          <NavLink className={"flex"} to="/dashboard">
            <HiOutlineHome className="w-6 h-6 mr-2 text-gray-500" />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li className="mb-7">
          <NavLink className={"flex"} to="/bookings">
            <HiOutlineCalendarDays className="w-6 h-6 mr-2 text-gray-500" />
            <span>Buchungen</span>
          </NavLink>
        </li>
        <li className="mb-7">
          <NavLink className={"flex"} to="/cabins">
            <HiOutlineHomeModern className="w-6 h-6 mr-2 text-gray-500" />
            <span>Zimmer</span>
          </NavLink>
        </li>
        <li className="mb-7">
          <NavLink className={"flex"} to="/users">
            <HiOutlineUsers className="w-6 h-6 mr-2 text-gray-500" />
            <span>Mitarbeiter</span>
          </NavLink>
        </li>
        <li>
          <NavLink className={"flex"} to="/settings">
            <HiOutlineCog6Tooth className="w-6 h-6 mr-2 text-gray-500" />
            <span>Einstellungen</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
