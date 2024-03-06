import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { IGuestStatesTypes } from "../../types/GuestTypes";
import { fetchGuests } from "./guestsSlice";

function useGuests() {
  const dispatch = useAppDispatch();
  const { guests, status, error } = useAppSelector(
    (state: { guests: IGuestStatesTypes }) => state.guests
  );

  useEffect(() => {
    dispatch(fetchGuests());
  }, [dispatch]);

  return { guests, status, error };
}

export default useGuests;
