import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { FormValues, IFormRowProps, IInputProps } from "../../types/FormTypes";

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

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
          id="file"
          registerProp={{ register, required: "Wähle ein Bild" }}
          error={errors?.file?.message}
        />
        <div className="w-[full] flex justify-center md:justify-end mt-4">
          <Button
            onClick={() => console.log("test")}
            type="inverted"
            size="md"
            extras="mr-2 rounded-lg"
            content="abbrechen"
          />
          <Button
            onClick={() => console.log("test")}
            type="standard"
            size="md"
            extras="rounded-lg"
            content="hinzufügen"
          />
        </div>
      </form>
    </>
  );
}

export default CreateCabinForm;

function FormRow<T extends keyof FormValues>({
  label,
  id,
  registerProp,
  error,
  type,
}: IFormRowProps<T>) {
  return (
    <div className="border-b-2 border-indigo-100 md:min-w-[680px] transition-all flex flex-col md:flex-row py-4 justify-between md:items-center">
      <Label label={label} />
      {error && (
        <span className="text-red-500 text-md min-w-[300px]">{error}</span>
      )}
      <Input id={id} type={type} reg={registerProp} />
    </div>
  );
}

function Label({ label }: { label: string }) {
  return (
    <label className="md:w-[150px]" htmlFor={label}>
      {label}
    </label>
  );
}

function Input<T extends keyof FormValues>({ id, reg, type }: IInputProps<T>) {
  const { register, required, min } = reg;

  return (
    <div className="">
      {type === "text" || type === "number" ? (
        <input
          className="w-[100%] md:w-[320px] border border-gray-300 rounded-sm h-9 pl-2"
          type={type}
          id={id}
          disabled={false}
          {...register(id, {
            required: required,
            min: min,
          })}
        />
      ) : (
        ""
      )}

      {type === "textarea" && (
        <textarea
          className="w-full md:w-[320px] border border-gray-300 rounded-sm h-24 pl-2"
          id={id}
          disabled={false}
          {...register(id, {
            required: required,
            min: min,
          })}
        ></textarea>
      )}

      {type === "file" && (
        <input
          className="fileInputStyle flex items-center justify-center w-full md:w-[320px] "
          type={type}
          id={id}
          accept="image/*"
          disabled={false}
          {...register(id, {
            required: required,
            min: min,
          })}
        />
      )}
    </div>
  );
}
