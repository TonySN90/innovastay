import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { resetUpdateUserLoadingStatus, updateUserThunk } from "./authSlice";
import { LoadingTypes } from "../../types/GlobalTypes";
import toast from "react-hot-toast";

function useUpdateUser() {
  const dispatch = useAppDispatch();
  const { updateUserLoadingStatus } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (updateUserLoadingStatus === LoadingTypes.SUCCESS) {
      toast.success("Profil aktualisiert");
      resetUpdateUserLoadingStatus();
    }
  }, [dispatch, updateUserLoadingStatus]);
  function updateUser({ password, fullName, avatar }) {
    dispatch(updateUserThunk({ password, fullName, avatar }));
  }
  return {
    updateUser,
    isUpdating: updateUserLoadingStatus === LoadingTypes.LOADING,
  };
}

export default useUpdateUser;
