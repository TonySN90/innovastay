import { useAppDispatch } from "../store";
import { fetchBookings } from "../features/bookings/bookingsSlice";

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

  function sortBookings(
    sortParam: string,
    filterParam: {
      field: string;
      value: string;
      operator: string;
    }
  ) {
    const { value } = filterParam;
    const filter = !value || value === "all" ? null : filterParam;

    const [field, direction] = sortParam.split("-");
    const sortBy = { field, direction };

    dispatch(fetchBookings({ filter, sortBy }));
  }

  function filterGuests(searchValue: string | null, sortParam: string) {
    const filter = {
      field: "fullName",
      value: searchValue,
      operator: "ilike",
    };

    sortParam = sortParam ? sortParam : "startDate-desc";
    const [field, direction] = sortParam.split("-");
    const sortBy = { field, direction };

    dispatch(fetchBookings({ filter, sortBy }));
  }

  return { filterGuests, filterBookings, sortBookings };
}

export default useFilter;
