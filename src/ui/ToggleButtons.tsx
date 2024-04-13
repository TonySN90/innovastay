import { MdOutlineCalendarMonth } from "react-icons/md";
import { BookingsViewType } from "../types/BookingTypes";
import { IToggleButtonsTypes } from "../types/GlobalTypes";
import { CiViewTable } from "react-icons/ci";
import { useSearchParams } from "react-router-dom";

function ToggleButtons({ onClick, bookingsView }: IToggleButtonsTypes) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick(type: BookingsViewType) {
    if (type === BookingsViewType.schedule) {
      searchParams.delete("search");
      searchParams.delete("status");
      searchParams.delete("sort");
      searchParams.set("schedular", "all");
      setSearchParams(searchParams.toString());
    }

    if (type === BookingsViewType.table) {
      searchParams.delete("schedular");
      setSearchParams(searchParams.toString());
    }
    onClick(type);
  }

  const activeClasses = "bg-indigo-600 text-stone-50";
  const buttonClass =
    "flex items-center justify-center px-4 border-2 border-indigo-600 h-7 text-lg cursor-pointer";

  return (
    <div className="flex">
      <div
        data-type="schedule"
        onClick={() => handleClick(BookingsViewType.schedule)}
        className={`rounded-l-md ${buttonClass} ${
          bookingsView === BookingsViewType.schedule ? activeClasses : ""
        }`}
      >
        <MdOutlineCalendarMonth />
      </div>
      <div
        data-type="table"
        onClick={() => handleClick(BookingsViewType.table)}
        className={`rounded-r-md ${buttonClass} ${
          bookingsView === BookingsViewType.table ? activeClasses : ""
        }`}
      >
        <CiViewTable />
      </div>
    </div>
  );
}

export default ToggleButtons;
