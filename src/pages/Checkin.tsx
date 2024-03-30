import { GiMeal } from "react-icons/gi";
import { MdFamilyRestroom, MdOutlineHotel } from "react-icons/md";
import { useParams } from "react-router";

function Checkin() {
  const { bookingId } = useParams();
  return (
    <>
      <h2 className="text-3xl font-semibold">Check-In Buchung #{bookingId}</h2>
      <section>
        <header className="flex items-center mt-5 justify-between text-gray-50 h-[4rem] bg-indigo-500 px-8 text-xl rounded-t-md">
          <div className="flex gap-2 w-[270px]">
            <MdOutlineHotel className="text-2xl" />
            <div>15 Nächte in Zimmer 2</div>
          </div>
          <div>Mo. 14.04.2022 - Fr. 15.04.2022</div>
        </header>
        <section>
          <div className="px-8 py-8 bg-gray-50">
            <div className="flex mb-4 gap-4">
              <div className="flex items-center">
                <MdFamilyRestroom className="text-xl text-indigo-500" />
              </div>
              <p className=" font-semibold">Daniel Güntherino</p>
              <span>•</span>
              <p>2 Gäste</p>
              <span>•</span>
              <p>daniel.guntherino@me.com</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center">
                <GiMeal className="text-xl text-indigo-500" />
              </div>
              <div>Frühstück inkl.</div>
              <div className="font-semibold bg-indigo-50 px-2 rounded-md">
                Ja
              </div>
            </div>
          </div>
        </section>
        <footer></footer>
      </section>
    </>
  );
}

export default Checkin;
