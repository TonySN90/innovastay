import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { FormValues } from "../../types/FormTypes";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "../cabins/useCreateCabin";
import { StatusTypes } from "../../types/GlobalTypes";
import useUpdateCabin from "../cabins/useUpdateCabin";

function CreateBookingForm({
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
        <h2 className="font-semibold text-lg mb-3">Neue Buchung hinzufügen</h2>

        <FormRow
          label="Gast"
          type="text"
          id="name"
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.name?.message}
          isUploading={isWorking}
        />
        <FormRow
          label="Zimmer"
          type="text"
          id="cabin"
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.cabin?.message}
          isUploading={isWorking}
        />
        <FormRow
          label="Anreisedatum"
          type="text"
          id="arrival"
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.arrival?.message}
          isUploading={isWorking}
        />
        <FormRow
          label="Abreisedatum"
          type="text"
          id="departure "
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.departure?.message}
          isUploading={isWorking}
        />
        <FormRow
          label="Anzahl Personen"
          type="number"
          id="numGuests"
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.numGuests?.message}
          isUploading={isWorking}
        />
        <FormRow
          label="Frühstück"
          type="text"
          id="breakfast"
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.breakfast?.message}
          isUploading={isWorking}
        />
        <FormRow
          label="Bereits bezahlt?"
          type="text"
          id="isPaid"
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.isPaid?.message}
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

export default CreateBookingForm;
