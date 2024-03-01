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
        {/* <FormRow
          type="fileinput"
          id="fileinput"
          register={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.fileinput?.message}

          // Hier weitermachen
        /> */}
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
    <div className="border-b-2 border-indigo-100 min-w-[300px] md:min-w-[680px] transition-all flex flex-col md:flex-row py-4 items-center">
      <Label label={label} />
      <Input id={id} type={type} reg={registerProp} error={error} />
    </div>
  );
}

function Label({ label }: { label: string }) {
  return (
    <label className="w-full md:w-[200px]" htmlFor={label}>
      {label}
    </label>
  );
}

function Input<T extends keyof FormValues>({
  id,
  reg,
  error,
  type,
}: IInputProps<T>) {
  const { register, required, min } = reg;

  return (
    <div className="w-full">
      {type === "text" || type === "number" ? (
        <input
          className="md:mr-10 w-full md:w-[220px] border border-gray-300 rounded-sm h-9"
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
          className="md:mr-10 w-full md:w-[220px] border border-gray-300 rounded-sm h-14 mb-1"
          id={id}
          disabled={false}
          {...register(id, {
            required: required,
            min: min,
          })}
        ></textarea>
      )}

      {error && <span className="text-red-500 text-md">{error}</span>}
    </div>
  );
}
