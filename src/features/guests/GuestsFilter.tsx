import FilterBar from "../../ui/FilterBar";
import useGuests from "./useGuests";

function GuestsFilter() {
  const { guests } = useGuests();

  if (!guests.length) return null;

  const options = [
    { value: "fullName-asc", label: "Name (Alphabetisch)" },
    { value: "city-asc", label: "Stadt (Alphabetisch)" },
    { value: "created_at-asc", label: "Gast seit (Absteigend)" },
    { value: "created_at-desc", label: "Gast seit (Aufsteigend)" },
  ];

  const filterBase = {
    category: "guests",
    field: "fullName",
    defaultSortField: "fullName",
  };

  return <FilterBar filterBase={filterBase} options={options} />;
}

export default GuestsFilter;
