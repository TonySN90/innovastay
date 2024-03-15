import { useState } from "react";
import useGuests from "../features/guests/useGuests";

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

  function handleChange(e) {
    const filterResult = guests.filter((guest) =>
      guest.fullName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchTerm(e.target.value);
    setFilteredGuests(filterResult);
    setSelectedGuest(null);
  }

  function handleClick(guest) {
    setSelectedGuest(guest);
    handleClear();
  }

  function handleClear() {
    setSearchTerm("");
    setFilteredGuests([]);
  }

  //   console.log(Object.entries(selectedGuest).length);

  return (
    <div className="relative border-b-2 border-indigo-100 md:min-w-[680px] transition-all flex flex-col md:flex-row py-4 justify-between md:items-center">
      <label htmlFor="guest">{label}</label>

      <div className="relative">
        <input
          type="text"
          id={id}
          className="md:w-[300px] h-9 px-8 rounded-lg border-2 border-indigo-500"
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
        {/* {(selectedGuest === Object.values(selectedGuest).length) === 0 && (
          <span className="absolute text-red-800 inset-y-0 right-5 flex items-center">
            X
          </span>
        )} */}
      </div>

      <div className="absolute right-0 max-h-[190px] top-[5.5rem] md:top-16 flex flex-col gap-2 w-full md:w-[300px] pr-1 z-10 border-indigo-200 rounded-md overflow-y-scroll">
        {searchTerm.length > 0 ? (
          filteredGuests.length > 0 ? (
            filteredGuests.map((guest) => (
              <div
                className="transition-all cursor-pointer w-full bg-indigo-300 h-10 p-2 rounded-md hover:bg-indigo-400 hover:text-gray-50"
                key={guest.id}
                onClick={() => handleClick(guest)}
              >
                {guest.fullName}
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
