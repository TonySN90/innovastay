import { useDispatch, useSelector } from "react-redux";
import BookingsTable from "../features/bookings/BookingsTable";
import BookingTimeline from "../features/bookings/BookingTimeline";
import Heading from "../ui/Heading";
import ToggleButtons from "../ui/ToggleButtons";
import { updateBookingsView } from "../features/bookings/bookingsSlice";

function Bookings() {
  const bookingsView = useSelector((state) => state.bookings.bookingsView);

  const dispatch = useDispatch();

  function handleClick(buttonType) {
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

      {bookingsView === "schedule" && (
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
      {bookingsView === "table" && <BookingsTable />}
    </>
  );
}

export default Bookings;
