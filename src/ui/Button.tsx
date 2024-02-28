function Button({ onClick, type, content, status = "" }) {
  const buttonTypes = {
    basics:
      "text-gray-100 border-2 bg-indigo-600 border-indigo-600 rounded-lg shadow-lg hover:shadow-xl transition-all hover:bg-indigo-700",
    medium: "w-24 h-10",
    big: "w-36 h-14",
  };

  return (
    <button
      onClick={onClick}
      className={`${buttonTypes.basics} ${buttonTypes[type]}`}
    >
      {content}
    </button>
  );
}

export default Button;
