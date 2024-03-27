import BookingsTable from "../features/bookings/BookingsTable";
import BookingTimeline from "../features/bookings/BookingTimeline";
import Heading from "../ui/Heading";
import ToggleButtons from "../ui/ToggleButtons";
import { updateBookingsView } from "../features/bookings/bookingsSlice";
import { BookingsViewType } from "../types/BookingTypes";
import { useAppDispatch, useAppSelector } from "../store";
import AddBooking from "../features/bookings/addBooking";
import BookingFormProvider from "../features/bookings/BookingFormContext";

function Bookings() {
  const bookingsView = useAppSelector((state) => state.bookings.bookingsView);
  const dispatch = useAppDispatch();

  function handleClick(buttonType: BookingsViewType) {
    dispatch(updateBookingsView(buttonType));
  }

  return (
    <BookingFormProvider>
      <Heading title="Buchungsübersicht" />
      <ToggleButtons
        onClick={handleClick}
        buttonLeft="Kalender"
        buttonRight="Tabelle"
        bookingsView={bookingsView}
      />

      {bookingsView === BookingsViewType.schedule && (
        <Hint>
          <BookingTimeline />
        </Hint>
      )}
      {bookingsView === BookingsViewType.table && (
        <>
          <BookingsTable />
          <AddBooking />
        </>
      )}
    </BookingFormProvider>
  );
}

export default Bookings;

function Hint({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span className="md:hidden">
        Der Belegungsplan steht der mobilen Ansicht nicht zur Verfügung.
      </span>
      <div className="hidden md:block">
        <div className="relative">{children}</div>
      </div>
    </>
  );
}
