import { HiOutlineUser } from "react-icons/hi2";
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import HeaderAvatar from "./HeaderAvatar";
import ButtonIcon from "./ButtonIcon";
import Logout from "../features/authentication/Logout";

function Header() {
  return (
    <header className="hidden sm:flex items-center bg-background_secondary h-[50px]">
      <ul className="flex justify-end items-center w-full gap-4 pr-10">
        <li className="hidden sm:block">
          <HeaderAvatar />
        </li>
        <li>
          <Link to="/account">
            <ButtonIcon>
              <HiOutlineUser className="w-6 h-6 hover:text-active transition-colors" />
            </ButtonIcon>
          </Link>
        </li>
        <li>
          <DarkModeToggle />
        </li>
        <li>
          <Logout />
        </li>
      </ul>
    </header>
  );
}

export default Header;
