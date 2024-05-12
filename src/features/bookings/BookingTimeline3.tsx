import { useEffect, useRef, useState } from "react";
import { LoadingTypes } from "../../types/GlobalTypes";
import useBookings from "./useBookings";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import MiniSpinner from "../../ui/MiniSpinner";
import useCabins from "../cabins/useCabins";
import { useSearchParams } from "react-router-dom";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

function BookingTimeline3() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [pageLoaded, setPageLoaded] = useState(false);
  const todayElement = useRef<HTMLDivElement>(null);

  const { bookings, loadingStatus: bookingsLoading } = useBookings();
  const { cabins, loadingStatus: cabinsLoading } = useCabins();
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

  const monthsToShow = [];

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

  const firstDayOfMonth = new Date(
    monthsToShow[0].year,
    monthsToShow[0].month - 1,
    1
  );

  // constants
  const rowHeight = 70;
  const colWidth = 60;

  const dayHight = 49;
  const labelWidth = 180;

  const booking_offset_left = 30 - colWidth;
  const booking_offset_top = 115 - rowHeight;

  let monthWidth = 0;
  monthsToShow.map((month) => {
    monthWidth += month.daysInMonth * colWidth;
  });

  function checkIfWeekend(day: number) {
    const weekDay = new Date(
      firstDayOfMonth.getFullYear(),
      firstDayOfMonth.getMonth(),
      day
    ).toLocaleString("de-DE", { weekday: "short" });

    return weekDay === "Sa" || weekDay === "So";
  }

  function loadCalendar(direction: "left" | "right") {
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
  }

  function checkIfToday(months: { month: number }, day: number) {
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();
    return months.month === currentMonth && day === currentDay;
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

  function handleScroll(e) {
    const element = e.target;
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

  return (
    <div className="relative lg:w-[72vw] flex shadow-xl overflow-x-auto max-w-[100%] bg-background_secondary">
      {/* label-bar */}

      {isLoadingBookings && isLoadingCabins && (
        <div className="bg-status_red px-4 py-2 absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 flex gap-2 rounded-lg">
          <span>Buchungen laden</span>
          <div>
            <CgSpinnerTwoAlt className="animate-spin text-2xl text-text" />
          </div>
        </div>
      )}

      <div
        className="bg-background_secondary h-full z-10"
        style={{ width: `${labelWidth}px` }}
      >
        {/* logo */}
        <div className="h-[100px] flex flex-col justify-center items-center bg-active ">
          <div className="flex flex-col justify-between h-[55px]">
            <div className="font-semibold text-center">
              {new Date().toLocaleDateString("de-DE")}
            </div>
            <div className="flex justify-between w-[100px]">
              <div
                className="flex justify-center items-center w-10 pb-[2px] border-b-2 border-text cursor-pointer hover:text-background_secondary transition-all hover:border-background_secondary"
                onClick={() => loadCalendar("left")}
              >
                <IoIosArrowDropleftCircle className="w-6 h-6" />
              </div>
              <div
                className="flex justify-center items-center w-10 border-b-2 border-text cursor-pointer hover:text-background_secondary transition-all hover:border-background_secondary"
                onClick={() => loadCalendar("right")}
              >
                <IoIosArrowDroprightCircle className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* labels */}
        {isLoadingCabins ? (
          <>
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="relative first-line:flex justify-center bg-background_primary items-center gap-1 border-r-4 border-active"
                style={{ height: `${rowHeight}px` }}
              >
                <MiniSpinner />
              </div>
            ))}
          </>
        ) : (
          cabins.map((cabin) => {
            return (
              <div>
                <div
                  className=" flex items-center gap-1 ml-2 border-r-4 border-active"
                  style={{ height: `${rowHeight}px` }}
                >
                  <div className="flex justify-center items-center">
                    <img className="h-8 w-8 rounded-full" src={cabin.image} />
                  </div>
                  <div className="flex flex-col text-xs">
                    <span>{cabin.name}</span>
                    <span>{cabin.category}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* canvas */}

      <div
        className="h-full w-full overflow-x-scroll relative"
        style={{
          scrollbarColor: "var(--active) var(--background-primary)",
          scrollSnapType: "x mandatory",
        }}
        onScroll={handleScroll}
      >
        <div
          className="relative h-full bg-background_secondary overflow-hidden"
          style={{ width: `${monthWidth}px` }}
        >
          {/* Month-Row */}
          <div className="flex">
            {monthsToShow.map((month) => (
              <div
                className={`bg-active flex justify-center items-center font-semibold border-r border-border`}
                style={{
                  height: `${50}px`,
                  width: `${getMonthWidth(month.daysInMonth)}px`,
                }}
              >
                <span>{month.monthName + " " + month.year}</span>
              </div>
            ))}
          </div>
          {/* Days */}

          <div className="w-full flex border-l border-border">
            {monthsToShow.map((month) =>
              month.days.map((day) => (
                <>
                  <div
                    key={`${day}-${month.month}-${month.year}`}
                    id={`${day}-${month.month}-${month.year}`}
                    ref={checkIfToday(month, day) ? todayElement : null}
                    className={`flex border-r border-border ${day}-${
                      month.month
                    }-${month.year} ${
                      checkIfToday(month, day) ? "bg-active today" : ""
                    } ${checkIfWeekend(day) ? "bg-timetable_weekend_bg" : ""}`}
                    style={{
                      width: `${colWidth}px`,
                    }}
                  >
                    <div className="justify-center items-center w-full">
                      <div
                        className="flex flex-col justify-center items-center border-b border-border"
                        style={{
                          height: `${dayHight}px`,
                          width: `${colWidth}px`,
                        }}
                      >
                        <span className="font-semibold text-sm">
                          {month.weekdays[day - 1]}
                        </span>
                        <span className="text-sm">{day}</span>
                      </div>

                      {cabins.map(() => (
                        <div
                          // key={data.id}
                          className={`w-full border-t border-border`}
                          style={{
                            height: `${rowHeight}px`,
                            width: `${colWidth}px`,
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </>
              ))
            )}
            {/* Bookings */}
            <div className="overflow-hidden">
              {isLoadingCabins && isLoadingBookings
                ? null
                : bookings.map((booking) => (
                    <div
                      className={`transition-all duration-500 absolute top-[110px] h-10 rounded-full bg-status_red shadow-md flex items-center truncate`}
                      style={{
                        left: `${calcBookingPositionX(
                          new Date(booking.startDate)
                        )}px`,
                        top: `${calcBookingPositionY(booking.cabins.id)}px`,
                        width: `${calcBookingWidth(
                          new Date(booking.startDate),
                          new Date(booking.endDate)
                        )}px`,
                      }}
                      key={booking.id}
                    >
                      <span className="text-xs px-2 font-semibold">
                        <div>
                          <span>{`${booking.guests.fullName} | ${booking.numGuests} P`}</span>
                        </div>
                      </span>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingTimeline3;
