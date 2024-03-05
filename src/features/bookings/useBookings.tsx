import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { IBookingStateTypes } from "../../types/BookingTypes";
import { fetchBookings } from "./bookingsSlice";

function useBookings() {
  const dispatch = useAppDispatch();
  const { bookings, status, error } = useAppSelector(
    (state: { bookings: IBookingStateTypes }) => state.bookings
  );

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  return { bookings, status, error };
}

export default useBookings;
