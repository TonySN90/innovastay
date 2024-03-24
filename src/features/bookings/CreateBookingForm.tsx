import { SubmitHandler, useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { DevTool } from "@hookform/devtools";

import "react-datepicker/dist/react-datepicker.css";
import Button from "../../ui/Button";
import { FormValues } from "../../types/FormTypes";
import { StatusTypes } from "../../types/GlobalTypes";

import SearchBar from "../bookings/SearchBar";
import { useEffect, useState } from "react";
import useCabins from "../cabins/useCabins";
import useCreateBooking from "./useCreateBooking";
import DatePicker from "react-datepicker";
import { de } from "date-fns/locale/de";
// import TotalsBox from "./TotalsBox";

function CreateBookingForm({
  onCloseModal,
  bookingToUpdate = {},
}: {
  onCloseModal?: () => void;
  bookingToUpdate?: FormValues | object;
}) {
  const { cabins } = useCabins();
  const isUpdatingSession = Boolean(bookingToUpdate && "id" in bookingToUpdate);

  // const { id: updateId, ...updateValues } = bookingToUpdate as FormValues;

  console.log(bookingToUpdate);

  const [cabinId, setCabinId] = useState(null);
  const [selectedCabin, setSelectedCabin] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );
  const [numGuests, setNumGuests] = useState(1);
  const [hasBreakfast, setHasBreakfast] = useState(null);

  const [numNights, setNumNights] = useState(1);
  const [pricePerNight, setPricePerNight] = useState(0);
  const [allDaysPrice, setAllDaysPrice] = useState(0);
  const [totalBreakfastPrice, setTotalBreakfastPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  console.log(bookingToUpdate);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    defaultValues: isUpdatingSession
      ? {
          cabinId: {
            value: bookingToUpdate.cabins.id,
            label: bookingToUpdate.cabins.name,
          },
          guest: bookingToUpdate.guests,
          startDate: bookingToUpdate.startDate,
          endDate: bookingToUpdate.endDate,
          numGuests: bookingToUpdate.numGuests,
          hasBreakfast: {
            value: bookingToUpdate.hasBreakfast,
            label: bookingToUpdate.hasBreakfast ? "Ja" : "Nein",
          },
          isPaid: {
            value: bookingToUpdate.isPaid,
            label: bookingToUpdate.isPaid ? "Ja" : "Nein",
          },
          status: {
            value: bookingToUpdate.status,
            label:
              bookingToUpdate.status === "confirmed"
                ? "Bestätigt"
                : bookingToUpdate.status === "checked-out"
                ? "Ausgechecked"
                : "Ausstehend",
          },
        }
      : { startDate, endDate, numGuests },
  });

  const { uploadNewBooking, uploadingStatus } = useCreateBooking(
    reset,
    onCloseModal || (() => {})
  );

  const isUploading = uploadingStatus === StatusTypes.LOADING;
  // const isUpdating = updatingStatus === StatusTypes.LOADING;
  // const isWorking = isUploading || isUpdating;
  // const isWorking = selectedGuest === null || isUploading;

  useEffect(() => {
    watch(() => {
      setCabinId(watch("cabinId"));
      setSelectedGuest(watch("guest"));
      setStartDate(watch("startDate"));
      setEndDate(watch("endDate"));
      setNumGuests(watch("numGuests"));
      setHasBreakfast(watch("hasBreakfast"));
    });

    if (startDate && endDate) {
      const nights = Math.round(
        (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
      );
      setNumNights(nights);
    }

    if (cabinId) {
      const cabin = cabins.find((cabin) => cabin.id === +cabinId.value);
      setSelectedCabin(cabin);
    }

    if (selectedCabin) {
      const price =
        selectedCabin.discount !== 0
          ? selectedCabin.discount
          : selectedCabin.price;
      setPricePerNight(price);
    }

    if (numNights && pricePerNight) {
      setAllDaysPrice(numNights * pricePerNight);
    }

    if (hasBreakfast?.value && numNights && numGuests) {
      console.log("hasBreakfast");
      setTotalBreakfastPrice(numNights * +numGuests * 15);
    }

    setTotalPrice(allDaysPrice + totalBreakfastPrice);
  }, [
    watch,
    startDate,
    endDate,
    cabinId,
    cabins,
    selectedCabin,
    numNights,
    pricePerNight,
    hasBreakfast,
    numGuests,
    totalBreakfastPrice,
    allDaysPrice,
  ]);

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    const newBooking = {
      cabinId: formData.cabinId.value,
      guestId: formData.guest.id,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
      numNights,
      numGuests: +formData.numGuests,
      cabinPrice: pricePerNight,
      totalPrice,
      status: formData.status.value,
      hasBreakfast: formData.hasBreakfast.value,
      isPaid: formData.isPaid.value,
    };

    uploadNewBooking(newBooking);
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

        <FormRow2 label="Zimmer" id="cabinId" error={errors}>
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
                isDisabled={isUpdatingSession}
              />
            )}
          />
        </FormRow2>

        <FormRow2 label="Gast" id="guest" error={errors}>
          <Controller
            control={control}
            name="guest"
            rules={{ required: "Eintrag erforderlich" }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <SearchBar
                onChange={onChange}
                onBlur={onBlur}
                id="guest"
                defaultValue={value}
                isUpdatingSession={isUpdatingSession}
              />
            )}
          />
        </FormRow2>

        <FormRow2 label="Anreisedatum" id="startDate" error={errors}>
          <Controller
            rules={{ required: "Eintrag erforderlich" }}
            control={control}
            name="startDate"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <DatePicker
                locale={de}
                minDate={new Date()}
                className="w-full md:w-[300px] border border-gray-300 rounded-md h-9 pl-2 text-gray-500"
                disabled={isUploading}
                onChange={onChange}
                onBlur={onBlur}
                // value={formatDate(value, "dd.MM.yyyy", { locale: de })}
                selected={value}
                dateFormat={"dd.MM.yyyy"}
                placeholderText="tt.mm.jjjj"
              />
            )}
          />
        </FormRow2>

        <FormRow2 label="Abreisedatum" id="endDate" error={errors}>
          <Controller
            rules={{ required: "Eintrag erforderlich" }}
            control={control}
            name="endDate"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <DatePicker
                locale={de}
                minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                className="w-full md:w-[300px] border border-gray-300 rounded-md h-9 pl-2 text-gray-500"
                disabled={isUploading}
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                dateFormat={"dd.MM.yyyy"}
                placeholderText="tt.mm.jjjj"
              />
            )}
          />
        </FormRow2>

        <FormRow2 label={"Anzahl der Gäste"} id="numGuests" error={errors}>
          <input
            className="w-full md:w-[300px] border border-gray-300 rounded-md h-9 pl-2 text-gray-500"
            type="number"
            id="numGuests"
            disabled={isUploading}
            // defaultValue={numGuests}
            {...register("numGuests", {
              required: "Eintrag erforderlich",
              min: 1,
            })}
          />
        </FormRow2>

        <FormRow2 label={"Frühstück"} id="hasBreakfast" error={errors}>
          <Controller
            name="hasBreakfast"
            control={control}
            rules={{ required: "Eintrag erforderlich" }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Select
                styles={selectStyles}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                value={value}
                options={[
                  { value: true, label: "Ja" },
                  { value: false, label: "Nein" },
                ]}
                placeholder="Wähle..."
              />
            )}
          />
        </FormRow2>

        <FormRow2 label={"Bereits bezahlt"} id="isPaid" error={errors}>
          <Controller
            name="isPaid"
            control={control}
            rules={{ required: "Eintrag erforderlich" }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Select
                styles={selectStyles}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                value={value}
                options={[
                  { value: true, label: "Ja" },
                  { value: false, label: "Nein" },
                ]}
                placeholder="Wähle..."
              />
            )}
          />
        </FormRow2>

        <FormRow2 label={"Status"} id="status" error={errors}>
          <Controller
            name="status"
            control={control}
            rules={{ required: "Eintrag erforderlich" }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Select
                styles={selectStyles}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
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
        </FormRow2>

        <div className="mt-4 md:w-full p-3 border border-indigo-200 rounded-lg bg-indigo-100">
          <div className="flex">
            <p className="flex-1">
              Übernachtung: ({numNights} Nächte) a{" "}
              <span
                className={`${selectedCabin?.discount && "text-green-500"}`}
              >
                {pricePerNight} €
              </span>
              :
            </p>
            <p>{allDaysPrice}.00 €</p>
          </div>
          <div className="flex">
            <p className="flex-1">
              Frühstück:{" "}
              {hasBreakfast?.value
                ? `(${numGuests} Person / ${numNights} Nächte) a 15 €`
                : "Nicht erwünscht"}
            </p>
            <p>{totalBreakfastPrice}.00 €</p>
          </div>
          <div className="flex">
            <p className="flex-1">Gesamtpreis </p>
            <p className="font-semibold">{totalPrice}.00 €</p>
          </div>
        </div>

        {/* <TotalsBox
          numGuests={numGuests}
          allDaysPrice={allDaysPrice}
          totalBreakfastPrice={totalBreakfastPrice}
          totalPrice={totalPrice}
          numNights={numNights}
          pricePerNight={pricePerNight}
          selectedCabin={selectedCabin}
        /> */}

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
            // loading={isWorking}
          />
          <Button
            type="submit"
            onClick={() => null}
            variation="standard"
            size="md"
            extras="rounded-lg"
            content={isUpdatingSession ? "Aktualisieren" : "Hinzufügen"}
            // loading={isWorking}
          />
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
}

export default CreateBookingForm;

function FormRow2({ children, label, error, id }) {
  return (
    <div className="border-b-2 border-indigo-100 md:min-w-[680px] transition-all flex flex-col md:flex-row py-4 justify-between md:items-center">
      {/* LABEL */}
      <label htmlFor={id}>{label}</label>

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
