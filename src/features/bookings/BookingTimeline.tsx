import "../../styles/timeline.css";
import { Scheduler } from "@bitnoi.se/react-scheduler";
import { useState } from "react";
import useBookings from "./useBookings";
import { StatusTypes } from "../../types/GlobalTypes";
import Spinner from "../../ui/Spinner";

export default function Component() {
  const [filterButtonState, setFilterButtonState] = useState(0);
  const { mockedSchedulerData, loadingStatus } = useBookings();
  const isLoadingBookings = loadingStatus === StatusTypes.LOADING;

  if (isLoadingBookings) return <Spinner />;

  return (
    <section>
      <Scheduler
        data={mockedSchedulerData}
        isLoading={isLoadingBookings}
        // onRangeChange={(newRange) => console.log(newRange)}
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
        }}
      />
    </section>
  );
}
