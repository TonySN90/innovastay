export enum BookingsViewType {
  schedule = "schedule",
  table = "table",
}
export interface IToggleButtonsTypes {
  buttonLeft: string;
  buttonRight: string;
  onClick: (type: BookingsViewType) => void;
  bookingsView: BookingsViewType;
}
