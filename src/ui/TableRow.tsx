import { HiListBullet } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";

function TableRow() {
  return (
    <tr className=" bg-gray-50 grid grid-cols-5 md:grid-cols-7 text-left hyphens-manual px-2 py-1 gap-4 ">
      <td className="flex items-center">01</td>
      <td className="flex items-center col-span-2">
        Auf&shy;bet&shy;tung bis 2 Per&shy;sonen
      </td>
      <td className="flex items-center">250 €</td>
      <td className="flex items-center text-green-600">220 €</td>
      <td>
        <img className="w-[70px]" src="avatar.jpeg" alt="" />
      </td>
      <td className="flex flex-end mx-auto">
        <ButtonIcon>
          <HiListBullet className="w-6 h-6" />
        </ButtonIcon>
      </td>
    </tr>
  );
}

export default TableRow;
