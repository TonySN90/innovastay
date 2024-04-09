import { createContext, useContext, useEffect, useRef, useState } from "react";
import { BookingStatusTypes } from "../types/BookingTypes";
import Select from "react-select";
import { Option, SelectProps } from "../types/GlobalTypes";
import { useSearchParams } from "react-router-dom";
import useFilter from "../hooks/useFilter";
import useSort from "../hooks/useSort";

const FilterContext = createContext({} as object);

function FilterBar({ filterField }: { filterField: string }) {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FilterContext.Provider
      value={{ inputValue, setInputValue, isOpen, setIsOpen, filterField }}
    >
      <div className="flex md:justify-end items-center mb-4 flex-wrap">
        <SearchInput />
        <FilterButtons />
        <SortInput />
      </div>
    </FilterContext.Provider>
  );
}

export default FilterBar;

export interface IFilterContext {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filterField: string;
}

function SearchInput() {
  const { inputValue, setInputValue, isOpen, setIsOpen } = useContext(
    FilterContext
  ) as IFilterContext;

  const [searchParams, setSearchParams] = useSearchParams();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { filterGuests } = useFilter();

  function setParams(searchInput: string) {
    searchParams.delete("status");
    if (searchInput === "") searchParams.delete("search");
    else searchParams.set("search", searchInput);
    setSearchParams(searchParams.toString());
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInput = e.target.value.toLowerCase();
    setInputValue(searchInput);
    searchInput === "" && setIsOpen(true);

    setParams(searchInput);
    const sortParam = searchParams.get("sort");

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(
      () => filterGuests(searchInput, sortParam),
      600
    );
  };

  useEffect(() => {
    return () => {
      timerRef.current && clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="relative">
      <input
        onChange={(e) => handleChange(e)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => {
          inputValue === "" && setIsOpen(false);
        }}
        value={inputValue}
        type="text"
        className={`${
          isOpen ? "w-[180px]" : "w-[35px]"
        } h-[2.2rem] pl-8 rounded-full border-2 border-indigo-300 bg-transparent transition-all focus:outline-none`}
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
  const { filterField, setInputValue, setIsOpen } = useContext(
    FilterContext
  ) as IFilterContext;
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || "all";
  const { filterBookings } = useFilter();

  function setParams(filterType: string) {
    searchParams.set(filterField, filterType);
    searchParams.delete("search");
    setSearchParams(searchParams.toString());
  }

  function handleClick(filterType: string) {
    const sortParam = searchParams.get("sort");
    setInputValue("");
    setIsOpen(false);
    setParams(filterType);
    filterBookings(filterType, sortParam);
  }
  return (
    <div className="flex ml-4 h-[2.2rem] overflow-hidden rounded-lg border-2 border-indigo-100">
      <FilterButton
        handleClick={handleClick}
        clickedFilter={currentFilter}
        filterType="all"
        filterBy="Alle"
      />
      <FilterButton
        handleClick={handleClick}
        clickedFilter={currentFilter}
        filterType={BookingStatusTypes.CHECKEDIN}
        filterBy="Eingecheckt"
      />
      <FilterButton
        handleClick={handleClick}
        filterType={BookingStatusTypes.CHECKEDOUT}
        filterBy="Ausgecheckt"
        clickedFilter={currentFilter}
      />
      <FilterButton
        handleClick={handleClick}
        filterType={BookingStatusTypes.UNCONFIRMED}
        filterBy="Austehend"
        clickedFilter={currentFilter}
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
      className={`cursor-pointer text-sm px-2 transition-all hover:text-indigo-500 ${
        filterType === clickedFilter && " bg-indigo-300 text-gray-50"
      }`}
    >
      {filterBy}
    </button>
  );
}

function SortInput() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { sortBookings } = useFilter();

  const handleChange = (selectedOption: Option | null) => {
    if (!selectedOption) return;
    searchParams.set("sort", selectedOption.value);
    setSearchParams(searchParams.toString());

    const filterSearch = searchParams.get("search");
    const filterStatus = searchParams.get("status");
    const filterParam = filterSearch
      ? { field: "fullName", value: filterSearch, operator: "ilike" }
      : { field: "status", value: filterStatus, operator: "eq" };
    sortBookings(selectedOption.value, filterParam);
  };

  const options: Option[] = [
    { value: "startDate-desc", label: "Datum (Aufsteigend)" },
    { value: "startDate-asc", label: "Datum (Absteigend)" },
    { value: "totalPrice-desc", label: "Betrag (Aufsteigend)" },
    { value: "totalPrice-asc", label: "Betrag (Absteigend)" },
  ];

  const selectStyles: SelectProps = {
    primaryColor: "#6366f1",
    secondaryColor: "#E0E7FF",
    control: (base) => ({
      ...base,
      fontSize: ".9rem",
      minWidth: "230px",
      borderRadius: ".5rem",
      border: `2px solid ${selectStyles.secondaryColor}`,
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

  return (
    <div className="ml-4">
      <Select
        styles={selectStyles as object}
        onChange={handleChange}
        options={options}
        placeholder="Sortieren nach"
      />
    </div>
  );
}
