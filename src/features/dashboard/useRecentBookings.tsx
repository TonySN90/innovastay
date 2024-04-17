import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDateThunk } from "./dashboardSlice";
import { getToday } from "../../utils/datesHelper";

function useRecentBookings() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { recentBookings, loadingStatus } = useAppSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    // Filter
    const oldDate = new Date("2024-04-10").toISOString();
    console.log(oldDate);
    console.log(getToday());

    dispatch(getBookingsAfterDateThunk(oldDate));
  }, [dispatch]);

  return { recentBookings, loadingStatus };
}

export default useRecentBookings;
