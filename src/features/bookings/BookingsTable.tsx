import Button from "../../ui/Button";
import Table from "../../ui/Table";
import BookingsRow from "./BookingsRow";
import { bookingsData } from "../../data/data";

function BookingsTable() {
  return (
    <>
      <Table>
        <Table.Header
          content={["Zimmer", "Gast", "Datum", "Status", "Endbetrag"]}
          specialStyles={{ 2: "col-span-2" }}
        />
        <Table.Body
          data={bookingsData}
          render={(booking) => (
            <BookingsRow bookings={booking} key={booking.bookingId} />
          )}
        />
      </Table>
    </>
  );
}

export default BookingsTable;
