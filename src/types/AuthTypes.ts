import { LoadingTypes } from "./GlobalTypes";

export interface IAuthStatesTypes {
  login: object;
  user: Usertype | null;
  newUser: object;
  loadingStatus: LoadingTypes;
  logoutLoadingStatus: LoadingTypes;
  userLoadingStatus: LoadingTypes;
  signupLoadingStatus: LoadingTypes;
  error: string;
}

type Usertype = {
  role?: string;
  user_metadata?: {
    email: string;
    full_name: string;
  };
};

export type SignUpTypes = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm?: string;
};
