import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { FormValues } from "../../types/FormTypes";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import { StatusTypes } from "../../types/GlobalTypes";
import { useAppDispatch } from "../../store";
import { resetStatus } from "./cabinsSlice";

function CreateCabinForm({ onCloseModal }: { onCloseModal: () => void }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const {
    uploadNewCabin,
    error: uploadError,
    status: uploadStatus,
  } = useCreateCabin();

  const dispatch = useAppDispatch();

  const isUploading = uploadStatus === StatusTypes.LOADING;

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    try {
      await uploadNewCabin(formData);

      console.log("uploadStatus nach uploadNewCabin:", uploadStatus);
    } catch (error) {
      console.error("Fehler beim Hochladen des Zimmers:", error);
    }
  };

  if (uploadStatus === "success") {
    console.log("Resetting form and closing modal", uploadStatus);
    reset();
    onCloseModal();
    dispatch(resetStatus());
  }

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
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.name?.message}
          isUploading={isUploading}
        />
        <FormRow
          label="Kategorie"
          type="text"
          id="category"
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.category?.message}
          isUploading={isUploading}
        />
        <FormRow
          label="Max. Personen"
          type="number"
          id="capacity"
          registerProp={{
            register,
            required: "Dieses Feld ist erforderlich",
            min: {
              value: 1,
              message: "Es sollte 1 betragen",
            },
          }}
          error={errors?.capacity?.message}
          isUploading={isUploading}
        />
        <FormRow
          label="Regulärer Preis"
          type="number"
          id="price"
          registerProp={{
            register,
            required: "Dieses Feld ist erforderlich",
          }}
          error={errors?.price?.message}
          isUploading={isUploading}
        />
        <FormRow
          label="Angebots-Preis"
          type="number"
          id="discount"
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.discount?.message}
          isUploading={isUploading}
        />
        <FormRow
          label="Beschreibung"
          type="textarea"
          id="description"
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.description?.message?.toString() || ""}
          isUploading={isUploading}
        />
        <FormRow
          label="Bild"
          type="file"
          id="image"
          registerProp={{ register, required: "Wähle ein Bild" }}
          error={errors?.image?.message}
          isUploading={isUploading}
        />
        <div className="w-[full] flex justify-center md:justify-end mt-4">
          <Button
            type="reset"
            onClick={() => null}
            variation="inverted"
            size="md"
            extras="mr-2 rounded-lg"
            content="Abbrechen"
          />
          <Button
            type="submit"
            onClick={() => null}
            variation="standard"
            size="md"
            extras="rounded-lg"
            content="Hinzufügen"
          />
        </div>
      </form>
    </>
  );
}

export default CreateCabinForm;
