import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { ICabinStatesTypes } from "../../types/cabinTypes";
import { editCabin, resetUpdatingStatus } from "./cabinsSlice";
import { FormValues } from "../../types/FormTypes";
import { LoadingTypes } from "../../types/GlobalTypes";

import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

function useUpdateCabin(reset: () => void, onCloseModal: () => void) {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { updatingStatus, error } = useAppSelector(
    (state: { cabins: ICabinStatesTypes }) => state.cabins
  );

  useEffect(() => {
    const statusValue = searchParams.get("status");

    function setParams() {
      if (statusValue == "all") searchParams.delete("category");
      else searchParams.set("category", "all");
      setSearchParams(searchParams.toString());
    }

    if (updatingStatus === LoadingTypes.SUCCESS) {
      reset();
      onCloseModal();
      setParams();
      dispatch(resetUpdatingStatus());

      toast.success("Zimmerdaten erfolgreich aktualisiert.");
    }
  }, [
    updatingStatus,
    reset,
    onCloseModal,
    dispatch,
    searchParams,
    setSearchParams,
  ]);

  function updateCabin(id: number, toUpdatedCabin: FormValues) {
    dispatch(editCabin({ id, toUpdatedCabin }));
  }

  if (error) {
    console.error(error);
    toast.error(`Fehler beim aktualisieren der Zimmerdaten.`);
    throw new Error(`Fehler beim aktualisieren der Zimmerdaten.`);
  }

  return { updateCabin, updatingStatus, error };
}

export default useUpdateCabin;
