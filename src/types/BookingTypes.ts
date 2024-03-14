export interface IBookingTypes {
  cabins: { name: string; category: string; image: string; id: string };
  created_at: string;
  id: string;
  guests: { email: string; fullName: string };
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  extrasPrice: number;
  status: string;
  hasBreakfast: boolean;
  isPaid: boolean;
  totalPrice: number;
}

export interface IBookingStateTypes {
  bookingsView: BookingsViewType;
  status: "idle" | "loading" | "error";
  error: string;
  bookings: IBookingTypes[];
}

export enum BookingStatusTypes {
  checkedOut = "checked-out",
  unconfirmed = "unconfirmed",
  confirmed = "confirmed",
}

export enum BookingsViewType {
  schedule = "schedule",
  table = "table",
}
