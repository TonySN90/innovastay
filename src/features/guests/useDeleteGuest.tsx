import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { LoadingTypes } from "../../types/GlobalTypes";

import { toast } from "react-hot-toast";
import { IGuestStatesTypes } from "../../types/GuestTypes";
import {
  deleteGuestThunk,
  fetchGuests,
  resetDeletingStatus,
} from "./guestsSlice";

function useDeleteGuest(onCloseModal: () => void) {
  const dispatch = useAppDispatch();
  const { deletingStatus, error } = useAppSelector(
    (state: { guests: IGuestStatesTypes }) => state.guests
  );

  useEffect(() => {
    if (deletingStatus === LoadingTypes.SUCCESS) {
      onCloseModal();
      dispatch(fetchGuests());
      dispatch(resetDeletingStatus());
      toast.success("Gastdaten erfolgreich gelöscht.");
    }
  }, [dispatch, deletingStatus, onCloseModal]);

  function deleteGuest(id: number) {
    dispatch(deleteGuestThunk(id));
  }

  if (error) {
    console.error(error);
    toast.error(`Fehler beim Löschen der Gastdaten.`);
    throw new Error(`Fehler beim Löschen der Gastdaten.`);
  }

  return { deleteGuest, deletingStatus, error };
}

export default useDeleteGuest;
