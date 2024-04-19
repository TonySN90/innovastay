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
    <section>
      <Scheduler
        data={mockedSchedulerData}
        isLoading={isLoadingBookings}
        onTileClick={(clickedResource) => console.log(clickedResource)}
        onItemClick={(item) => console.log(item)}
        onFilterData={() => {
          setFilterButtonState(1);
        }}
        onClearFilterData={() => {
          setFilterButtonState(0);
        }}
        config={{
          /* 
            change filter button state based on your filters
            < 0 - filter button invisible,
            0 - filter button visible, no filter applied, clear filters button invisible,
            > 0 - filter button visible, filters applied (clear filters button will be visible)
          */
          filterButtonState,
          // decide start zoom variant (0 - weeks, 1 - days)
          zoom: 1,
          // select language for scheduler
          lang: "en",
          // decide how many resources show per one page
          maxRecordsPerPage: 20,
        }}
      />
    </section>
  );
}
export default BookingTimeline;
