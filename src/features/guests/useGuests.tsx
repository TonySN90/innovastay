import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { IGuestStatesTypes } from "../../types/GuestTypes";
import { fetchGuests } from "./guestsSlice";
import toast from "react-hot-toast";
import { IFilterTypes } from "../../types/GlobalTypes";
import { useSearchParams } from "react-router-dom";
import { IBookingStateTypes } from "../../types/BookingTypes";

function useGuests() {
  const dispatch = useAppDispatch();
  const { guests, loadingStatus, error } = useAppSelector(
    (state: { guests: IGuestStatesTypes }) => state.guests
  );

  const { bookingsView } = useAppSelector(
    (state: { bookings: IBookingStateTypes }) => state.bookings
  );

  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("search");
  const searchFilter = { field: "fullName", value: searchValue };

  useEffect(() => {
    if (bookingsView !== "table") dispatch(fetchGuests());
  }, [dispatch, searchValue, bookingsView]);

  function filterGuests() {
    if (searchValue !== null && searchValue !== undefined) {
      console.log("test");
      dispatch(fetchGuests(searchFilter as IFilterTypes));
    }
  }

  if (error) {
    toast.error(`Fehler beim Laden der Gastdaten.`);
    throw new Error(`Fehler beim Laden der Gastdaten.`);
  }
  return { guests, loadingStatus, filterGuests };
}

export default useGuests;
