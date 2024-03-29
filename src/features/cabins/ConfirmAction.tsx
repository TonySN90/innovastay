import useDeleteCabin from "./useDeleteCabin";
import useDuplicateCabin from "./useDuplicateCabin";
import { ICabinTypes } from "../../types/cabinTypes";
import Button from "../../ui/Button";

function ConfirmAction({
  cabin,
  cabinId,
  action,
  onCloseModal,
}: {
  onCloseModal: () => void;
  cabin: ICabinTypes;
  cabinId: number;
  action: "delete" | "duplicate";
}) {
  const { deleteCabin }: { deleteCabin: (id: number) => void } =
    useDeleteCabin(onCloseModal);

  const { duplicateCabin } = useDuplicateCabin(cabin, onCloseModal);

  const duplicateAction = action === "duplicate";
  const deleteAction = action === "delete";

  return (
    <div>
      <h2 className="font-semibold text-lg ">
        {`Zimmer ${duplicateAction ? "Duplizieren" : "Löschen"}`}
      </h2>
      {duplicateAction && (
        <div className="py-2">
          Bitte bestätigen Sie, dass{" "}
          <span className="font-semibold">{cabin.name}</span> dupliziert werden
          soll. Der Neue Eintrag wird namentlich als Duplikat gekennzeichnet.
        </div>
      )}
      {deleteAction && (
        <div className="py-2">
          Soll <span className="font-semibold">{cabin.name}</span> wirklich
          gelöscht werden?
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
            duplicateAction ? duplicateCabin() : deleteCabin(cabinId);
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
