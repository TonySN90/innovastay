import { HiListBullet } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { IBookingTypes } from "../../types/BookingTypes";

function BookingsRow({ bookings }: { bookings: IBookingTypes }) {
  const {
    cabin: cabinNumber,
    guest,
    email,
    startDate,
    endDate,
    // numNights,
    // numGuests,
    status,
    totalPrice,
  } = bookings;

  return (
    <tr className="bg-gray-50 min-h-16 grid grid-cols-14 md:grid-cols-12 text-left hyphens-manual py-3 px-5 gap-4 border-t-[1px]">
      <td className="flex items-center font-semibold grid-cols-3">
        {cabinNumber}
      </td>
      <td className="flex items-center md:col-span-4 xl:col-span-3">
        <div className="flex flex-col">
          <span className="font-semibold">{guest}</span>
          <span className="text-xs">{email}</span>
        </div>
      </td>
      <td className="flex items-center md:col-span-2">
        {startDate} - {endDate}
      </td>
      <td className={`flex items-center md:col-span-2`}>
        <div
          className={`col-span-4 p-1.5 rounded-md ${
            (status === "unconfirmed" && "bg-blue-200") ||
            (status === "confirmed" && "bg-green-200")
          }`}
        >
          {status}
        </div>
      </td>
      <td className="flex items-center">{totalPrice} €</td>
      <td className="flex md:justify-end md:col-span-2 xl:col-span-3">
        <ButtonIcon onClick={() => console.log(guest)}>
          <HiListBullet className="w-6 h-6" />
        </ButtonIcon>
      </td>
    </tr>
  );
}

export default BookingsRow;
