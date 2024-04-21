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
    { value: "startDate-desc", label: "Datum (Absteigend)" },
    { value: "startDate-asc", label: "Datum (Aufsteigend)" },
    { value: "totalPrice-desc", label: "Endbetrag (Absteigend)" },
    { value: "totalPrice-asc", label: "Endbetrag (Aufsteigend)" },
  ];

  const filterBase = {
    category: "bookings",
    field: "status",
    defaultFilter: "all"

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
