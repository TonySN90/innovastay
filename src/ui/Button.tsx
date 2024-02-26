function Button({ onClick, type }) {
  const buttonTypes = {
    basics:
      "text-gray-100 bg-indigo-600 rounded-lg shadow-lg hover:shadow-2xl transition-all hover:bg-indigo-700",
    medium: "",
    big: "w-36 h-14",
  };

  return (
    <button className={`${buttonTypes.basics} ${buttonTypes[type]}`}>
      Zimmer hinzufügen
    </button>
  );
}

export default Button;
