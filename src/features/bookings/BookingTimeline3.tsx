import { getToday } from "../../utils/datesHelper";

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

  return (
    <div className="lg:w-[71vw] rounded-lg flex shadow-xl">
      {/* green */}
      <div className="bg-background_secondary w-[160px] h-full shadow-lg shadow--shadow z-10">
        {/* Left Corner */}
        <div className="h-[100px] flex justify-center items-center bg-active border-b border-border">
          <img className="h-[4.5rem]" src="logo_light.svg" alt="" />
        </div>

        {/* rooms */}
        {timelineData.map((data) => {
          return (
            <div className="scroll-margin-left-[160px]">
              <div className="relative flex justify-center items-center gap-1 h-[60px] border-b border-border">
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
        <div className="relative h-full bg-background_secondary w-[1600px]">
          {/* Month */}
          <div
            className={`h-[50px] w-[${
              days.length * 50
            }px] bg-active flex justify-center items-center font-semibold `}
          >
            <span>{months[firstDayOfMonth.getMonth()]}</span>
          </div>

          {/* Days */}
          <div className="flex">
            {days.map((day) => (
              <div
                key={day}
                className={`w-[50px] flex flex-col items-center border border-border ${
                  checkIfToday(day) && "bg-active border-none"
                }  ${checkIfWeekend(day) && "bg-rose-50"}`}
              >
                <div className="font-semibold">
                  {new Date(
                    firstDayOfMonth.getFullYear(),
                    firstDayOfMonth.getMonth(),
                    day
                  ).toLocaleString("de-DE", { weekday: "short" })}
                </div>
                <div>{day}</div>

                {timelineData.map((data) => (
                  <>
                    <div
                      key={data.id}
                      className={`w-full h-[60px] border-t border-border`}
                    ></div>
                  </>
                ))}
              </div>
            ))}
          </div>
          <div
            className={`absolute h-10 rounded-full bg-status_red shadow-sm shadow-gray-200 border-2 border-gray-50 flex items-center`}
            style={{
              left: `${20 + 50}px`,
              top: `${10 + 100}px`,
              width: "200px",
            }}
          >
            {" "}
            <span className="text-xs px-2 font-semibold">
              Sandra Müller | 2 P
            </span>
          </div>
          <div
            className={`absolute top-[110px] left-[20px] h-10 rounded-full bg-status_red shadow-md border-2 border-gray-50 shadow-gray-400 flex items-center`}
            style={{
              left: `${20 + 100}px`,
              top: `${20 + 150}px`,
              width: "300px",
            }}
          >
            <span className="text-xs px-2 font-semibold">
              Sandra Müller | 2 P
            </span>
          </div>
          <div
            className={`absolute top-[110px] left-[20px] h-10 rounded-full bg-status_yellow shadow-md border-2 border-gray-50 shadow-gray-400 flex items-center`}
            style={{
              left: `${20 + 400}px`,
              top: `${20 + 150}px`,
              width: "100px",
            }}
          >
            <span className="text-xs px-2 font-semibold truncate">
              Sandra Müller | 2 P
            </span>
          </div>
          <div
            className={`absolute top-[110px] left-[20px] h-10 rounded-full bg-status_green shadow-md border-2 border-gray-50 shadow-gray-400 flex items-center overflow-hidden`}
            style={{
              left: `${20 + 500}px`,
              top: `${20 + 150}px`,
              width: "100px",
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
