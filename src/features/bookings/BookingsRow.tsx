import { HiListBullet } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { IBookingTypes, StatusTypes } from "../../types/BookingTypes";

function BookingsRow({
  bookings,
  windowWidth,
}: { bookings: IBookingTypes } & { windowWidth: number }) {
  const {
    cabin: cabinNumber,
    guest,
    email,
    startDate,
    endDate,
    // numNights,
    // numGuests,
    status,
    hasBreakfast,
    totalPrice,
  } = bookings;

  return (
    <tr className="bg-gray-50 min-h-16 grid grid-cols-1 md:grid-cols-12 text-left hyphens-manual py-3 px-5 md:px-7 gap-2 border-t-[1px]">
      <td className="flex items-center font-semibold ">
        {windowWidth < 768 && "Zimmer:"} {cabinNumber}
      </td>
      <td className="flex items-center md:col-span-3">
        <div className="flex flex-col">
          {/* {windowWidth < 768 && <span className="font-semibold">Gast:</span>} */}

          <span className="font-semibold">{guest}</span>
          <span className="text-xs">{email}</span>
        </div>
      </td>
      <td className="flex items-center md:col-span-2">
        {startDate} - {endDate}
      </td>
      <td className={`flex items-center md:col-span-2`}>
        <div
          className={`md:col-span-4 p-1.5 md:w-full text-center rounded-md text-xs ${
            (status === StatusTypes.unconfirmed && "bg-blue-200") ||
            (status === StatusTypes.confirmed && "bg-green-200") ||
            (status === StatusTypes.checkedOut && "bg-gray-200")
          }`}
        >
          {status === StatusTypes.unconfirmed && "Nicht bestätigt"}
          {status === StatusTypes.confirmed && "Ausgechecked"}
          {status === StatusTypes.checkedOut && "Bestätigt"}
        </div>
      </td>
      <td className="flex items-center md:col-span-2">
        {windowWidth < 768 ? (
          <span>
            Frühstück?
            {
              <span className="font-semibold">
                {hasBreakfast ? " Ja" : " Nein"}
              </span>
            }
          </span>
        ) : hasBreakfast ? (
          "Ja"
        ) : (
          "Nein"
        )}
      </td>
      <td className="flex items-center">
        {windowWidth < 768 ? (
          <span>
            Endpreis:
            {<span className="font-semibold"> {totalPrice} €</span>}
          </span>
        ) : (
          <span className="font-semibold">{totalPrice} €</span>
        )}
      </td>
      <td className="flex justify-end">
        <ButtonIcon onClick={() => console.log(guest)}>
          <HiListBullet className="w-6 h-6" />
        </ButtonIcon>
      </td>
    </tr>
  );
}

export default BookingsRow;
