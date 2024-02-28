function ToggleButtons({ buttonLeft, buttonRight, onClick, bookingsView }) {
  function handleClick(type) {
    onClick(type);
  }

  const activeClasses = "bg-indigo-600 text-stone-50";
  const buttonClass = "px-4 py-1 w-[100px] border-2 border-indigo-600";

  return (
    <div className="mb-4">
      <button
        data-type="schedule"
        onClick={() => handleClick("schedule")}
        className={`rounded-l-md ${buttonClass} ${
          bookingsView === "schedule" ? activeClasses : ""
        }`}
      >
        {buttonLeft}
      </button>
      <button
        data-type="table"
        onClick={() => handleClick("table")}
        className={`rounded-r-md ${buttonClass} ${
          bookingsView === "table" ? activeClasses : ""
        }`}
      >
        {buttonRight}
      </button>
    </div>
  );
}

export default ToggleButtons;
