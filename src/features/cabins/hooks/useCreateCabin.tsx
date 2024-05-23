import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { ICabinStatesTypes } from "../../../types/cabinTypes";
import { resetStatus, uploadCabin } from "../cabinsSlice";
import { FormValues } from "../../../types/FormTypes";
import { LoadingTypes } from "../../../types/GlobalTypes";

import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

function useCreateCabin(reset?: () => void, onCloseModal?: () => void) {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { uploadingStatus, error } = useAppSelector(
    (state: { cabins: ICabinStatesTypes }) => state.cabins
  );

  useEffect(() => {
    const statusValue = searchParams.get("category");
    function setParams() {
      searchParams.delete("search");

      if (statusValue == "all") searchParams.delete("category");
      else searchParams.set("category", "all");
      setSearchParams(searchParams.toString());
    }

    if (uploadingStatus === LoadingTypes.SUCCESS) {
      if (reset) reset();
      if (onCloseModal) onCloseModal();
      setParams();
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
