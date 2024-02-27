function ToggleButtons({ buttonLeft, buttonRight, onClick, bookingsView }) {
  function handleClick(type) {
    onClick(type);
  }

  const activeClasses = "bg-indigo-600 text-stone-50";
  const buttonClass = "px-4 py-1 w-[100px]";

  return (
    <div className="border-2 mb-4 border-indigo-600 w-[204px] rounded-md">
      <button
        data-type="schedule"
        onClick={() => handleClick("schedule")}
        className={`${buttonClass} ${
          bookingsView === "schedule" ? activeClasses : ""
        }`}
      >
        {buttonLeft}
      </button>
      <button
        data-type="table"
        onClick={() => handleClick("table")}
        className={`${buttonClass} ${
          bookingsView === "table" ? activeClasses : ""
        }`}
      >
        {buttonRight}
      </button>
    </div>
  );
}

export default ToggleButtons;
