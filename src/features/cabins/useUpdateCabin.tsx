import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { ICabinStatesTypes } from "../../types/cabinTypes";
import { editCabin, fetchCabins, resetUpdatingStatus } from "./cabinsSlice";
import { FormValues } from "../../types/FormTypes";
import { StatusTypes } from "../../types/GlobalTypes";

import { toast } from "react-hot-toast";

function useUpdateCabin(reset: () => void, onCloseModal: () => void) {
  const dispatch = useAppDispatch();

  const { updatingStatus, error } = useAppSelector(
    (state: { cabins: ICabinStatesTypes }) => state.cabins
  );

  useEffect(() => {
    if (updatingStatus === StatusTypes.SUCCESS) {
      reset();
      onCloseModal();
      dispatch(fetchCabins());
      dispatch(resetUpdatingStatus());

      toast.success("Zimmerdaten erfolgreich aktualisiert.");
    }
  }, [updatingStatus, reset, onCloseModal, dispatch]);

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
