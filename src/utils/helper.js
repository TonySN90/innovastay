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
    case "confirmed":
      return { value: status, label: "Bestätigt" };
    case "checked-out":
      return { value: status, label: "Ausgechecked" };
    default:
      return { value: status, label: "Ausstehend" };
  }
}
