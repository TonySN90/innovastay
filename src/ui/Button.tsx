function Button({ onClick, type, size, content, extras = "" }) {
  const buttonTypes = {
    basics: "border-2 rounded-lg shadow-lg hover:shadow-xl transition-all",
    md: "px-3 h-10",
    lg: "px-3 h-12",
    standard:
      "text-gray-100 bg-indigo-600 border-indigo-600 hover:bg-indigo-700",
    inverted:
      "text-indigo-600 bg-gray-100 border-indigo-600 hover:bg-indigo-700 hover:text-gray-100",
  };

  return (
    <button
      onClick={onClick}
      className={`${buttonTypes.basics} ${buttonTypes[type]} ${buttonTypes[size]} ${extras}`}
    >
      {content}
    </button>
  );
}

export default Button;
