import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { FormValues } from "../../types/FormTypes";
import { LoadingTypes } from "../../types/GlobalTypes";

import { toast } from "react-hot-toast";
import { IGuestStatesTypes } from "../../types/GuestTypes";
import { editGuest, fetchGuests, resetUpdatingStatus } from "./guestsSlice";

function useUpdateGuest(reset: () => void, onCloseModal: () => void) {
  const dispatch = useAppDispatch();

  const { updatingStatus, error } = useAppSelector(
    (state: { guests: IGuestStatesTypes }) => state.guests
  );

  useEffect(() => {
    if (updatingStatus === LoadingTypes.SUCCESS) {
      reset();
      onCloseModal();
      dispatch(fetchGuests());
      dispatch(resetUpdatingStatus());

      toast.success("Gastdaten erfolgreich aktualisiert.");
    }
  }, [updatingStatus, reset, onCloseModal, dispatch]);

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
