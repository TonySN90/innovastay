import { useAppDispatch } from "../store";
import { fetchBookings } from "../features/bookings/bookingsSlice";
import { fetchCabins } from "../features/cabins/cabinsSlice";
import { IFilterBaseTypes } from "../types/GlobalTypes";

function useFilter() {
  const dispatch = useAppDispatch();

  function filterTable(
    filterBase: IFilterBaseTypes,
    filterValue: string,
    sortParam: string | null
  ) {
    const { field, category, defaultSortField } = filterBase;
    const filter =
      !filterValue || filterValue === "all"
        ? null
        : { field, value: filterValue, operator: "eq" };

    let sortBy;
    if (sortParam) {
      const [field, direction] = sortParam.split("-");
      sortBy = { field, direction };
    } else {
      sortBy = {
        field: defaultSortField,
        direction: "desc",
      };
    }
    category === "bookings" && dispatch(fetchBookings({ filter, sortBy }));
    category === "cabins" && dispatch(fetchCabins({ filter, sortBy }));
  }

  function filterGuests(searchValue: string, sortParam: string | null) {
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

  return { filterGuests, filterTable };
}

export default useFilter;
