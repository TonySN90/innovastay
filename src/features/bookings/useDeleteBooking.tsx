import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { IBookingStateTypes } from "../../types/BookingTypes";
import { StatusTypes } from "../../types/GlobalTypes";

import { toast } from "react-hot-toast";
import {
  deleteBookingThunk,
  fetchBookings,
  resetDeletingStatus,
} from "./bookingsSlice";

function useDeleteBooking(onCloseModal: () => void) {
  const dispatch = useAppDispatch();
  const { deletingStatus, error } = useAppSelector(
    (state: { bookings: IBookingStateTypes }) => state.bookings
  );

  useEffect(() => {
    if (deletingStatus === StatusTypes.SUCCESS) {
      onCloseModal();
      dispatch(fetchBookings());
      dispatch(resetDeletingStatus());
      toast.success("Buchungsdaten erfolgreich gelöscht.");
    }
  }, [dispatch, deletingStatus, onCloseModal]);

  function deleteBooking(id: number) {
    dispatch(deleteBookingThunk(id));
  }

  if (error) {
    console.error(error);
    toast.error(`Fehler beim Löschen der Zimmerdaten.`);
    throw new Error(`Fehler beim Löschen der Zimmerdaten.`);
  }

  return { deleteBooking, deletingStatus, error };
}

export default useDeleteBooking;
