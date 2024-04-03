import { useAppDispatch, useAppSelector } from "../../store";
import {
  fetchBookings,
  resetUpdatingStatus,
  updateBookingThunk,
} from "../bookings/bookingsSlice";
import toast from "react-hot-toast";
import { FormValues } from "../../types/FormTypes";
import { useEffect } from "react";
import { LoadingTypes } from "../../types/GlobalTypes";
import { IBookingStateTypes } from "../../types/BookingTypes";
import { NavigateFunction } from "react-router";

function useCheckInOut(checkedIn: boolean, navigate?: NavigateFunction) {
  const dispatch = useAppDispatch();
  const { updatingStatus, error } = useAppSelector(
    (state: { bookings: IBookingStateTypes }) => state.bookings
  );

  useEffect(() => {
    if (updatingStatus === LoadingTypes.SUCCESS) {
      dispatch(fetchBookings());
      dispatch(resetUpdatingStatus());
      {
        !checkedIn && navigate ? navigate(-1) : null;
      }
      toast.success(
        `Buchung erfolgreich ${checkedIn ? "eingecheckt" : "abgecheckt"}.`
      );
    }
  }, [dispatch, updatingStatus, navigate, checkedIn]);

  function checkInOut(id: number, toUpdatedBooking: FormValues) {
    dispatch(updateBookingThunk({ id, toUpdatedBooking }));
  }

  if (error) {
    toast.error(`Fehler beim Check in.`);
    throw new Error(`Fehler beim check in`);
  }
  return { checkInOut, updatingStatus };
}

export default useCheckInOut;
