import { ButtonTypes, IButtonPropsTypes } from "../types/GlobalTypes";

function Button({
  type,
  onClick,
  variation,
  size,
  content,
  extras = "",
  disabled,
}: IButtonPropsTypes) {
  const buttonStyles: ButtonTypes = {
    sm: "p-1",
    md: "px-3 h-10",
    lg: "px-3 h-12",
    xl: "px-3 h-14",
    basics: "border-2hover:shadow-xl transition-all text-sm font-semibold",
    standard:
      "shadow-lg text-gray-100 bg-indigo-600 border-indigo-600 hover:bg-indigo-700",
    inverted:
      "shadow-lg text-indigo-600 bg-gray-100 border-indigo-600 hover:bg-indigo-700 hover:text-gray-100 border",
    delete:
      "shadow-lg text-gray-100 bg-red-500 border-red-500 hover:bg-red-400 hover:border-red-600 ",
    disabled: "opacity-40 cursor-not-allowed",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${buttonStyles.basics} ${
        buttonStyles[variation ? variation : ""]
      } ${buttonStyles[size]} ${extras} ${disabled && buttonStyles.disabled}`}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

export default Button;
