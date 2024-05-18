import { CgSpinnerTwoAlt } from "react-icons/cg";
import MiniSpinner from "../../ui/MiniSpinner";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { BsClockFill } from "react-icons/bs";
import useTimeline from "./useTimeline";
import { createContext, useContext, ReactNode, useState, useRef } from "react";
import { ITimelineContextValue } from "../../types/TimelineTypes";
import { useNavigate } from "react-router";
import Modal from "../../ui/Modal";
import BookingInfoBox from "./bookingInfoBox";
import { BookingStatusTypes } from "../../types/BookingTypes";
import { TbDoorEnter, TbDoorExit } from "react-icons/tb";
import { MdModeEdit } from "react-icons/md";
import CreateBookingForm from "./CreateBookingForm";
import { PiInfoBold } from "react-icons/pi";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

const TimelineContext = createContext<ITimelineContextValue | undefined>(
  undefined
);

function TimelineContextProvider() {
  const timelineData = useTimeline();

  return (
    <TimelineContext.Provider value={timelineData}>
      <BookingTimeline />
    </TimelineContext.Provider>
  );
}

export default TimelineContextProvider;

function BookingTimeline() {
  return (
    <OutsideWrapper>
      <InsideWrapper>
        <BookingLoader />
        <SideBar>
          <Controls />
          <LabelBar />
        </SideBar>
        <Canvas />
      </InsideWrapper>
      <Caption />
    </OutsideWrapper>
  );
}

function OutsideWrapper({ children }: { children: ReactNode }) {
  return <div className="rounded-lg overflow-hidden">{children}</div>;
}

function InsideWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="relative lg:w-[72vw] flex shadow-xl overflow-x-auto max-w-[100%] bg-background_secondary">
      {children}
    </div>
  );
}

function SideBar({ children }: { children: ReactNode }) {
  const timelineData = useContext(TimelineContext);
  if (!timelineData) throw new Error("TimelineContext not found");

  const { labelWidth } = timelineData;

  return (
    <div
      className="bg-background_secondary h-full z-10"
      style={{ width: `${labelWidth}px` }}
    >
      {children}
    </div>
  );
}

function BookingLoader() {
  const timelineData = useContext(TimelineContext);
  if (!timelineData) throw new Error("TimelineContext not found");

  const { isLoadingBookings, isLoadingCabins } = timelineData;

  return (
    <>
      {isLoadingBookings && isLoadingCabins && (
        <div className="bg-status_red px-4 py-2 absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 flex gap-2 rounded-lg">
          <span>Buchungen laden</span>
          <div>
            <CgSpinnerTwoAlt className="animate-spin text-2xl text-text" />
          </div>
        </div>
      )}
    </>
  );
}

function Canvas() {
  const timelineData = useContext(TimelineContext);
  if (!timelineData) throw new Error("TimelineContext not found");

  const { monthWidth, handleScroll } = timelineData;

  return (
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
        <MonthRow />
        <div className="w-full flex border-l border-border">
          <CalendarDays />
          <Bookings />
        </div>
      </div>
    </div>
  );
}

