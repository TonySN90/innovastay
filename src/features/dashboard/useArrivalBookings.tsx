import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { getArrivalBookingsThunk, getDepartureBookingsThunk } from "./dashboardSlice";
import { getToday } from "../../utils/datesHelper";

function useArrivalBookings(hospitalityType : string) {
  const dispatch = useAppDispatch();
  const { arrivalBookings, departureBookings, arrivalLoadingStatus, departureLoadingStatus } = useAppSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    
    let startFilterDate, endFilterDate, filterColumn;	
    startFilterDate = getToday();
    endFilterDate = getToday({end: true});

    if (hospitalityType === "arrival") {
      filterColumn = "startDate"
    }

    if (hospitalityType === "departure") {
      filterColumn = "endDate"
    }

    if (hospitalityType === "arrival") dispatch(getArrivalBookingsThunk({filterColumn, startFilterDate, endFilterDate}));
    if (hospitalityType === "departure") dispatch(getDepartureBookingsThunk({filterColumn, startFilterDate, endFilterDate}));
  }, [dispatch, hospitalityType]);

  return { arrivalBookings, departureBookings, arrivalLoadingStatus, departureLoadingStatus };
}

export default useArrivalBookings;


