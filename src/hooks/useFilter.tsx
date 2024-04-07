import { useAppDispatch } from "../store";
import { IFilterTypes } from "../types/GlobalTypes";
import { getGuests } from "../services/apiGuests";
import { fetchBookings, setBookings } from "../features/bookings/bookingsSlice";
import { getBookings } from "../services/apiBookings";

function useFilter() {
  const dispatch = useAppDispatch();

  function filterBookings(filterValue: string) {
    const filter =
      !filterValue || filterValue === "all"
        ? null
        : { field: "status", value: filterValue, operator: "eq" };
    dispatch(fetchBookings(filter as { field: string; value: string }));
  }

  function filterGuests(searchValue: string | null) {
    if (searchValue !== null && searchValue !== undefined) {
      const searchFilter = { field: "fullName", value: searchValue };
      const guests = getGuests(searchFilter as IFilterTypes);
      guests.then((guests) => {
        const filter = {
          field: "guestId",
          value: guests,
          operator: "in",
        };
        getBookings(filter).then((bookings) => {
          dispatch(setBookings(bookings));
        });
      });
    }
  }

  return { filterGuests, filterBookings };
}

export default useFilter;
