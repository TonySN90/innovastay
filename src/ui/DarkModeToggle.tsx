import { useState } from "react";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function handleClick() {
    setIsDarkMode((mode) => !mode);
  }

  return (
    <ButtonIcon onClick={handleClick}>
      {isDarkMode ? (
        <HiOutlineMoon className="w-6 h-6" />
      ) : (
        <HiOutlineSun className="w-6 h-6" />
      )}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
