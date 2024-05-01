import { LoadingTypes } from "./GlobalTypes";

export interface IAuthStatesTypes {
  login: object;
  user: Usertype | null;
  loadingStatus: LoadingTypes;
  logoutLoadingStatus: LoadingTypes;
  userLoadingStatus: LoadingTypes;
  error: string;
}

type Usertype = {
  role?: string;
};
