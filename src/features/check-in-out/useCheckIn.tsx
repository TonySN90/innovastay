import { useAppDispatch, useAppSelector } from "../../store";
import { getBookingThunk, updateBookingThunk } from "../bookings/bookingsSlice";
import toast from "react-hot-toast";
import { FormValues } from "../../types/FormTypes";
import { useEffect } from "react";
import { StatusTypes } from "../../types/GlobalTypes";

function useCheckIn(navigate) {
  const dispatch = useAppDispatch();
  const { updatingStatus, error } = useAppSelector(
    (state: { bookings: IBookingStatesTypes }) => state.bookings
  );

  useEffect(() => {
    console.log(updatingStatus);
    if (updatingStatus === StatusTypes.SUCCESS) {
      toast.success("Buchung erfolgreich eingecheckt.");
      navigate(-1);
    }
  }, [dispatch, updatingStatus]);

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
