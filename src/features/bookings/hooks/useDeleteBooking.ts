import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { IBookingStateTypes } from "../../../types/BookingTypes";
import { LoadingTypes } from "../../../types/GlobalTypes";

import { toast } from "react-hot-toast";
import { deleteBookingThunk, resetDeletingStatus } from "../bookingsSlice";
import { useSearchParams } from "react-router-dom";

function useDeleteBooking(onCloseModal: () => void) {
  const dispatch = useAppDispatch();
  const { deletingStatus, error } = useAppSelector(
    (state: { bookings: IBookingStateTypes }) => state.bookings
  );

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const statusValue = searchParams.get("status");

    function setParams() {
      searchParams.delete("search");
      if (statusValue === "all") searchParams.delete("status");
      else searchParams.set("status", "all");
      setSearchParams(searchParams.toString());
    }

    if (deletingStatus === LoadingTypes.SUCCESS) {
      setParams();
      onCloseModal();
      dispatch(resetDeletingStatus());
      toast.success("Buchungsdaten erfolgreich gelöscht.");
    }
  }, [dispatch, deletingStatus, onCloseModal, searchParams, setSearchParams]);

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
