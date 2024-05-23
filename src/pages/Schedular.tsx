import TimelineContextProvider from "../features/bookings/BookingTimeline";
import AddBooking from "../features/bookings/addBooking";
import Heading from "../ui/Heading";

function Timeline() {
  return (
    <>
      <Heading title="Buchungskalender" size="text-2xl sm:text-3xl" />
      <Hint>
        <TimelineContextProvider />
      </Hint>
      <AddBooking />
    </>
  );
}

export default Timeline;

function Hint({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <span className="sm:hidden">
        Der Belegungsplan steht der mobilen Ansicht nicht zur Verfügung.
      </span>
      <div className="hidden sm:block">
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
