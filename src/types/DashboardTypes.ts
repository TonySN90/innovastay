import { LoadingTypes } from "./GlobalTypes";

export interface IFetchPropTypes {
  startDate: string;
  endDate: string;
  filterColumn: string;
}

export interface ISalesData {
  date: string;
  sales: number;
}

export interface ITodayCardBookingTypes {
  startDate: string;
  endDate: string;
  totalPrice: number;
  fullName: string;
  id: number;
  numNights: number;
  status: string;
  cabins: { name: string }[];

  textColor?: string;
  backgroundColor?: string;
  key?: string;
}

export interface IDashboardStateTypes {
  arrivalBookings: ITodayCardBookingTypes[];
  departureBookings: ITodayCardBookingTypes[];
  recentGuests: ITodayCardBookingTypes[];
  periodBookings: ITodayCardBookingTypes[];
  createdBookings: ITodayCardBookingTypes[];

  sevenDaysSales: [{ date: string; sales: number }] | [];
  thirtyDaysSales: [{ date: string; sales: number }] | [];
  ninetyDaysSales: [{ date: string; sales: number }] | [];

  arrivalLoadingStatus: LoadingTypes;
  departureLoadingStatus: LoadingTypes;
  guestsLoadingStatus: LoadingTypes;
  periodBookingsLoadingStatus: LoadingTypes;
  createdBookingsLoadingStatus: LoadingTypes;
}
