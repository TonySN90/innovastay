import { LoadingTypes } from "../../types/GlobalTypes";
import useCabins from "../cabins/useCabins";
import useBookingsAfterDate from "./useBookingsAfterDate";

function useStats() {
    const { periodBookings, periodBookingsLoadingStatus } = useBookingsAfterDate('timePeriod');
    const { createdBookings, createdBookingsLoadingStatus: quantityBookingsLoadingStatus } = useBookingsAfterDate('createdAt');

    const { cabins } = useCabins();

    // quantity bookings
    const quantityBookings = createdBookings.length;

    // sales
    const sales = periodBookings.reduce((total, booking) => total + booking.totalPrice, 0);

    // occupancy
    const count = {};

    periodBookings.forEach((booking) => {
        let startDate = new Date(booking.startDate).getDate();
        let endDate = new Date(booking.endDate).getDate();

        if(startDate < 14) startDate = 14;
        if(endDate >= 21) endDate = 21;

        for (let i = startDate; i <= endDate; i++) {
            count[i] = (count[i] || 0) + 1
        }
    });

    let occupancy = 0;

    if(cabins.length > 0 && periodBookingsLoadingStatus === LoadingTypes.SUCCESS) {
        occupancy = Math.round(Object.values(count)
        .map((c) => c / cabins.length * 100)
        .reduce((a, b) => a + b, 0) / Object.values(count).length);
        
    }

    // check-ins

    const checkIns = periodBookings.length;

    return {
        quantityBookings,
        sales,
        occupancy,
        checkIns,
        periodBookingsLoadingStatus,
        quantityBookingsLoadingStatus

    }
}

export default useStats;