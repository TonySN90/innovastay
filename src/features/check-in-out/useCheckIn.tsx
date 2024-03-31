import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { getBookingThunk } from "../bookings/bookingsSlice";

function useCheckIn() {
  const dispatch = useAppDispatch();
  const { booking, loadingStatus, error } = useAppSelector(
    (state: { booking: IBookingStateTypes }) => state.booking
  );

  useEffect(() => {}, [dispatch, booking]);

  function checkIn(bookingId: number) {
    dispatch(getBookingThunk(bookingId));
  }

  return { checkIn, loadingStatus, error };
}

export default useCheckIn;
