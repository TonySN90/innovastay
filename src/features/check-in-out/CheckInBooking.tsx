import {
  MdFamilyRestroom,
  MdOutlineEuroSymbol,
  MdOutlineHotel,
} from "react-icons/md";
import { GiMeal } from "react-icons/gi";
import Button from "../../ui/Button";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import { formatDate, formatTime } from "../../utils/datesHelper";
import { StatusTypes } from "../../types/GlobalTypes";
import Empty from "../../ui/Empty";
import { IBookingTypes } from "../../types/BookingTypes";
import Modal from "../../ui/Modal";
import BookingInfoBox from "../bookings/bookingInfoBox";
import useWindowWidth from "../../hooks/UseWindowWidth";
import useCheckIn from "./useCheckIn";

function CheckInBooking() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [confirmPaid, setConfirmPaid] = useState(false);
  const { booking, loadingStatus } = useBooking(bookingId);
  const { checkIn, updatingStatus: checkInStatus } = useCheckIn(navigate);

  const isWorking = loadingStatus || checkInStatus;

  if (isWorking === StatusTypes.LOADING) return <Spinner />;
  if (!Object.keys(booking).length) return <Empty resourceName="Die Buchung" />;

  const {
    cabinId,
    startDate,
    endDate,
    numGuests,
    hasBreakfast,
    extrasPrice,
    totalPrice,
    guestId,
    created_at,
    isPaid,
  } = booking;

  const handleCheckIn = () => {
    checkIn(bookingId, {
      isPaid: true,
      status: "checkedIn",
      cabinId,
      startDate,
      endDate,
      numGuests,
      hasBreakfast,
      extrasPrice,
      totalPrice,
      guestId,
      created_at,
    });
  };

  return (
    <>
      <h2 className="text-3xl font-semibold">Check-In Buchung #{bookingId}</h2>

      <CheckInSection>
        <CheckInHeader booking={booking} />
        <CheckInBody booking={booking} setConfirmPaid={setConfirmPaid} />
        <CheckInFooter booking={booking} />
      </CheckInSection>
      <Buttons>
        <Button
          type="submit"
          onClick={() => {
            handleCheckIn();
          }}
          variation="standard"
          size="lg"
          extras="mr-2 rounded-lg"
          content={"Buchung #" + bookingId + " einchecken"}
          loading={!confirmPaid && !isPaid}
        />
        <Button
          onClick={() => {
            navigate(-1);
          }}
          variation="inverted"
          size="lg"
          extras="rounded-lg"
          content="Zurück"
        />
      </Buttons>
    </>
  );
}

export default CheckInBooking;

function CheckInHeader({ booking }) {
  const {
    numNights,
    cabins: { name },
    startDate,
    endDate,
  } = booking;

  return (
    <header className="md:flex items-center mt-5 justify-between text-gray-50 py-4 bg-indigo-500 px-8 text-xl rounded-t-md ">
      <div className="md:flex gap-2 w-[270px]">
        <MdOutlineHotel className="text-2xl" />
        <div>
          {numNights} Nächte in {name}
        </div>
      </div>
      <div>
        {formatDate(new Date(startDate))} - {formatDate(new Date(endDate))}
      </div>
    </header>
  );
}

function CheckInBody({ booking, setConfirmPaid }) {
  return (
    <section>
      <div className="px-8 py-8 ">
        <BookingInformation booking={booking} />
        <PricesBox booking={booking} setConfirmPaid={setConfirmPaid} />
      </div>
    </section>
  );
}

function CheckInFooter({ booking }: { booking: IBookingTypes }) {
  const { created_at: createdAt } = booking;
  return (
    <footer className="flex justify-end text-gray-400 px-8">
      <p className="text-sm h-8">
        Buchung angelegt am {formatDate(new Date(createdAt))} -{" "}
        {formatTime(new Date(createdAt))}
      </p>
    </footer>
  );
}

function CheckInSection({ children }) {
  return <section className="bg-gray-50">{children}</section>;
}

function BookingInformation({ booking }: { booking: IBookingTypes }) {
  const {
    numGuests,
    hasBreakfast,
    guests: { fullName, email },
  } = booking;
  return (
    <>
      <div className="md:flex mb-4 gap-4">
        <div className="md:flex md:items-center">
          <MdFamilyRestroom className="text-xl text-indigo-500" />
        </div>
        <p className=" font-semibold">{fullName}</p>
        <span>•</span>
        <p>{numGuests === 1 ? "1 Gäste" : `${numGuests} Gäste`}</p>
        <span>•</span>
        <p>{email}</p>
      </div>
      <div className="md:flex gap-4 mb-6">
        <div className="flex items-center">
          <GiMeal className="text-xl text-indigo-500" />
        </div>
        <div>Frühstück inkl.</div>
        <div className="font-semibold bg-indigo-50 px-2 rounded-md">
          {hasBreakfast ? "Ja" : "Nein"}
        </div>
      </div>
    </>
  );
}

function PricesBox({ booking, setConfirmPaid }: { booking: IBookingTypes }) {
  const { numNights, numGuests, cabinPrice, totalPrice, extrasPrice, isPaid } =
    booking;

  const windowWidth = useWindowWidth();

  return (
    <>
      <div className={`gap-4 p-6 ${isPaid ? "bg-green-100" : "bg-yellow-100"}`}>
        <div
          className={`md:flex gap-4 ${
            isPaid ? "text-green-800" : "text-yellow-800"
          }`}
        >
          <div>
            <MdOutlineEuroSymbol className="text-xl" />
          </div>
          <p>Gesamtpreis</p>
          <p>
            <span className=" font-semibold">{totalPrice} €</span>
          </p>
          <p>
            {" "}
            {isPaid && <span>Die Zahlung wurde bereits getätigt.</span>}
            {!isPaid && <span>Der Betrag ist noch offen.</span>}
          </p>
        </div>
        <Modal>
          <Modal.Open opens="details">
            <p className="  text-indigo-500 text-sm font-semibold pt-5 cursor-pointer hover:text-indigo-400 transition-all">
              Buchungsdetails ansehen
            </p>
          </Modal.Open>
          <Modal.Window name="details">
            <BookingInfoBox windowWidth={windowWidth} booking={booking} />
          </Modal.Window>
        </Modal>
      </div>

      {!isPaid && (
        <div className="flex gap-4 pt-4">
          <input
            className="accent-indigo-500 w-5"
            type="checkbox"
            onChange={(paid) => setConfirmPaid(paid.target.checked)}
          />
          <p>
            Ich <span className="font-semibold">bestätige</span>, dass
            (Gastname) den Gesamtpreis von{" "}
            <span className="font-semibold">{totalPrice}€</span> beglichen hat.
          </p>
        </div>
      )}
    </>
  );
}

function Buttons({ children }) {
  return <div className="flex justify-end mt-4">{children}</div>;
}
