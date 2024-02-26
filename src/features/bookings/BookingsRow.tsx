import { HiListBullet } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";

function BookingsRow({ bookings }) {
  console.log(bookings);
  const {
    cabin: cabinNumber,
    guest,
    email,
    startDate,
    endDate,
    numNights,
    numGuests,
    status,
    amount,
    totalPrice,
  } = bookings;

  return (
    <tr className=" bg-gray-50 h-14 grid grid-cols-5 md:grid-cols-7 text-left hyphens-manual px-2 py-1 gap-4 border-t-[1px]">
      <td className="flex items-center font-semibold">{cabinNumber}</td>
      <td className="flex items-center ">
        <div className="flex flex-col">
          <span>{guest}</span>
          <span className="text-xs">{email}</span>
        </div>
      </td>
      <td className="flex items-center col-span-2">
        {startDate} - {endDate}
      </td>
      <td className={`flex items-center`}>
        <div
          className={`p-1.5 rounded-md ${
            status === "unconfirmed" && "bg-blue-200"
          }`}
        >
          {status}
        </div>
      </td>
      <td className="flex items-center">{totalPrice} €</td>
      <td className="flex flex-end mx-auto">
        <ButtonIcon>
          <HiListBullet className="w-6 h-6" />
        </ButtonIcon>
      </td>
    </tr>
  );
}

export default BookingsRow;
