import "../../styles/timeline.css";
import { Scheduler } from "@bitnoi.se/react-scheduler";
import { useState } from "react";
import useBookings from "./useBookings";
import { LoadingTypes } from "../../types/GlobalTypes";
import Spinner from "../../ui/Spinner";

export default function Component() {
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
          zoom: 1,
          filterButtonState,
        }}
      />
    </section>
  );
}
