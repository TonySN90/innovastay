import { useAppDispatch, useAppSelector } from "../../store";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { signupThunk } from "./authSlice";
import { LoadingTypes } from "../../types/GlobalTypes";

function useSignUp(reset) {
  const dispatch = useAppDispatch();
  const { signupLoadingStatus } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (signupLoadingStatus === LoadingTypes.SUCCESS) {
      toast.success("Bitte verfizieren Sie Ihre Email-Adresse");
      reset();
    }
  }, [signupLoadingStatus, dispatch, reset]);

  function signupUser({
    fullName,
    email,
    password,
  }: {
    fullName: string;
    email: string;
    password: string;
  }) {
    dispatch(signupThunk({ fullName, email, password }));
  }

  return { signupUser, signupLoadingStatus };
}

export default useSignUp;
