import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { IBookingStateTypes } from "../../types/BookingTypes";
import { fetchBookings } from "./bookingsSlice";
import { SchedulerData } from "@bitnoi.se/react-scheduler";
import { useLocation, useSearchParams } from "react-router-dom";

function useBookings() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { bookings, loadingStatus } = useAppSelector(
    (state: { bookings: IBookingStateTypes }) => state.bookings
  );
  const location = useLocation();
  const pathName = location.pathname;

  useEffect(() => {
    // Filter
    const statusValue = searchParams.get("status");
    const searchValue = searchParams.get("search");
    const filterDateValue = searchParams.get("filterDate");

    function createSchedularFilter() {
      const year = filterDateValue?.split("-")[0];
      const month = filterDateValue?.split("-")[1];
      const schedularStartDate = new Date(`${year}-${month}-01`);

      const schedularEndDate = new Date(schedularStartDate);
      schedularEndDate.setMonth(schedularStartDate.getMonth() + 2);

      return {
        field: "startDate",
        field2: "endDate",
        value: schedularStartDate.toISOString(),
        value2: schedularEndDate.toISOString(),
        operator: "gte",
      };
    }

    let filter;
    switch (true) {
      case statusValue && statusValue !== "all":
        filter = { field: "status", value: statusValue, operator: "eq" };
        break;
      case typeof searchValue !== "undefined" && searchValue !== null:
        filter = { field: "fullName", value: searchValue, operator: "ilike" };
        break;
      default:
        filter = null;
        break;
      case filterDateValue && filterDateValue !== "undefined":
        filter = createSchedularFilter();
        break;
    }

    // Sort
    const sortValue = searchParams.get("sort") || "startDate-asc";
    const [field, direction] = sortValue.split("-");
    const sortBy = { field, direction };

    // Page
    const page = !searchParams.get("page")
      ? 1
      : Number(searchParams.get("page"));

    if (pathName === "/bookings")
      dispatch(fetchBookings({ filter, sortBy, page }));
    if (pathName === "/schedular") dispatch(fetchBookings({ filter }));
  }, [dispatch, searchParams, pathName]);

  function convertData() {
    const roomBookingsMap = new Map();

    bookings.forEach((booking) => {
      const roomId = booking.cabins.id;

      if (!roomBookingsMap.has(roomId)) {
        roomBookingsMap.set(roomId, {
          id: roomId,
          label: {
            icon: booking.cabins.image,
            title: booking.cabins.name,
            subtitle: booking.cabins.category,
          },
          data: [],
        });
      }

      const roomData = roomBookingsMap.get(roomId);

      const bookingData = {
        id: booking.id,
        startDate: new Date(booking.startDate.split("T")[0] + "T15:00:00"),
        endDate: new Date(booking.endDate.split("T")[0] + "T10:00:00"),

        // occupancy: 0,
        title: booking.guests.fullName,
        subtitle: booking.numGuests + " Gast/Gäste",
        description: booking.guests.email,
        // bgColor: "#C7D2FE",
      };

      roomData.data.push(bookingData);
    });

    return Array.from(roomBookingsMap.values());
  }

  const mockedSchedulerData: SchedulerData = convertData();

  return { bookings, loadingStatus, mockedSchedulerData };
}

export default useBookings;
