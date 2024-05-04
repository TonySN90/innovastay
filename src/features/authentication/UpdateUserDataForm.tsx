import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues } from "../../types/FormTypes";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import { useAppSelector } from "../../store";
import MiniSpinner from "../../ui/MiniSpinner";

function UpdateUserDataForm({
  updateUser,
  isUpdating,
}: {
  updateUser: (object) => void;
  isUpdating: boolean;
}) {
  const { user } = useAppSelector((state) => state.auth);

  const { fullName } = user?.user_metadata || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: user?.email,
      fullName,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (!data.fullName) return;

    updateUser({ fullName: data.fullName, avatar: data.image[0] });
  };

  return (
    <form
      className="p-3 md:p-5 transition-all bg-gray-50 rounded-lg mb-8 shadow-lg shadow-gray-200"
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      <div className="max-w-[850px] mx-auto">
        <h2 className="font-semibold text-lg mb-3 mt-5">Update Nutzerdaten</h2>

        <FormRow
          label={"E-Mail Adresse"}
          id="email"
          error={errors as { [key: string]: { message: string } }}
        >
          <input
            className="w-full md:w-[300px] border border-gray-300 rounded-md h-9 pl-2 text-gray-500"
            type="email"
            id="email"
            disabled={true}
            {...register("email")}
          />
        </FormRow>

        <FormRow
          label={"Vor- und Nachname"}
          id="fullName"
          error={errors as { [key: string]: { message: string } }}
        >
          <input
            className="w-full md:w-[300px] border border-gray-300 rounded-md h-9 pl-2 text-gray-500"
            type="text"
            id="fullName"
            disabled={isUpdating}
            {...register("fullName", {
              required: "Eintrag erforderlich",
            })}
          />
        </FormRow>

        <FormRow
          label={"Bild"}
          id="image"
          error={errors as { [key: string]: { message: string } }}
        >
          <input
            type="file"
            className="fileInputStyle flex items-center justify-center w-full md:w-[300px]"
            accept="image/*"
            disabled={isUpdating}
            {...register("image")}
          />
        </FormRow>

        <div className="flex justify-end md:justify-end mt-4">
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

export default UpdateUserDataForm;
