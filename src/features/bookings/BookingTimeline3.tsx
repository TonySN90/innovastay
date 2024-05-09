import Logo from "../../ui/Logo";
import { getToday } from "../../utils/datesHelper";

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
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();

  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

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

  function checkIfWeekend(day: number) {
    const weekDay = new Date(
      firstDayOfMonth.getFullYear(),
      firstDayOfMonth.getMonth(),
      day
    ).toLocaleString("de-DE", { weekday: "short" });

    return weekDay === "Sa" || weekDay === "So";
  }

  function checkIfToday(day: number) {
    const today = new Date(getToday()).getDate();
    return day === today;
  }

  // constants
  const rowHight = 70;
  const colWidth = 60;

  const dayHight = 49;
  const monthWidth = days.length * colWidth;
  const labelWidth = 160;

  const booking_offset_left = 20;
  const booking_offset_top = 115;

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
                style={{ height: `${rowHight}px` }}
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
      <div className="h-full w-full overflow-x-scroll">
        <div
          className="relative h-full bg-background_secondary"
          style={{ width: `${monthWidth}px` }}
        >
          {/* Month-Row */}
          <div
            className={`bg-active flex justify-center items-center font-semibold `}
            style={{ height: `${50}px` }}
          >
            <span>{months[firstDayOfMonth.getMonth()]}</span>
          </div>

          {/* Days */}
          <div className="flex">
            {days.map((day) => (
              <div
                key={day}
                className={`border-r border-border  ${
                  checkIfToday(day) && "bg-active"
                }  ${checkIfWeekend(day) && "bg-timetable_weekend_bg"}`}
                style={{
                  width: `${colWidth}px`,
                }}
              >
                <div className="w-full" style={{ height: `${dayHight}px` }}>
                  <div className="font-semibold text-center">
                    {new Date(
                      firstDayOfMonth.getFullYear(),
                      firstDayOfMonth.getMonth(),
                      day
                    ).toLocaleString("de-DE", { weekday: "short" })}
                  </div>
                  <div className="text-center">{day}</div>
                </div>

                {timelineData.map((data) => (
                  <>
                    <div
                      key={data.id}
                      className={`w-full border-t border-border`}
                      style={{
                        height: `${rowHight}px`,
                      }}
                    ></div>
                  </>
                ))}
              </div>
            ))}
          </div>
          {/* Bookings */}
          <div
            className={`absolute top-[110px] h-10 rounded-full bg-status_red shadow-md border-2 border-gray-200 flex items-center truncate`}
            style={{
              left: `${booking_offset_left + 60}px`,
              top: `${booking_offset_top + 70}px`,
              width: `${colWidth * 1}px`,
              // breite des cols * anzahl der Tage
            }}
          >
            <span className="text-xs px-2 font-semibold">
              Sandra Müller | 2 P
            </span>
          </div>
          <div
            className={`absolute top-[110px] h-10 rounded-full bg-status_red shadow-sm border-2 border-gray-200 flex items-center`}
            style={{
              left: `${booking_offset_left + 120}px`,
              top: `${115 + 70}px`,
              width: "300px",
            }}
          >
            <span className="text-xs px-2 font-semibold">
              Pablo Müller | 2 P
            </span>
          </div>
          <div
            className={`absolute top-[110px] h-10 rounded-full bg-status_red shadow-sm border-2 border-gray-200 flex items-center`}
            style={{
              left: `${booking_offset_left - colWidth + colWidth * 10}px`,
              top: `${20 + 150}px`,
              width: "100px",
            }}
          >
            <span className="text-xs px-2 font-semibold truncate">
              Sandra Müller | 2 P
            </span>
          </div>
          <div
            className={`absolute top-[110px] h-10 rounded-full bg-status_red shadow-sm border-2 border-gray-200 flex items-center`}
            style={{
              left: `${booking_offset_left + 650}px`,
              top: `${20 + 150}px`,
              width: "250px",
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
