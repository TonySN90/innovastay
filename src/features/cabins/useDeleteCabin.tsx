import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { ICabinStatesTypes } from "../../types/cabinTypes";
import { deleteCabinThunk, resetDeletingStatus } from "./cabinsSlice";
import { LoadingTypes } from "../../types/GlobalTypes";

import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

function useDeleteCabin(onCloseModal: () => void) {
  const dispatch = useAppDispatch();
  const { deletingStatus, error } = useAppSelector(
    (state: { cabins: ICabinStatesTypes }) => state.cabins
  );

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const statusValue = searchParams.get("category");
    function setParams() {
      if (statusValue === "all") searchParams.delete("category");
      else searchParams.set("category", "all");
      setSearchParams(searchParams.toString());
    }

    if (deletingStatus === LoadingTypes.SUCCESS) {
      setParams();
      onCloseModal();
      dispatch(resetDeletingStatus());
      toast.success("Zimmerdaten erfolgreich gelöscht.");
    }
  }, [dispatch, deletingStatus, onCloseModal, searchParams, setSearchParams]);

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
