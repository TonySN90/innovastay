import { format } from "date-fns";
import useWindowWidth from "../../hooks/UseWindowWidth";
import { IGuestTypes } from "../../types/GuestTypes";

function GuestInfoBox({
  windowWidth,
  guest,
}: {
  windowWidth: number;
  guest: IGuestTypes;
}) {
  return (
    <div className="p-2">
      <h2 className="font-semibold mb-4 text-lg">Gast Informationen</h2>

      {windowWidth < 500 && (
        <h2 className="font-semibold">Gastdaten angelegt am</h2>
      )}
      <InfoRow
        label="Gastdaten angelegt am"
        info={format(new Date(guest.created_at), "dd.MM.yyyy")}
      />

      <div className="my-4">
        <h2 className="font-semibold">Adressdaten</h2>
        <InfoRow label="Name" info={guest.fullName} />
        <InfoRow label="Adresse" info={guest.address} />
        <InfoRow label="Postleitzahl" info={guest.postalCode} />
        <InfoRow label="Stadt" info={guest.city} />
        <InfoRow label="Land" info={guest.country} />
      </div>

      <h2 className="font-semibold">Kontaktdaten</h2>
      <div>
        <InfoRow label="E-Mail Addresse" info={guest.email} />
        <InfoRow label="Telefonnummer" info={guest.phone} />
      </div>

      <h2 className="font-semibold mt-2">Interne Informationen</h2>
      <div className="text-indigo-500">{guest.information}</div>
    </div>
  );
}

export default GuestInfoBox;

function InfoRow({ label, info }: { label: string; info: string }) {
  const windowWidth = useWindowWidth();

  return (
    <div className="flex justify-between">
      {windowWidth > 500 && (
        <span className="flex-shrink-0 w-1/3">{label}</span>
      )}

      <span className="flex-shrink-0 sm:w-2/3 break-words">{info}</span>
    </div>
  );
}
