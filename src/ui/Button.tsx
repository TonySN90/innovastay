import { IButtonPropsTypes, ButtonTypes } from "../types/UiTypes";

function Button({
  onClick,
  type,
  size,
  content,
  extras = "",
}: IButtonPropsTypes) {
  const buttonStyles: ButtonTypes = {
    sm: "p-1",
    md: "px-3 h-10",
    lg: "px-3 h-12",
    xl: "px-3 h-14",
    basics: "border-2 shadow-lg hover:shadow-xl transition-all",
    standard:
      "text-gray-100 bg-indigo-600 border-indigo-600 hover:bg-indigo-700",
    inverted:
      "text-indigo-600 bg-gray-100 border-indigo-600 hover:bg-indigo-700 hover:text-gray-100",
  };

  return (
    <button
      onClick={onClick}
      className={`${buttonStyles.basics} ${buttonStyles[type]} ${buttonStyles[size]} ${extras}`}
    >
      {content}
    </button>
  );
}

export default Button;
