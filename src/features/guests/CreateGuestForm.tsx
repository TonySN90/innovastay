import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import useCreateGuest from "./useCreateGuest";
import { FormValues } from "../../types/FormTypes";
import { LoadingTypes } from "../../types/GlobalTypes";
import useUpdateGuest from "./useUpdateGuest";
import FormRow from "../../ui/FormRow";

function CreateGuestForm({
  onCloseModal,
  guestToUpdate = {},
}: {
  onCloseModal?: () => void;
  guestToUpdate?: FormValues | object;
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

  const isUploading = uploadingStatus === LoadingTypes.LOADING;
  const isUpdating = updatingStatus === LoadingTypes.LOADING;
  const isWorking = isUploading || isUpdating;

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    isUpdatingSession
      ? updateGuest(updateId as number, { ...formData })
      : uploadNewGuest(formData);
    console.log(formData);
  };

  const formRowStyles =
    "w-full md:w-[300px] bg-background_secondary border border-border rounded-md h-9 pl-2 text-text";

  return (
    <>
      <form
        className="p-3 md:p-5 transition-all"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="font-semibold text-lg mb-3">Neuen Gast hinzufügen</h2>

        <FormRow
          label={"Vorname, Nachname"}
          id="fullName"
          error={errors as { [key: string]: { message: string } }}
        >
          <input
            className={formRowStyles}
            type="text"
            id="fullName"
            disabled={isWorking}
            {...register("fullName", {
              required: "Eintrag erforderlich",
              minLength: {
                value: 3,
                message: "Mindestens 3 Zeichen",
              },
            })}
          />
        </FormRow>

        <FormRow
          label={"Adresse"}
          id="address"
          error={errors as { [key: string]: { message: string } }}
        >
          <input
            className={formRowStyles}
            type="text"
            id="address"
            disabled={isWorking}
            {...register("address", {
              required: "Eintrag erforderlich",
              minLength: {
                value: 2,
                message: "Mindestens 3 Zeichen",
              },
            })}
          />
        </FormRow>

        <FormRow
          label={"Postleitzahl"}
          id="postalCode"
          error={errors as { [key: string]: { message: string } }}
        >
          <input
            className={formRowStyles}
            type="number"
            id="postalCode"
            disabled={isWorking}
            {...register("postalCode", {
              required: "Eintrag erforderlich",
              min: {
                value: 1,
                message: "Es sollte 1 betragen",
              },
            })}
          />
        </FormRow>

        <FormRow
          label={"Stadt/Ort"}
          id="city"
          error={errors as { [key: string]: { message: string } }}
        >
          <input
            className={formRowStyles}
            type="text"
            id="city"
            disabled={isWorking}
            {...register("city", {
              required: "Eintrag erforderlich",
              minLength: {
                value: 2,
                message: "Mindestens 2 Zeichen",
              },
            })}
          />
        </FormRow>

        <FormRow
          label={"Land"}
          id="country"
          error={errors as { [key: string]: { message: string } }}
        >
          <input
            className={formRowStyles}
            type="text"
            id="country"
            disabled={isWorking}
            {...register("country", {
              required: "Eintrag erforderlich",
              minLength: {
                value: 2,
                message: "Mindestens 2 Zeichen",
              },
            })}
          />
        </FormRow>

        <FormRow
          label={"E-Mail-Adresse"}
          id="email"
          error={errors as { [key: string]: { message: string } }}
        >
          <input
            className={formRowStyles}
            type="email"
            id="email"
            disabled={isWorking}
            {...register("email", {
              required: "Eintrag erforderlich",
              pattern: {
                value: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Bitte gib eine gültige E-Mail-Adresse ein",
              },
            })}
          />
        </FormRow>

        <FormRow
          label={"Telefonnummer"}
          id="phone"
          error={errors as { [key: string]: { message: string } }}
        >
          <input
            className={formRowStyles}
            type="number"
            id="phone"
            disabled={isWorking}
            {...register("phone", {
              required: "Eintrag erforderlich",
              // pattern: /^[\d\s]+$/,
            })}
          />
        </FormRow>

        <FormRow
          label={"Informationen über den Gast"}
          id="information"
          error={errors as { [key: string]: { message: string } }}
        >
          <textarea
            className="w-full md:w-[300px] bg-inherit border border-border rounded-md pl-2 text-text"
            id="information"
            disabled={isWorking}
            {...register("information", {
              required: "Eintrag erforderlich",
              minLength: {
                value: 5,
                message: "Mindestens 5 Zeichen",
              },
            })}
          />
        </FormRow>

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
