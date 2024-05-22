import { useEffect, useMemo, useRef, useState } from "react";
import useBookings from "./useBookings";
import useCabins from "../cabins/useCabins";
import { useSearchParams } from "react-router-dom";
import { LoadingTypes } from "../../types/GlobalTypes";
import { IMonth, ITimelineTypes } from "../../types/TimelineTypes";

function useTimeline(): ITimelineTypes {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [pageLoaded, setPageLoaded] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const todayElement = useRef<HTMLDivElement>(null);

  const { bookings, loadingStatus: bookingsLoading } = useBookings();
  const { cabins, loadingStatus: cabinsLoading } = useCabins();
  const memoizedCabins = useMemo(() => cabins, [cabins]);

  const isLoadingBookings = bookingsLoading === LoadingTypes.LOADING;
  const isLoadingCabins = cabinsLoading === LoadingTypes.LOADING;

  const [searchParams, setSearchParams] = useSearchParams();

  const monthsNames = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  const monthsToShow: IMonth[] = [];

  for (let i = 0; i <= 2; i++) {
    const month = currentMonth + i;
    const monthIndex = (month - 1) % 12;
    const monthName = monthsNames[monthIndex];
    const year = currentYear + Math.floor((month - 1) / 12);
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, monthIndex, 1);
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    const weekdays = [];
    for (let i = 0; i < days.length; i++) {
      const day = days[i];
      const weekDay = new Date(
        firstDayOfMonth.getFullYear(),
        firstDayOfMonth.getMonth(),
        day
      ).toLocaleString("de-DE", { weekday: "short" });
      weekdays.push(weekDay);
    }

    monthsToShow.push({
      month: monthIndex + 1,
      monthName: monthName,
      year: year,
      daysInMonth: daysInMonth,
      days: days,
      firstDayOfMonth: firstDayOfMonth,
      weekdays: weekdays,
    });
  }

  // constants
  const zoom = zoomLevel * 1.5;
  const colWidth = zoom * 50;

  const rowHeight = 70;
  const dayHeight = 50;
  const labelWidth = 180;

  const booking_offset_left = colWidth / 2 - colWidth;
  const booking_offset_top = 115 - rowHeight;

  let monthWidth = 0;
  monthsToShow.map((month) => {
    monthWidth += month.daysInMonth * colWidth;
  });

  function loadCalendar(direction: "left" | "right" | "now") {
    if (direction === "left") {
      if (currentMonth === 1) {
        setCurrentMonth(12);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
    if (direction === "right") {
      if (currentMonth === 12) {
        setCurrentMonth(1);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
    if (direction === "now") {
      setCurrentMonth(today.getMonth());
      setCurrentYear(today.getFullYear());

      setTimeout(() => {
        if (todayElement.current) {
          todayElement.current.scrollIntoView({
            inline: "center",
            block: "start",
            behavior: "smooth",
          });
        }
      }, 800);
    }
  }

  function checkIfToday(months: { month: number }, day: number) {
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();
    return months.month === currentMonth && day === currentDay;
  }

  function checkIfWeekend(months: { firstDayOfMonth: Date }, day: number) {
    const weekDay = new Date(
      months.firstDayOfMonth.getFullYear(),
      months.firstDayOfMonth.getMonth(),
      day
    ).toLocaleString("de-DE", { weekday: "short" });

    return weekDay === "Sa" || weekDay === "So";
  }

  function getDayColor(
    day: number,
    months: { month: number; firstDayOfMonth: Date }
  ) {
    if (checkIfToday(months, day)) {
      return "bg-active";
    }
    if (checkIfWeekend(months, day)) {
      return "bg-timetable_weekend_bg";
    }
  }

  function getMonthWidth(daysPerMonth: number) {
    const monthWidth = daysPerMonth * colWidth;
    return monthWidth;
  }

  function scrollAfterLoad(element: HTMLDivElement, scrollLeft: number) {
    element.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });
  }

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    const element = e.target as HTMLDivElement;
    const tolerance = 1;

    if (
      Math.abs(
        element.scrollWidth -
          Math.floor(element.scrollLeft) -
          element.clientWidth
      ) <= tolerance
    ) {
      loadCalendar("right");
      const scrollDirection = element.scrollLeft - element.clientWidth * 0.5;
      scrollAfterLoad(element, scrollDirection);
    }

    if (element.scrollLeft === 0) {
      loadCalendar("left");
      const scrollDirection = element.scrollLeft + element.clientWidth * 0.5;
      scrollAfterLoad(element, scrollDirection);
    }
  }

  function handleZoom(operation: "in" | "out") {
    if (operation === "in") {
      if (zoomLevel === 2) return;
      setZoomLevel(zoomLevel + 1);
      loadCalendar("now");
    }

    if (operation === "out") {
      if (zoomLevel === 1) return;
      setZoomLevel(zoomLevel - 1);
      loadCalendar("now");
    }
  }

  function calcBookingPositionX(bookingDate: Date) {
    const firstDayDate = new Date(monthsToShow[0].firstDayOfMonth);
    const differenceMilliseconds =
      bookingDate.getTime() - firstDayDate.getTime();
    const differenceDays = Math.floor(
      differenceMilliseconds / (1000 * 60 * 60 * 24) + 1
    );

    return booking_offset_left + colWidth * differenceDays;
  }

  function calcBookingPositionY(cabinId: number) {
    const labelPosition = cabins.findIndex((cabin) => cabin.id === cabinId) + 1;
    return booking_offset_top + rowHeight * labelPosition;
  }
  function calcBookingWidth(startDate: Date, endDate: Date) {
    const numNights = Math.round(
      (endDate?.getTime() - startDate?.getTime()) / (1000 * 3600 * 24)
    );

    return numNights * colWidth;
  }

  function getDateColor(startDate: string, endDate: string, today: Date) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date(today);

    if (
      isNaN(start.getTime()) ||
      isNaN(end.getTime()) ||
      isNaN(now.getTime())
    ) {
      return "bg-status_gray";
    }

    if (start.toDateString() === now.toDateString()) {
      return "bg-status_green";
    } else if (end.toDateString() === now.toDateString()) {
      return "bg-status_red";
    } else if (start < now && end > now) {
      return "bg-status_blue";
    } else if (start > now) {
      return "bg-status_orange";
    } else {
      return "bg-status_gray";
    }
  }

  useEffect(() => {
    searchParams.set(
      "filterDate",
      `${currentYear.toString()}-${currentMonth.toString()}`
    );
    setSearchParams(searchParams.toString());

    if (todayElement.current && !pageLoaded) {
      todayElement.current.scrollIntoView({
        inline: "center",
        block: "start",
      });
      setPageLoaded(true);
    }
  }, [
    todayElement,
    searchParams,
    setSearchParams,
    currentYear,
    currentMonth,
    pageLoaded,
  ]);

  return {
    bookings,
    memoizedCabins,
    labelWidth,
    monthsToShow,
    handleScroll,
    getDayColor,
    getMonthWidth,
    calcBookingPositionX,
    calcBookingPositionY,
    calcBookingWidth,
    getDateColor,
    loadCalendar,
    checkIfToday,
    handleZoom,
    zoomLevel,
    isLoadingBookings,
    isLoadingCabins,
    today,
    dayHeight,
    monthWidth,
    colWidth,
    rowHeight,
    todayElement,
  };
}

export default useTimeline;
