import { useAppDispatch } from "../store";
import { IFilterTypes } from "../types/GlobalTypes";
import { getGuests } from "../services/apiGuests";
import {
  fetchBookings,
  setBookings,
  setLoadingStatus,
} from "../features/bookings/bookingsSlice";
import { getBookings } from "../services/apiBookings";
import toast from "react-hot-toast";

function useFilter() {
  const dispatch = useAppDispatch();

  function filterBookings(filterValue: string) {
    const filter =
      !filterValue || filterValue === "all"
        ? null
        : { field: "status", value: filterValue, operator: "eq" };
    dispatch(fetchBookings(filter as { field: string; value: string }));
  }

  async function filterGuests(searchValue: string | null) {
    try {
      if (searchValue !== null && searchValue !== undefined) {
        dispatch(setLoadingStatus("loading"));

        const searchFilter = { field: "fullName", value: searchValue };
        const guests = await getGuests(searchFilter as IFilterTypes);
        const filter = {
          field: "guestId",
          value: guests,
          operator: "in",
        };
        const bookings = await getBookings(filter);
        dispatch(setBookings(bookings));
        dispatch(setLoadingStatus("idle"));
      }
    } catch (error) {
      toast.error("Ein Fehler beim filtern der Buchungsdaten ist aufgetreten:");
      console.error(
        "Ein Fehler beim filtern der Buchungsdaten ist aufgetreten:",
        error
      );
      dispatch(setLoadingStatus("idle"));
    }
  }

  return { filterGuests, filterBookings };
}

export default useFilter;
