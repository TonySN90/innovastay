import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { IBookingStateTypes } from "../../types/BookingTypes";
import { fetchBookings } from "./bookingsSlice";
import { SchedulerData } from "@bitnoi.se/react-scheduler";
import { useSearchParams } from "react-router-dom";
import { IGuestStatesTypes } from "../../types/GuestTypes";

function useBookings() {
  const dispatch = useAppDispatch();
  const { bookings, loadingStatus } = useAppSelector(
    (state: { bookings: IBookingStateTypes }) => state.bookings
  );

  const { guests } = useAppSelector(
    (state: { guests: IGuestStatesTypes }) => state.guests
  );

  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const searchValue = searchParams.get("search");

  useEffect(() => {
    const statusFilter =
      !filterValue || filterValue === "all"
        ? null
        : { field: "status", value: filterValue, operator: "eq" };

    const guestFilter =
      !searchValue || searchValue === ""
        ? null
        : { field: "guestId", value: guests, operator: "in" };

    const filter = guestFilter || statusFilter;

    dispatch(fetchBookings(filter as { field: string; value: string }));
  }, [filterValue, searchValue, dispatch]);

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
