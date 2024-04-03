import { BookingsViewType } from "./BookingTypes";

export enum LoadingTypes {
  IDLE = "idle",
  LOADING = "loading",
  ERROR = "error",
  SUCCESS = "success",
}

export interface IButtonPropsTypes {
  onClick?: () => void;
  variation: string;

  type?: "reset" | "submit" | "button";
  size: string;
  content: string | React.ReactNode;
  extras: string;
  loading?: boolean;
}
export type ButtonTypes = {
  basics: string;
  md: string;
  lg: string;
  standard: string;
  inverted: string;
  [key: string]: string;
};

export interface IToggleButtonsTypes {
  buttonLeft: string;
  buttonRight: string;
  onClick: (type: BookingsViewType) => void;
  bookingsView: BookingsViewType;
}
