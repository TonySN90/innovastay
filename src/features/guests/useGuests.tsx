import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { IGuestStatesTypes } from "../../types/GuestTypes";
import { fetchGuests } from "./guestsSlice";

function useGuests() {
  const dispatch = useAppDispatch();
  const { guests, loadingStatus, error } = useAppSelector(
    (state: { guests: IGuestStatesTypes }) => state.guests
  );

  useEffect(() => {
    dispatch(fetchGuests());
  }, [dispatch]);

  return { guests, loadingStatus, error };
}

export default useGuests;
