export interface IBookingTypes {
  bookingId: string;
  cabin: string;
  guest: string;
  email: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  status: string;
  hasBreakfast: boolean;
  isPaid: boolean;
  totalPrice: number;
}

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

export type BookingsStateTypes = {
  bookingsView: BookingsViewType;
};
