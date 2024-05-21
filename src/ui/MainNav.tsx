import { NavLink } from "react-router-dom";
import {
  HiMiniListBullet,
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import { RxDashboard } from "react-icons/rx";
import { BsPeople } from "react-icons/bs";

const listElStyles =
  "mb-3 pl-2 transition-all rounded-lg group hover:bg-hover_sidebar";

const iconStyles = "w-6 h-6 mr-2 group-hover:text-active transition-colors";

function MainNav() {
  const hidden = "hidden xl:block";

  return (
    <nav className="m-auto">
      <ul className="px-2 md:px-7">
        <li className={listElStyles}>
          <NavLink className="flex py-3" to="/dashboard">
            <RxDashboard className={iconStyles} />
            <span className={hidden}>Dashboard</span>
          </NavLink>
        </li>
        <hr className="mb-3 border-border" />
        <li className={listElStyles}>
          <NavLink className="flex py-3" to="/schedular">
            <HiOutlineCalendarDays className={iconStyles} />
            <span className={hidden}>Buchungskalender</span>
          </NavLink>
        </li>
        <li className={`${listElStyles}`}>
          <NavLink className="flex py-3" to="/bookings">
            <HiMiniListBullet className={iconStyles} />
            <span className={hidden}>Buchungen</span>
          </NavLink>
        </li>
        <li className={listElStyles}>
          <NavLink className="flex py-3" to="/cabins">
            <HiOutlineHomeModern className={iconStyles} />
            <span className={hidden}>Zimmer</span>
          </NavLink>
        </li>
        <li className={listElStyles}>
          <NavLink className="flex py-3" to="/guests">
            <BsPeople className={iconStyles} />
            <span className={hidden}>Gäste</span>
          </NavLink>
        </li>
        <li className={listElStyles}>
          <NavLink className="flex py-3" to="/settings">
            <HiOutlineCog6Tooth className={iconStyles} />
            <span className={hidden}>Einstellungen</span>
          </NavLink>
        </li>
        <hr className="mb-3 border-border" />

        <li className={listElStyles}>
          <NavLink className="flex py-3" to="/users">
            <HiOutlineUsers className={iconStyles} />
            <span className={hidden}>Nutzerverwaltung</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
