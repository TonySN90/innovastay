import { useForm } from "react-hook-form";
import Button from "../../ui/Button";

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit() {
    console.log("submit");
  }

  return (
    <>
      <form
        className="sm:p-3 md:p-5 transition-all"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="font-semibold text-lg mb-3">Neues Zimmer hinzufügen</h2>
        <FormRow
          label="Cabin name"
          id="name"
          register={register}
          required="This field is required"
          error={errors?.name?.message}
        />
        <Button type="inverted" size="md" extras="mr-2" content="abbrechen" />
        <Button type="standard" size="md" content="hinzufügen" />
      </form>
    </>
  );
}

export default CreateCabinForm;

function FormRow({ label, id, register, error }) {
  return (
    <div className="border-b-2 border-indigo-100 min-w-[300px] md:min-w-[600px] transition-all flex py-3 mb-4 items-center">
      <label className="mr-5" htmlFor={label}>
        Zimmername
      </label>
      <div>
        <input
          className="md:mr-10 md:w-[200px] border border-gray-300 rounded-sm h-8 mb-1"
          type="text"
          id={id}
          disabled={false}
          {...register(id, {
            required: "This field is required",
          })}
        />
        {error && <span className="text-red-500 text-md">{error}</span>}
      </div>
    </div>
  );
}
