import { useState } from "react";
import useGuests from "../features/guests/useGuests";

function SearchBar({ label }: { label: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGuests, setFilteredGuests] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState({});

  const { guests, loadingStatus, error } = useGuests();

  function handleChange(e) {
    const filterResult = guests.filter((guest) =>
      guest.fullName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchTerm(e.target.value);
    setFilteredGuests(filterResult);
  }

  console.log(filteredGuests);
  console.log(searchTerm.length);
  console.log(filteredGuests.length === 0 && searchTerm.length > 0);

  return (
    <div className="relative border-b-2 border-indigo-100 md:min-w-[680px] transition-all flex flex-col md:flex-row py-4 justify-between md:items-center">
      <label htmlFor="guest">{label}</label>
      <input
        type="text"
        id="guest"
        className="md:w-[300px] h-10 px-2 rounded-xl"
        onChange={(e) => handleChange(e)}
        value={searchTerm}
      />

      <div className="absolute right-0 top-[5.5rem] md:top-16 flex flex-col gap-2 w-full md:w-[300px] h-9 z-10">
        {searchTerm.length > 0 ? (
          filteredGuests.length > 0 ? (
            filteredGuests.map((guest) => (
              <div
                className="transition-all cursor-pointer w-full bg-indigo-300 h-10 p-2 rounded-md hover:bg-indigo-400 hover:text-gray-50"
                key={guest.id}
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

      {/* <select name="guest" id="guest">
        {filteredGuests.map((guest) => (
          <option value={guest.fullName} key={guest.id}>
            {guest.fullName}
          </option>
        ))}
      </select> */}
    </div>
  );
}

export default SearchBar;
