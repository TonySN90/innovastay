import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { ICabinStatesTypes } from "../../types/cabinTypes";
import { fetchCabins, resetStatus, uploadCabin } from "./cabinsSlice";
import { FormValues } from "../../types/FormTypes";
import { StatusTypes } from "../../types/GlobalTypes";

import { toast } from "react-hot-toast";

function useCreateCabin(reset?: () => void, onCloseModal?: () => void) {
  const dispatch = useAppDispatch();

  const { uploadingStatus, error } = useAppSelector(
    (state: { cabins: ICabinStatesTypes }) => state.cabins
  );

  useEffect(() => {
    if (uploadingStatus === StatusTypes.SUCCESS) {
      if (reset) reset();
      if (onCloseModal) onCloseModal();
      dispatch(fetchCabins());
      dispatch(resetStatus());
      toast.success("Zimmerdaten erfolgreich hochgeladen.");
    }
  }, [uploadingStatus, reset, onCloseModal, dispatch]);

  function uploadNewCabin(newCabin: FormValues) {
    dispatch(uploadCabin(newCabin));
  }

  if (error) {
    console.error(error);
    toast.error(`Fehler beim Upload der Zimmerdaten.`);
    throw new Error(`Fehler beim Upload der Zimmerdaten.`);
  }

  return { uploadNewCabin, uploadingStatus, error };
}

export default useCreateCabin;
