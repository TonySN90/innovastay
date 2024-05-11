import { useDarkMode } from "../contexts/DarkModeContext";

function Logo() {
  const { isDarkMode } = useDarkMode() as {
    isDarkMode: boolean;
  };

  return <img src={isDarkMode ? "logo_dark.svg" : "logo_light.svg"} />;
}

export default Logo;