function Controls() {
  const timelineData = useContext(TimelineContext);
  if (!timelineData) throw new Error("TimelineContext not found");

  const { loadCalendar, handleZoom, zoomLevel } = timelineData;

  return (
    <div className="h-[100px] flex flex-col justify-center items-center bg-active ">
      <div className="flex flex-col justify-between h-[70px]">
        <div className="font-semibold text-center">
          {new Date().toLocaleDateString("de-DE")}
        </div>
        <div className="flex justify-between w-[100px]">
          <div
            className="flex justify-center items-center w-10 pb-[2px] cursor-pointer hover:text-background_secondary transition-all"
            onClick={() => loadCalendar("left")}
          >
            <IoIosArrowDropleftCircle className="w-7 h-7" />
          </div>
          <div
            className="flex justify-center items-center w-10 cursor-pointer hover:text-background_secondary transition-all"
            onClick={() => loadCalendar("now")}
          >
            <BsClockFill className="w-8 h-8" />
          </div>
          <div
            className="flex justify-center items-center w-10 cursor-pointer hover:text-background_secondary transition-all"
            onClick={() => loadCalendar("right")}
          >
            <IoIosArrowDroprightCircle className="w-7 h-7" />
          </div>
        </div>
        <div className="flex justify-between w-[50px] m-auto">
          <div onClick={() => handleZoom("in")} className="cursor-pointer">
            <CiCirclePlus
              className={`w-5 h-5 ${zoomLevel === 2 ? "text-border" : ""}`}
            />
          </div>
          <div onClick={() => handleZoom("out")} className="cursor-pointer">
            <CiCircleMinus
              className={`w-5 h-5 ${zoomLevel === 1 && "text-border"}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MonthRow() {
  const timelineData = useContext(TimelineContext);
  if (!timelineData) throw new Error("TimelineContext not found");

  const { monthsToShow, getMonthWidth } = timelineData;

  return (
    <div className="flex">
      {monthsToShow.map((month) => (
        <div
          key={month.month + month.year}
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
  );
}

function CalendarDays() {
  const timelineData = useContext(TimelineContext);
  if (!timelineData) throw new Error("TimelineContext not found");

  const {
    monthsToShow,
    colWidth,
    rowHeight,
    memoizedCabins,
    todayElement,
    getDayColor,
    checkIfToday,
    dayHeight,
  } = timelineData;

  return (
    <>
      {monthsToShow.map((month) =>
        month.days.map((day) => (
          <div
            key={`${day}-${month.month}-${month.year}`}
            ref={checkIfToday(month, day) ? todayElement : null}
            className={`flex border-r border-border ${getDayColor(day, month)}`}
            style={{
              width: `${colWidth}px`,
              height: `${memoizedCabins.length * rowHeight + 50}px`,
            }}
          >
            <div className="justify-center items-center w-full">
              <div
                className="flex flex-col justify-center items-center border-b border-border"
                style={{
                  height: `${dayHeight}px`,
                  width: `${colWidth}px`,
                }}
              >
                <span className="font-semibold text-sm">
                  {month.weekdays[day - 1]}
                </span>
                <span className="text-sm">{day}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}

function LabelBar() {
  const timelineData = useContext(TimelineContext);
  if (!timelineData) throw new Error("TimelineContext not found");

  const { memoizedCabins, isLoadingCabins } = timelineData;

  return (
    <>
      {memoizedCabins.length === 0 && isLoadingCabins ? (
        <LabelsLoader />
      ) : (
        <Labels />
      )}
    </>
  );
}

function Labels() {
  const timelineData = useContext(TimelineContext);
  if (!timelineData) throw new Error("TimelineContext not found");

  const { memoizedCabins, rowHeight } = timelineData;

  return memoizedCabins.map((cabin) => {
    return (
      <div key={cabin.id}>
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
  });
}

function LabelsLoader() {
  const timelineData = useContext(TimelineContext);
  if (!timelineData) throw new Error("TimelineContext not found");

  const { rowHeight } = timelineData;

  return (
    <>
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="relative flex justify-center items-center gap-1 border-r-4 border-active"
          style={{ height: `${rowHeight}px` }}
        >
          <MiniSpinner />
        </div>
      ))}
    </>
  );
}

function Bookings() {
  const [hidden, setHidden] = useState(0);
  const [currentId, setCurrentId] = useState(0);
  const BookingElement = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const timelineData = useContext(TimelineContext);
  if (!timelineData) throw new Error("TimelineContext not found");

  function handleClick(status: string, id: number) {
    if (status === "checkedIn") navigate(`/checkOut/${id}`);
    if (status === "unconfirmed") navigate(`/checkIn/${id}`);
  }

  const {
    isLoadingCabins,
    isLoadingBookings,
    bookings,
    today,
    calcBookingPositionX,
    calcBookingPositionY,
    calcBookingWidth,
    getDateColor,
  } = timelineData;

  return (
    <div className="overflow-hidden">
      {isLoadingCabins && isLoadingBookings
        ? null
        : bookings.map((booking) => (
            <div
              ref={BookingElement}
              key={booking.id}
              className={`transition-all duration-500 absolute top-[110px] h-10 rounded-full overflow-none ${getDateColor(
                booking.startDate,
                booking.endDate,
                today
              )} shadow-md flex items-center`}
              style={{
                left: `${calcBookingPositionX(new Date(booking.startDate))}px`,
                top: `${calcBookingPositionY(booking.cabins.id)}px`,
                width: `${calcBookingWidth(
                  new Date(booking.startDate),
                  new Date(booking.endDate)
                )}px`,
              }}
              onMouseEnter={() => {
                {
                  setHidden(1), setCurrentId(booking.id);
                }
              }}
              onMouseLeave={() => setHidden(0)}
            >
              {booking.id === currentId && (
                <div
                  style={{ opacity: hidden, zIndex: 10 }}
                  className="transition-all text-sm p-1 absolute bottom-0 right-0 bg-timetable_weekend_bg border-2 border-border rounded-full"
                >
                  <Modal>
                    <div className="flex flex-col gap-1">
                      <Modal.Open opens="view">
                        <div className="flex items-center justify-center w-7 h-7 bg-status_blue rounded-full cursor-pointer">
                          <PiInfoBold />
                        </div>
                      </Modal.Open>
                      <Modal.Window name="view">
                        <BookingInfoBox bookingId={booking.id} />
                      </Modal.Window>

                      {/* if booking is today and unconf */}
                      {new Date(booking.startDate).toDateString() ===
                        new Date().toDateString() &&
                        booking.status === "unconfirmed" && (
                          <div
                            onClick={() =>
                              handleClick(booking.status, booking.id)
                            }
                            className="flex items-center justify-center w-7 h-7 bg-status_green rounded-full cursor-pointer"
                          >
                            <TbDoorEnter />
                          </div>
                        )}

                      {/* if booking is checkedIn */}
                      {booking.status === BookingStatusTypes.CHECKEDIN && (
                        <div
                          onClick={() =>
                            handleClick(booking.status, booking.id)
                          }
                          className="flex items-center justify-center w-7 h-7 bg-status_red rounded-full cursor-pointer"
                        >
                          <TbDoorExit />
                        </div>
                      )}

                      {/* if booking is checkedIn or unconf */}
                      {(booking.status === BookingStatusTypes.CHECKEDIN ||
                        booking.status === BookingStatusTypes.UNCONFIRMED) && (
                        <>
                          <Modal.Open opens="edit">
                            <div className="flex items-center justify-center w-7 h-7 bg-status_orange rounded-full cursor-pointer">
                              <MdModeEdit />
                            </div>
                          </Modal.Open>
                          <Modal.Window name="edit">
                            <CreateBookingForm bookingToUpdate={booking} />
                          </Modal.Window>
                        </>
                      )}
                    </div>
                  </Modal>
                </div>
              )}

              <div className="relative flex items-center text-xs px-3 font-semibold h-full w-full cursor-pointer">
                <div className="truncate">
                  <span>{`${booking.guests.fullName} | ${booking.numGuests} P`}</span>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}

function Caption() {
  return (
    <div className="flex flex-wrap gap-3 mt-2 md:ml-[155px] text-sm">
      <div className="flex items-center gap-1">
        <div className="w-4 h-4 bg-status_gray rounded-full"></div>
        <span>Ausgecheckt</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-4 h-4 bg-status_blue rounded-full"></div>
        <span>Eingecheckt</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-4 h-4 bg-status_green rounded-full"></div>
        <span>Anreisetag</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-4 h-4 bg-status_red rounded-full"></div>
        <span>Abreisetag</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-4 h-4 bg-status_orange rounded-full"></div>
        <span>Ausstehend</span>
      </div>
    </div>
  );
}
