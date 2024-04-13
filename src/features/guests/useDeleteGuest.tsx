import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { LoadingTypes } from "../../types/GlobalTypes";

import { toast } from "react-hot-toast";
import { IGuestStatesTypes } from "../../types/GuestTypes";
import { deleteGuestThunk, resetDeletingStatus } from "./guestsSlice";
import { useSearchParams } from "react-router-dom";

function useDeleteGuest(onCloseModal: () => void) {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { deletingStatus, error } = useAppSelector(
    (state: { guests: IGuestStatesTypes }) => state.guests
  );

  useEffect(() => {
    const pageValue = searchParams.get("page");

    function setParams() {
      searchParams.delete("search");
      if (pageValue) searchParams.delete("page");
      else searchParams.set("page", "1");
      setSearchParams(searchParams.toString());
    }

    if (deletingStatus === LoadingTypes.SUCCESS) {
      onCloseModal();
      setParams();
      dispatch(resetDeletingStatus());
      toast.success("Gastdaten erfolgreich gelöscht.");
    }
  }, [dispatch, deletingStatus, onCloseModal, searchParams, setSearchParams]);

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
