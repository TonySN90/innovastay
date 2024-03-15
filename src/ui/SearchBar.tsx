import { useState } from "react";
import useGuests from "../features/guests/useGuests";
import { GoInfo } from "react-icons/go";
import Modal from "./Modal";
import { format } from "date-fns";
import useWindowWidth from "../hooks/UseWindowWidth";

function SearchBar({
  id,
  label,
  selectedGuest,
  setSelectedGuest,
}: {
  label: string;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGuests, setFilteredGuests] = useState([]);
  const { guests } = useGuests();
  const windowWidth = useWindowWidth();

  function handleChange(e) {
    const filterResult = guests.filter((guest) =>
      guest.fullName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchTerm(e.target.value);
    setFilteredGuests(filterResult);
    setSelectedGuest(null);
  }
  function handleClear() {
    setSearchTerm("");
    setFilteredGuests([]);
  }

  function handleClickSelect(guest) {
    setSelectedGuest(guest);
    handleClear();
  }

  return (
    <div className="relative border-b-2 border-indigo-100 md:min-w-[680px] transition-all flex flex-col md:flex-row py-4 justify-between md:items-center">
      <label htmlFor="guest">{label}</label>

      <div className="relative">
        <input
          type="text"
          id={id}
          className="w-full md:w-[300px] h-9 px-8 rounded-lg border-2 border-indigo-500"
          onChange={(e) => handleChange(e)}
          value={selectedGuest ? selectedGuest.fullName : searchTerm}
          placeholder={"Gast suchen"}
        />
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 text-gray-400"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="6" />
            <line x1="20" y1="20" x2="15" y2="15" />
          </svg>
        </span>
      </div>

      <div className="absolute right-0 max-h-[250px] top-[5.5rem] md:top-16 flex flex-col gap-2 w-full md:w-[300px] pr-1 z-10 border-indigo-200 bg-gray-50 rounded-md overflow-y-scroll scroll-style">
        {searchTerm.length > 0 ? (
          filteredGuests.length > 0 ? (
            filteredGuests.map((guest) => (
              <div
                className="transition-all cursor-pointer w-full bg-indigo-300 h-10 rounded-md hover:bg-indigo-400 hover:text-gray-50 flex justify-between"
                key={guest.id}
              >
                <span
                  className="flex items-center pl-2 w-full"
                  onClick={() => handleClickSelect(guest)}
                >
                  {guest.fullName}
                </span>

                <Modal>
                  <Modal.Open opens="guest-info">
                    <span className="bg-indigo-400 text-gray-50 w-10 flex justify-center items-center">
                      <GoInfo className="hover:scale-125 transition-all" />
                    </span>
                  </Modal.Open>

                  <Modal.Window name="guest-info">
                    <div className="p-2">
                      <h2 className="font-semibold mb-4 text-lg">
                        Gast Informationen
                      </h2>

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
                    </div>
                  </Modal.Window>
                </Modal>
              </div>
            ))
          ) : (
            <div className="transition-all cursor-pointer w-full bg-indigo-300 h-10 p-2 rounded-md hover:bg-indigo-400 hover:text-gray-50">
              Kein Ergebnis
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}

export default SearchBar;

function InfoRow({ label, info }: { label: string; info: string }) {
  const windowWidth = useWindowWidth();

  return (
    <div className="flex justify-between">
      {windowWidth > 500 && (
        <span className="flex-shrink-0 w-1/3">{label}</span>
      )}

      <span className="flex-shrink-0 w-2/3 ">{info}</span>
    </div>
  );
}
