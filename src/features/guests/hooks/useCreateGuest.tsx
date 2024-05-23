import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { FormValues } from "../../../types/FormTypes";
import { LoadingTypes } from "../../../types/GlobalTypes";

import { toast } from "react-hot-toast";
import { IGuestStatesTypes } from "../../../types/GuestTypes";
import { resetUploadingStatus, uploadGuest } from "../guestsSlice";
import { useSearchParams } from "react-router-dom";

function useCreateGuest(reset?: () => void, onCloseModal?: () => void) {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { uploadingStatus, error } = useAppSelector(
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

    if (uploadingStatus === LoadingTypes.SUCCESS) {
      setParams();
      if (reset) reset();
      if (onCloseModal) onCloseModal();
      dispatch(resetUploadingStatus());
      toast.success("Gastdaten wurden erfolgreich hochgeladen.");
    }
  }, [
    uploadingStatus,
    reset,
    onCloseModal,
    dispatch,
    setSearchParams,
    searchParams,
  ]);

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
