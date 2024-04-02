import { IBookingTypes } from "../../types/BookingTypes";
import Button from "../../ui/Button";
import useDeleteBooking from "./useDeleteBooking";

function ConfirmDelete({
  booking,
  bookingId,
  onCloseModal,
}: {
  onCloseModal: () => void;
  bookingId: number;
  booking: IBookingTypes;
}) {
  const { deleteBooking }: { deleteBooking: (id: number) => void } =
    useDeleteBooking(onCloseModal);

  return (
    <div>
      <h2 className="font-semibold text-lg ">{`Buchung Löschen`}</h2>

      <div className="py-2">
        Soll die Buchung <span className="font-semibold">#{booking.id}</span>{" "}
        wirklich gelöscht werden?
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onCloseModal}
          variation="inverted"
          size="md"
          content="Abbruch"
          extras="mr-2 rounded-lg"
        />
        <Button
          onClick={() => {
            deleteBooking(bookingId);
          }}
          variation="delete"
          size="md"
          extras="rounded-lg bg"
          content="Löschen"
        />
      </div>
    </div>
  );
}

export default ConfirmDelete;
