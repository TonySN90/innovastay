import { useEffect } from "react";
import { fetchCabins } from "./cabinsSlice";
import { ICabinStatesTypes } from "../../types/cabinTypes";
import { useAppDispatch, useAppSelector } from "../../store";

function useCabins() {
  const dispatch = useAppDispatch();
  const { cabins, status, error } = useAppSelector(
    (state: { cabins: ICabinStatesTypes }) => state.cabins
  );

  useEffect(() => {
    dispatch(fetchCabins());
  }, [dispatch]);

  return { cabins, status, error };
}

export default useCabins;
