import { useSearchParams } from "react-router-dom";
import { fetchBookings } from "../features/bookings/bookingsSlice";
import { fetchCabins } from "../features/cabins/cabinsSlice";
import { useAppDispatch } from "../store";
import { IFilterBaseTypes } from "../types/GlobalTypes";
import { fetchGuests } from "../features/guests/guestsSlice";

function useSort() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const filterSearch = searchParams.get("search");
  const filterStatus = searchParams.get("status");
  const filterCategory = searchParams.get("category");

  function sortBookings(filterBase: IFilterBaseTypes, sortParam: string) {
    const { category } = filterBase;

    let filterParam;
    switch (true) {
      case filterSearch !== undefined && filterSearch !== null:
        filterParam = {
          field: "fullName",
          value: filterSearch,
          operator: "ilike",
        };
        break;
      case filterStatus !== undefined && filterStatus !== null:
        filterParam = { field: "status", value: filterStatus, operator: "eq" };
        break;
      case filterCategory !== undefined && filterCategory !== null:
        filterParam = {
          field: "category",
          value: filterCategory,
          operator: "eq",
        };
        break;
      default:
        filterParam = {
          field: "created_at",
          value: filterCategory,
          operator: "eq",
        };
        break;
    }
    const { value } = filterParam;
    const filter = !value || value === "all" ? null : filterParam;

    const [field, direction] = sortParam.split("-");
    const sortBy = { field, direction };

    if (category === "bookings") dispatch(fetchBookings({ filter, sortBy }));
    if (category === "cabins") dispatch(fetchCabins({ filter, sortBy }));
    if (category === "guests") dispatch(fetchGuests({ filter, sortBy }));
  }

  return { sortBookings };
}

export default useSort;

// import { setBookings } from "../features/bookings/bookingsSlice";
// import { useAppDispatch, useAppSelector } from "../store";
// import { IBookingTypes } from "../types/BookingTypes";

// function useSort() {
//   const dispatch = useAppDispatch();
//   const { bookings } = useAppSelector((state) => state.bookings);

//   function sortTable(sortBy) {
//     const [field, direction] = sortBy.split("-");

//     const sortedBookings = bookings.slice().sort((bookingA, bookingB) => {
//       switch (field) {
//         case "startDate":
//           if (direction === "asc") {
//             return new Date(bookingB.startDate) - new Date(bookingA.startDate);
//           } else {
//             return new Date(bookingA.startDate) - new Date(bookingB.startDate);
//           }
//         case "totalPrice":
//           if (direction === "asc") {
//             return bookingB.totalPrice - bookingA.totalPrice;
//           } else {
//             return bookingA.totalPrice - bookingB.totalPrice;
//           }
//         default:
//           return 0;
//       }
//     });

//     console.log(sortBy);
//     dispatch(setBookings(sortedBookings as IBookingTypes[]));
//   }

//   return { sortTable };
// }

// export default useSort;
