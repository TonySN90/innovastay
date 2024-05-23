import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  getArrivalBookingsThunk,
  getDepartureBookingsThunk,
  getPeriodBookingsThunk,
  getCreatedBookingsThunk,
  getRecentGuestsThunk,
} from "../dashboardSlice";
import { getPastDay, getToday } from "../../../utils/datesHelper";

function useBookingsAfterDate(hospitalityType: string) {
  const dispatch = useAppDispatch();
  const {
    arrivalBookings,
    departureBookings,
    periodBookings,
    arrivalLoadingStatus,
    departureLoadingStatus,
    periodBookingsLoadingStatus,
    recentGuests,
    guestsLoadingStatus,
    createdBookings,
    createdBookingsLoadingStatus,
  } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    let filterColumn = "",
      startDate;
    startDate = getToday();
    const endDate = getToday({ end: true });

    if (hospitalityType === "arrival") {
      filterColumn = "startDate";
    }

    if (hospitalityType === "departure") {
      filterColumn = "endDate";
    }

    if (hospitalityType === "timePeriod") {
      startDate = getPastDay(40); // High date range to ensure that bookings are also recorded before the start date.
      filterColumn = "startDate";
    }

    if (hospitalityType === "createdAt") {
      startDate = getPastDay(40); // Too
      filterColumn = "created_at";
    }

    if (hospitalityType === "arrival")
      dispatch(getArrivalBookingsThunk({ filterColumn, startDate, endDate }));
    if (hospitalityType === "departure")
      dispatch(getDepartureBookingsThunk({ filterColumn, startDate, endDate }));
    if (hospitalityType === "timePeriod")
      dispatch(getPeriodBookingsThunk({ filterColumn, startDate, endDate }));
    if (hospitalityType === "createdAt")
      dispatch(getCreatedBookingsThunk({ filterColumn, startDate, endDate }));
    if (hospitalityType === "recentGuests") dispatch(getRecentGuestsThunk());
  }, [dispatch, hospitalityType]);

  return {
    arrivalBookings,
    departureBookings,
    arrivalLoadingStatus,
    departureLoadingStatus,
    recentGuests,
    guestsLoadingStatus,
    periodBookings,
    periodBookingsLoadingStatus,
    createdBookings,
    createdBookingsLoadingStatus,
  };
}

export default useBookingsAfterDate;
