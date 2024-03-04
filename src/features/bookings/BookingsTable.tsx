import Table from "../../ui/Table";
import BookingsRow from "./BookingsRow";
import { bookingsData } from "../../data/data";
import { IBookingTypes } from "../../types/BookingTypes";
import useWindowWidth from "../../hooks/UseWindowWidth";

function BookingsTable() {
  const windowWidth = useWindowWidth();

  return (
    <>
      <Table
        columns="grid-cols-12 md:grid-cols-12"
        columnSpace={{
          col1: "",
          col2: "col-span-4 xl:col-span-3",
          col3: "col-span-2",
        }}
      >
        <Table.Header
          content={
            windowWidth > 768
              ? ["Zimmer", "Gast", "Datum", "Status", "Endbetrag"]
              : ["Buchungsinformationen"]
          }
        />
        <Table.Body
          data={bookingsData}
          render={(booking: IBookingTypes) => (
            <BookingsRow bookings={booking} key={booking.bookingId} />
          )}
        />
      </Table>
    </>
  );
}

export default BookingsTable;
