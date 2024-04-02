import { useAppDispatch, useAppSelector } from "../../store";
import {
  fetchBookings,
  resetUpdatingStatus,
  updateBookingThunk,
} from "../bookings/bookingsSlice";
import toast from "react-hot-toast";
import { FormValues } from "../../types/FormTypes";
import { useEffect } from "react";
import { StatusTypes } from "../../types/GlobalTypes";
import { IBookingStateTypes } from "../../types/BookingTypes";
import { NavigateFunction } from "react-router";

function useCheckIn(navigate: NavigateFunction) {
  const dispatch = useAppDispatch();
  const { updatingStatus, error } = useAppSelector(
    (state: { bookings: IBookingStateTypes }) => state.bookings
  );

  useEffect(() => {
    if (updatingStatus === StatusTypes.SUCCESS) {
      dispatch(fetchBookings());
      dispatch(resetUpdatingStatus());
      navigate(-1);
      toast.success("Buchung erfolgreich eingecheckt.");
    }
  }, [dispatch, updatingStatus, navigate]);

  function checkIn(id: number, toUpdatedBooking: FormValues) {
    console.log(toUpdatedBooking);
    dispatch(updateBookingThunk({ id, toUpdatedBooking }));
  }

  if (error) {
    console.error(error);
    toast.error(`Fehler beim Check in.`);
    throw new Error(`Fehler beim check in`);
  }
  return { checkIn, updatingStatus };
}

export default useCheckIn;
