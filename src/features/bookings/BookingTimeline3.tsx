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

  console.log(
    new Date(
      firstDayOfMonth.getFullYear(),
      firstDayOfMonth.getMonth(),
      1
    ).toLocaleString("de-DE", { weekday: "short" })
  );

  function checkIfWeekend(day: number) {
    const weekDay = new Date(
      firstDayOfMonth.getFullYear(),
      firstDayOfMonth.getMonth(),
      day
    ).toLocaleString("de-DE", { weekday: "short" });

    console.log(weekDay === "Sa" || weekDay === "So");
    return weekDay === "Sa" || weekDay === "So";
  }

  return (
    <div className="bg-red-200 h-[450px] lg:w-[71vw] rounded-lg flex">
      {/* green */}
      <div className="bg-green-200 w-[150px] h-full">
        {/* yello */}
        <div className="h-[6rem] flex justify-center items-center bg-yellow-100 border-b border-border">
          Kalender
        </div>

        {/* rooms */}
        <div className="scroll-margin-left-[150px]">
          <div className="h-[4rem] border-b border-border">Zimmer 1</div>
          <div className="h-[4rem] border-b border-border">Zimmer 2</div>
          <div className="h-[4rem] border-b border-border">Zimmer 3</div>
          <div className="h-[4rem] border-b border-border">Zimmer 4</div>
          <div className="h-[4rem] border-b border-border">Zimmer 5</div>
        </div>
      </div>

      {/* canvas */}
      <div className="h-full w-full overflow-x-scroll">
        <div
          id="Kalender"
          className="h-full bg-background_secondary w-[1500px]"
        >
          {/* Month */}
          <div
            className={`h-[3rem] w-[${
              days.length * 50
            }px] bg-background_secondary flex justify-center items-center font-semibold `}
          >
            <span>{months[firstDayOfMonth.getMonth()]}</span>
          </div>

          {/* Days */}
          <div className="flex">
            {days.map((day) => (
              <div
                key={day}
                className={`w-[50px] bg-gray-50 flex flex-col items-center border border-border ${
                  checkIfWeekend(day) && "bg-table_header"
                }`}
              >
                <div className="font-semibold">
                  {new Date(
                    firstDayOfMonth.getFullYear(),
                    firstDayOfMonth.getMonth(),
                    day
                  ).toLocaleString("de-DE", { weekday: "short" })}
                </div>
                <div>{day}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingTimeline3;
