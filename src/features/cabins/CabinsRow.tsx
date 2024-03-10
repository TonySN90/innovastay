import { FaRegEdit } from "react-icons/fa";
import { ICabinTypes } from "../../types/cabinTypes";
import Menu from "../../ui/Menu";
import Modal from "../../ui/Modal";

import { IoDuplicateOutline } from "react-icons/io5";

import { TfiTrash } from "react-icons/tfi";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";

function TableRow({
  cabins,
  windowWidth,
}: { cabins: ICabinTypes } & { windowWidth: number }) {
  const {
    capacity,
    price,
    discount,
    image,
    category,
    name,
    id: cabinId,
  } = cabins;

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
        <Modal>
          <Menu.List cabinId={cabinId}>
            <Menu.Item>
              <IoDuplicateOutline />
              Duplizieren
            </Menu.Item>

            <Modal.Open opens="edit">
              <Menu.Item>
                <FaRegEdit />
                Bearbeiten
              </Menu.Item>
            </Modal.Open>

            <Menu.Item>
              <TfiTrash />
              Löschen
            </Menu.Item>

            <Modal.Open opens="edit">
              <Button
                type="button"
                variation="standard"
                size="lg"
                extras="rounded-lg"
                content="Edit"
              />
            </Modal.Open>

            <Modal.Window name="edit">
              <CreateCabinForm />
            </Modal.Window>
          </Menu.List>
          <Menu.ToggleButton cabinId={cabinId} />
        </Modal>
      </td>
    </tr>
  );
}

export default TableRow;
