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
    // Filter
    const searchValue = searchParams.get("search");

    let filter;
    if (searchValue)
      filter = { field: "fullName", value: searchValue, operator: "ilike" };

    // Sort
    const sortValue = searchParams.get("sort") || "fullName-asc";
    const [field, direction] = sortValue.split("-");
    const sortBy = { field, direction };

    // Page
    // const page = !searchParams.get("page")
    //   ? 1
    //   : Number(searchParams.get("page"));
    const page = null;
    dispatch(fetchGuests({ filter, sortBy }));
  }, [dispatch, searchParams]);

  // useEffect(() => {
  //   dispatch(fetchGuests());
  // }, [dispatch]);

  if (error) {
    toast.error(`Fehler beim Laden der Gastdaten.`);
    throw new Error(`Fehler beim Laden der Gastdaten.`);
  }
  return { guests, loadingStatus };
}

export default useGuests;
