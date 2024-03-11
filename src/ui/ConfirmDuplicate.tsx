import useDeleteCabin from "../features/cabins/useDeleteCabin";
import Button from "./Button";

function ConfirmDuplicate({
  onCloseModal,
  cabinId,
  name,
}: {
  onCloseModal: () => void;
  cabinId: number;
  name: string;
}) {
  const { deleteCabin }: { deleteCabin: (id: number) => void } =
    useDeleteCabin(onCloseModal);

  return (
    <div>
      <h2 className="font-semibold text-lg ">Löschen</h2>
      <div className="py-2">Soll {name} wirklich gelöscht werden?</div>
      <div className="flex justify-end">
        <Button
          onClick={onCloseModal}
          variation="inverted"
          size="md"
          content="Abbruch"
          extras="mr-2 rounded-lg"
        />
        <Button
          onClick={() => deleteCabin(cabinId)}
          variation="delete"
          size="md"
          extras="rounded-lg bg"
          content="Löschen"
        />
      </div>
    </div>
  );
}

export default ConfirmDuplicate;
