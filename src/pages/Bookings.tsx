import BookingsTable from "../features/bookings/BookingsTable";
import Heading from "../ui/Heading";
import AddBooking from "../features/bookings/addBooking";
import BookingsFilter from "../features/bookings/BookingsFilter";

function Bookings() {
  return (
    <>
      <div className="md:flex items-center gap-4 mb-4">
        <Heading title="Buchungsübersicht" size="text-2xl sm:text-3xl" />
      </div>
      <BookingsFilter />
      <BookingsTable />
      <AddBooking />
    </>
  );
}

export default Bookings;
