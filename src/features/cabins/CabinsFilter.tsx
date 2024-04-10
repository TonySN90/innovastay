import FilterBar from "../../ui/FilterBar";
import useCabins from "./useCabins";

function CabinsFilter() {
  const { cabins } = useCabins();

  if (!cabins.length) return null;

  // const cabinsFilterButtons = cabins.map((cabin) => {
  //   return {
  //     filterBy: cabin.category,
  //     filterType: cabin.category,
  //   };
  // });

  // ADJUST HERE AGAIN LATER. CATEGORIES SHOULD BE CREATED DYNAMICALLY:
  const filterButtons = [
    { filterBy: "Alle", filterType: "all" },
    { filterBy: "Einzelzimmer", filterType: "Einzelzimmer" },
    { filterBy: "Doppelzimmer", filterType: "Doppelzimmer" },
    { filterBy: "Mehrbettzimmer", filterType: "Mehrbettzimmer" },
    { filterBy: "Familiensuite", filterType: "Familiensuite" },
  ];

  const options = [
    { value: "price-desc", label: "Preis (Aufsteigend)" },
    { value: "price-asc", label: "Preis (Absteigend)" },
    { value: "discount-desc", label: "Angebote (Aufsteigend)" },
    { value: "discount-asc", label: "Angebote (Absteigend)" },
  ];

  const filterBase = {
    category: "cabins",
    field: "category",
    defaultSortField: "price",
  };

  return (
    <FilterBar
      filterBase={filterBase}
      filterButtons={filterButtons}
      options={options}
    />
  );
}

export default CabinsFilter;
