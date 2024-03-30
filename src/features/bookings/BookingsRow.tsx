import { format } from "date-fns";
import { FaRegEdit } from "react-icons/fa";
import { TfiTrash } from "react-icons/tfi";
import { PiInfoBold } from "react-icons/pi";
import { IBookingTypes, BookingStatusTypes } from "../../types/BookingTypes";
import Modal from "../../ui/Modal";
import Menu from "../../ui/Menu";
import CreateBookingForm from "./CreateBookingForm";
import BookingInfoBox from "./bookingInfoBox";
import ConfirmDelete from "./confirmDelete";
import { useNavigate } from "react-router";
import { MdOutlineCheckCircleOutline } from "react-icons/md";

function BookingsRow({
  bookings,
  windowWidth,
}: { bookings: IBookingTypes } & { windowWidth: number }) {
  const {
    cabins: cabin,
    guests,
    startDate,
    endDate,
    status,
    hasBreakfast,
    totalPrice,
    id: bookingId,
  } = bookings;

  const navigate = useNavigate();

  return (
    <tr className="bg-gray-50 min-h-16 grid grid-cols-1 md:grid-cols-12 text-left hyphens-manual py-3 px-5 md:px-7 gap-2 border-t-[1px] rounded-md shadow-lg shadow-indigo-100 my-1.5 hover:bg-indigo-100">
      <td className="flex items-center font-semibold ">
        {windowWidth < 768 && "Zimmer:"} {cabin.name}
      </td>
      <td className="flex items-center md:col-span-3">
        <div className="flex flex-col">
          <span className="font-semibold">{guests.fullName}</span>
          <span className="text-xs">
            {windowWidth > 768
              ? guests.email.substring(0, 22) + "..."
              : guests.email}
          </span>
        </div>
      </td>
      <td className="flex items-center md:col-span-2">
        {format(new Date(startDate), "dd.MM.yyyy")} -{" "}
        {format(new Date(endDate), "dd.MM.yyyy")}
      </td>
      <td className={`flex items-center md:col-span-2`}>
        <div
          className={`md:col-span-4 p-1.5 md:w-[120px] text-center rounded-md text-xs ${
            (status === BookingStatusTypes.unconfirmed && "bg-blue-200") ||
            (status === BookingStatusTypes.confirmed && "bg-green-200") ||
            (status === BookingStatusTypes.checkedOut && "bg-gray-200")
          }`}
        >
          {status === BookingStatusTypes.unconfirmed && "Ausstehend"}
          {status === BookingStatusTypes.confirmed && "Bestätigt"}
          {status === BookingStatusTypes.checkedOut && "Ausgechecked"}
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
        <Modal>
          <Menu.List id={bookingId}>
            <Modal.Open opens="view">
              <Menu.Item>
                <PiInfoBold />
                Details ansehen
              </Menu.Item>
            </Modal.Open>

            <Modal.Open opens="edit">
              <Menu.Item>
                <FaRegEdit />
                Bearbeiten
              </Menu.Item>
            </Modal.Open>

            <Menu.Item onClick={() => navigate(`/checkin/${bookingId}`)}>
              <MdOutlineCheckCircleOutline />
              Einchecken
            </Menu.Item>

            <Modal.Open opens="delete">
              <Menu.Item>
                <TfiTrash />
                Löschen
              </Menu.Item>
            </Modal.Open>
          </Menu.List>

          <Modal.Window name="view">
            <BookingInfoBox windowWidth={windowWidth} booking={bookings} />
          </Modal.Window>

          <Modal.Window name="edit">
            <CreateBookingForm bookingToUpdate={bookings} />
          </Modal.Window>

          {/* <Modal.Window name="check-in">
            <div>Edit</div>
          </Modal.Window> */}

          <Modal.Window name="delete">
            <ConfirmDelete
              booking={bookings}
              bookingId={bookingId}
              onCloseModal={() => {}} //Children prop
            />
          </Modal.Window>

          <Menu.ToggleButton id={bookingId} />
        </Modal>
      </td>
    </tr>
  );
}

export default BookingsRow;
