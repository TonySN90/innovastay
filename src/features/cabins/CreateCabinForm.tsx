import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { FormValues } from "../../types/FormTypes";
import FormRow from "../../ui/FormRow";
import { createCabin } from "../../services/apiCabins";

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    createCabin(data);
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
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.name?.message}
        />
        <FormRow
          label="Kategorie"
          type="text"
          id="category"
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.category?.message}
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
        />
        <FormRow
          label="Angebots-Preis"
          type="number"
          id="discount"
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.discount?.message}
        />
        <FormRow
          label="Beschreibung"
          type="textarea"
          id="description"
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.description?.message?.toString() || ""}
        />
        <FormRow
          label="Bild"
          type="file"
          id="image"
          registerProp={{ register, required: "Wähle ein Bild" }}
          error={errors?.image?.message}
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
