import { RefObject, UIEvent } from "react";
import { IBookingTypes } from "./BookingTypes";
import { ICabinTypes } from "./cabinTypes";

export interface IMonth {
  month: number;
  monthName: string;
  year: number;
  daysInMonth: number;
  days: number[];
  firstDayOfMonth: Date;
  weekdays: string[];
}

export interface ITimelineContextValue {
  bookings: IBookingTypes[];
  memoizedCabins: ICabinTypes[];
  labelWidth: number;
  monthsToShow: IMonth[];
  handleScroll: (e: UIEvent<HTMLDivElement>) => void;
  getDayColor: (day: number, month: IMonth) => string | undefined;
  getMonthWidth: (daysInMonth: number) => number;
  calcBookingPositionX: (date: Date) => number;
  calcBookingPositionY: (cabinId: number) => number;
  calcBookingWidth: (startDate: Date, endDate: Date) => number;
  getDateColor: (startDate: string, endDate: string, today: Date) => string;
  loadCalendar: (direction: "left" | "now" | "right") => void;
  checkIfToday: (month: IMonth, day: number) => boolean;
  isLoadingBookings: boolean;
  isLoadingCabins: boolean;
  today: Date;
  dayHeight: number;
  monthWidth: number;
  colWidth: number;
  rowHeight: number;
  todayElement: RefObject<HTMLDivElement>;
}
