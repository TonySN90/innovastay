import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { FormValues } from "../../types/FormTypes";
import { StatusTypes } from "../../types/GlobalTypes";

import { toast } from "react-hot-toast";
import {
  fetchBookings,
  resetUploadingStatus,
  uploadBookingThunk,
} from "./bookingsSlice";

function useCreateBooking(reset?: () => void, onCloseModal?: () => void) {
  const dispatch = useAppDispatch();

  const { uploadingStatus, error } = useAppSelector(
    (state: { bookings: IBookingStatesTypes }) => state.bookings
  );

  useEffect(() => {
    if (uploadingStatus === StatusTypes.SUCCESS) {
      if (reset) reset();
      if (onCloseModal) onCloseModal();
      dispatch(fetchBookings());
      dispatch(resetUploadingStatus());
      toast.success("Buchungsdaten erfolgreich hochgeladen.");
    }
  }, [uploadingStatus, reset, onCloseModal, dispatch]);

  function uploadNewBooking(newBooking: FormValues) {
    dispatch(uploadBookingThunk(newBooking));
  }

  if (error) {
    console.error(error);
    toast.error(`Fehler beim Upload der Buchungsdaten.`);
    throw new Error(`Fehler beim Upload der Buchungsdaten.`);
  }

  return { uploadNewBooking, uploadingStatus, error };
}

export default useCreateBooking;
