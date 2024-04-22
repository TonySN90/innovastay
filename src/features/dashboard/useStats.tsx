import moment from "moment";
import { LoadingTypes } from "../../types/GlobalTypes";
import { getPastDay, getToday } from "../../utils/datesHelper";
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
    const startDate = new Date(getPastDay(7));
    const endDate = new Date(getToday());
    const count = {};
    
    while (startDate < endDate) {
        count[startDate.toDateString()] = 0;
        startDate.setDate(startDate.getDate() + 1);
    }
    
    periodBookings.forEach((booking) => {
        const bookingStartDate = new Date(booking.startDate);
        const bookingEndDate = new Date(booking.endDate);
        
        while (bookingStartDate < bookingEndDate && bookingStartDate < endDate) {
            const dateString = bookingStartDate.toDateString();
            
    
            // Überprüfen, ob der Wert NaN ist
            if (isNaN(count[dateString])) {
                delete count[dateString]; // Lösche den Eintrag
            } else {
                count[dateString]++;
            }
            bookingStartDate.setDate(bookingStartDate.getDate() + 1);
        }   
    });

    console.log(count);
    

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