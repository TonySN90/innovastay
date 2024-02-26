import BookingsTable from "../features/bookings/BookingsTable";
import Heading from "../ui/Heading";

function Bookings() {
  return (
    <div>
      <Heading title="Buchungen" />
      <BookingsTable />
    </div>
  );
}

export default Bookings;
