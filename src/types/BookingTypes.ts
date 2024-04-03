export interface IBookingTypes {
  cabins: { name: string; category: string; image: string; id: string };
  cabin: {
    id: number;
    cabinName: string;
    name: string;
    category: string;
    capacity: number;
    price: number;
    discount: number;
    img: string;
    image: string;
    description: string;
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

export interface IBookingToUpdateTypes {
  id: number;
  guests: number;
  startDate: Date;
  endDate: Date;
  numGuests: number;
  hasBreakfast: boolean;
  status: string;
  isPaid: boolean;
}

export interface IBookingStateTypes {
  bookingsView: BookingsViewType;
  uploadingStatus: "idle" | "loading" | "success" | "error";
  deletingStatus: "idle" | "success" | "loading" | "error";
  updatingStatus: "idle" | "success" | "loading" | "error";
  loadingStatus: "idle" | "loading" | "error";
  error: string;
  bookings: IBookingTypes[];
  booking: IBookingTypes;
}

export interface ITotalsBoxProps {
  cabin: {
    discount?: boolean;
    name: string;
    category: string;
    image: string;
    id: string;
  };
  numNights: number;
  pricePerNight: number;
  allDaysPrice: number;
  extrasPrice: number;
  hasBreakfast: boolean;
  numGuests: number;
  totalPrice: number;
}

export enum BookingStatusTypes {
  CHECKEDOUT = "checkedOut",
  CHECKEDIN = "checkedIn",
  UNCONFIRMED = "unconfirmed",
}

export enum BookingsViewType {
  schedule = "schedule",
  table = "table",
}
