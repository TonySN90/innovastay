import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { resetUpdatingStatus, updateSettingsThunk } from "./settingsSlice";
import { ISettingsTypes } from "../../types/settingsTypes";
import toast from "react-hot-toast";
import { LoadingTypes } from "../../types/GlobalTypes";

function useUpdateSettings() {
  const dispatch = useAppDispatch();
  const { updatingStatus } = useAppSelector((state) => state.settings);

  useEffect(() => {
    if (updatingStatus === LoadingTypes.SUCCESS) {
      dispatch(resetUpdatingStatus());
      toast.success("Gastdaten erfolgreich aktualisiert.");
    }
  }, [dispatch, updatingStatus]);

  function updateSettings(newSettings: ISettingsTypes, id: number) {
    dispatch(updateSettingsThunk({ newSettings, id }));
  }

  return { updatingStatus, updateSettings };
}

export default useUpdateSettings;
