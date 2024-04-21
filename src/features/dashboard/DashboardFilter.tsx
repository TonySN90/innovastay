import FilterBar from "../../ui/FilterBar";

function DashboardFilter() {
  const filterButtons = [
    { filterBy: "letzen 7 Tage", filterType: 'last7days' },
    { filterBy: "letzten 30 Tage", filterType: 'last30days' },
    { filterBy: "letzten 90 Tage", filterType: 'last90days' },
  ];

  const filterBase = {
    category: "dashboard",
    field: "stats",
    defaultFilter: "last7days",
  };

  return (
    <FilterBar
      filterBase={filterBase}
      filterButtons={filterButtons}
    />
  );
}

export default DashboardFilter;
