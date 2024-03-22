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

export default TotalsBox;
