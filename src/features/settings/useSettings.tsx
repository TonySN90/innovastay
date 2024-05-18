import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { getSettingsThunk } from "./settingsSlice";
import { ISettingsStatesTypes } from "../../types/settingsTypes";

function useSettings() {
  const dispatch = useAppDispatch();
  const { settings, loadingStatus } = useAppSelector(
    (state: { settings: ISettingsStatesTypes }) => state.settings
  );

  useEffect(() => {
    dispatch(getSettingsThunk());
  }, [dispatch]);

  return { settings, loadingStatus };
}

export default useSettings;
