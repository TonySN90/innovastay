import { HiListBullet } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { IGuestTypes } from "../../types/GuestTypes";

function GuestsRow({
  guestInformation,
  windowWidth,
}: { guestInformation: IGuestTypes } & { windowWidth: number }) {
  const {
    guest,
    address,
    city,
    postalCode,
    phone,
    email,
    maxStays,
    lastStay,
    information: info,
  } = guestInformation;

  return (
    <tr className=" bg-gray-50 grid grid-cols-5 md:grid-cols-7 text-left hyphens-manual p-4 px-7 gap-2 border-t-[1px] min-h-[70px]">
      <td className="flex items-center font-semibold col-span-2 md:col-auto">
        <div className="flex flex-col">
          <span className="font-semibold">{guest}</span>
        </div>
      </td>
      <td className="flex items-center col-span-4 md:col-span-2">
        <div className="flex flex-col">
          <span className="font-semibold">
            {address}, {postalCode}, {city}
          </span>
          <span className="text-xs">{email}</span>
          <span className="text-xs">Tel: {phone}</span>
        </div>
      </td>
      <td className={`flex items-center col-span-5 md:col-auto`}>
        {windowWidth > 768 ? (
          lastStay
        ) : (
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Letzter Aufenthalt: </span>
            {lastStay}
          </div>
        )}
      </td>
      <td className={`flex items-center col-span-5 md:col-auto`}>
        {windowWidth > 768 ? (
          maxStays
        ) : (
          <div className="flex flex-col">
            <span className="font-semibold text-sm">
              Aufenthalte insgesamt:
            </span>
            {maxStays}
          </div>
        )}
      </td>
      <td className={`flex items-center col-span-4 md:col-auto`}>
        {info.substring(0, 30) + "..."}
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
