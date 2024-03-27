function TotalsBox({
  numGuests,
  allDaysPrice,
  extrasPrice,
  totalPrice,
  numNights,
  pricePerNight,
  cabin,
  hasBreakfast,
}) {
  // const numNights = 3;
  return (
    <div className="mt-4 md:w-full p-3 border border-indigo-200 rounded-lg bg-indigo-100">
      <div className="flex">
        <p className="flex-1">
          Übernachtung: ({numNights} Nächte) a{" "}
          <span className={`${cabin?.discount && "text-green-500"}`}>
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
        <p>{extrasPrice}.00 €</p>
      </div>
      <div className="flex">
        <p className="flex-1">Gesamtpreis </p>
        <p className="font-semibold">{totalPrice}.00 €</p>
      </div>
    </div>
  );
}

export default TotalsBox;
