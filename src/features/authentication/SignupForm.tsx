import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues } from "../../types/FormTypes";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";

function SignupForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data, event) => {
    event?.preventDefault();
    console.log(data);
  };

  return (
    <form
      className="p-3 md:p-5 transition-all bg-gray-50 rounded-lg "
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      <div className="max-w-[850px] mx-auto">
        <h2 className="font-semibold text-lg mb-3 mt-5">
          Neuen Mitarbeiter hinzufügen
        </h2>

        <FormRow label={"Name"} id="name" error={errors}>
          <input
            className="w-full md:w-[300px] border border-gray-300 rounded-md h-9 pl-2 text-gray-500"
            type="text"
            id="name"
            // disabled={isWorking}
            {...register("name", {
              required: "Eintrag erforderlich",
              minLength: {
                value: 2,
                message: "Mindestens 2 Zeichen",
              },
            })}
          />
        </FormRow>

        <FormRow label={"E-Mail"} id="email" error={errors}>
          <input
            className="w-full md:w-[300px] border border-gray-300 rounded-md h-9 pl-2 text-gray-500"
            type="email"
            id="email"
            // disabled={isWorking}
            {...register("email", {
              required: "Eintrag erforderlich",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Bitte gebe ein gültige Email ein",
              },
            })}
          />
        </FormRow>

        <FormRow label={"Passwort"} id="password" error={errors}>
          <input
            className="w-full md:w-[300px] border border-gray-300 rounded-md h-9 pl-2 text-gray-500"
            type="password"
            id="password"
            // disabled={isWorking}
            {...register("password", {
              required: "Eintrag erforderlich",
              minLength: {
                value: 5,
                message: "Mindestens 5 Zeichen",
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,
                  message:
                    "Mindestens 1 Zahl, 1 Großbuchstabe, 1 Kleinbuchstabe",
                },
              },
            })}
          />
        </FormRow>

        <FormRow
          label={"Passwort wiederholen"}
          id="passwordConfirm"
          error={errors}
        >
          <input
            className="w-full md:w-[300px] border border-gray-300 rounded-md h-9 pl-2 text-gray-500"
            type="password"
            id="passwordConfirm"
            // disabled={isWorking}
            {...register("passwordConfirm", {
              required: "Eintrag erforderlich",
              validate: (value) =>
                value === getValues().password ||
                "Passwort stimmt nicht überein",
            })}
          />
        </FormRow>

        <div className="flex justify-end gap-2">
          <div className="w-[full] flex justify-center md:justify-end mt-4">
            <Button
              type="reset"
              onClick={() => console.log("test")}
              variation="inverted"
              size="lg"
              extras="rounded-lg"
              content="Abbrechen"
            />
          </div>
          <div className="w-[full] flex justify-center md:justify-end mt-4">
            <Button
              type="submit"
              onClick={() => console.log("test")}
              variation="standard"
              size="lg"
              extras="rounded-lg"
              content="Mitarbeiter anlegen"
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default SignupForm;
