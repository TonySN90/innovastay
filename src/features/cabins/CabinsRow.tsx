import { HiListBullet } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { ICabinTypes } from "../../types/cabinTypes";

function TableRow({ cabins }: { cabins: ICabinTypes }) {
  const { cabin, capacity, price, discount, img } = cabins;
  const { name: cabinName, category } = cabin;

  return (
    <tr className=" bg-gray-50 grid grid-cols-6 md:grid-cols-7 text-left hyphens-manual px-7 py-1 gap-2 border-t-[1px]">
      <td className="flex items-center">
        <div className="flex flex-col">
          <span className="font-semibold">{cabinName}</span>
          <span className="text-xs">{category}</span>
        </div>
      </td>
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
      <td className="flex justify-end col-span-4 md:col-auto">
        <ButtonIcon onClick={() => console.log("test")}>
          <HiListBullet className="w-6 h-6" />
        </ButtonIcon>
      </td>
    </tr>
  );
}

export default TableRow;
