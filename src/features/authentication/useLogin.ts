import { useAppDispatch, useAppSelector } from "../../store";
import { useNavigate } from "react-router";
import { loginThunk, resetLoadingStatus } from "./authSlice";
import { LoadingTypes } from "../../types/GlobalTypes";
import { useEffect } from "react";
import toast from "react-hot-toast";

function useLogin() {
  const dispatch = useAppDispatch();
  const { login, loadingStatus, error } = useAppSelector(
    (state: { auth }) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (loadingStatus === LoadingTypes.SUCCESS) {
      toast.success("Login erfolgreich");
      navigate("/dashboard");
      dispatch(resetLoadingStatus());
    }
    if (error) toast.error(error);
  }, [loadingStatus, navigate, error, dispatch]);

  function loginUser({ email, password }: { email: string; password: string }) {
    dispatch(loginThunk({ email, password }));
  }

  return { loginUser, login, loadingStatus, error };
}

export default useLogin;
