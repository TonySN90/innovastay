import { useEffect, useRef, useState } from "react";
import Logo from "../../ui/Logo";
import Spinner from "../../ui/Spinner";
import { LoadingTypes } from "../../types/GlobalTypes";
import useBookings from "./useBookings";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import MiniSpinner from "../../ui/MiniSpinner";
import useCabins from "../cabins/useCabins";

const timelineData = [
  {
    id: "070ac5b5-8369-4cd2-8ba2-0a209134560",
    label: {
      icon: "https://picsum.photos/24",
      title: "Zimmer 1",
      subtitle: "Doppelzimmer",
      bgColor: "rgb(254,165,177)",
    },
    data: [
      {
        id: "8b71a8a5-33dd-4fc8-9caa-b4a584ba3762",
        startDate: new Date("2024-05-09T15:00:00"),
        endDate: new Date("2024-05-15T10:00:00"),
        title: "Farid Bang",
        description: "2 Gäste",
      },
    ],
  },
  {
    id: "070ac5b5-8369-4cd2-8ba2-0a2093456cc60",
    label: {
      icon: "https://picsum.photos/24",
      title: "Zimmer 2",
      subtitle: "Doppelzimmer",
      bgColor: "rgb(190, 254, 165)",
    },
    data: [
      {
        id: "8b71a8a5-33dd-4fc8-9caa-b4a584ba3762",
        startDate: new Date("2024-0510T15:00:00"),
        endDate: new Date("2024-05-28T10:00:00"),
        title: "Farid Bang",
        description: "2 Gäste",
      },
    ],
  },
  {
    id: "070ac5b5-8369-4cd2-8ba2-056754564",
    label: {
      icon: "https://picsum.photos/24",
      title: "Zimmer 3",
      subtitle: "Doppelzimmer",
      bgColor: "rgb(254,165,177)",
    },
    data: [
      {
        id: "8b71a8a5-33dd-4fc8-9caa-b4a584ba3762",
        startDate: new Date("2024-05-09T15:00:00"),
        endDate: new Date("2024-05-15T10:00:00"),
        title: "Farid Bang",
        description: "2 Gäste",
      },
    ],
  },
  {
    id: "070ac5b5-8369-4cd2-8ba2-0a20918709",
    label: {
      icon: "https://picsum.photos/24",
      title: "Zimmer 4",
      subtitle: "Doppelzimmer",
      bgColor: "rgb(190, 254, 165)",
    },
    data: [
      {
        id: "8b71a8a5-33dd-4fc8-9caa-b4a584ba3762",
        startDate: new Date("2024-0510T15:00:00"),
        endDate: new Date("2024-05-28T10:00:00"),
        title: "Farid Bang",
        description: "2 Gäste",
      },
    ],
  },
  {
    id: "070ac5b5-8369-4cd2-8ba2-0a20789789",
    label: {
      icon: "https://picsum.photos/24",
      title: "Zimmer 5",
      subtitle: "Doppelzimmer",
      bgColor: "rgb(254,165,177)",
    },
    data: [
      {
        id: "8b71a8a5-33dd-4fc8-9caa-b4a584ba3762",
        startDate: new Date("2024-05-09T15:00:00"),
        endDate: new Date("2024-05-15T10:00:00"),
        title: "Farid Bang",
        description: "2 Gäste",
      },
    ],
  },
  {
    id: "070ac5b5-8369-4cd2-8ba2-0a20913578978",
    label: {
      icon: "https://picsum.photos/24",
      title: "Zimmer 6",
      subtitle: "Doppelzimmer",
      bgColor: "rgb(190, 254, 165)",
    },
    data: [
      {
        id: "8b71a8a5-33dd-4fc8-9caa-b4a584ba3762",
        startDate: new Date("2024-0510T15:00:00"),
        endDate: new Date("2024-05-28T10:00:00"),
        title: "Farid Bang",
        description: "2 Gäste",
      },
    ],
  },
];

function BookingTimeline3() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const { bookings, loadingStatus: bookingsLoading } = useBookings();
  const { cabins, loadingStatus: cabinsLoading } = useCabins();
  const isLoadingBookings = bookingsLoading === LoadingTypes.LOADING;
  const isLoadingCabins = cabinsLoading === LoadingTypes.LOADING;

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

    if (
      element.scrollWidth - Math.floor(element.scrollLeft) ===
      element.clientWidth
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

  const todayElement = useRef<HTMLDivElement>(null);

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
    console.log(cabins, cabinId);
    return booking_offset_top + rowHeight * labelPosition;
  }
  function calcBookingWidth(startDate: Date, endDate: Date) {
    const numNights = Math.round(
      (endDate?.getTime() - startDate?.getTime()) / (1000 * 3600 * 24)
    );

    return numNights * colWidth;
  }

  useEffect(() => {
    if (todayElement.current) {
      todayElement.current.scrollIntoView({
        inline: "center",
        block: "start",
      });
    }
  }, [todayElement]);

  return (
    <div className="lg:w-[71vw] flex shadow-xl">
      {/* label-bar */}
      <div
        className="bg-background_secondary h-full z-10"
        style={{ width: `${labelWidth}px` }}
      >
        {/* logo */}
        <div className="h-[100px] flex justify-center items-center bg-active ">
          <div className="w-[80px]">
            <Logo />
          </div>
        </div>

        {/* labels */}
        {isLoadingCabins ? (
          <>
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="relative flex justify-center bg-background_primary items-center gap-1 border-r-4 border-active"
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
                  className="relative flex justify-center items-center gap-1 border-r-4 border-active"
                  style={{ height: `${rowHeight}px` }}
                >
                  <div className="h-8 w-8 flex justify-center items-center rounded-full">
                    <img className="h-10" src={cabin.image} />
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
        className="h-full w-full overflow-x-scroll scrollbar scrollbar-thumb-sky-700 scrollbar-track-sky-300"
        style={{
          scrollbarColor: "var(--active) var(--background-primary)",
          scrollSnapType: "x mandatory",
        }}
        onScroll={handleScroll}
      >
        <div
          className="relative h-full bg-background_secondary"
          style={{ width: `${monthWidth}px` }}
        >
          {/* Month-Row */}
          <div className="flex bg-yellow-400 ">
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
                    <div className="justify-center items-center w-full ">
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
          </div>

          {/* Bookings */}

          {bookings.map((booking) => (
            <div
              className={`absolute top-[110px] h-10 rounded-full bg-status_red shadow-md flex items-center truncate`}
              style={{
                left: `${calcBookingPositionX(new Date(booking.startDate))}px`,
                top: `${calcBookingPositionY(booking.cabins.id)}px`,
                width: `${calcBookingWidth(
                  new Date(booking.startDate),
                  new Date(booking.endDate)
                )}px`,
              }}
              key={booking.id}
            >
              <span className="text-xs px-2 font-semibold">
                Sandra Müller | 2 P
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookingTimeline3;
