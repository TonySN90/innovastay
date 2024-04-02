import { IGuestTypes } from "./GuestTypes";

export interface ISearchBarProps {
  defaultValue: IGuestTypes | null | undefined;
  isUpdatingSession: boolean;
  onChange: (guest: IGuestTypes | null) => void;
}
