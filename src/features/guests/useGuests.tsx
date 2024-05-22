import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { IGuestStatesTypes } from "../../types/GuestTypes";
import { fetchGuests } from "./guestsSlice";
import toast from "react-hot-toast";
import { useLocation, useSearchParams } from "react-router-dom";

function useGuests() {
  const dispatch = useAppDispatch();
  const { guests, loadingStatus, error } = useAppSelector(
    (state: { guests: IGuestStatesTypes }) => state.guests
  );

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const pathName = location.pathname;

  useEffect(() => {
    const filterValue = searchParams.get("search");
    let filter;
    if (filterValue) {
      filter = { field: "fullName", value: filterValue, operator: "ilike" };
    } else {
      filter = null;
    }

    // Sort
    const sortValue = searchParams.get("sort") || "fullName-desc";
    const [field, direction] = sortValue.split("-");
    const sortBy = { field, direction };

    // Page
    let page;
    if (pathName === "/bookings") page = null;
    else
      page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

    if (pathName === "/guests") dispatch(fetchGuests({ filter, sortBy, page }));
    else dispatch(fetchGuests());
  }, [dispatch, searchParams, pathName]);

  if (error) {
    toast.error(`Fehler beim Laden der Gastdaten.`);
    throw new Error(`Fehler beim Laden der Gastdaten.`);
  }
  return { guests, loadingStatus };
}

export default useGuests;
