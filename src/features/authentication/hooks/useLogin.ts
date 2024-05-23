import { useAppDispatch, useAppSelector } from "../../../store";
import { useNavigate } from "react-router";
import { loginThunk, resetLoadingStatus, deleteError } from "../authSlice";
import { LoadingTypes } from "../../../types/GlobalTypes";
import { useEffect } from "react";
import toast from "react-hot-toast";

function useLogin({ resetInputs }: { resetInputs: () => void }) {
  const dispatch = useAppDispatch();
  const { login, loadingStatus, error } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loadingStatus === LoadingTypes.SUCCESS) {
      navigate("/dashboard", { replace: true });
      dispatch(resetLoadingStatus());
      resetInputs();
    }
    if (error) {
      toast.error(error);
      dispatch(deleteError());
    }
  }, [loadingStatus, navigate, error, dispatch, resetInputs]);

  function loginUser({ email, password }: { email: string; password: string }) {
    dispatch(loginThunk({ email, password }));
  }

  return { loginUser, login, loadingStatus, error };
}

export default useLogin;
