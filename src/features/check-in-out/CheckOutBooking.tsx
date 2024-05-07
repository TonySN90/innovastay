import { useNavigate, useParams } from "react-router";
import { MdFamilyRestroom, MdOutlineHotel } from "react-icons/md";
import { GiMeal } from "react-icons/gi";
import Button from "../../ui/Button";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import { formatDate, formatTime } from "../../utils/datesHelper";
import { LoadingTypes } from "../../types/GlobalTypes";
import Empty from "../../ui/Empty";
import { BookingStatusTypes, IBookingTypes } from "../../types/BookingTypes";
import useCheckInOut from "./useCheckInOut";

function CheckOutBooking() {
  const bookingId = Number(useParams().bookingId);
  const navigate = useNavigate();

  const { booking, loadingBookingStatus } = useBooking(Number(bookingId));
  const { checkInOut, updatingStatus } = useCheckInOut(false);

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
  } = booking as IBookingTypes;

  const handleCheckIn = () => {
    checkInOut(bookingId, {
      status: BookingStatusTypes.CHECKEDOUT,
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
      <h2 className="text-3xl font-semibold">Check-Out Buchung #{bookingId}</h2>

      <CheckInSection>
        {booking && <CheckInHeader booking={booking} />}
        <CheckInBody booking={booking} />
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
          content={"Buchung #" + bookingId + " auschecken"}
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

export default CheckOutBooking;

function CheckInHeader({ booking }: { booking: IBookingTypes }) {
  const {
    numNights,
    cabins: { name },
    startDate,
    endDate,
  } = booking;

  return (
    <header className="md:flex items-center mt-5 justify-between text-gray-50 py-4 bg-indigo-500 px-8 text-xl rounded-t-md">
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

function CheckInBody({ booking }: { booking: IBookingTypes }) {
  const { created_at: createdAt } = booking;

  return (
    <section>
      <div className="relative px-8 py-8 bg-background_secondary shadow-lg shadow-shadow">
        <BookingInformation booking={booking} />
        <div className="mb-4 font-semibold bg-status_red p-4 rounded-lg">
          Soll die Buchung wirklich ausgecheckt werden?
        </div>
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

// function CheckInFooter({ booking }: { booking: IBookingTypes }) {
//   const { created_at: createdAt } = booking;
//   return (
//     <footer className="flex justify-end text-gray-400 px-8">
//       <p className="text-sm h-8">
//         Buchung angelegt am {formatDate(new Date(createdAt))} -{" "}
//         {formatTime(new Date(createdAt))}
//       </p>
//     </footer>
//   );
// }

function CheckInSection({ children }: { children: React.ReactNode }) {
  return <section className="bg-background_primary ">{children}</section>;
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

function Buttons({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-end mt-4">{children}</div>;
}
