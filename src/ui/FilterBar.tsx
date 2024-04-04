import { useState } from "react";
import { BookingStatusTypes } from "../types/BookingTypes";
import Select from "react-select";
import { Option, SelectProps } from "../types/GlobalTypes";

function FilterBar() {
  return (
    <div className="flex md:justify-end items-center mb-4 flex-wrap">
      <SearchInput />
      <FilterButtons />
      <SortSelectInput />
    </div>
  );
}

export default FilterBar;

function SearchInput() {
  return (
    <div className="relative">
      <input
        type="text"
        className="w-[35px] h-[2.2rem] pl-8 rounded-full border-2 border-indigo-500 bg-transparent transition-all focus:outline-none focus:w-[180px] focus:rounded-lg"
      />
      <span className="absolute top-[5px] left-[5px] -z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-6 w-6 text-indigo-500"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="6" />
          <line x1="20" y1="20" x2="15" y2="15" />
        </svg>
      </span>
    </div>
  );
}

function FilterButtons() {
  const [clickedFilter, setClickedFilter] = useState("all");
  function handleClick(filterType: string) {
    setClickedFilter(filterType);
  }

  return (
    <div className="flex ml-4 h-[2.2rem] overflow-hidden rounded-lg border-2 border-indigo-500">
      <FilterButton
        handleClick={handleClick}
        clickedFilter={clickedFilter}
        filterType="all"
        filterBy="Alle"
      />
      <FilterButton
        handleClick={handleClick}
        clickedFilter={clickedFilter}
        filterType={BookingStatusTypes.CHECKEDIN}
        filterBy="Eingecheckt"
      />
      <FilterButton
        handleClick={handleClick}
        filterType={BookingStatusTypes.CHECKEDOUT}
        filterBy="Ausgecheckt"
        clickedFilter={clickedFilter}
      />
      <FilterButton
        handleClick={handleClick}
        filterType={BookingStatusTypes.UNCONFIRMED}
        filterBy="Austehend"
        clickedFilter={clickedFilter}
      />
    </div>
  );
}

function FilterButton({
  filterBy,
  filterType,
  handleClick,
  clickedFilter,
}: {
  filterBy: string;
  filterType: string;
  handleClick: (filterType: string) => void;
  clickedFilter: string;
}) {
  return (
    <button
      onClick={() => handleClick(filterType)}
      className={`cursor-pointer text-sm px-2  ${
        filterType === clickedFilter ? " bg-indigo-600 text-gray-50" : null
      }`}
    >
      {filterBy}
    </button>
  );
}

function SortSelectInput() {
  const [sortBy, setSortBy] = useState({
    value: "dateRecentFirst",
    label: "Datum (Aktuelle zuerst)",
  });

  const options: Option[] = [
    { value: "dateRecentFirst", label: "Datum (Älteste zuerst)" },
    { value: "dateEarlierFirst", label: "Datum (Frühere zuerst)" },
    { value: "AmountHighFirst", label: "Betrag (Aufsteigend)" },
    { value: "AmountLowFirst", label: "Betrag (Absteigend)" },
  ];

  const selectStyles: SelectProps = {
    primaryColor: "#6366f1",
    secondaryColor: "#a5b4fc",
    control: (base) => ({
      ...base,
      fontSize: ".9rem",
      minWidth: "230px",
      borderRadius: ".5rem",
      border: `2px solid ${selectStyles.primaryColor}`,
      borderColor: selectStyles.primaryColor,
      backgroundColor: "transparent",
      minHeight: "2.2rem",
      height: "2.2rem",
      "&:hover": {
        borderColor: selectStyles.primaryColor,
        color: "#333",
      },

      ":active": {
        color: selectStyles.primaryColor,
      },

      ":disabled": {
        backgroundColor: selectStyles.primaryColor,
      },
      ":focus": {
        focusBorderColor: selectStyles.primaryColor,
      },
    }),
    option: (styles, state) => ({
      ...styles,
      minHeight: "2.2rem",
      height: "2.2rem",
      backgroundColor: state.isSelected ? selectStyles.primaryColor : undefined,
      "&:hover": {
        backgroundColor: selectStyles.secondaryColor,
        color: "#fff",
      },
    }),
  };

  const handleChange = (selectedOption: Option | null) => {
    if (selectedOption) setSortBy(selectedOption as Option);
  };

  return (
    <div className="ml-4">
      <Select
        styles={selectStyles as object}
        value={sortBy}
        onChange={handleChange}
        options={options}
      />
    </div>
  );
}
