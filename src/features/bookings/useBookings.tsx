import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { IBookingStateTypes } from "../../types/BookingTypes";
import { fetchBookings } from "./bookingsSlice";
import { SchedulerData } from "@bitnoi.se/react-scheduler";

function useBookings() {
  const dispatch = useAppDispatch();
  const { bookings, status, error } = useAppSelector(
    (state: { bookings: IBookingStateTypes }) => state.bookings
  );

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  function convertData() {
    return bookings.map((booking) => {
      const bookingData = {
        id: booking.cabins.id,
        label: {
          icon: "avatar.jpeg",
          title: booking.cabins.name,
          subtitle: booking.cabins.category,
        },
        data: [
          {
            id: booking.id,
            startDate: new Date(booking.startDate),
            endDate: new Date(booking.endDate),
            occupancy: 0,
            title: booking.guests.fullName,
            subtitle: booking.numGuests + " Gast/Gäste",
            description: booking.guests.email,
            bgColor: "#C7D2FE",
          },
        ],
      };
      return bookingData;
    });
  }

  const mockedSchedulerData: SchedulerData = convertData();

  return { bookings, status, error, mockedSchedulerData };
}

export default useBookings;
