import { useEffect, useState } from "react";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

function DarkModeToggle() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme || "light";
  });

  useEffect(() => {
    document.body.className = "";
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  function handleClick() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }

  return (
    <ButtonIcon onClick={handleClick}>
      {theme === "light" ? (
        <HiOutlineMoon className="w-6 h-6" />
      ) : (
        <HiOutlineSun className="w-6 h-6" />
      )}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
