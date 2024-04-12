import { useEffect } from "react";
import { fetchCabins } from "./cabinsSlice";
import { ICabinStatesTypes } from "../../types/cabinTypes";
import { useAppDispatch, useAppSelector } from "../../store";
import { useSearchParams } from "react-router-dom";

function useCabins() {
  const dispatch = useAppDispatch();
  const { cabins, loadingStatus, error } = useAppSelector(
    (state: { cabins: ICabinStatesTypes }) => state.cabins
  );
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Filter
    const filterValue = searchParams.get("category");

    let filter;
    if (filterValue && filterValue !== "all")
      filter = { field: "category", value: filterValue, operator: "eq" };
    else filter = null;

    // Sort
    const sortValue = searchParams.get("sort") || "name-asc";
    const [field, direction] = sortValue.split("-");
    const sortBy = { field, direction };

    // Page
    const page = !searchParams.get("page")
      ? 1
      : Number(searchParams.get("page"));

    dispatch(fetchCabins({ filter, sortBy, page }));
  }, [dispatch, searchParams]);

  return { cabins, loadingStatus, error };
}

export default useCabins;
