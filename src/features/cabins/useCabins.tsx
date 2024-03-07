import { useEffect } from "react";
import { fetchCabins } from "./cabinsSlice";
import { ICabinStatesTypes } from "../../types/cabinTypes";
import { useAppDispatch, useAppSelector } from "../../store";

function useCabins() {
  const dispatch = useAppDispatch();
  const { cabins, loadingStatus, error } = useAppSelector(
    (state: { cabins: ICabinStatesTypes }) => state.cabins
  );

  useEffect(() => {
    dispatch(fetchCabins());
  }, [dispatch]);

  return { cabins, loadingStatus, error };
}

export default useCabins;
