import { IGuestTypes } from "../../types/GuestTypes";
import Button from "../../ui/Button";
import useDeleteGuest from "./useDeleteGuest";
import useDuplicateGuest from "./useDuplicateGuest";

function ConfirmAction({
  guest,
  guestId,
  action,
  onCloseModal,
}: {
  onCloseModal: () => void;
  guest: IGuestTypes;
  guestId: number;
  action: "delete" | "duplicate";
}) {
  const { deleteGuest }: { deleteGuest: (id: number) => void } =
    useDeleteGuest(onCloseModal);

  const { duplicateGuest } = useDuplicateGuest(guest, onCloseModal);

  const duplicateAction = action === "duplicate";
  const deleteAction = action === "delete";

  return (
    <div>
      <h2 className="font-semibold text-lg ">
        {`Gast ${duplicateAction ? "Duplizieren" : "Löschen"}`}
      </h2>
      {duplicateAction && (
        <div className="py-2">
          Bitte bestätigen Sie, dass{" "}
          <span className="font-semibold">{guest.fullName}</span> dupliziert
          werden soll. Der Neue Eintarg wird namentlich als Duplikat
          gekennzeichnet.
        </div>
      )}
      {deleteAction && (
        <div className="py-2">
          Soll der Gast <span className="font-semibold">{guest.fullName}</span>{" "}
          wirklich gelöscht werden? Hinweis: Gäste mit laufenden Buchungen
          können nicht gelöscht werden.
        </div>
      )}
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
            duplicateAction ? duplicateGuest() : deleteGuest(guestId);
          }}
          variation={duplicateAction ? "standard" : "delete"}
          size="md"
          extras="rounded-lg bg"
          content={duplicateAction ? "Bestätigen" : "Löschen"}
        />
      </div>
    </div>
  );
}

export default ConfirmAction;
