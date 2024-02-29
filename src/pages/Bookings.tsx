import { useDispatch, useSelector } from "react-redux";
import BookingsTable from "../features/bookings/BookingsTable";
import BookingTimeline from "../features/bookings/BookingTimeline";
import Heading from "../ui/Heading";
import ToggleButtons from "../ui/ToggleButtons";
import {
  updateBookingsView,
  BookingsState,
} from "../features/bookings/bookingsSlice";
import { BookingsViewType } from "../types/BookingTypes";

function Bookings() {
  const bookingsView: BookingsViewType = useSelector(
    // @ts-expect-error redux special string convert
    (state: BookingsState) => state.bookings.bookingsView
  );

  const dispatch = useDispatch();

  function handleClick(buttonType: BookingsViewType) {
    dispatch(updateBookingsView(buttonType));
  }

  return (
    <>
      <Heading title="Buchungsübersicht" />
      <div className="mb-2">
        <ToggleButtons
          onClick={handleClick}
          buttonLeft="Zeitplan"
          buttonRight="Tabelle"
          bookingsView={bookingsView}
        />
      </div>

      {bookingsView === BookingsViewType.schedule && (
        <>
          <span className="md:hidden">
            Die Zeitplanansicht steht der mobilen Ansicht nicht zur Verfügung.
          </span>
          <div className="hidden md:block h-[600px]">
            <div className="relative">
              <BookingTimeline />
            </div>
          </div>
        </>
      )}
      {bookingsView === BookingsViewType.table && <BookingsTable />}
    </>
  );
}

export default Bookings;
