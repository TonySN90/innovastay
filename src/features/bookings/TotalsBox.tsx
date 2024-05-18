import { ITotalsBoxProps } from "../../types/BookingTypes";

function TotalsBox({ cabin, ...props }: ITotalsBoxProps) {
  return (
    <div className="mt-4 md:w-full bg-background_secondary p-3 border border-border rounded-lg ">
      <div className="flex">
        <p className="flex-1">
          Übernachtung: ({props.numNights} Nächte) à{" "}
          <span className={`${cabin?.discount && "text-green-500"}`}>
            {props.pricePerNight} €
          </span>
          :
        </p>
        <p>
          {props.allDaysPrice === 0
            ? props.allDaysPrice
            : props.pricePerNight * props.numNights}
          .00 €
        </p>
      </div>
      <div className="flex">
        <p className="flex-1">
          Frühstück:{" "}
          {props.hasBreakfast
            ? `(${props.numGuests} Person / ${props.numNights} Nächte) à ${
                props.extrasPrice / props.numNights / props.numGuests
              } €`
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
