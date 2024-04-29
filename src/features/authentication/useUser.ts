import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { getUserThunk } from "./authSlice";
import { LoadingTypes } from "../../types/GlobalTypes";

export function useUser() {
  const dispatch = useAppDispatch();
  const { user, userLoadingStatus } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);

  return {
    user,
    isLoading: userLoadingStatus === LoadingTypes.LOADING,
    isAuthenticated: user?.role === "authenticated",
  };
}
