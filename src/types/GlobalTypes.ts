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
  onClick: (type: BookingsViewType) => void;
  bookingsView: BookingsViewType;
}

export interface SelectProps {
  primaryColor: string;
  secondaryColor: string;

  control: (
    base: React.CSSProperties,
    state: { isFocused: boolean }
  ) => React.CSSProperties;
  option: (
    styles: React.CSSProperties,
    state: { isSelected: boolean }
  ) => React.CSSProperties;
}

export interface Option {
  value: string;
  label: string;
}
