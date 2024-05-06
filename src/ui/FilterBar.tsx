import Select from "react-select";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  IFilterBaseTypes,
  IFilterButtonsTypes,
  IFilterContext,
  Option,
  SelectProps,
} from "../types/GlobalTypes";
import { useSearchParams } from "react-router-dom";

const FilterContext = createContext({} as object);

function FilterBar({
  filterBase,
  filterButtons,
  options,
}: {
  filterBase: IFilterBaseTypes;
  filterButtons?: IFilterButtonsTypes[];
  options?: Option[];
}) {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FilterContext.Provider
      value={{
        inputValue,
        setInputValue,
        isOpen,
        setIsOpen,
        filterBase,
        filterButtons,
        options,
      }}
    >
      <div className="flex md:justify-end items-center mb-4 flex-wrap">
        {filterBase.category !== "cabins" &&
          filterBase.category !== "dashboard" && <SearchInput />}
        {filterBase.category !== "guests" && <FilterButtons />}
        {filterBase.category !== "dashboard" && <SortInput />}
      </div>
    </FilterContext.Provider>
  );
}

export default FilterBar;

function SearchInput() {
  const { inputValue, setInputValue, isOpen, setIsOpen } = useContext(
    FilterContext
  ) as IFilterContext;

  const [searchParams, setSearchParams] = useSearchParams();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  function setParams(searchInput: string) {
    searchParams.delete("status");
    searchParams.delete("page");
    if (searchInput === "") searchParams.delete("search");
    else searchParams.set("search", searchInput);
    setSearchParams(searchParams.toString());
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInput = e.target.value.toLowerCase();
    setInputValue(searchInput);
    if (searchInput === "") setIsOpen(true);

    // Timeout
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => setParams(searchInput), 600);
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
      <span className="absolute top-[5px] left-[5px] z-10 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-6 w-6 text-text"
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

export function FilterButtons() {
  const { setInputValue, setIsOpen, filterBase, filterButtons } = useContext(
    FilterContext
  ) as IFilterContext;
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter =
    searchParams.get(filterBase.field) || filterBase.defaultFilter || "";

  function setParams(filterType: string) {
    searchParams.set(filterBase.field, filterType);
    searchParams.delete("search");
    searchParams.delete("page");
    setSearchParams(searchParams.toString());
  }

  function handleClick(filterType: string) {
    setInputValue("");
    setIsOpen(false);
    setParams(filterType);
  }

  return (
    <div className="flex ml-4 h-[2.2rem] overflow-hidden rounded-lg border-2 border-filterButtons_border">
      {filterButtons.map((button: { filterBy: string; filterType: string }) => (
        <FilterButton
          key={button.filterType}
          filterBy={button.filterBy}
          filterType={button.filterType}
          handleClick={handleClick}
          clickedFilter={currentFilter}
        />
      ))}
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
        filterType === clickedFilter && " bg-filterButton_active text-gray-50"
      }`}
    >
      {filterBy}
    </button>
  );
}

function SortInput() {
  const { options } = useContext(FilterContext) as IFilterContext;
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (selectedOption: Option | null) => {
    if (!selectedOption) return;
    searchParams.set("sort", selectedOption.value);
    searchParams.delete("page");
    setSearchParams(searchParams.toString());
  };

  const selectStyles: SelectProps = {
    primaryColor: "#6366f1",
    secondaryColor: "#e0e7ff32",
    control: (base) => ({
      ...base,
      fontSize: ".9rem",
      minWidth: "230px",
      borderRadius: ".5rem",
      border: `1px solid ${selectStyles.secondaryColor}`,
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
        // className="h-[2.2rem] rounded-full border-2 border-indigo-300 bg-transparent transition-all focus:outline-none"
        styles={selectStyles as object}
        onChange={handleChange}
        options={options}
        placeholder="Sortieren nach"
      />
    </div>
  );
}
