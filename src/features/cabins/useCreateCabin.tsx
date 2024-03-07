import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { ICabinStatesTypes } from "../../types/cabinTypes";
import { fetchCabins, resetStatus, uploadCabin } from "./cabinsSlice";

function useCreateCabin(reset, onCloseModal) {
  const dispatch = useAppDispatch();

  const { uploadingStatus, error } = useAppSelector(
    (state: { cabins: ICabinStatesTypes }) => state.cabins
  );

  useEffect(() => {
    if (uploadingStatus === "success") {
      reset();
      onCloseModal();
      dispatch(fetchCabins());
      dispatch(resetStatus());
    }
  }, [uploadingStatus, reset, onCloseModal, dispatch]);

  function uploadNewCabin(newCabin) {
    dispatch(uploadCabin(newCabin));
  }

  if (error) {
    console.error(error);
    throw new Error(`Fehler beim Upload der Zimmerdaten.`);
  }

  return { uploadNewCabin, uploadingStatus, error };
}

export default useCreateCabin;
