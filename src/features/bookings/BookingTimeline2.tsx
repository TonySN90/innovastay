import "../../styles/timeline.css";
import { Scheduler } from "@bitnoi.se/react-scheduler";
import { useState } from "react";
import useBookings from "./useBookings";
import { LoadingTypes } from "../../types/GlobalTypes";
import Spinner from "../../ui/Spinner";

function BookingTimeline() {
  const [filterButtonState, setFilterButtonState] = useState(0);
  const { mockedSchedulerData, loadingStatus } = useBookings();
  const isLoadingBookings = loadingStatus === LoadingTypes.LOADING;

  if (isLoadingBookings) return <Spinner />;

  return (
    <section className="">
      <Scheduler
        data={mockedSchedulerData}
        // isLoading={isLoading}
        onRangeChange={(newRange) => console.log(newRange)}
        onTileClick={(clickedResource) => console.log(clickedResource)}
        onItemClick={(item) => console.log(item)}
        onFilterData={() => {
          // Some filtering logic...
          setFilterButtonState(1);
        }}
        onClearFilterData={() => {
          // Some clearing filters logic...
          setFilterButtonState(0);
        }}
        config={{
          zoom: 1,
          filterButtonState,
          maxRecordsPerPage: 10,
        }}
      />
    </section>
  );
}
export default BookingTimeline;
