import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues } from "../../types/FormTypes";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";

function UpdateUserPasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  const isUpdatingSession = false;

  return (
    <form
      className="p-3 md:p-5 transition-all bg-gray-50 rounded-lg shadow-lg shadow-gray-200"
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      <div className="max-w-[850px] mx-auto">
        <h2 className="font-semibold text-lg mb-3 mt-5">Update Passwort</h2>

        <FormRow
          label={"Passwort"}
          id="password"
          error={errors as { [key: string]: { message: string } }}
        >
          <input
            className="w-full md:w-[300px] border border-gray-300 rounded-md h-9 pl-2 text-gray-500"
            type="password"
            id="password"
            disabled={isUpdatingSession}
            {...register("password", {
              required: "Eintrag erforderlich",
              minLength: {
                value: 6,
                message: "Mindestens 6 Zeichen",
                // pattern: {
                //   value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,
                //   message:
                //     "Mindestens 1 Zahl, 1 Großbuchstabe, 1 Kleinbuchstabe",
                // },
              },
            })}
          />
        </FormRow>

        <FormRow
          label={"Passwort wiederholen"}
          id="passwordConfirm"
          error={errors as { [key: string]: { message: string } }}
        >
          <input
            className="w-full md:w-[300px] border border-gray-300 rounded-md h-9 pl-2 text-gray-500"
            type="password"
            id="passwordConfirm"
            disabled={isUpdatingSession}
            {...register("passwordConfirm", {
              required: "Eintrag erforderlich",
              validate: (value) =>
                value === getValues().password ||
                "Passwort stimmt nicht überein",
            })}
          />
        </FormRow>

        <div className="flex justify-end md:justify-end mt-4 ">
          <Button
            type="reset"
            onClick={() => reset()}
            variation="inverted"
            size="md"
            extras="rounded-lg mr-2"
            content="Abbrechen"
          />

          <Button
            type="submit"
            onClick={() => console.log("test")}
            variation="standard"
            size="md"
            extras="rounded-lg"
            content="Update"
          />
        </div>
      </div>
    </form>
  );
}

export default UpdateUserPasswordForm;
