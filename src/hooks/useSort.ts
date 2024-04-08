import { setBookings } from "../features/bookings/bookingsSlice";
import { useAppDispatch, useAppSelector } from "../store";
import { IBookingTypes } from "../types/BookingTypes";

function useSort() {
  const dispatch = useAppDispatch();
  const { bookings } = useAppSelector((state) => state.bookings);

  function sortTable(sortBy) {
    const [field, direction] = sortBy.split("-");

    const sortedBookings = bookings.slice().sort((bookingA, bookingB) => {
      switch (field) {
        case "startDate":
          if (direction === "asc") {
            return new Date(bookingB.startDate) - new Date(bookingA.startDate);
          } else {
            return new Date(bookingA.startDate) - new Date(bookingB.startDate);
          }
        case "totalPrice":
          if (direction === "asc") {
            return bookingB.totalPrice - bookingA.totalPrice;
          } else {
            return bookingA.totalPrice - bookingB.totalPrice;
          }
        default:
          return 0;
      }
    });

    dispatch(setBookings(sortedBookings as IBookingTypes[]));
  }

  return { sortTable };
}

export default useSort;
