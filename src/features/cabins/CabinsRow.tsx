import { HiListBullet } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { ICabinTypes } from "../../types/cabinTypes";

function TableRow({
  cabins,
  windowWidth,
}: { cabins: ICabinTypes } & { windowWidth: number }) {
  const { capacity, price, discount, image, category, name } = cabins;

  return (
    <tr className="md:h-[70px] bg-gray-50 grid grid-cols-1 md:grid-cols-7 text-left hyphens-manual px-7 py-1 gap-2 border-t-[1px] shadow-lg shadow-indigo-100 rounded-md my-1.5 hover:bg-indigo-100">
      <td className="flex items-center">
        <div className="flex flex-col">
          <span className="font-semibold">{name}</span>
          <span className="text-xs">{category}</span>
        </div>
      </td>
      <td className="flex items-center md:col-span-2">
        Auf&shy;bet&shy;tung bis {capacity} Per&shy;sonen
      </td>
      <td className="flex items-center font-semibold">
        {windowWidth < 768 ? `Preis: ${price}` : price} €
      </td>
      <td
        className={`flex items-center ${
          discount && "text-green-600 font-semibold"
        }`}
      >
        {windowWidth < 768 ? (
          <span>Angebot: {discount}</span>
        ) : discount ? (
          <span>{discount} €</span>
        ) : (
          "Kein Angebot"
        )}
      </td>
      <td className="flex items-center w-[150px] md:w-[90px] md:max-h-[60px] overflow-hidden">
        <img className="rounded-md" src={image} alt="Bild des Zimmers" />
      </td>
      <td className="flex justify-end">
        <ButtonIcon onClick={() => console.log("test")}>
          <HiListBullet className="w-6 h-6" />
        </ButtonIcon>
      </td>
    </tr>
  );
}

export default TableRow;
