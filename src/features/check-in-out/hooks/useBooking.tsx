import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getBookingThunk } from "../../bookings/bookingsSlice";
import { IBookingStateTypes } from "../../../types/BookingTypes";

function useBooking(bookingId: number) {
  const dispatch = useAppDispatch();
  const { booking, loadingBookingStatus, error } = useAppSelector(
    (state: { bookings: IBookingStateTypes }) => state.bookings
  );

  useEffect(() => {
    dispatch(getBookingThunk(bookingId));
  }, [dispatch, bookingId]);

  return { booking, loadingBookingStatus, error };
}

export default useBooking;
