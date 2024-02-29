import { BookingsViewType, IToggleButtonsTypes } from "../types/BookingTypes";

function ToggleButtons({
  buttonLeft,
  buttonRight,
  onClick,
  bookingsView,
}: IToggleButtonsTypes) {
  function handleClick(type: BookingsViewType) {
    onClick(type);
  }

  const activeClasses = "bg-indigo-600 text-stone-50";
  const buttonClass = "px-4 py-1 w-[100px] border-2 border-indigo-600";

  return (
    <div className="mb-4">
      <button
        data-type="schedule"
        onClick={() => handleClick(BookingsViewType.schedule)}
        className={`rounded-l-md ${buttonClass} ${
          bookingsView === BookingsViewType.schedule ? activeClasses : ""
        }`}
      >
        {buttonLeft}
      </button>
      <button
        data-type="table"
        onClick={() => handleClick(BookingsViewType.table)}
        className={`rounded-r-md ${buttonClass} ${
          bookingsView === BookingsViewType.table ? activeClasses : ""
        }`}
      >
        {buttonRight}
      </button>
    </div>
  );
}

export default ToggleButtons;
