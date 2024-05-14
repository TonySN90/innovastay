import TimelineContextProvider from "../features/bookings/BookingTimeline";
import Heading from "../ui/Heading";

function Schedular() {
  return (
    <>
      <Heading title="Buchungskalender" size="text-3xl" />
      <Hint>
        {/* <BookingTimeline /> */}
        <TimelineContextProvider />
      </Hint>
    </>
  );
}

export default Schedular;

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
