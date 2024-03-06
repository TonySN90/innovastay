import "../../styles/timeline.css";
import { Scheduler } from "@bitnoi.se/react-scheduler";
import { useState } from "react";
import useBookings from "./useBookings";
import { StatusTypes } from "../../types/GlobalTypes";

export default function Component() {
  const [filterButtonState, setFilterButtonState] = useState(0);
  const { mockedSchedulerData, status } = useBookings();
  const isLoadingBookings = status === StatusTypes.LOADING;

  if (isLoadingBookings) return <div>Loading...</div>;

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
