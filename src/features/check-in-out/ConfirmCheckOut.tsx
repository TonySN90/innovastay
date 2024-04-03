import { BookingStatusTypes, IBookingTypes } from "../../types/BookingTypes";
import Button from "../../ui/Button";
import useCheckInOut from "./useCheckInOut";

function ConfirmCheckOut({
  booking,
  bookingId,
  onCloseModal,
}: {
  onCloseModal: () => void;
  bookingId: number;
  booking: IBookingTypes;
}) {
  //   const { checkInOut, updatingStatus } = useCheckInOut(true);

  const {
    startDate,
    endDate,
    numGuests,
    hasBreakfast,
    extrasPrice,
    totalPrice,
    guestId,
    created_at,
  } = booking;

  console.log(booking);

  function handleCheckOut() {
    checkInOut(bookingId, {
      isPaid: true,
      status: BookingStatusTypes.CHECKEDOUT,
      cabinId: booking.cabinId,
      startDate,
      endDate,
      numGuests,
      hasBreakfast,
      extrasPrice,
      totalPrice,
      guestId,
      created_at,
    });
  }

  const { checkInOut } = useCheckInOut(true);

  return (
    <div>
      <h2 className="font-semibold text-lg ">{`Gast auschecken`}</h2>

      <div className="py-2">
        Soll der Gast{" "}
        <span className="font-semibold">{booking.guests.fullName}</span> zu der
        Buchung <span className="font-semibold">#{booking.id}</span> wirklich
        ausgecheckt werden?
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => onCloseModal()}
          variation="inverted"
          size="md"
          content="Abbruch"
          extras="mr-2 rounded-lg"
        />
        <Button
          onClick={() => {
            handleCheckOut();
          }}
          variation="standard"
          size="md"
          extras="rounded-lg bg"
          content="Auschecken"
        />
      </div>
    </div>
  );
}

export default ConfirmCheckOut;
