import { SubmitHandler, useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow2";
import { FormValues } from "../../types/FormTypes";
import Button from "../../ui/Button";

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
        <FormRow
          label="Mindestübernachtungen"
          type="text"
          id="nights"
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.nights?.message}
          isUploading
        />
        <FormRow
          label="Maximale Gastanzahl pro Buchung"
          type="number"
          id="maxGuestsPerBooking"
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.maxGuestsPerBooking?.message}
        />
        <FormRow
          label="Frühstückspreis pro Tag"
          type="number"
          id="breakfastPrice"
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.breakfastPrice?.message}
        />
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
