import { SubmitHandler, useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { DevTool } from "@hookform/devtools";

import "react-datepicker/dist/react-datepicker.css";
import Button from "../../ui/Button";
import { FormValues } from "../../types/FormTypes";
import { StatusTypes } from "../../types/GlobalTypes";

import SearchBar from "../bookings/SearchBar";
import useCabins from "../cabins/useCabins";
import useCreateBooking from "./useCreateBooking";
import DatePicker from "react-datepicker";
import { de } from "date-fns/locale/de";
import useUpdateBooking from "./useUpdateBooking";
import TotalsBox from "./TotalsBox";
import {
  getCabinData,
  getNextDay,
  getOption,
  getStatus,
  getDate,
  getPricePerNight,
  getNumNights,
  getExtrasPrice,
  getTotalPrice,
  getAllDaysPrice,
  getCabin,
  getHasBreakfast,
} from "../../utils/helper";
// import { useBookingFormContext } from "./BookingFormContext";

function CreateBookingForm({
  onCloseModal,
  bookingToUpdate = {},
}: {
  onCloseModal?: () => void;
  bookingToUpdate?: FormValues | object;
}) {
  const { id: updateId } = bookingToUpdate as FormValues;

  // Hooks
  const { cabins } = useCabins();
  const isUpdatingSession = Boolean(bookingToUpdate && "id" in bookingToUpdate);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    defaultValues: {
      cabinId: isUpdatingSession ? getCabinData(bookingToUpdate) : null,
      guest: isUpdatingSession ? bookingToUpdate?.guests : null,
      startDate: isUpdatingSession
        ? getDate(bookingToUpdate?.startDate)
        : new Date(),
      endDate: isUpdatingSession
        ? getDate(bookingToUpdate?.endDate)
        : getNextDay(),
      numGuests: isUpdatingSession ? bookingToUpdate?.numGuests : 1,
      hasBreakfast: isUpdatingSession
        ? getOption(bookingToUpdate?.hasBreakfast)
        : null,
      isPaid: isUpdatingSession ? getOption(bookingToUpdate?.isPaid) : null,
      status: isUpdatingSession ? getStatus(bookingToUpdate?.status) : null,
    },
  });

  const { uploadNewBooking, uploadingStatus } = useCreateBooking(
    reset,
    onCloseModal || (() => {})
  );

  const { updateBooking, updatingStatus } = useUpdateBooking(
    reset,
    onCloseModal || (() => {})
  );

  const isUploading = uploadingStatus === StatusTypes.LOADING;
  const isUpdating = updatingStatus === StatusTypes.LOADING;
  const isWorking = isUploading || isUpdating;

  const watchedValues = watch();

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    const newBooking = {
      cabinId: formData.cabinId.value,
      guestId: formData.guest.id,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
      numGuests: +formData.numGuests,
      status: formData.status.value,
      hasBreakfast: formData.hasBreakfast.value,
      isPaid: formData.isPaid.value,
      cabinPrice: getPricePerNight(watchedValues, cabins),
      numNights: getNumNights(watchedValues),
      extrasPrice: getExtrasPrice(watchedValues),
      totalPrice: getTotalPrice(watchedValues, cabins),
    };

    if (isUpdatingSession) {
      // updateBooking(updateId as number, newBooking);
      console.log(newBooking);
      return;
    }

    // uploadNewBooking(newBooking);
    console.log(newBooking);
  };

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      minWidth: "300px",
      borderColor: state.isFocused && "#6366f1",
      borderRadius: "0.5rem",
      "&:hover": {
        borderColor: "#6366f1",
        color: "#333",
      },

      ":active": {
        color: "#6366f1",
      },

      ":disabled": {
        backgroundColor: "#6366f1",
      },
    }),
    option: (styles, state) => ({
      ...styles,
      backgroundColor: state.isSelected && "#6366f1",
      "&:hover": {
        backgroundColor: "#a5b4fc",
        color: "#fff",
      },
    }),
  };

  return (
    <>
      <form
        className="p-3 md:p-5 transition-all"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="font-semibold text-lg mb-3">
          {isUpdatingSession ? "Buchung bearbeiten" : "Buchung erstellen"}
        </h2>

        <FormRow label="Zimmer" id="cabinId" error={errors}>
          <Controller
            control={control}
            name="cabinId"
            rules={{ required: "Eintrag erforderlich" }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Select
                styles={selectStyles}
                onChange={onChange} // send value to hook form
                onBlur={onBlur} // notify when input is touched/blur
                ref={ref}
                value={value}
                options={cabins.map((cabin) => ({
                  value: cabin.id,
                  label: cabin.name,
                }))}
                placeholder="Zimmer auswählen"
              />
            )}
          />
        </FormRow>

        <FormRow label="Gast" id="guest" error={errors}>
          <Controller
            control={control}
            name="guest"
            rules={{ required: "Eintrag erforderlich" }}
            render={({ field: { onChange, value } }) => (
              <SearchBar
                onChange={onChange}
                id="guest"
                defaultValue={value}
                isUpdatingSession={isUpdatingSession}
              />
            )}
          />
        </FormRow>

        <FormRow label="Anreisedatum" id="startDate" error={errors}>
          <Controller
            rules={{ required: "Eintrag erforderlich" }}
            control={control}
            name="startDate"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <DatePicker
                locale={de}
                minDate={new Date()}
                className="w-full md:w-[300px] border border-gray-300 rounded-md h-9 pl-2 text-gray-500"
                disabled={isWorking}
                onChange={onChange}
                selected={value}
                ref={ref}
                dateFormat={"dd.MM.yyyy"}
                placeholderText="tt.mm.jjjj"
              />
            )}
          />
        </FormRow>

        <FormRow label="Abreisedatum" id="endDate" error={errors}>
          <Controller
            rules={{ required: "Eintrag erforderlich" }}
            control={control}
            name="endDate"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <DatePicker
                locale={de}
                minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                className="w-full md:w-[300px] border border-gray-300 rounded-md h-9 pl-2 text-gray-500"
                disabled={isWorking}
                onChange={onChange}
                selected={value}
                dateFormat={"dd.MM.yyyy"}
                placeholderText="tt.mm.jjjj"
              />
            )}
          />
        </FormRow>

        <FormRow label={"Anzahl der Gäste"} id="numGuests" error={errors}>
          <input
            className="w-full md:w-[300px] border border-gray-300 rounded-md h-9 pl-2 text-gray-500"
            type="number"
            id="numGuests"
            disabled={isWorking}
            // defaultValue={numGuests}
            {...register("numGuests", {
              required: "Eintrag erforderlich",
              min: 1,
            })}
          />
        </FormRow>

        <FormRow label={"Frühstück"} id="hasBreakfast" error={errors}>
          <Controller
            name="hasBreakfast"
            control={control}
            rules={{ required: "Eintrag erforderlich" }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Select
                styles={selectStyles}
                onChange={onChange}
                value={value}
                options={[
                  { value: true, label: "Ja" },
                  { value: false, label: "Nein" },
                ]}
                placeholder="Wähle..."
              />
            )}
          />
        </FormRow>

        <FormRow label={"Bereits bezahlt"} id="isPaid" error={errors}>
          <Controller
            name="isPaid"
            control={control}
            rules={{ required: "Eintrag erforderlich" }}
            render={({ field: { onChange, value } }) => (
              <Select
                styles={selectStyles}
                onChange={onChange}
                value={value}
                options={[
                  { value: true, label: "Ja" },
                  { value: false, label: "Nein" },
                ]}
                placeholder="Wähle..."
              />
            )}
          />
        </FormRow>

        <FormRow label={"Status"} id="status" error={errors}>
          <Controller
            name="status"
            control={control}
            rules={{ required: "Eintrag erforderlich" }}
            render={({ field: { onChange, value } }) => (
              <Select
                styles={selectStyles}
                onChange={onChange}
                value={value}
                options={[
                  { value: "confirmed", label: "Bestätigt" },
                  { value: "unconfirmed", label: "Ausstehend" },
                  { value: "checked-out", label: "Ausgechecked" },
                ]}
                placeholder="Wähle..."
              />
            )}
          />
        </FormRow>

        <TotalsBox
          numGuests={watchedValues.numGuests}
          allDaysPrice={getAllDaysPrice(watchedValues, cabins)}
          extrasPrice={getExtrasPrice(watchedValues)}
          totalPrice={getTotalPrice(watchedValues, cabins)}
          numNights={getNumNights(watchedValues)}
          pricePerNight={getPricePerNight(watchedValues, cabins)}
          hasBreakfast={getHasBreakfast(watchedValues)}
          cabin={getCabin(watchedValues, cabins)}
        />

        <div className="w-[full] flex justify-center md:justify-end mt-4">
          <Button
            type="reset"
            onClick={() => {
              reset();
            }}
            variation="inverted"
            size="md"
            extras="mr-2 rounded-lg"
            content="Zurücksetzen"
            loading={isWorking}
          />
          <Button
            type="submit"
            onClick={() => null}
            variation="standard"
            size="md"
            extras="rounded-lg"
            content={isUpdatingSession ? "Aktualisieren" : "Hinzufügen"}
            loading={isWorking}
          />
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
}

export default CreateBookingForm;

function FormRow({ children, label, error, id }) {
  return (
    <div className="border-b-2 border-indigo-100 md:min-w-[680px] transition-all flex flex-col md:flex-row py-4 justify-between md:items-center">
      {/* LABEL */}
      <label className="w-full md:w-[160px]" htmlFor={id}>
        {label}
      </label>

      {/* ERROR */}
      {error && (
        <span className="text-red-500 text-md w-[160px] md:max-w-[220px]">
          {error[id]?.message}
        </span>
      )}

      {/* Input */}
      {children}
    </div>
  );
}
