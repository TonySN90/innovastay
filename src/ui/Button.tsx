import { ButtonTypes, IButtonPropsTypes } from "../types/GlobalTypes";

function Button({
  type,
  onClick,
  variation,
  size,
  content,
  extras = "",
}: IButtonPropsTypes) {
  const buttonStyles: ButtonTypes = {
    sm: "p-1",
    md: "px-3 h-10",
    lg: "px-3 h-12",
    xl: "px-3 h-14",
    basics:
      "border-2 shadow-lg hover:shadow-xl transition-all text-sm font-semibold",
    standard:
      "text-gray-100 bg-indigo-600 border-indigo-600 hover:bg-indigo-700",
    inverted:
      "text-indigo-600 bg-gray-100 border-indigo-600 hover:bg-indigo-700 hover:text-gray-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${buttonStyles.basics} ${buttonStyles[variation]} ${buttonStyles[size]} ${extras}`}
    >
      {content}
    </button>
  );
}

export default Button;
