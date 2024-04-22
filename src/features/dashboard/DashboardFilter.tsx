import FilterBar from "../../ui/FilterBar";

function DashboardFilter() {
  const filterButtons = [
    { filterBy: "letzen 7 Tage", filterType: "7" },
    { filterBy: "letzten 30 Tage", filterType: "30" },
    { filterBy: "letzten 90 Tage", filterType: "90" },
  ];

  const filterBase = {
    category: "dashboard",
    field: "stats",
    defaultFilter: "7",
  };

  return (
    <FilterBar
      filterBase={filterBase}
      filterButtons={filterButtons}
    />
  );
}

export default DashboardFilter;
