import FilterBar from "../../ui/FilterBar";

function GuestsFilter() {
  const options = [
    { value: "fullName-asc", label: "Name (Alphabetisch)" },
    { value: "city-asc", label: "Stadt (Alphabetisch)" },
    { value: "created_at-asc", label: "Gast seit (Aufsteigend)" },
    { value: "created_at-desc", label: "Gast seit (Absteigend)" },
  ];

  const filterBase = {
    category: "guests",
    field: "fullName",
    defaultSortField: "fullName",
  };

  return <FilterBar filterBase={filterBase} options={options} />;
}

export default GuestsFilter;
