import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues } from "../../types/FormTypes";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";

function UpdateSettingsForm() {
  const {
    register,
    handleSubmit,
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
          Update Hoteleinstellungen
        </h2>

        <FormRow label={"Mindestübernachtungen"} id="nights" error={errors}>
          <input
            className="w-full md:w-[300px] border border-gray-300 rounded-md h-9 pl-2 text-gray-500"
            type="text"
            id="nights"
            // disabled={isWorking}
            {...register("nights", {
              required: "Eintrag erforderlich",
            })}
          />
        </FormRow>

        <FormRow
          label={"Maximale Gastanzahl pro Buchung"}
          id="maxGuestsPerBooking"
          error={errors}
        >
          <input
            className="w-full md:w-[300px] border border-gray-300 rounded-md h-9 pl-2 text-gray-500"
            type="number"
            id="maxGuestsPerBooking"
            // disabled={isWorking}
            {...register("maxGuestsPerBooking", {
              required: "Eintrag erforderlich",
            })}
          />
        </FormRow>

        <FormRow
          label={"Frühstückspreis pro Tag"}
          id="breakfastPrice"
          error={errors}
        >
          <input
            className="w-full md:w-[300px] border border-gray-300 rounded-md h-9 pl-2 text-gray-500"
            type="number"
            id="breakfastPrice"
            // disabled={isWorking}
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
