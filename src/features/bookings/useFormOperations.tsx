import { useEffect } from "react";
import { useBookingFormContext } from "./BookingFormContext";
import { FormValues } from "../../types/FormTypes";
import { ICabinTypes } from "../../types/cabinTypes";

function useFormOperations(formValues: FormValues, cabins: ICabinTypes[]) {
  const {
    setHasBreakfast,
    setNumGuests,
    setNumNights,
    setPricePerNight,
    setAllDaysPrice,
    setExtrasPrice,
    setTotalPrice,
    setSelectedCabin,
    selectedCabin,
    numNights,
    pricePerNight,
    allDaysPrice,
    extrasPrice,
  } = useBookingFormContext();

  useEffect(() => {
    const cabinId = formValues.cabinId;
    const startDate = formValues.startDate;
    const endDate = formValues.endDate;
    const breakfast = formValues.hasBreakfast;
    const numGuests = Number(formValues.numGuests);
    setHasBreakfast(breakfast);
    setNumGuests(Number(formValues.numGuests));

    if (startDate && endDate) {
      const nights = Math.round(
        (endDate?.getTime() - startDate?.getTime()) / (1000 * 3600 * 24)
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

    if (breakfast?.value && numNights && numGuests) {
      setExtrasPrice(numNights * +numGuests * 15);
    } else {
      setExtrasPrice(0);
    }

    setTotalPrice(allDaysPrice + extrasPrice);
  }, [
    formValues,
    cabins,
    selectedCabin,
    numNights,
    pricePerNight,
    extrasPrice,
    allDaysPrice,
    setHasBreakfast,
    setNumNights,
    setNumGuests,
    setPricePerNight,
    setAllDaysPrice,
    setExtrasPrice,
    setTotalPrice,
    setSelectedCabin,
  ]);
}

export default useFormOperations;
