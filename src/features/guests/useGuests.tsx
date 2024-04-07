import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { IGuestStatesTypes } from "../../types/GuestTypes";
import { fetchGuests } from "./guestsSlice";
import toast from "react-hot-toast";

function useGuests() {
  const dispatch = useAppDispatch();
  const { guests, loadingStatus, error } = useAppSelector(
    (state: { guests: IGuestStatesTypes }) => state.guests
  );

  useEffect(() => {
    dispatch(fetchGuests());
  }, [dispatch]);

  if (error) {
    toast.error(`Fehler beim Laden der Gastdaten.`);
    throw new Error(`Fehler beim Laden der Gastdaten.`);
  }
  return { guests, loadingStatus };
}

export default useGuests;
