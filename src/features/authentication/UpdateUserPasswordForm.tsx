import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import MiniSpinner from "../../ui/MiniSpinner";

function UpdateUserPasswordForm({
  updateUser,
  isUpdating,
}: {
  updateUser: (data: { password: string }) => void;
  isUpdating: boolean;
}) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<{ password: string; passwordConfirm: string }>();

  const onSubmit = (data: { password: string; passwordConfirm: string }) => {
    updateUser({ password: data.password });
  };

  const isUpdatingSession = false;

  return (
    <form
      className="p-3 md:p-5 transition-all bg-background_secondary rounded-lg shadow-lg shadow-shadow"
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
            className="w-full md:w-[300px] border border-border bg-inherit rounded-md h-9 pl-2 text-text"
            type="password"
            id="password"
            disabled={isUpdatingSession}
            {...register("password", {
              required: "Eintrag erforderlich",
              minLength: {
                value: 6,
                message: "Mindestens 6 Zeichen",
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
            className="w-full md:w-[300px] border border-border bg-inherit rounded-md h-9 pl-2 text-text"
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
          {isUpdating ? (
            <MiniSpinner />
          ) : (
            <Button
              type="submit"
              variation="standard"
              size="md"
              extras="rounded-lg"
              content="Update"
            />
          )}
        </div>
      </div>
    </form>
  );
}

export default UpdateUserPasswordForm;