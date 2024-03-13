import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import useCreateGuest from "./useCreateGuest";
import { FormValues } from "../../types/FormTypes";
import { StatusTypes } from "../../types/GlobalTypes";
import useUpdateGuest from "./useUpdateGuest";

function CreateGuestForm({
  onCloseModal,
  guestToUpdate = {},
}: {
  onCloseModal?: () => void;
  cabinToUpdate?: FormValues | object;
}) {
  const isUpdatingSession = Boolean(guestToUpdate && "id" in guestToUpdate);
  const { id: updateId, ...updateValues } = guestToUpdate as FormValues;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: isUpdatingSession ? updateValues : {},
  });

  const { uploadNewGuest, uploadingStatus } = useCreateGuest(
    reset,
    onCloseModal || (() => {})
  );

  const { updateGuest, updatingStatus } = useUpdateGuest(
    reset,
    onCloseModal || (() => {})
  );

  const isUploading = uploadingStatus === StatusTypes.LOADING;
  const isUpdating = updatingStatus === StatusTypes.LOADING;
  const isWorking = isUploading || isUpdating;

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    // console.log(formData);
    isUpdatingSession
      ? updateGuest(updateId as number, { ...formData })
      : uploadNewGuest(formData);
  };

  return (
    <>
      <form
        className="p-3 md:p-5 transition-all"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="font-semibold text-lg mb-3">Neuen Gast hinzufügen</h2>
        <FormRow
          label="Vorname, Nachname"
          type="text"
          id="fullName"
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.name?.message}
          isUploading={isWorking}
        />
        <FormRow
          label="Adresse"
          type="text"
          id="address"
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.address?.message}
          isUploading={isWorking}
        />
        <FormRow
          label="Postleitzahl"
          type="number"
          id="postalCode"
          registerProp={{
            register,
            required: "Dieses Feld ist erforderlich",
            min: {
              value: 1,
              message: "Es sollte 1 betragen",
            },
          }}
          error={errors?.postalCode?.message}
          isUploading={isWorking}
        />
        <FormRow
          label="Stadt/Ort"
          type="text"
          id="city"
          registerProp={{
            register,
            required: "Dieses Feld ist erforderlich",
          }}
          error={errors?.city?.message}
          isUploading={isWorking}
        />
        <FormRow
          label="Land"
          type="text"
          id="country"
          registerProp={{
            register,
            required: "Dieses Feld ist erforderlich",
          }}
          error={errors?.country?.message}
          isUploading={isWorking}
        />
        <FormRow
          label="E-Mail-Adresse"
          type="email"
          id="email"
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.email?.message}
          isUploading={isWorking}
        />
        <FormRow
          label="Telefonnummer"
          type="number"
          id="phone"
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.phone?.message}
          isUploading={isWorking}
        />
        <FormRow
          label="Informationen über den Gast"
          type="textarea"
          id="information"
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.information?.message?.toString() || ""}
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

export default CreateGuestForm;
