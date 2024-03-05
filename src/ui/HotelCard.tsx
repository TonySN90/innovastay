import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

function HotelCard() {
  const [isOpen, setIsOpen] = useState(false);
  function handleClick() {
    setIsOpen(() => !isOpen);
  }

  return (
    <div className="text-gray-50 rounded-lg flex flex-col text-sm border-[4px] border-indigo-200">
      <div className="flex flex-col bg-indigo-500 p-2 w-full rounded-t-md">
        <span>Hotel</span>
        <span className="font-semibold">Panorama Inn</span>
      </div>
      {isOpen && (
        <div>
          <hr className=" border-indigo-500" />
          <span className="block font-semibold bg-indigo-400 h-10 p-2">
            Hotel Altstadt
          </span>
        </div>
      )}
      <div
        onClick={handleClick}
        className="flex justify-center items-center cursor-pointer bg-indigo-500 rounded-b-md h-6"
      >
        <IoIosArrowDown />
      </div>
    </div>
  );
}

export default HotelCard;
