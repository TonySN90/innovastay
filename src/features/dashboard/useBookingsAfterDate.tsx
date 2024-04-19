import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { getArrivalBookingsThunk, getDepartureBookingsThunk, getRecentGuestsThunk } from "./dashboardSlice";
import { getToday } from "../../utils/datesHelper";

function useBookingsAfterDate(hospitalityType : string) {
  const dispatch = useAppDispatch();
  const { arrivalBookings, departureBookings, arrivalLoadingStatus, departureLoadingStatus, recentGuests, guestsLoadingStatus } = useAppSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    
    let filterColumn;	
    const startDate = getToday();
    const endDate = getToday({end: true});


    if (hospitalityType === "arrival") {
      filterColumn = "startDate"
    }

    if (hospitalityType === "departure") {
      filterColumn = "endDate"
    }

    if (hospitalityType === "arrival") dispatch(getArrivalBookingsThunk({filterColumn, startDate, endDate}));
    if (hospitalityType === "departure") dispatch(getDepartureBookingsThunk({filterColumn, startDate, endDate}));
    if (hospitalityType === "recentGuests") dispatch(getRecentGuestsThunk());
  }, [dispatch, hospitalityType]);

  return { arrivalBookings, departureBookings, arrivalLoadingStatus, departureLoadingStatus, recentGuests, guestsLoadingStatus };
}

export default useBookingsAfterDate;


