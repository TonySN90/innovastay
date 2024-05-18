export interface ISettingsTypes {
  minNights: number;
  breakfastPrice: number;
}

export interface ISettingsStatesTypes {
  loadingStatus: "idle" | "loading" | "error";
  updatingStatus: "idle" | "success" | "loading" | "error";
  error: string;
  settings: ISettingsTypes[];
}
