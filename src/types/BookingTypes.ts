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
  uploadingStatus: "idle" | "loading" | "success" | "error";
  deletingStatus: "idle" | "success" | "loading" | "error";
  updatingStatus: "idle" | "success" | "loading" | "error";
  loadingStatus: "idle" | "loading" | "error";
  error: string;
  bookings: IBookingTypes[];
  booking: object | null;
}

export enum BookingStatusTypes {
  checkedOut = "checkedOut",
  checkedIn = "checkedIn",
  unconfirmed = "unconfirmed",
}

export enum BookingsViewType {
  schedule = "schedule",
  table = "table",
}
