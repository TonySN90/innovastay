import { useAppDispatch, useAppSelector } from "../../store";
import {
  resetUpdatingStatus,
  updateBookingThunk,
} from "../bookings/bookingsSlice";
import toast from "react-hot-toast";
import { FormValues } from "../../types/FormTypes";
import { useEffect } from "react";
import { LoadingTypes } from "../../types/GlobalTypes";
import { IBookingStateTypes } from "../../types/BookingTypes";
import { useNavigate } from "react-router";

function useCheckInOut(checkedIn: boolean) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { updatingStatus, error } = useAppSelector(
    (state: { bookings: IBookingStateTypes }) => state.bookings
  );

  useEffect(() => {
    if (updatingStatus === LoadingTypes.SUCCESS) {
      dispatch(resetUpdatingStatus());
      navigate(-1);
      toast.success(
        `Buchung erfolgreich ${checkedIn ? "eingecheckt" : "ausgecheckt"}.`
      );
    }
  }, [dispatch, updatingStatus, checkedIn, navigate]);

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
