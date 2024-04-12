import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { IGuestStatesTypes } from "../../types/GuestTypes";
import { fetchGuests } from "./guestsSlice";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

function useGuests() {
  const dispatch = useAppDispatch();
  const { guests, loadingStatus, error } = useAppSelector(
    (state: { guests: IGuestStatesTypes }) => state.guests
  );

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const filterValue = searchParams.get("search");
    let filter;
    if (filterValue) {
      filter = { field: "fullName", value: "dan", operator: "ilike" };
    } else {
      filter = null;
    }

    // Sort
    const sortValue = searchParams.get("sort") || "fullName-desc";
    const [field, direction] = sortValue.split("-");
    const sortBy = { field, direction };

    // Page
    const page = !searchParams.get("page")
      ? 1
      : Number(searchParams.get("page"));

    dispatch(fetchGuests({ filter, sortBy, page }));
  }, [dispatch, searchParams]);

  if (error) {
    toast.error(`Fehler beim Laden der Gastdaten.`);
    throw new Error(`Fehler beim Laden der Gastdaten.`);
  }
  return { guests, loadingStatus };
}

export default useGuests;
