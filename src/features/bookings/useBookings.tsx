import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { IBookingStateTypes } from "../../types/BookingTypes";
import { fetchBookings } from "./bookingsSlice";
import { SchedulerData } from "@bitnoi.se/react-scheduler";
import { useSearchParams } from "react-router-dom";

function useBookings() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { bookings, loadingStatus } = useAppSelector(
    (state: { bookings: IBookingStateTypes }) => state.bookings
  );

  useEffect(() => {
    // Filter
    const statusValue = searchParams.get("status");
    const searchValue = searchParams.get("search");

    let filter;
    filter = searchValue
      ? { field: "fullName", value: searchValue, operator: "ilike" }
      : null;

    filter =
      statusValue && statusValue !== "all"
        ? { field: "status", value: statusValue, operator: "eq" }
        : null;

    // Sort
    const sortValue = searchParams.get("sort") || "startDate-desc";
    const [field, direction] = sortValue.split("-");
    const sortBy = { field, direction };

    // Page
    // const page = !searchParams.get("page")
    //   ? 1
    //   : Number(searchParams.get("page"));
    const page = null;
    // console.log(filter);

    dispatch(fetchBookings({ filter, sortBy, page }));
  }, [dispatch, searchParams]);

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
        startDate: new Date(booking.startDate),
        endDate: new Date(booking.endDate),
        occupancy: 0,
        title: booking.guests.fullName,
        subtitle: booking.numGuests + " Gast/Gäste",
        description: booking.guests.email,
        bgColor: "#C7D2FE",
      };

      roomData.data.push(bookingData);
    });

    return Array.from(roomBookingsMap.values());
  }

  const mockedSchedulerData: SchedulerData = convertData();

  return { bookings, loadingStatus, mockedSchedulerData };
}

export default useBookings;
