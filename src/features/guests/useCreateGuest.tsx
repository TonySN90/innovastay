import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { FormValues } from "../../types/FormTypes";
import { LoadingTypes } from "../../types/GlobalTypes";

import { toast } from "react-hot-toast";
import { IGuestStatesTypes } from "../../types/GuestTypes";
import { fetchGuests, resetUploadingStatus, uploadGuest } from "./guestsSlice";

function useCreateGuest(reset?: () => void, onCloseModal?: () => void) {
  const dispatch = useAppDispatch();

  const { uploadingStatus, error } = useAppSelector(
    (state: { guests: IGuestStatesTypes }) => state.guests
  );

  useEffect(() => {
    if (uploadingStatus === LoadingTypes.SUCCESS) {
      if (reset) reset();
      if (onCloseModal) onCloseModal();
      dispatch(fetchGuests());
      dispatch(resetUploadingStatus());
      toast.success("Gastdaten wurden erfolgreich hochgeladen.");
    }
  }, [uploadingStatus, reset, onCloseModal, dispatch]);

  function uploadNewGuest(newGuest: FormValues) {
    dispatch(uploadGuest(newGuest));
  }

  if (error) {
    console.error(error);
    toast.error(`Fehler beim Upload der Zimmerdaten.`);
    throw new Error(`Fehler beim Upload der Zimmerdaten.`);
  }

  return { uploadNewGuest, uploadingStatus, error };
}

export default useCreateGuest;
