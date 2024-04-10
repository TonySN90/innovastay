import { BookingStatusTypes } from "../../types/BookingTypes";
import FilterBar from "../../ui/FilterBar";

function BookingsFilter() {
  const filterButtons = [
    { filterBy: "Alle", filterType: "all" },
    { filterBy: "Eingecheckt", filterType: BookingStatusTypes.CHECKEDIN },
    { filterBy: "Ausgecheckt", filterType: BookingStatusTypes.CHECKEDOUT },
    { filterBy: "Austehend", filterType: BookingStatusTypes.UNCONFIRMED },
  ];

  const options = [
    { value: "startDate-desc", label: "Datum (Aufsteigend)" },
    { value: "startDate-asc", label: "Datum (Absteigend)" },
    { value: "totalPrice-desc", label: "Endbetrag (Aufsteigend)" },
    { value: "totalPrice-asc", label: "Endbetrag (Absteigend)" },
  ];

  const filterBase = {
    category: "bookings",
    field: "status",
    defaultSortField: "startDate",
  };

  return (
    <FilterBar
      filterBase={filterBase}
      filterButtons={filterButtons}
      options={options}
    />
  );
}

export default BookingsFilter;
