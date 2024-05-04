import { LoadingTypes } from "./GlobalTypes";

export interface IAuthStatesTypes {
  login: object;
  user: Usertype | null;
  newUser: object;
  loadingStatus: LoadingTypes;
  logoutLoadingStatus: LoadingTypes;
  userLoadingStatus: LoadingTypes;
  signupLoadingStatus: LoadingTypes;
  updateUserLoadingStatus: LoadingTypes;
  error: string;
}

type Usertype = {
  role?: string;
  email?: string;
  user_metadata?: {
    email?: string;
    fullName?: string;
  };
};

export type UserFormTypes = {
  fullName: string;
  email: string;
  avatar?: File;
  password: string;
  passwordConfirm?: string;
};
