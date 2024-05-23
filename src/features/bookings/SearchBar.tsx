import { useEffect, useState } from "react";
import { GoInfo } from "react-icons/go";
import useGuests from "../guests/hooks/useGuests";
import useWindowWidth from "../../hooks/UseWindowWidth";
import Modal from "../../ui/Modal";
import GuestInfoBox from "../guests/GuestInfoBox";
import { IGuestTypes } from "../../types/GuestTypes";
import { ISearchBarProps } from "../../types/UiTypes";

function SearchBar({
  defaultValue,
  isUpdatingSession,
  onChange,
}: ISearchBarProps) {
  const [inputValue, setInputValue] = useState("");
  const [filteredGuests, setFilteredGuests] = useState<IGuestTypes[]>([]);
  const [selectedGuest, setSelectedGuest] = useState<IGuestTypes | null>(null);
  const { guests } = useGuests();
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (defaultValue) {
      setInputValue(defaultValue.fullName);
      setSelectedGuest(defaultValue);
    } else {
      setInputValue("");
      setSelectedGuest(null);
    }
  }, [defaultValue]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputText = e.target.value.toLowerCase();
    setInputValue(inputText);
    const filterResult = guests.filter((guest) =>
      guest.fullName.toLowerCase().includes(inputText)
    );

    setFilteredGuests(filterResult);
    setSelectedGuest(null);
  }

  function handleClick(guest: IGuestTypes) {
    setSelectedGuest(guest);
    onChange(guest);
    setInputValue(guest.fullName);
    setFilteredGuests([]);
  }

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          id="guest"
          autoComplete="off"
          className="w-full md:w-[300px] h-9 px-8 bg-inherit rounded-lg border border-border text-text outline-none focus:border-active hover:border-active"
          onChange={(e) => handleChange(e)}
          value={inputValue}
          placeholder={"Gast suchen"}
          disabled={isUpdatingSession}
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

      <div className="absolute right-0 max-h-[250px] top-[5.5rem] md:top-16 flex flex-col gap-2 w-full md:w-[300px] pr-1 z-10 bg-background_secondary border-border rounded-md overflow-y-scroll scroll-style">
        {inputValue.length > 0
          ? filteredGuests.length > 0 &&
            filteredGuests.map((guest) => (
              <div
                className="transition-all cursor-pointer w-full bg-status_blue h-10 rounded-md hover:bg-indigo-400 hover:text-gray-50 flex justify-between"
                key={guest.id}
              >
                <span
                  className="flex items-center pl-2 w-full"
                  onClick={() => handleClick(guest)}
                >
                  {guest.fullName}
                </span>

                <Modal>
                  <Modal.Open opens="guest-info">
                    <span className="h-10 bg-indigo-400 text-text w-10 flex justify-center items-center">
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
