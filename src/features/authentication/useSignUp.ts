import { useAppDispatch, useAppSelector } from "../../store";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { signupThunk } from "./authSlice";
import { LoadingTypes } from "../../types/GlobalTypes";
import { UserFormTypes } from "../../types/AuthTypes";

function useSignUp(reset: () => void) {
  const dispatch = useAppDispatch();
  const { signupLoadingStatus } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (signupLoadingStatus === LoadingTypes.SUCCESS) {
      toast.success("Bitte verfizieren Sie Ihre Email-Adresse");
      reset();
    }
  }, [signupLoadingStatus, dispatch, reset]);

  function signupUser({ fullName, email, password }: UserFormTypes) {
    dispatch(signupThunk({ fullName, email, password }));
  }

  return { signupUser, signupLoadingStatus };
}

export default useSignUp;
