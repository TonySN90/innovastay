import { useForm } from "react-hook-form";
import Button from "../../ui/Button";

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(e) {
    e.preventDefault();
    console.log("submit");
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
          register={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.name?.message}
        />
        <FormRow
          label="Max. Personen"
          type="number"
          id="capacity"
          register={{
            register,
            required: "Dieses Feld ist erforderlich",
            min: {
              value: 1,
              message: "Es sollte  1 betragen",
            },
          }}
          error={errors?.capacity?.message}
        />
        <FormRow
          label="Regulärer Preis"
          type="number"
          id="price"
          register={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.price?.message}
        />
        <FormRow
          label="Angebots-Preis"
          type="number"
          id="discount"
          register={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.discount?.message}
        />
        <FormRow
          label="Beschreibung"
          type="textarea"
          id="description"
          register={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.description?.message}
        />
        {/* <FormRow
          type="fileinput"
          id="fileinput"
          register={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.fileinput?.message}

          // Hier weitermachen
        /> */}
        <div className="w-[full] flex justify-center md:justify-end mt-4">
          <Button type="inverted" size="md" extras="mr-2" content="abbrechen" />
          <Button type="standard" size="md" content="hinzufügen" />
        </div>
      </form>
    </>
  );
}

export default CreateCabinForm;

function FormRow({ label, id, register, error, type }) {
  return (
    <div className="border-b-2 border-indigo-100 min-w-[300px] md:min-w-[680px] transition-all flex flex-col md:flex-row py-4 items-center">
      <Label label={label} />
      <Input id={id} type={type} reg={register} error={error} />
    </div>
  );
}

function Label({ label }) {
  return (
    <label className="w-full md:w-[200px]" htmlFor={label}>
      {label}
    </label>
  );
}

function Input({ id, reg, error, type }) {
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
          type={type}
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
