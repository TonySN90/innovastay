import { useState } from "react";

function FilterBar() {
  return (
    <div className="flex justify-end items-center h-[2.2rem] mb-4">
      <SearchInput />
      <SortButtons />
    </div>
  );
}

export default FilterBar;

function SearchInput() {
  return (
    <div className="relative">
      <input
        type="text"
        className="w-[35px] h-[2.2rem] pl-8 rounded-full border-2 border-indigo-500 bg-transparent transition-all focus:outline-none focus:w-[250px]"
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

function SortButtons() {
  const [clickedFilter, setClickedFilter] = useState("");
  function handleClick(filterType: string) {
    setClickedFilter(filterType);
  }

  return (
    <div className="flex gap-4 ml-4 py-1 px-4 overflow-hidden rounded-full border-2 border-indigo-500 bg-indigo-500">
      <SortButton
        handleClick={handleClick}
        clickedFilter={clickedFilter}
        filterType="date"
        sortBy="Datum"
      />
      <SortButton
        handleClick={handleClick}
        filterType="status"
        sortBy="Status"
        clickedFilter={clickedFilter}
      />
      <SortButton
        handleClick={handleClick}
        filterType="guests"
        sortBy="Gast"
        clickedFilter={clickedFilter}
      />
    </div>
  );
}

function SortButton({
  sortBy,
  filterType,
  handleClick,
  clickedFilter,
}: {
  sortBy: string;
  filterType: string;
  handleClick: (filterType: string) => void;
  clickedFilter: string;
}) {
  return (
    <button
      onClick={() => handleClick(filterType)}
      className={`cursor-pointer w-[3rem] text-gray-50 ${
        filterType === clickedFilter ? " underline underline-offset-4" : null
      }`}
    >
      {sortBy}
    </button>
  );
}
