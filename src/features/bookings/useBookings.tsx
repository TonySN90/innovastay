import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { IBookingStateTypes } from "../../types/BookingTypes";
import { fetchBookings } from "./bookingsSlice";
import { SchedulerData } from "@bitnoi.se/react-scheduler";

function useBookings() {
  const dispatch = useAppDispatch();
  const { bookings, loadingStatus, error } = useAppSelector(
    (state: { bookings: IBookingStateTypes }) => state.bookings
  );

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

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

  return { bookings, loadingStatus, error, mockedSchedulerData };
}

export default useBookings;
