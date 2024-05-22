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
import { SlClose } from "react-icons/sl";

const listElStyles = "transition-all rounded-lg group hover:bg-hover_sidebar";

const iconStyles = "w-6 h-6 group-hover:text-active transition-colors";

function MobileNav({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <section
      className={`sm:hidden fixed bottom-50 left-0 right-0 h-screen bg-background_secondary z-30 text-lg opacity-0 ${
        isOpen ? "mobile-nav-open" : "mobile-nav"
      }`}
    >
      <ul className="flex flex-col justify-center gap-14 items-center h-full p-2">
        <div onClick={() => setIsOpen(false)} className="flex flex-col gap-6">
          <li className={listElStyles}>
            <NavLink className="flex gap-2" to="/dashboard">
              <RxDashboard className={iconStyles} />
              <p>Dashboard</p>
            </NavLink>
          </li>
          <li className={`${listElStyles}`}>
            <NavLink className="flex gap-2" to="/bookings">
              <HiOutlineCalendarDays className={iconStyles} />
              <p>Buchungen</p>
            </NavLink>
          </li>
          <li className={listElStyles}>
            <NavLink className="flex gap-2" to="/cabins">
              <HiOutlineHomeModern className={iconStyles} />
              <p>Zimmer</p>
            </NavLink>
          </li>
          <li className={listElStyles}>
            <NavLink className="flex gap-2" to="/guests">
              <BsPeople className={iconStyles} />
              <p>Gäste</p>
            </NavLink>
          </li>
          <li className={listElStyles}>
            <NavLink className="flex gap-2" to="/settings">
              <HiOutlineCog6Tooth className={iconStyles} />
              <p>Einstellungen</p>
            </NavLink>
          </li>

          <li className={listElStyles}>
            <NavLink className="flex gap-2" to="/users">
              <HiOutlineUsers className={iconStyles} />
              <p>Nutzerverwaltung</p>
            </NavLink>
          </li>
        </div>

        <div className="flex gap-6 text">
          <li onClick={() => setIsOpen(false)}>
            <Link to="/account">
              <ButtonIcon>
                <HiOutlineUser className="w-6 h-6 hover:text-active transition-colors" />
              </ButtonIcon>
            </Link>
          </li>

          <li className={listElStyles}>
            <DarkModeToggle />
          </li>
          <li className={listElStyles} onClick={() => setIsOpen(false)}>
            <Logout />
          </li>
        </div>
        <div>
          <SlClose className="w-12 h-12" onClick={() => setIsOpen(false)} />
        </div>
      </ul>
    </section>
  );
}

export default MobileNav;
