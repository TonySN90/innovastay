export function getCabinData(bookingToUpdate) {
  return {
    value: bookingToUpdate?.cabins.id,
    label: bookingToUpdate?.cabins.name,
  };
}

export function getDate(date) {
  return new Date(date);
}

export function getNextDay() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return new Date(tomorrow);
}

export function getOption(value) {
  return value !== null ? { value, label: value ? "Ja" : "Nein" } : null;
}

export function getStatus(status) {
  switch (status) {
    case "checkedIn":
      return { value: status, label: "Eingechecket" };
    // case "checkedOut":
    //   return { value: status, label: "Ausgechecket" };
    default:
      return { value: status, label: "Ausstehend" };
  }
}

export function getCabin(watchedValues, cabins) {
  const { cabinId } = watchedValues;

  if (cabinId && cabins) {
    return cabins.find((cabin) => cabin.id === +cabinId.value);
  }
}

export function getHasBreakfast(watchedValues) {
  return watchedValues.hasBreakfast?.value;
}

export function getPricePerNight(watchedValues, cabins) {
  const selectedCabin = getCabin(watchedValues, cabins);

  if (!selectedCabin) return 0;

  return selectedCabin.discount !== 0
    ? selectedCabin.discount
    : selectedCabin.price;
}

export function getNumNights(watchedValues) {
  return Math.round(
    (watchedValues.endDate?.getTime() - watchedValues.startDate?.getTime()) /
      (1000 * 3600 * 24)
  );
}

export function getAllDaysPrice(watchedValues, cabins) {
  return getNumNights(watchedValues) * getPricePerNight(watchedValues, cabins);
}

export function getExtrasPrice(watchedValues) {
  if (
    getHasBreakfast(watchedValues) &&
    getNumNights(watchedValues) &&
    +watchedValues.numGuests
  ) {
    return getNumNights(watchedValues) * 15 * +watchedValues.numGuests;
  } else {
    return 0;
  }
}

export function getTotalPrice(watchedValues, cabins) {
  return getAllDaysPrice(watchedValues, cabins) + getExtrasPrice(watchedValues);
}
