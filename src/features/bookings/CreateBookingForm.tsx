import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { FormValues } from "../../types/FormTypes";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "../cabins/useCreateCabin";
import { StatusTypes } from "../../types/GlobalTypes";
import useUpdateCabin from "../cabins/useUpdateCabin";
import SearchBar from "../bookings/SearchBar";
import { useEffect, useState } from "react";
import useCabins from "../cabins/useCabins";

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
  const [numPersons, setNumPersons] = useState(1);
  const [pricePerNight, setPricePerNight] = useState(0);
  const [priceAllDays, setPriceAllDays] = useState(0);
  const [totalBreakfastPrice, setTotalBreakfastPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const isUpdatingSession = Boolean(cabinToUpdate && "id" in cabinToUpdate);
  const { id: updateId, ...updateValues } = cabinToUpdate as FormValues;

  useEffect(() => {
    if (selectedCabin) {
      const price =
        selectedCabin.discount !== 0
          ? selectedCabin.discount
          : selectedCabin.price;
      setPricePerNight(price);
      setPriceAllDays(price * 7);
    }

    // hasBreakfast && setTotalBreakfastPrice(7 * 15 * 2);
    // !hasBreakfast && setTotalBreakfastPrice(0);
    console.log(hasBreakfast);
    if (hasBreakfast) {
      setTotalBreakfastPrice(7 * 15 * 2);
    } else {
      setTotalBreakfastPrice(0);
    }
    setTotalPrice(priceAllDays + totalBreakfastPrice);
    console.log(priceAllDays, totalBreakfastPrice);
  }, [selectedCabin, hasBreakfast, priceAllDays, totalBreakfastPrice]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    defaultValues: isUpdatingSession ? updateValues : {},
  });

  // const isUploading = uploadingStatus === StatusTypes.LOADING;
  // const isUpdating = updatingStatus === StatusTypes.LOADING;
  // const isWorking = isUploading || isUpdating;
  const isWorking = selectedGuest === null || false;

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
      numNights: 7,
    };
    console.log(guestData);
  };

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
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.cabinId?.message}
          onChange={setSelectedCabin}
        />

        <SearchBar
          label="Gast"
          setSelectedGuest={setSelectedGuest}
          selectedGuest={selectedGuest}
          id="guest"
        />

        <FormRow
          label="Anreisedatum"
          type="text"
          id="startDate"
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.startDate?.message}
          isUploading={isWorking}
        />
        <FormRow
          label="Abreisedatum"
          type="text"
          id="endDate"
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.endDate?.message}
          isUploading={isWorking}
        />
        <FormRow
          label="Anzahl Personen"
          type="number"
          id="numGuests"
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.numGuests?.message}
          isUploading={isWorking}
          onChange={setNumPersons}
        />
        <FormRow
          label="Frühstück"
          type="select"
          id="hasBreakfast"
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.hasBreakfast?.message}
          isUploading={isWorking}
          onChange={setHasBreakfast}
        />
        <FormRow
          label="Bereits bezahlt?"
          type="select"
          id="isPaid"
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.isPaid?.message}
          isUploading={isWorking}
        />
        <FormRow
          label="Status"
          type="select"
          id="status"
          registerProp={{ register, required: "Dieses Feld ist erforderlich" }}
          error={errors?.status?.message}
          isUploading={isWorking}
        />
        <div className="mt-4 md:w-full p-3 border border-indigo-200 rounded-lg">
          <div className="flex">
            <p className="flex-1">Preis pro Nacht a 7 Nächte:</p>
            <p>
              7 Nächte * {pricePerNight} € p.N = {priceAllDays}.00 €
            </p>
          </div>
          <div className="flex">
            <p className="flex-1">
              Zzgl. Frühstück pro Person a 2 Personen pro Tag:
            </p>
            <p>{totalBreakfastPrice}</p>
          </div>
          <div className="flex">
            <p className="flex-1">Gesamtpreis: </p>
            <p>{totalPrice} €</p>
          </div>
        </div>
        <div className="w-[full] flex justify-center md:justify-end mt-4">
          <Button
            type="reset"
            onClick={() => selectedGuest && setSelectedGuest(null)}
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
            loading={isWorking}
          />
        </div>
      </form>
    </>
  );
}

export default CreateBookingForm;
