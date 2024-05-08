import { useDarkMode } from "../contexts/DarkModeContext";

function Logo() {
  const { isDarkMode } = useDarkMode() as {
    isDarkMode: boolean;
  };

  console.log(isDarkMode);

  return (
    <div className="m-auto w-[120px] mt-4 mb-5">
      <img src={isDarkMode ? "logo_dark.svg" : "logo_light.svg"} />
    </div>
  );
}

export default Logo;
