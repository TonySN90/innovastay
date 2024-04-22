import { useSearchParams } from "react-router-dom";
import { LoadingTypes } from "../../types/GlobalTypes";
import { getPastDay, getToday } from "../../utils/datesHelper";
import useCabins from "../cabins/useCabins";
import useBookingsAfterDate from "./useBookingsAfterDate";
import moment from "moment";

function useStats() {

    const [searchParams] = useSearchParams();
    const filter = Number(searchParams.get("stats") || 11);

    const { periodBookings, periodBookingsLoadingStatus } = useBookingsAfterDate('timePeriod');
    const { createdBookings, createdBookingsLoadingStatus: quantityBookingsLoadingStatus } = useBookingsAfterDate('createdAt');
    const { cabins } = useCabins();

    const startDate = new Date(getPastDay(filter));
    const endDate = new Date(getToday());
    const count = {};

    // Filter period-bookings 
    function filterBookings(bookings, startDate, endDate) {
        return bookings.filter(booking => {
            const bookingDate = new Date(booking.startDate);
            return bookingDate.toDateString() !== endDate.toDateString() &&
                bookingDate.getTime() > startDate.getTime();
        });
    }
    
    // Filter period-bookings 
    const filteredPeriodBookings = filterBookings(periodBookings, startDate, endDate);
    
    // quantity bookings
    const quantityBookings = filterBookings(createdBookings, startDate, endDate).length;
    

    // sales
    const sales = filteredPeriodBookings
    .reduce((total, booking) => total + booking.totalPrice, 0);

    // occupancy 
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

    let occupancy = 0;

    if(cabins.length > 0 && periodBookingsLoadingStatus === LoadingTypes.SUCCESS) {
        occupancy = Math.round(Object.values(count)
        .map((c) => c / cabins.length * 100)
        .reduce((a, b) => a + b, 0) / Object.values(count).length);
    }

    // check-ins
    const checkIns = filteredPeriodBookings.length;

    // sale-chart
    const salesData = [];


    for(let i = filter; i >= 0; i--) {
        const date = moment(getPastDay(i)).format('DD. MMMM');
        const dateObj = {date: date, sales: 0};
        salesData.push(dateObj);
    }

    filteredPeriodBookings.forEach((booking, i) => {
        const date1 = moment(getPastDay(i)).format('DD. MMMM');
        // salesData[]
        salesData[salesData.findIndex((d) => d.date === date1)].sales += booking.totalPrice;
    })
      

    return {
        quantityBookings,
        sales,
        occupancy,
        checkIns,
        periodBookingsLoadingStatus,
        quantityBookingsLoadingStatus,
        salesData
    }
}

export default useStats;