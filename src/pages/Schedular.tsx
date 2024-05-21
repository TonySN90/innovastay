import TimelineContextProvider from "../features/bookings/BookingTimeline";
import AddBooking from "../features/bookings/addBooking";
import Heading from "../ui/Heading";

function Schedular() {
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

export default Schedular;

function Hint({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <span className="md:hidden">
        Der Belegungsplan steht der mobilen Ansicht nicht zur Verfügung.
      </span>
      <div className="hidden md:block">
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
