import { Scheduler } from "@bitnoi.se/react-scheduler";
import { useState } from "react";
import { mockedSchedulerData } from "../data/data";

export default function Component() {
  const [filterButtonState, setFilterButtonState] = useState(0);

  return (
    <section className="w-5">
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
          zoom: 15,
          filterButtonState,
        }}
      />
    </section>
  );
}
