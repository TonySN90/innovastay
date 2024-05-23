import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { FormValues } from "../../types/FormTypes";
import useCreateCabin from "./hooks/useCreateCabin";
import { LoadingTypes } from "../../types/GlobalTypes";
import useUpdateCabin from "./hooks/useUpdateCabin";
import FormRow from "../../ui/FormRow";

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

  const isUploading = uploadingStatus === LoadingTypes.LOADING;
  const isUpdating = updatingStatus === LoadingTypes.LOADING;
  const isWorking = isUploading || isUpdating;

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    isUpdatingSession
      ? updateCabin(updateId as number, { ...formData })
      : uploadNewCabin(formData);
    console.log(formData);
  };

  const formRowStyles =
    "w-full md:w-[300px] bg-inherit border border-border rounded-md h-9 pl-2 text-text";
  return (
    <>
      <form
        className="p-3 md:p-5 transition-all"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="font-semibold text-lg mb-3">Neues Zimmer hinzufügen</h2>

        <FormRow
          label={"Zimmername"}
          id="name"
          error={errors as { [key: string]: { message: string } }}
        >
          <input
            className={formRowStyles}
            type="text"
            id="name"
            disabled={isWorking}
            {...register("name", {
              required: "Eintrag erforderlich",
              min: {
                value: 1,
                message: "Es sollte mind.1 betragen",
              },
            })}
          />
        </FormRow>

        <FormRow
          label={"Kategorie"}
          id="category"
          error={errors as { [key: string]: { message: string } }}
        >
          <input
            className={formRowStyles}
            type="text"
            id="category"
            disabled={isWorking}
            {...register("category", {
              required: "Eintrag erforderlich",
              min: {
                value: 1,
                message: "Es sollte mind.1 betragen",
              },
            })}
          />
        </FormRow>

        <FormRow
          label={"Max. Personen"}
          id="capacity"
          error={errors as { [key: string]: { message: string } }}
        >
          <input
            className={formRowStyles}
            type="number"
            id="capacity"
            disabled={isWorking}
            {...register("capacity", {
              required: "Eintrag erforderlich",
              min: {
                value: 1,
                message: "Es sollte mind. 1 betragen",
              },
            })}
          />
        </FormRow>

        <FormRow
          label={"Regulärer Preis"}
          id="price"
          error={errors as { [key: string]: { message: string } }}
        >
          <input
            className={formRowStyles}
            type="number"
            id="price"
            disabled={isWorking}
            {...register("price", {
              required: "Eintrag erforderlich",
              min: {
                value: 1,
                message: "Es sollte mind. 1 betragen",
              },
            })}
          />
        </FormRow>

        <FormRow
          label={"Angebots-Preis"}
          id="discount"
          error={errors as { [key: string]: { message: string } }}
        >
          <input
            className={formRowStyles}
            type="number"
            id="discount"
            disabled={isWorking}
            {...register("discount", {
              required: "Eintrag erforderlich",
              min: {
                value: 1,
                message: "Es sollte mind. 1 betragen",
              },
            })}
          />
        </FormRow>

        <FormRow
          label={"Beschreibung"}
          id="description"
          error={errors as { [key: string]: { message: string } }}
        >
          <textarea
            className="w-full md:w-[300px] bg-background_secondary border border-border rounded-lg h-24 pl-2"
            id="description"
            disabled={isWorking}
            {...register("description", {
              required: "Eintrag erforderlich",
              min: {
                value: 1,
                message: "Es sollte mind. 1 betragen",
              },
            })}
          />
        </FormRow>

        <FormRow
          label={"Bild"}
          id="image"
          error={errors as { [key: string]: { message: string } }}
        >
          <input
            type="file"
            className="fileInputStyle flex items-center justify-center w-full md:w-[300px]"
            accept="image/*"
            disabled={isWorking}
            {...register("image", {
              required: isUpdatingSession ? false : "Wähle ein Bild",
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

export default CreateCabinForm;
