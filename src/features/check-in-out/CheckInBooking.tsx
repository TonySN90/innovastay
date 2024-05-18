import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  MdFamilyRestroom,
  MdOutlineEuroSymbol,
  MdOutlineHotel,
} from "react-icons/md";
import { GiMeal } from "react-icons/gi";
import Button from "../../ui/Button";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import { formatDate, formatTime } from "../../utils/datesHelper";
import { LoadingTypes } from "../../types/GlobalTypes";
import Empty from "../../ui/Empty";
import { BookingStatusTypes, IBookingTypes } from "../../types/BookingTypes";
import useCheckInOut from "./useCheckInOut";

function CheckInBooking() {
  const bookingId = Number(useParams().bookingId);
  const navigate = useNavigate();

  const [confirmPaid, setConfirmPaid] = useState(false);
  const { booking, loadingBookingStatus } = useBooking(Number(bookingId));
  const { checkInOut, updatingStatus } = useCheckInOut(true);

  const isLoading = loadingBookingStatus === LoadingTypes.LOADING;
  const isUpdating = updatingStatus === LoadingTypes.LOADING;
  const isWorking = isUpdating || isLoading;

  if (isWorking) return <Spinner />;
  if (!Object.keys(booking as IBookingTypes).length)
    return <Empty resourceName="Die Buchung" />;

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
  } = booking as IBookingTypes;

  const handleCheckIn = () => {
    checkInOut(bookingId, {
      isPaid: true,
      status: BookingStatusTypes.CHECKEDIN,
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
        {booking && <CheckInHeader booking={booking} />}
        <CheckInBody booking={booking} setConfirmPaid={setConfirmPaid} />
        {/* <CheckInFooter booking={booking} /> */}
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
          disabled={!confirmPaid && !isPaid}
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

function CheckInHeader({ booking }: { booking: IBookingTypes }) {
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

function CheckInBody({
  booking,
  setConfirmPaid,
}: {
  booking: IBookingTypes;
  setConfirmPaid: (value: boolean) => void;
}) {
  const { created_at: createdAt } = booking;

  return (
    <section>
      <div className="relative px-8 py-8 bg-background_secondary shadow-lg shadow-shadow">
        <BookingInformation booking={booking} />
        <PricesBox booking={booking} setConfirmPaid={setConfirmPaid} />
        <footer className="absolute right-0 text-gray-400 px-8 mt-2">
          <p className="text-sm h-8">
            Buchung angelegt am {formatDate(new Date(createdAt))} -{" "}
            {formatTime(new Date(createdAt))}
          </p>
        </footer>
      </div>
    </section>
  );
}

function CheckInSection({ children }: { children: React.ReactNode }) {
  return <section className="bg-background_primary">{children}</section>;
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
        <div className="font-semibold bg-background_secondary px-2 rounded-md">
          {hasBreakfast ? "Ja" : "Nein"}
        </div>
      </div>
    </>
  );
}

function PricesBox({
  booking,
  setConfirmPaid,
}: {
  booking: IBookingTypes;
  setConfirmPaid: (value: boolean) => void;
}) {
  const {
    totalPrice,
    isPaid,
    guests: { fullName },
  } = booking;

  return (
    <>
      <div
        className={`gap-4 p-6 rounded-md mb-4 ${
          isPaid ? "bg-status_green" : "bg-status_orange"
        }`}
      >
        <div className={"md:flex gap-4 text-text"}>
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
        {/* <Modal>
          <Modal.Open opens="details">
            <p className="  text-indigo-500 text-sm font-semibold pt-5 cursor-pointer hover:text-indigo-400 transition-all">
              Buchungsdetails ansehen
            </p>
          </Modal.Open>
          <Modal.Window name="details">
            <BookingInfoBox bookingId={booking.id} />
          </Modal.Window>
        </Modal> */}
      </div>

      {!isPaid && (
        <div className="flex gap-4 pt-4">
          <input
            className="accent-indigo-500 w-5"
            type="checkbox"
            onChange={(paid) => setConfirmPaid(paid.target.checked)}
          />
          <p>
            Ich <span className="font-semibold">bestätige</span>, dass{" "}
            {fullName} den Gesamtpreis von{" "}
            <span className="font-semibold">{totalPrice}€</span> beglichen hat.
          </p>
        </div>
      )}
    </>
  );
}

function Buttons({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-end mt-4">{children}</div>;
}
