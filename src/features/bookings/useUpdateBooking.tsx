import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { FormValues } from "../../types/FormTypes";
import { LoadingTypes } from "../../types/GlobalTypes";

import { toast } from "react-hot-toast";
import {
  fetchBookings,
  resetUpdatingStatus,
  updateBookingThunk,
} from "./bookingsSlice";
import { IBookingStateTypes } from "../../types/BookingTypes";

function useUpdateBooking(reset: () => void, onCloseModal: () => void) {
  const dispatch = useAppDispatch();

  const { updatingStatus, error } = useAppSelector(
    (state: { bookings: IBookingStateTypes }) => state.bookings
  );

  useEffect(() => {
    if (updatingStatus === LoadingTypes.SUCCESS) {
      reset();
      onCloseModal();
      dispatch(fetchBookings());
      dispatch(resetUpdatingStatus());

      toast.success("Buchungsdaten erfolgreich aktualisiert.");
    }
  }, [updatingStatus, reset, onCloseModal, dispatch]);

  function updateBooking(id: number, toUpdatedBooking: FormValues) {
    dispatch(updateBookingThunk({ id, toUpdatedBooking }));
  }

  if (error) {
    console.error(error);
    toast.error(`Fehler beim aktualisieren der Zimmerdaten.`);
    throw new Error(`Fehler beim aktualisieren der Zimmerdaten.`);
  }

  return { updateBooking, updatingStatus, error };
}

export default useUpdateBooking;
