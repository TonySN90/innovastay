export interface IBookingTypes {
  cabins: { name: string; category: string; image: string; id: string };
  cabin: {
    name: string;
    category: string;
    image: string;
    id: string;
    discount: number;
  };
  cabinId: number;
  created_at: string;
  id: number;
  guests: {
    email: string;
    fullName: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
    guestSince: string;
    maxStays: number;
    information: string;
  };
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  extrasPrice: number;
  status: string;
  hasBreakfast: boolean;
  isPaid: boolean;
  totalPrice: number;
  cabinPrice: number;
  pricePerNight: number;
  allDaysPrice: number;
  guestId: number;
}

export interface IBookingStateTypes {
  bookingsView: BookingsViewType;
  uploadingStatus: "idle" | "loading" | "success" | "error";
  deletingStatus: "idle" | "success" | "loading" | "error";
  updatingStatus: "idle" | "success" | "loading" | "error";
  loadingStatus: "idle" | "loading" | "error";
  error: string;
  bookings: IBookingTypes[];
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
