import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useDarkMode } from "../contexts/DarkModeContext";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode() as {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
  };

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode === false ? (
        <HiOutlineMoon className="w-6 h-6 hover:text-active transition-colors" />
      ) : (
        <HiOutlineSun className="w-6 h-6 hover:text-active transition-colors" />
      )}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
