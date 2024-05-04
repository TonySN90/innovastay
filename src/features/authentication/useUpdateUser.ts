import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  getUserThunk,
  resetUpdateUserLoadingStatus,
  updateUserThunk,
} from "./authSlice";
import { LoadingTypes } from "../../types/GlobalTypes";
import toast from "react-hot-toast";

function useUpdateUser() {
  const dispatch = useAppDispatch();
  const { updateUserLoadingStatus } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (updateUserLoadingStatus === LoadingTypes.SUCCESS) {
      toast.success("Profil aktualisiert");
      dispatch(getUserThunk());
      dispatch(resetUpdateUserLoadingStatus());
    }
  }, [dispatch, updateUserLoadingStatus]);

  function updateUser({
    password,
    fullName,
    avatar,
  }: {
    password?: string;
    fullName?: string;
    avatar?: File;
  }) {
    dispatch(updateUserThunk({ password, fullName, avatar }));
  }

  return {
    updateUser,
    isUpdating: updateUserLoadingStatus === LoadingTypes.LOADING,
  };
}

export default useUpdateUser;
