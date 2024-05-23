import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues } from "../../types/FormTypes";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import useSettings from "./hooks/useSettings";
import Spinner from "../../ui/Spinner";
import { LoadingTypes } from "../../types/GlobalTypes";
import Empty from "../../ui/Empty";
import useUpdateSettings from "./hooks/useUpdateSettings";

function UpdateSettingsForm() {
  const { settings, loadingStatus } = useSettings();
  const { updateSettings, updatingStatus } = useUpdateSettings();

  const isUpdating = updatingStatus === LoadingTypes.LOADING;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (settings.length) {
      setValue("minNights", settings[0].minNights);
      setValue("breakfastPrice", settings[0].breakfastPrice);
    }
  }, [settings, setValue]);

  const onSubmit: SubmitHandler<FormValues> = (data, event) => {
    event?.preventDefault();
    const minNights = Number(data.minNights);
    const breakfastPrice = Number(data.breakfastPrice);
    updateSettings({ minNights, breakfastPrice }, 1);
  };

  if (loadingStatus === LoadingTypes.LOADING) return <Spinner />;
  if (!settings.length) return <Empty resourceName="Einstellungen" />;

  return (
    <form
      className="p-3 md:p-5 transition-all bg-card rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      <div className="max-w-[850px] mx-auto">
        <h2 className="font-semibold text-lg mb-3 mt-5">
          Update Hoteleinstellungen
        </h2>

        <FormRow
          label={"Mindestübernachtungen"}
          id="minNights"
          error={errors as { [key: string]: { message: string } }}
        >
          <input
            className="w-full md:w-[300px] bg-inherit border border-border rounded-md h-9 pl-2 text-gray-500"
            type="number"
            id="minNights"
            disabled={isUpdating}
            {...register("minNights", {
              required: "Eintrag erforderlich",
            })}
          />
        </FormRow>

        <FormRow
          label={"Frühstückspreis pro Tag"}
          id="breakfastPrice"
          error={errors as { [key: string]: { message: string } }}
        >
          <input
            className="w-full md:w-[300px] bg-inherit border border-border rounded-md h-9 pl-2 text-gray-500"
            type="number"
            id="breakfastPrice"
            disabled={isUpdating}
            {...register("breakfastPrice", {
              required: "Eintrag erforderlich",
            })}
          />
        </FormRow>

        <div className="flex justify-end md:justify-end mt-4">
          <Button
            type="submit"
            onClick={() => console.log("test")}
            variation="standard"
            size="lg"
            extras="rounded-lg"
            content="Update Einstellungen"
          />
        </div>
      </div>
    </form>
  );
}

export default UpdateSettingsForm;
