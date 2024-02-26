function Button({ onClick, type, content }) {
  const buttonTypes = {
    basics:
      "text-gray-100 bg-indigo-600 rounded-lg shadow-lg hover:shadow-xl transition-all hover:bg-indigo-700",
    medium: "",
    big: "w-36 h-14",
  };

  return (
    <button className={`${buttonTypes.basics} ${buttonTypes[type]}`}>
      {content}
    </button>
  );
}

export default Button;
