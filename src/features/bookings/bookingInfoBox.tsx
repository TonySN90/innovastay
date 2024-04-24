import { format } from "date-fns";
import useWindowWidth from "../../hooks/UseWindowWidth";
import { IBookingTypes } from "../../types/BookingTypes";
import TotalsBox from "./TotalsBox";
import { formatDate, formatTime } from "../../utils/datesHelper";

function BookingInfoBox({
  windowWidth,
  booking,
}: {
  windowWidth: number;
  booking: IBookingTypes;
}) {
  const guest = booking.guests;
  const cabin = booking.cabins;


  return (
    <div className="p-2">
      <h2 className="font-semibold mb-4 text-lg">Buchungsinformationen</h2>

      {windowWidth < 500 && (
        <h2 className="font-semibold">Buchung angelegt am</h2>
      )}


      <InfoRow
        label="Buchung angelegt am"
        info={
          formatDate(new Date(booking.created_at)) +
          " - " +
          formatTime(new Date(booking.created_at))
        }
      />

      <div className="my-4">
        <h2 className="font-semibold">Zimmerdaten</h2>
        <InfoRow label="Zimmername" info={cabin.name} styling="font-semibold" />
        <InfoRow
          label="Buchungszeitraum"
          styling="font-semibold"
          info={
            format(new Date(booking.startDate), "dd.MM.yyyy") +
            " - " +
            format(new Date(booking.endDate), "dd.MM.yyyy")
          }
        />
      </div>

      <div className="my-4">
        <h2 className="font-semibold">Adressdaten</h2>
        <InfoRow label="Name" info={guest.fullName} />
        <InfoRow label="Adresse" info={guest.address} />
        <InfoRow label="Postleitzahl" info={guest.postalCode} />
        <InfoRow label="Stadt" info={guest.city} />
        <InfoRow label="Land" info={guest.country.toUpperCase()} />
      </div>

      <h2 className="font-semibold">Kontaktdaten</h2>
      <div>
        <InfoRow label="E-Mail Addresse" info={guest.email} />
        <InfoRow label="Telefonnummer" info={guest.phone} />
      </div>

      <h2 className="font-semibold mt-2">Interne Informationen</h2>
      <div className="text-indigo-500">{guest.information}</div>

      <TotalsBox
        numGuests={booking.numGuests}
        hasBreakfast={booking.hasBreakfast}
        cabin={cabin}
        numNights={booking.numNights}
        pricePerNight={booking.cabinPrice}
        allDaysPrice={booking.cabinPrice * booking.numNights}
        extrasPrice={booking.extrasPrice}
        totalPrice={booking.totalPrice}
      />
    </div>
  );
}

export default BookingInfoBox;

function InfoRow({
  label,
  info,
  styling = "",
}: {
  label: string;
  info: string;
  styling?: string;
}) {
  const windowWidth = useWindowWidth();

  return (
    <div className="flex justify-between">
      {windowWidth > 500 && (
        <span className={`flex-shrink-0 w-1/3`}>{label}</span>
      )}

      <span className={`flex-shrink-0 sm:w-2/3 break-words ${styling}`}>
        {info}
      </span>
    </div>
  );
}
