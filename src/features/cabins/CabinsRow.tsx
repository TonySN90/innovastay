import { HiListBullet } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";

function TableRow({ cabin }) {
  const { cabin: cabinNumber, capacity, price, discount, img } = cabin;

  return (
    <tr className=" bg-gray-50 grid grid-cols-5 md:grid-cols-7 text-left hyphens-manual px-2 py-1 gap-4 border-t-[1px]">
      <td className="flex items-center font-semibold">{cabinNumber}</td>
      <td className="flex items-center col-span-2">
        Auf&shy;bet&shy;tung bis {capacity} Per&shy;sonen
      </td>
      <td className="flex items-center">{price} €</td>
      <td className={`flex items-center ${discount && "text-green-600"}`}>
        {discount ? discount + "€" : "-"}
      </td>
      <td>
        <img className="w-[70px]" src={img} alt="" />
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
