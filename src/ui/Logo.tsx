import { useDarkMode } from "../contexts/DarkModeContext";

function Logo() {
  const { isDarkMode } = useDarkMode() as {
    isDarkMode: boolean;
  };

  console.log(isDarkMode);

  return (
    <img src={isDarkMode ? "logo_dark.svg" : "logo_light.svg"} />
    // <div className="m-auto mt-4 mb-5">
    // </div>
  );
}

export default Logo;
