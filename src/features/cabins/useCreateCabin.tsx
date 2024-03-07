import { useAppDispatch, useAppSelector } from "../../store";
import { ICabinStatesTypes } from "../../types/cabinTypes";
import { uploadCabin } from "./cabinsSlice";

function useCreateCabin() {
  const dispatch = useAppDispatch();

  const { status, error } = useAppSelector(
    (state: { cabins: ICabinStatesTypes }) => state.cabins
  );

  function uploadNewCabin(newCabin) {
    dispatch(uploadCabin(newCabin));
  }

  if (error) {
    console.error(error);
    throw new Error(`Fehler beim Upload der Zimmerdaten.`);
  }

  return { uploadNewCabin, status, error };
}

export default useCreateCabin;
