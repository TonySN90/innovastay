import { HiBars2, HiListBullet } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";

function Table() {
  return (
    <table role="table" className=" w-[100%] rounded-lg">
      <thead>
        <tr className="grid grid-cols-5 md:grid-cols-7 text-left hyphens-manual p-3 gap-4 bg-indigo-200">
          <th className="flex items-center">Zim&shy;mer</th>
          <th className="flex items-center col-span-2">Kapa&shy;zität</th>
          <th className="flex items-center">Preis</th>
          <th className="flex items-center">Ange&shy;bote</th>
        </tr>
      </thead>
      <tbody>
        <tr className=" bg-gray-50 grid grid-cols-5 md:grid-cols-7 text-left hyphens-manual px-2 py-1 gap-4 border border-t-2">
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
              <HiListBullet />
            </ButtonIcon>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
