import { IoIosArrowDown } from "react-icons/io";

function HotelCard() {
  return (
    <div className="bg-gray-500 p-2 text-gray-50 rounded-lg flex text-sm">
      <div className="flex flex-col w-[90%]">
        <span>Hotel</span>
        <span className="font-semibold">Panorama Inn</span>
      </div>
      <div
        onClick={() => console.log("test")}
        className="flex items-center cursor-pointer"
      >
        <IoIosArrowDown />
      </div>
    </div>
  );
}

export default HotelCard;
