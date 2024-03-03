import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues } from "../../types/FormTypes";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";

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
      className="p-3 md:p-5 transition-all bg-gray-50 rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      <div className="max-w-[850px]  mx-auto">
        <h2 className="font-semibold text-lg mb-3 mt-5">
          Neuen Mitarbeiter hinzufügen
        </h2>
        <FormRow
          label="Name"
          type="text"
          id="name"
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.name?.message}
        />
        <FormRow
          label="E-Mail:"
          type="text"
          id="email"
          registerProp={{
            register,
            required: "Dieses Feld ist erforderlich",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Bitte gebe ein gültige Passwort ein",
            },
          }}
          error={errors?.email?.message}
        />
        <FormRow
          label="Passwort (min. 8 Zeichen):"
          type="password"
          id="password"
          registerProp={{
            register,
            required: "Dieses Feld ist erforderlich",
            minLength: {
              value: 8,
              message: "mindestens 8 Zeichen eingeben",
            },
          }}
          error={errors?.password?.message}
        />
        <FormRow
          label="Passwort wiederholen"
          type="password"
          id="passwordConfirm"
          registerProp={{
            register,
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwort stimmt nicht überein",
          }}
          error={errors?.passwordConfirm?.message}
        />
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
