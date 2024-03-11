import useDeleteCabin from "../features/cabins/useDeleteCabin";
import Button from "./Button";

function ConfirmDelete({
  onCloseModal,
  cabinId,
}: {
  onCloseModal: () => void;
}) {
  const { deleteCabin } = useDeleteCabin(onCloseModal);

  return (
    <div>
      <h2 className="font-semibold text-lg ">Löschen</h2>
      <div className="py-2">Soll {"Zimmer 1"} wirklich gelöscht werden?</div>
      <div className="flex justify-end">
        <Button
          variation="inverted"
          size="md"
          content="Abbruch"
          extras="mr-2 rounded-lg"
        />
        <Button
          onClick={() => deleteCabin(cabinId)}
          variation="standard"
          size="md"
          extras="rounded-lg"
          content="Löschen"
        />
      </div>
    </div>
  );
}

export default ConfirmDelete;
