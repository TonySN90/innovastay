function TotalsBox(props) {
  return (
    <div className="mt-4 md:w-full p-3 border border-indigo-200 rounded-lg bg-indigo-100">
      <div className="flex">
        <p className="flex-1">
          Übernachtung: ({props.numNights} Nächte) à{" "}
          <span className={`${props.cabin?.discount && "text-green-500"}`}>
            {props.pricePerNight || props.cabin?.price} €
          </span>
          :
        </p>
        <p>
          {props.allDaysPrice === 0
            ? props.allDaysPrice
            : props.cabin?.price * props.numNights}
          .00 €
        </p>
      </div>
      <div className="flex">
        <p className="flex-1">
          Frühstück:{" "}
          {props.hasBreakfast
            ? `(${props.numGuests} Person / ${props.numNights} Nächte) à 15 €`
            : "Nicht erwünscht"}
        </p>
        <p>{props.extrasPrice}.00 €</p>
      </div>
      <div className="flex">
        <p className="flex-1">Gesamtpreis </p>
        <p className="font-semibold">{props.totalPrice}.00 €</p>
      </div>
    </div>
  );
}

export default TotalsBox;
