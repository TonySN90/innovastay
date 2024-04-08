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
import { IBookingTypes } from "../types/BookingTypes";

function useFilter() {
  const dispatch = useAppDispatch();

  function filterBookings(filterValue: string, sortParam: string) {
    const filter =
      !filterValue || filterValue === "all"
        ? null
        : { field: "status", value: filterValue, operator: "eq" };

    let sortBy;
    if (sortParam) {
      const [field, direction] = sortParam.split("-");
      sortBy = { field, direction };
    } else {
      sortBy = {
        field: "startDate",
        direction: "desc",
      };
    }

    dispatch(fetchBookings({ filter, sortBy }));
  }

  function sortBookings(sortParam: string, filterValue) {
    const filter =
      !filterValue || filterValue === "all"
        ? null
        : { field: "status", value: filterValue, operator: "eq" };
    const [field, direction] = sortParam.split("-");
    const sortBy = { field, direction };

    dispatch(fetchBookings({ filter, sortBy }));
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
        const bookings = await getBookings(filter as IFilterTypes);
        dispatch(setBookings(bookings as IBookingTypes[]));
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

  return { filterGuests, filterBookings, sortBookings };
}

export default useFilter;
