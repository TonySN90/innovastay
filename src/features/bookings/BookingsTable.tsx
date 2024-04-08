import Table from "../../ui/Table";
import BookingsRow from "./BookingsRow";
import { IBookingStateTypes, IBookingTypes } from "../../types/BookingTypes";
import useWindowWidth from "../../hooks/UseWindowWidth";
import Empty from "../../ui/Empty";
import { LoadingTypes } from "../../types/GlobalTypes";
import Spinner from "../../ui/Spinner";
import Menu from "../../ui/Menu";
import { useAppSelector } from "../../store";

function BookingsTable() {
  const { bookings, loadingStatus } = useAppSelector(
    (state: { bookings: IBookingStateTypes }) => state.bookings
  );

  const windowWidth = useWindowWidth();

  if (loadingStatus === LoadingTypes.LOADING) return <Spinner />;

  if (!bookings.length) return <Empty resourceName="Buchungen" />;

  return (
    <>
      <Menu>
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
                ? [
                    "Zimmer",
                    "Gast",
                    "Datum",
                    "Status",
                    "Frühstück?",
                    "Endbetrag",
                  ]
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
      </Menu>
    </>
  );
}

export default BookingsTable;
