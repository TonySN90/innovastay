import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { FormValues } from "../../../types/FormTypes";
import { LoadingTypes } from "../../../types/GlobalTypes";

import { toast } from "react-hot-toast";
import { IGuestStatesTypes } from "../../../types/GuestTypes";
import { editGuest, resetUpdatingStatus } from "../guestsSlice";
import { useSearchParams } from "react-router-dom";

function useUpdateGuest(reset: () => void, onCloseModal: () => void) {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { updatingStatus, error } = useAppSelector(
    (state: { guests: IGuestStatesTypes }) => state.guests
  );

  useEffect(() => {
    const pageValue = searchParams.get("page");

    function setParams() {
      if (pageValue == "all") searchParams.delete("page");
      else searchParams.set("page", "1");
      setSearchParams(searchParams.toString());
    }
    if (updatingStatus === LoadingTypes.SUCCESS) {
      reset();
      onCloseModal();
      setParams();
      dispatch(resetUpdatingStatus());
      toast.success("Gastdaten erfolgreich aktualisiert.");
    }
  }, [
    updatingStatus,
    reset,
    onCloseModal,
    dispatch,
    searchParams,
    setSearchParams,
  ]);

  function updateGuest(id: number, toUpdatedGuest: FormValues) {
    dispatch(editGuest({ id, toUpdatedGuest }));
  }

  if (error) {
    console.error(error);
    toast.error(`Fehler beim aktualisieren der Zimmerdaten.`);
    throw new Error(`Fehler beim aktualisieren der Zimmerdaten.`);
  }

  return { updateGuest, updatingStatus, error };
}

export default useUpdateGuest;
