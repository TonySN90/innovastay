import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../store";
import { logoutThunk, resetUserStates } from "../authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { LoadingTypes } from "../../../types/GlobalTypes";

export function useLogout() {
  const { logoutLoadingStatus, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (logoutLoadingStatus === LoadingTypes.SUCCESS) {
      navigate("/login", { replace: true });
      toast.success("Logout erfolgreich");
      dispatch(resetUserStates());
    }
    if (error) {
      toast.error(error);
    }
  }, [dispatch, navigate, logoutLoadingStatus, error]);

  function logoutUser() {
    dispatch(logoutThunk());
  }

  return { logoutUser, logoutLoadingStatus };
}
