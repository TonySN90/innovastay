import BookingTimeline from "../features/bookings/BookingTimeline3";
import Heading from "../ui/Heading";

function Schedular() {
  return (
    <>
      <Heading title="Buchungskalender" size="text-3xl" />
      {/* <Hint> */}
      <BookingTimeline />
      {/* </Hint> */}
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
