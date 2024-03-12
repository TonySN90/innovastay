import { format } from "date-fns";
import { HiListBullet } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { IGuestTypes } from "../../types/GuestTypes";

function GuestsRow({
  guest,
  windowWidth,
}: { guest: IGuestTypes } & { windowWidth: number }) {
  const {
    fullName,
    address,
    city,
    postalCode,
    phone,
    email,
    guestSince,
    created_at: createdAt,
    information: info,
  } = guest;

  return (
    <tr className="shadow-lg shadow-indigo-100 bg-gray-50 grid grid-cols-5 md:grid-cols-10 text-left hyphens-manual rounded-md min-h-[70px] p-4 px-7 gap-2 border-indigo-300 my-1.5 hover:bg-indigo-100">
      <td className="flex items-center font-semibold col-span-2 md:col-span-2">
        <div className="flex flex-col">
          <span className="font-semibold">{fullName}</span>
        </div>
      </td>
      <td className="flex items-center col-span-5 md:col-span-3">
        <div className="flex flex-col">
          <span className="font-semibold">
            {address}, {postalCode}, {city}
          </span>
          <span className="text-xs">{email}</span>
          <span className="text-xs">Tel: {phone}</span>
        </div>
      </td>
      <td className={`flex items-center col-span-5 md:col-span-2`}>
        {windowWidth > 768 ? (
          `${format(new Date(createdAt), "dd.MM.yyyy")}`
        ) : (
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Gast seit: </span>
            {format(new Date(createdAt), "dd.MM.yyyy")}
          </div>
        )}
      </td>
      <td className={`flex items-center col-span-5 md:col-auto`}>
        {windowWidth > 768 ? (
          "3"
        ) : (
          <div className="flex flex-col">
            <span className="font-semibold text-sm">
              Aufenthalte insgesamt:
            </span>
            {"3"}
          </div>
        )}
      </td>
      <td className={`flex items-center col-span-4 md:col-auto`}>
        {windowWidth > 768 ? info.substring(0, 20) + "..." : info}
      </td>

      <td className="flex justify-end col-span-1 md:col-auto">
        <ButtonIcon onClick={() => console.log("test")}>
          <HiListBullet className="w-6 h-6" />
        </ButtonIcon>
      </td>
    </tr>
  );
}

export default GuestsRow;
