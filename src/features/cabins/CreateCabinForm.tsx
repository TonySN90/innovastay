import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { FormValues } from "../../types/FormTypes";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import { StatusTypes } from "../../types/GlobalTypes";
import useUpdateCabin from "./useUpdateCabin";

function CreateCabinForm({
  onCloseModal,
  cabinToUpdate = {},
}: {
  onCloseModal?: () => void;
  cabinToUpdate?: FormValues | object;
}) {
  const isUpdatingSession = Boolean(cabinToUpdate && "id" in cabinToUpdate);
  const { id: updateId, ...updateValues } = cabinToUpdate as FormValues;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: isUpdatingSession ? updateValues : {},
  });

  const { uploadNewCabin, uploadingStatus } = useCreateCabin(
    reset,
    onCloseModal || (() => {})
  );

  const { updateCabin, updatingStatus } = useUpdateCabin(
    reset,
    onCloseModal || (() => {})
  );

  const isUploading = uploadingStatus === StatusTypes.LOADING;
  const isUpdating = updatingStatus === StatusTypes.LOADING;
  const isWorking = isUploading || isUpdating;

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    isUpdatingSession
      ? updateCabin(updateId as number, { ...formData })
      : uploadNewCabin(formData);
  };

  return (
    <>
      <form
        className="p-3 md:p-5 transition-all"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="font-semibold text-lg mb-3">Neues Zimmer hinzufügen</h2>
        <FormRow
          label="Zimmername"
          type="text"
          id="name"
          registerProp={{ register, required: "Eintrag erforderlich" }}
          error={errors?.name?.message}
          isUploading={isWorking}
        />
        <FormRow
          label="Kategorie"
          type="text"
          id="category"
          registerProp={{ register, required: "Eintrag erforderlich" }}
          error={errors?.category?.message}
          isUploading={isWorking}
        />
        <FormRow
          label="Max. Personen"
          type="number"
          id="capacity"
          registerProp={{
            register,
            required: "Eintrag erforderlich",
            min: {
              value: 1,
              message: "Es sollte 1 betragen",
            },
          }}
          error={errors?.capacity?.message}
          isUploading={isWorking}
        />
        <FormRow
          label="Regulärer Preis"
          type="number"
          id="price"
          registerProp={{
            register,
            required: "Eintrag erforderlich",
          }}
          error={errors?.price?.message}
          isUploading={isWorking}
        />
        <FormRow
          label="Angebots-Preis"
          type="number"
          id="discount"
          registerProp={{ register, required: "Eintrag erforderlich" }}
          error={errors?.discount?.message}
          isUploading={isWorking}
        />
        <FormRow
          label="Beschreibung"
          type="textarea"
          id="description"
          registerProp={{ register, required: "Eintrag erforderlich" }}
          error={errors?.description?.message?.toString() || ""}
          isUploading={isWorking}
        />
        <FormRow
          label="Bild"
          type="file"
          id="image"
          registerProp={{
            register,
            required: isUpdatingSession ? false : "Wähle ein Bild",
          }}
          error={errors?.image?.message}
          isUploading={isWorking}
        />
        <div className="w-[full] flex justify-center md:justify-end mt-4">
          <Button
            type="reset"
            onClick={() => null}
            variation="inverted"
            size="md"
            extras="mr-2 rounded-lg"
            content="Zurücksetzen"
            loading={isWorking}
          />
          <Button
            type="submit"
            onClick={() => null}
            variation="standard"
            size="md"
            extras="rounded-lg"
            content={isUpdatingSession ? "Aktualisieren" : "Hinzufügen"}
            loading={isWorking}
          />
        </div>
      </form>
    </>
  );
}

export default CreateCabinForm;
