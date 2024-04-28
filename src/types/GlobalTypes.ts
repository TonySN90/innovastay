import { BookingsViewType } from "./BookingTypes";

export enum LoadingTypes {
  IDLE = "idle",
  LOADING = "loading",
  ERROR = "error",
  SUCCESS = "success",
}

export interface IButtonPropsTypes {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variation?: string;

  type?: "reset" | "submit" | "button";
  size: string;
  content: string | React.ReactNode;
  extras: string;
  loading?: boolean;
  disabled?: boolean;
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

export interface IFilterTypes {
  field: string;
  value: string | null;
  operator: string;
}

export interface ISortTypes {
  field: string;
  direction: string;
}

export interface IFilterButtonsTypes {
  filterBy: string;
  filterType: string;
}
export interface IFilterBaseTypes {
  category: string;
  field: string;
  defaultFilter?: string;
}

export interface IFilterContext {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filterField: string;

  filterBase: IFilterBaseTypes;
  filterButtons: IFilterButtonsTypes[];
  options: Option[];
}
