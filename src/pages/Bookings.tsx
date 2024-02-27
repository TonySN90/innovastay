import { useState } from "react";
import BookingsTable from "../features/bookings/BookingsTable";
import BookingTimeline from "../features/bookings/BookingTimeline";

import Heading from "../ui/Heading";
import ToggleButtons from "../ui/ToggleButtons";

function Bookings() {
  const [bookingsView, setBookingsView] = useState("schedule");

  function handleClick(buttonType) {
    setBookingsView(buttonType);
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
        <div className="hidden md:block h-[600px]">
          <div className="relative ">
            <BookingTimeline />
          </div>
        </div>
      )}
      {bookingsView === "table" && <BookingsTable />}
    </>
  );
}

export default Bookings;
