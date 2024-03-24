import { SubmitHandler, useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { DevTool } from "@hookform/devtools";

import "react-datepicker/dist/react-datepicker.css";
import Button from "../../ui/Button";
import { FormValues } from "../../types/FormTypes";
import FormRow from "../../ui/FormRow";

import { StatusTypes } from "../../types/GlobalTypes";

import SearchBar from "../bookings/SearchBar";
import { useEffect, useState } from "react";
import useCabins from "../cabins/useCabins";
import useCreateBooking from "./useCreateBooking";
import DatePicker from "react-datepicker";
import { formatDate } from "date-fns";
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

  const [selectedCabin, setSelectedCabin] = useState(
    isUpdatingSession ? bookingToUpdate?.cabins : null
  );
  const [hasBreakfast, setHasBreakfast] = useState(
    isUpdatingSession ? bookingToUpdate?.hasBreakfast : false
  );
  const [numGuests, setNumGuests] = useState(
    isUpdatingSession ? bookingToUpdate?.numGuests : 2
  );
  const [numNights, setNumNights] = useState(
    isUpdatingSession ? bookingToUpdate?.numNights : 1
  );
  // const [startDate, setStartDate] = useState(
  //   isUpdatingSession ? new Date(bookingToUpdate?.startDate) : new Date()
  // );
  // const [endDate, setEndDate] = useState(
  //   isUpdatingSession
  //     ? new Date(bookingToUpdate?.endDate)
  //     : new Date(new Date().setDate(startDate.getDate() + 1))
  // );

  const [pricePerNight, setPricePerNight] = useState(
    isUpdatingSession ? selectedCabin?.price : 0
  );

  const [priceAllDays, setPriceAllDays] = useState(
    isUpdatingSession ? bookingToUpdate?.cabins?.price * numNights : 0
  );
  const [totalBreakfastPrice, setTotalBreakfastPrice] = useState(
    isUpdatingSession ? bookingToUpdate?.extrasPrice : 0
  );
  const [totalPrice, setTotalPrice] = useState(
    isUpdatingSession ? bookingToUpdate?.totalPrice : 0
  );

  // const { id: updateId, ...updateValues } = bookingToUpdate as FormValues;

  const { uploadNewBooking, uploadingStatus } = useCreateBooking(
    // reset,
    onCloseModal || (() => {})
  );

  // const { updateBooking, updatingStatus } = useUpdateBooking(
  //   reset,
  //   onCloseModal || (() => {})
  // );

  // useEffect(() => {
  //   const nights = Math.round(
  //     (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
  //   );

  //   setNumNights(nights);

  //   if (selectedCabin && !isUpdatingSession) {
  //     const price =
  //       selectedCabin.discount !== 0
  //         ? selectedCabin.discount
  //         : selectedCabin.price;
  //     setPricePerNight(price);

  //     setPriceAllDays(price * nights);
  //     setTotalPrice(priceAllDays + totalBreakfastPrice);
  //   }

  //   if (hasBreakfast && numNights && numGuests) {
  //     setTotalBreakfastPrice(numNights * +numGuests * 15);
  //   } else {
  //     setTotalBreakfastPrice(0);
  //   }
  // }, [
  //   startDate,
  //   endDate,
  //   selectedCabin,
  //   hasBreakfast,
  //   numNights,
  //   numGuests,
  //   isUpdatingSession,
  //   priceAllDays,
  //   totalBreakfastPrice,
  // ]);

  const isUploading = uploadingStatus === StatusTypes.LOADING;
  // const isUpdating = updatingStatus === StatusTypes.LOADING;
  // const isWorking = isUploading || isUpdating;
  // const isWorking = selectedGuest === null || isUploading;

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    const newBooking = {
      ...formData,
      cabinId: formData.cabinId.value,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
    };

    console.log(newBooking);
  };

  // const [cabinId, setCabinId] = useState(null);
  const [cabinId, setCabinId] = useState({
    value: 276,
    label: "Zimmer 2",
  });
  // const [guest, setGuest] = useState(null);
  const [guest, setGuest] = useState({
    id: 3,
    created_at: "2024-03-12T09:52:41+00:00",
    fullName: "Sandra Müller",
    address: "Müllerstraße 2",
    postalCode: "18057",
    city: "Schwerin",
    country: "De",
    email: "sandramueller@gmail.com",
    phone: 15799563268,
    information: "Alles in Ordnung!",
  });

  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("2024-03-21T23:00:00.000Z");
  const [endDate, setEndDate] = useState("2024-03-29T23:00:00.000Z");

  // const isWorking = guest === null || isUploading;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    defaultValues: { cabinId, guest, startDate, endDate },
  });

  useEffect(() => {
    watch(() => {
      setCabinId(watch("cabinId"));
      setGuest(watch("guest"));
      setStartDate(watch("startDate"));
      setEndDate(watch("endDate"));
    });
  }, [watch]);

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
                value={formatDate(value, "dd.MM.yyyy", { locale: de })}
                // selected={value}
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

        {/* <FormRow

        <FormRow
          label="Anzahl Personen"
          type="number"
          id="numGuests"
          registerProp={{ register, required: "Eintrag erforderlich" }}
          error={errors?.numGuests?.message}
          isUploading={isWorking}
          handleChange={setNumGuests}
          defaultValue={numGuests}
        />
        <FormRow
          label="Frühstück"
          type="select"
          id="hasBreakfast"
          registerProp={{ register, required: "Eintrag erforderlich" }}
          error={errors?.hasBreakfast?.message}
          isUploading={isWorking}
          handleChange={setHasBreakfast}
        />
        <FormRow
          label="Bereits bezahlt?"
          type="select"
          id="isPaid"
          registerProp={{ register, required: "Eintrag erforderlich" }}
          error={errors?.isPaid?.message}
          isUploading={isWorking}
        />
        <FormRow
          label="Status"
          type="select"
          id="status"
          registerProp={{ register, required: "Eintrag erforderlich" }}
          error={errors?.status?.message}
          isUploading={isWorking}
        />

        <TotalsBox
          numGuests={numGuests}
          priceAllDays={priceAllDays}
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

function TotalsBox({
  numGuests,
  priceAllDays,
  totalBreakfastPrice,
  totalPrice,
  numNights,
  pricePerNight,
  selectedCabin,
}) {
  return (
    <div className="mt-4 md:w-full p-3 border border-indigo-200 rounded-lg bg-indigo-100">
      <div className="flex">
        <p className="flex-1">
          Übernachtung: ({numNights} Nächte) a{" "}
          <span className={`${selectedCabin?.discount && "text-green-500"}`}>
            {pricePerNight} €
          </span>
          :
        </p>
        <p>{priceAllDays}.00 €</p>
      </div>
      <div className="flex">
        <p className="flex-1">
          Frühstück: ({numGuests} Person / {numNights} Nächte) a 15 €:
        </p>
        <p>{totalBreakfastPrice}.00 €</p>
      </div>
      <div className="flex">
        <p className="flex-1">Gesamtpreis </p>
        <p className="font-semibold">{totalPrice}.00 €</p>
      </div>
    </div>
  );
}
