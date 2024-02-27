import BookingTimeline from "../ui/BookingTimeline";
import Heading from "../ui/Heading";

function Dashboard() {
  return (
    <div className="absolute w-[100%] md:w-[70%]">
      <Heading title="Dashboard" />
      <BookingTimeline />
    </div>
  );
}

export default Dashboard;
