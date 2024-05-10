import { useEffect, useRef } from "react";
import Logo from "../../ui/Logo";

const timelineData = [
  {
    id: "070ac5b5-8369-4cd2-8ba2-0a209130cc60",
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
    id: "070ac5b5-8369-4cd2-8ba2-0a209130cc60",
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
    id: "070ac5b5-8369-4cd2-8ba2-0a209130cc60",
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
    id: "070ac5b5-8369-4cd2-8ba2-0a209130cc60",
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
    id: "070ac5b5-8369-4cd2-8ba2-0a209130cc60",
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
    id: "070ac5b5-8369-4cd2-8ba2-0a209130cc60",
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
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const months = [
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
    const monthName = months[(month % 12) - 1];
    const year = currentYear + Math.floor(month / 12);
    const daysInMonth = new Date(year, month % 12, 0).getDate();
    const firstDayOfMonth = new Date(year, (month % 12) - 1, 1);
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
      month: month % 12,
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

  console.log(monthsToShow);

  function checkIfWeekend(day: number) {
    const weekDay = new Date(
      firstDayOfMonth.getFullYear(),
      firstDayOfMonth.getMonth(),
      day
    ).toLocaleString("de-DE", { weekday: "short" });

    return weekDay === "Sa" || weekDay === "So";
  }

  function checkIfToday(months: object, day: number) {
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();
    return months.month === currentMonth && day === currentDay;
  }

  // constants
  const rowHeight = 70;
  const colWidth = 60;

  const dayHight = 49;
  const labelWidth = 160;

  const booking_offset_left = 30 - colWidth;
  const booking_offset_top = 115 - rowHeight;

  let monthWidth = 0;
  monthsToShow.map((month) => {
    monthWidth += month.daysInMonth * colWidth;
  });

  function getMonthWidth(daysPerMonth: number) {
    const monthWidth = daysPerMonth * colWidth;
    return monthWidth;
  }

  const todayElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (todayElement.current) {
      todayElement.current.scrollIntoView({
        behavior: "smooth",
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
        <div className="h-[100px] flex justify-center items-center bg-active border-b border-border">
          <div className="w-[80px]">
            <Logo />
          </div>
        </div>

        {/* labels */}
        {timelineData.map((data) => {
          return (
            <div>
              <div
                className="relative flex justify-center items-center gap-1 border-b border-border"
                style={{ height: `${rowHeight}px` }}
              >
                <div className="h-8 w-8 flex justify-center items-center rounded-full">
                  <img className="h-10" src="logo_light.svg" />
                </div>
                <div className="flex flex-col text-xs">
                  <span>{data.label.title}</span>
                  <span>{data.label.subtitle}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* canvas */}
      <div
        className="h-full w-full overflow-x-scroll"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "var(--active) var(--background-primary)",
          scrollSnapType: "x mandatory",
        }}
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
                    // key={day}
                    ref={checkIfToday(month, day) ? todayElement : null}
                    className={`flex border-r border-border ${
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

                      {timelineData.map(() => (
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
          <div
            className={`absolute top-[110px] h-10 rounded-full bg-status_red shadow-md flex items-center truncate`}
            style={{
              left: `${booking_offset_left + colWidth * 1}px`, // breite des cols * Datum des Tages
              top: `${booking_offset_top + rowHeight * 1}px`, // Höhe der row * Nummer des Zimmers(id)
              width: `${colWidth * 5}px`, // breite des cols * anzahl der Tage
            }}
          >
            <span className="text-xs px-2 font-semibold">
              Sandra Müller | 2 P
            </span>
          </div>
          <div
            className={`absolute top-[110px] h-10 rounded-full bg-status_red shadow-sm flex items-center truncate`}
            style={{
              left: `${booking_offset_left + colWidth * 2}px`,
              top: `${booking_offset_top + rowHeight * 2}px`,
              width: `${colWidth * 10}px`,
            }}
          >
            <span className="text-xs px-2 font-semibold">
              Pablo Müller | 2 P
            </span>
          </div>
          <div
            className={`absolute top-[110px] h-10 rounded-full bg-status_red shadow-sm flex items-center`}
            style={{
              left: `${booking_offset_left + colWidth * 2}px`,
              top: `${booking_offset_top + rowHeight * 3}px`,
              width: `${colWidth * 6}px`,
            }}
          >
            <span className="text-xs px-2 font-semibold truncate">
              Sandra Müller | 2 P
            </span>
          </div>
          <div
            className={`absolute top-[110px] h-10 rounded-full bg-status_red shadow-sm flex items-center`}
            style={{
              left: `${booking_offset_left + colWidth * 8}px`,
              top: `${booking_offset_top + rowHeight * 3}px`,
              width: `${colWidth * 5}px`,
            }}
          >
            <span className="text-xs px-2 font-semibold truncate">
              Sandra Müller | 2 P
            </span>
          </div>
          <div
            className={`absolute top-[110px] h-10 rounded-full bg-status_red shadow-sm flex items-center`}
            style={{
              top: `${booking_offset_top + rowHeight * 4}px`,
              left: `${booking_offset_left + colWidth * 1}px`,
              width: `${colWidth * 14}px`,
            }}
          >
            <span className="text-xs px-2 font-semibold truncate">
              Sandra Müller | 2 P
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingTimeline3;
