import Table from "../../ui/Table";
import BookingsRow from "./BookingsRow";
import { IBookingTypes } from "../../types/BookingTypes";
import useWindowWidth from "../../hooks/UseWindowWidth";
import useBookings from "./useBookings";
import Empty from "../../ui/Empty";

function BookingsTable() {
  const windowWidth = useWindowWidth();
  const { bookings, status } = useBookings();

  if (status === "loading")
    return <div className="text-center">Loading...</div>;
  console.log(bookings);
  if (!bookings.length) return <Empty resourceName="bookings" />;

  return (
    <>
      <Table
        columns="grid-cols-12 md:grid-cols-12"
        columnSpace={{
          col1: "",
          col2: "col-span-3",
          col3: "col-span-2",
          col4: "col-span-2",
          col5: "col-span-2",
        }}
      >
        <Table.Header
          content={
            windowWidth > 768
              ? ["Zimmer", "Gast", "Datum", "Status", "Frühstück?", "Endbetrag"]
              : ["Buchungsinformationen"]
          }
        />
        <Table.Body
          data={bookings}
          render={(booking: IBookingTypes) => (
            <BookingsRow
              bookings={booking}
              key={booking.id}
              windowWidth={windowWidth}
            />
          )}
        />
      </Table>
    </>
  );
}

export default BookingsTable;
