import Table from "../../ui/Table";
import BookingsRow from "./BookingsRow";
import { bookingsData } from "../../data/data";
import { useEffect, useState } from "react";

// interface TableColumnSpace {
//   col1: string;
//   col2: string;
//   col3: string;
// }

function BookingsTable() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateWindowSize);

    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, []);

  return (
    <>
      <Table
        columns="grid-cols-12 md:grid-cols-12"
        columnSpace={{
          col1: "col-span-4 xl:col-span-3",
          col2: "col-span-2",
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
          render={(booking) => (
            <BookingsRow bookings={booking} key={booking.bookingId} />
          )}
        />
      </Table>
    </>
  );
}

export default BookingsTable;
