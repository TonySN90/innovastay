import { BsPeopleFill } from "react-icons/bs";
import { PiInfoBold } from "react-icons/pi";
import { TbDoorEnter, TbDoorExit } from "react-icons/tb";
import { Link } from "react-router-dom";
import Modal from "../../ui/Modal";
import BookingInfoBox from "../bookings/bookingInfoBox";

function InfoCardRow({
  id,
  status,
  name,
  bookingId,
  cabin,
  nights,
  textColor,
  backgroundColor,
}: {
  id: string;
  status: string;
  name: string;
  bookingId: number;
  cabin: string;
  nights: number;
  textColor: string;
  backgroundColor: string;
}) {
  return (
    <tr>
      <td className="flex justify-between py-2 px-4">
        <div className="flex flex-col">
          <div className="flex gap-3">
            <div>
              <BsPeopleFill className={`${textColor} text-lg`} />
            </div>
            <span className="font-semibold text-sm">{name}</span>
          </div>
          <div className="font text-sm">
            <span>
              #{bookingId} - {cabin}
            </span>
            <span>
              {" "}
              {nights > 1 ? ` - ${nights} Nächte` : ` - ${nights} Nacht`}
            </span>
          </div>
        </div>

        {id === "arrival" && status === "checkedIn" && (
          <RowInfoText info="bereits eingecheckt" />
        )}
        {id === "arrival" && status === "unconfirmed" && (
          <Link to={`/checkin/${bookingId}`}>
            <RowButton backgroundColor={backgroundColor} onClick={() => {}}>
              <TbDoorEnter className={`${textColor} text-lg`} />
            </RowButton>
          </Link>
        )}

        {id === "departure" && status === "checkedOut" && (
          <RowInfoText info="bereits ausgecheckt" />
        )}
        {id === "departure" && status === "checkedIn" && (
          <Link to={`/checkout/${bookingId}`}>
            <RowButton backgroundColor={backgroundColor} onClick={() => {}}>
              <TbDoorExit className={`${textColor} text-lg`} />
            </RowButton>
          </Link>
        )}

        {id === "presentGuests" && status === "checkedIn" && (
          <Modal>
            <Modal.Open opens="view">
              <RowButton backgroundColor={backgroundColor} onClick={() => {}}>
                <PiInfoBold className={`${textColor} text-lg`} />
              </RowButton>
            </Modal.Open>

            <Modal.Window name="view">
              <BookingInfoBox bookingId={bookingId} />
            </Modal.Window>
          </Modal>
        )}
      </td>
    </tr>
  );
}

function RowInfoText({ info }: { info: string }) {
  return <p className="text-sm flex items-center italic ">{info}</p>;
}

function RowButton({
  children,
  backgroundColor,
  onClick,
}: {
  children: React.ReactNode;
  backgroundColor: string;
  onClick: () => void;
}) {
  return (
    <div
      className={`flex justify-center items-center ${backgroundColor} rounded-full w-10 h-10 cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default InfoCardRow;
