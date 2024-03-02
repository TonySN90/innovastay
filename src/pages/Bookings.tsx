import BookingsTable from "../features/bookings/BookingsTable";
import BookingTimeline from "../features/bookings/BookingTimeline";
import Heading from "../ui/Heading";
import ToggleButtons from "../ui/ToggleButtons";
import { updateBookingsView } from "../features/bookings/bookingsSlice";
import { BookingsViewType } from "../types/BookingTypes";
import { useAppDispatch, useAppSelector } from "../store";

function Bookings() {
  const bookingsView = useAppSelector((state) => state.bookings.bookingsView);
  const dispatch = useAppDispatch();

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
