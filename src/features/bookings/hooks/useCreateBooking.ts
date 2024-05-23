import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { FormValues } from "../../../types/FormTypes";
import { LoadingTypes } from "../../../types/GlobalTypes";

import { toast } from "react-hot-toast";
import { resetUploadingStatus, uploadBookingThunk } from "../bookingsSlice";
import { IBookingStateTypes } from "../../../types/BookingTypes";
import { useSearchParams } from "react-router-dom";

function useCreateBooking(reset?: () => void, onCloseModal?: () => void) {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { uploadingStatus, error } = useAppSelector(
    (state: { bookings: IBookingStateTypes }) => state.bookings
  );

  useEffect(() => {
    const statusValue = searchParams.get("status");
    function setParams() {
      searchParams.delete("search");
      if (statusValue == "all") searchParams.delete("status");
      else searchParams.set("status", "all");
      setSearchParams(searchParams.toString());
    }

    if (uploadingStatus === LoadingTypes.SUCCESS) {
      if (reset) reset();
      if (onCloseModal) onCloseModal();
      setParams();
      dispatch(resetUploadingStatus());
      toast.success("Buchungsdaten erfolgreich hochgeladen.");
    }
  }, [
    uploadingStatus,
    reset,
    onCloseModal,
    dispatch,
    setSearchParams,
    searchParams,
  ]);

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
