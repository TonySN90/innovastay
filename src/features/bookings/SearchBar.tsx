import { useEffect, useState } from "react";
import { GoInfo } from "react-icons/go";
import useGuests from "../guests/useGuests";
import useWindowWidth from "../../hooks/UseWindowWidth";
import Modal from "../../ui/Modal";
import GuestInfoBox from "../guests/GuestInfoBox";

function SearchBar({
  label,
  selectedGuest,
  setSelectedGuest,
  defaultValue,
}: {
  label: string;
}) {
  const [inputValue, setInputValue] = useState("");
  const [filteredGuests, setFilteredGuests] = useState([]);
  const { guests } = useGuests();
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (selectedGuest) {
      setInputValue(selectedGuest.fullName);
    } else {
      setInputValue(defaultValue);
    }
  }, [selectedGuest, defaultValue]);

  function handleChange(e) {
    const inputText = e.target.value.toLowerCase();
    setInputValue(inputText);
    const filterResult = guests.filter((guest) =>
      guest.fullName.toLowerCase().includes(inputText)
    );

    setFilteredGuests(filterResult);
    setSelectedGuest(null);
  }

  function handleClickSelect(guest) {
    setSelectedGuest(guest);
    setInputValue(guest.fullName);
    setFilteredGuests([]);
  }

  return (
    <div className="relative border-b-2 border-indigo-100 md:min-w-[680px] transition-all flex flex-col md:flex-row py-4 justify-between md:items-center">
      <label htmlFor="guest">
        {label}{" "}
        <span className="text-sm ml-6 text-indigo-500 font-semibold cursor-pointer">
          Neuen Gast anlegen
        </span>
      </label>

      <div className="relative">
        <input
          type="text"
          id="guest"
          className="w-full md:w-[300px] h-9 px-8 rounded-lg border border-gray-300"
          onChange={(e) => handleChange(e)}
          value={inputValue}
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
        {inputValue.length > 0
          ? filteredGuests.length > 0 &&
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
                    <GuestInfoBox windowWidth={windowWidth} guest={guest} />
                  </Modal.Window>
                </Modal>
              </div>
            ))
          : null}
        {inputValue.length > 0 &&
        filteredGuests.length === 0 &&
        selectedGuest === null ? (
          <div className="transition-all cursor-pointer w-full bg-indigo-300 h-10 p-2 rounded-md hover:bg-indigo-400 hover:text-gray-50">
            Kein Ergebnis
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SearchBar;
