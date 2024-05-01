import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import useSignUp from "./useSignUp";
import { SignUpTypes } from "../../types/AuthTypes";

function SignupForm() {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<SignUpTypes>();

  const { signupUser, signupLoadingStatus } = useSignUp(reset);
  const isLoading = signupLoadingStatus === "loading";

  const onSubmit: SubmitHandler<SignUpTypes> = ({
    fullName,
    email,
    password,
  }) => {
    signupUser({ fullName, email, password });
  };

  return (
    <form
      className="p-3 md:p-5 transition-all bg-gray-50 rounded-lg "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="max-w-[850px] mx-auto">
        <h2 className="font-semibold text-lg mb-3 mt-5">
          Neuen Mitarbeiter hinzufügen
        </h2>

        <FormRow
          label={"Name"}
          id="name"
          error={errors as { [key: string]: { message: string } }}
        >
          <input
            className="w-full md:w-[300px] border border-gray-300 rounded-md h-9 pl-2 text-gray-500"
            type="text"
            id="fullName"
            disabled={isLoading}
            {...register("fullName", {
              required: "Eintrag erforderlich",
              minLength: {
                value: 2,
                message: "Mindestens 2 Zeichen",
              },
            })}
          />
        </FormRow>

        <FormRow
          label={"E-Mail"}
          id="email"
          error={errors as { [key: string]: { message: string } }}
        >
          <input
            className="w-full md:w-[300px] border border-gray-300 rounded-md h-9 pl-2 text-gray-500"
            type="email"
            id="email"
            disabled={isLoading}
            {...register("email", {
              required: "Eintrag erforderlich",
              // pattern: {
              //   value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              //   message: "Bitte gebe ein gültige Email ein",
              // },
            })}
          />
        </FormRow>

        <FormRow
          label={"Passwort"}
          id="password"
          error={errors as { [key: string]: { message: string } }}
        >
          <input
            className="w-full md:w-[300px] border border-gray-300 rounded-md h-9 pl-2 text-gray-500"
            type="password"
            id="password"
            disabled={isLoading}
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
            disabled={isLoading}
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
              disabled={isLoading}
              type="reset"
              variation="inverted"
              size="lg"
              extras="rounded-lg"
              content="Abbrechen"
            />
          </div>
          <div className="w-[full] flex justify-center md:justify-end mt-4">
            <Button
              disabled={isLoading}
              type="submit"
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
