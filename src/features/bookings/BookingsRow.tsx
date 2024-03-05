import { format } from "date-fns";
import { HiListBullet } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { IBookingTypes, StatusTypes } from "../../types/BookingTypes";

function BookingsRow({
  bookings,
  windowWidth,
}: { bookings: IBookingTypes } & { windowWidth: number }) {
  const {
    cabins,
    guests,
    startDate,
    endDate,
    status,
    hasBreakfast,
    totalPrice,
  } = bookings;

  return (
    <tr className="bg-gray-50 min-h-16 grid grid-cols-1 md:grid-cols-12 text-left hyphens-manual py-3 px-5 md:px-7 gap-2 border-t-[1px] rounded-md shadow-2xl shadow-indigo-300 my-1.5 hover:bg-indigo-100">
      <td className="flex items-center font-semibold ">
        {windowWidth < 768 && "Zimmer:"} {cabins.name}
      </td>
      <td className="flex items-center md:col-span-3">
        <div className="flex flex-col">
          {/* {windowWidth < 768 && <span className="font-semibold">Gast:</span>} */}

          <span className="font-semibold">{guests.fullName}</span>
          <span className="text-xs">{guests.email}</span>
        </div>
      </td>
      <td className="flex items-center md:col-span-2">
        {format(new Date(startDate), "dd.MM.yyyy")} -{" "}
        {format(new Date(endDate), "dd.MM.yyyy")}
      </td>
      <td className={`flex items-center md:col-span-2`}>
        <div
          className={`md:col-span-4 p-1.5 md:w-[120px] text-center rounded-md text-xs ${
            (status === StatusTypes.unconfirmed && "bg-blue-200") ||
            (status === StatusTypes.confirmed && "bg-green-200") ||
            (status === StatusTypes.checkedOut && "bg-gray-200")
          }`}
        >
          {status === StatusTypes.unconfirmed && "Ausstehend"}
          {status === StatusTypes.confirmed && "Bestätigt"}
          {status === StatusTypes.checkedOut && "Ausgechecked"}
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
        <ButtonIcon onClick={() => console.log(name)}>
          <HiListBullet className="w-6 h-6" />
        </ButtonIcon>
      </td>
    </tr>
  );
}

export default BookingsRow;
