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

export interface ISignupTypes {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm?: string;
}

export interface IUpdateUserTypes {
  fullName: string;
  image: File[];
}

export interface IUpdateUserPasswordTypes {
  fullName: string;
  image: File[];
}

export type UserFormTypes = {
  fullName?: string;
  email?: string;
  avatar?: File;
  password?: string;
  passwordConfirm?: string;
};

export interface IUserMetadataTypes {
  email?: string;
  fullName?: string;
  avatar: string;
}
