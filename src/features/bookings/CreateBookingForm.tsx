import { SubmitHandler, useForm } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";
import Button from "../../ui/Button";
import { FormValues } from "../../types/FormTypes";
import FormRow from "../../ui/FormRow";

import { StatusTypes } from "../../types/GlobalTypes";

import SearchBar from "../bookings/SearchBar";
import { useEffect, useState } from "react";
import useCabins from "../cabins/useCabins";
import useCreateBooking from "./useCreateBooking";

function CreateBookingForm({
  onCloseModal,
  cabinToUpdate = {},
}: {
  onCloseModal?: () => void;
  cabinToUpdate?: FormValues | object;
}) {
  const { cabins } = useCabins();

  const [selectedGuest, setSelectedGuest] = useState(null);
  const [selectedCabin, setSelectedCabin] = useState(null);
  const [hasBreakfast, setHasBreakfast] = useState(false);
  const [numGuests, setNumGuests] = useState(2);
  const [numNights, setNumNights] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().setDate(startDate.getDate() + 1))
  );

  const [pricePerNight, setPricePerNight] = useState(0);
  const [priceAllDays, setPriceAllDays] = useState(0);
  const [totalBreakfastPrice, setTotalBreakfastPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const isUpdatingSession = Boolean(cabinToUpdate && "id" in cabinToUpdate);
  const { id: updateId, ...updateValues } = cabinToUpdate as FormValues;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: isUpdatingSession ? updateValues : {},
  });

  const { uploadNewBooking, uploadingStatus } = useCreateBooking(
    reset,
    onCloseModal || (() => {})
  );

  // const { updateBooking, updatingStatus } = useUpdateBooking(
  //   reset,
  //   onCloseModal || (() => {})
  // );

  useEffect(() => {
    if (selectedCabin) {
      const price =
        selectedCabin.discount !== 0
          ? selectedCabin.discount
          : selectedCabin.price;
      setPricePerNight(price);
      setPriceAllDays(price * numNights);
      setNumNights(
        Math.round(
          (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
        )
      );
    }

    if (hasBreakfast) {
      setTotalBreakfastPrice(numNights * +numGuests * 15);
    } else {
      setTotalBreakfastPrice(0);
    }
    setTotalPrice(priceAllDays + totalBreakfastPrice);
  }, [
    selectedCabin,
    hasBreakfast,
    priceAllDays,
    totalBreakfastPrice,
    numGuests,
    numNights,
    startDate,
    endDate,
  ]);

  const isUploading = uploadingStatus === StatusTypes.LOADING;
  // const isUpdating = updatingStatus === StatusTypes.LOADING;
  // const isWorking = isUploading || isUpdating;
  const isWorking = selectedGuest === null || isUploading;

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    // isUpdatingSession
    //   ? updateCabin(updateId as number, { ...formData })
    //   : uploadNewCabin(formData);

    const guestData = {
      ...formData,
      guestId: selectedGuest?.id,
      cabinId: Number(formData.cabinId),
      isPaid: formData.isPaid === "true",
      hasBreakfast: formData.hasBreakfast === "true",
      cabinPrice: pricePerNight,
      extrasPrice: totalBreakfastPrice,
      totalPrice: totalPrice,
      numGuests: Number(formData.numGuests),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      numNights,
    };

    console.log(guestData);
    uploadNewBooking(guestData);
  };

  function resetForm() {
    setSelectedCabin(null);
    setSelectedGuest(null);
    setHasBreakfast(false);
    setNumGuests(1);
    setNumNights(1);
    setStartDate(new Date());
    setEndDate(new Date(new Date().setDate(startDate.getDate() + 1)));
    setPricePerNight(0);
    setPriceAllDays(0);
    setTotalBreakfastPrice(0);
    setTotalPrice(0);
    reset();
  }

  return (
    <>
      <form
        className="p-3 md:p-5 transition-all"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="font-semibold text-lg mb-3">Neue Buchung hinzufügen</h2>

        <FormRow
          label="Zimmer"
          type="select"
          id="cabinId"
          cabins={cabins}
          registerProp={{ register, required: "Eintrag erforderlich" }}
          error={errors?.cabinId?.message}
          handleChange={setSelectedCabin}
        />

        <SearchBar
          label="Gast"
          setSelectedGuest={setSelectedGuest}
          selectedGuest={selectedGuest}
          id="guest"
        />

        <FormRow
          label="Anreisedatum"
          type="date"
          id="startDate"
          registerProp={{ register, required: "Eintrag erforderlich" }}
          error={errors?.startDate?.message}
          isUploading={isWorking}
          handleChange={setStartDate}
          date={startDate}
        />

        <FormRow
          label="Abreisedatum"
          type="date"
          id="endDate"
          registerProp={{ register, required: "Eintrag erforderlich" }}
          error={errors?.endDate?.message}
          isUploading={isWorking}
          handleChange={setEndDate}
          date={endDate}
        />
        <FormRow
          label="Anzahl Personen"
          type="number"
          id="numGuests"
          registerProp={{ register, required: "Eintrag erforderlich" }}
          error={errors?.numGuests?.message}
          isUploading={isWorking}
          handleChange={setNumGuests}
          value={numGuests}
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
        />

        <div className="w-[full] flex justify-center md:justify-end mt-4">
          <Button
            type="reset"
            onClick={() => {
              resetForm();
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
    </>
  );
}

export default CreateBookingForm;

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
