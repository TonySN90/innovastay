import { useSearchParams } from "react-router-dom";
import { LoadingTypes } from "../../../types/GlobalTypes";
import { getPastDay, getToday } from "../../../utils/datesHelper";
import { ITodayCardBookingTypes } from "../../../types/DashboardTypes";
import { useAppSelector } from "../../../store";

function useStats() {
  const [searchParams] = useSearchParams();
  const filter = Number(searchParams.get("stats") || 7);

  console.log(filter);
  const { periodBookings, periodBookingsLoadingStatus, createdBookings } =
    useAppSelector((state) => state.dashboard);

  const { cabins } = useAppSelector((state) => state.cabins);

  const startDate = new Date(getPastDay(filter));
  const endDate = new Date(getToday({ end: true }));
  const count: { [key: string]: number } = {};

  // Filter period-bookings
  function filterBookings(
    bookings: ITodayCardBookingTypes[],
    startDate: Date,
    endDate: Date
  ) {
    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.startDate);
      return (
        bookingDate.getTime() >= startDate.getTime() &&
        bookingDate.getTime() <= endDate.getTime()
      );
    });
  }

  // Filter period-bookings
  const filteredPeriodBookings = filterBookings(
    periodBookings,
    startDate,
    endDate
  );

  // quantity bookings
  const quantityBookings = filterBookings(
    createdBookings,
    startDate,
    endDate
  ).length;

  // sales
  const sales = filteredPeriodBookings.reduce(
    (total, booking) => total + booking.totalPrice,
    0
  );

  // occupancy
  while (startDate < endDate) {
    count[startDate.toDateString()] = 0;
    startDate.setDate(startDate.getDate() + 1);
  }

  periodBookings.forEach((booking: ITodayCardBookingTypes) => {
    const bookingStartDate = new Date(booking.startDate);
    const bookingEndDate = new Date(booking.endDate);

    while (bookingStartDate < bookingEndDate && bookingStartDate < endDate) {
      const dateString = bookingStartDate.toDateString();

      if (isNaN(count[dateString])) {
        delete count[dateString];
      } else {
        count[dateString]++;
      }
      bookingStartDate.setDate(bookingStartDate.getDate() + 1);
    }
  });

  let occupancy = 0;

  if (
    cabins.length > 0 &&
    periodBookingsLoadingStatus === LoadingTypes.SUCCESS
  ) {
    occupancy = Math.round(
      Object.values(count)
        .map((c) => (c / cabins.length) * 100)
        .reduce((a, b) => a + b, 0) / Object.values(count).length
    );
  }

  // check-ins
  const checkIns = filteredPeriodBookings.length;

  return {
    quantityBookings,
    sales,
    occupancy,
    checkIns,
    periodBookingsLoadingStatus,
  };
}

export default useStats;
