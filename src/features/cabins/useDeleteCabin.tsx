import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { ICabinStatesTypes } from "../../types/cabinTypes";
import {
  deleteCabinThunk,
  fetchCabins,
  resetDeletingStatus,
} from "./cabinsSlice";
import { StatusTypes } from "../../types/GlobalTypes";

import { toast } from "react-hot-toast";

function useDeleteCabin(onCloseModal: () => void) {
  const dispatch = useAppDispatch();
  const { deletingStatus, error } = useAppSelector(
    (state: { cabins: ICabinStatesTypes }) => state.cabins
  );

  useEffect(() => {
    if (deletingStatus === StatusTypes.SUCCESS) {
      onCloseModal();
      dispatch(fetchCabins());
      dispatch(resetDeletingStatus());
      toast.success("Zimmerdaten erfolgreich gelöscht.");
    }
  }, [dispatch, deletingStatus, onCloseModal]);

  function deleteCabin(id: number) {
    dispatch(deleteCabinThunk(id));
  }

  if (error) {
    console.error(error);
    toast.error(`Fehler beim Löschen der Zimmerdaten.`);
    throw new Error(`Fehler beim Löschen der Zimmerdaten.`);
  }

  return { deleteCabin, deletingStatus, error };
}

export default useDeleteCabin;
