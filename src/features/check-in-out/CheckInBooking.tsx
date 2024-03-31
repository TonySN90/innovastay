import {
  MdFamilyRestroom,
  MdOutlineEuroSymbol,
  MdOutlineHotel,
} from "react-icons/md";
import { GiMeal } from "react-icons/gi";
import Button from "../../ui/Button";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import formatDate from "../../utils/datesHelper";
import { StatusTypes } from "../../types/GlobalTypes";
import Empty from "../../ui/Empty";

function CheckInBooking() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [confirmPaid, setConfirmPaid] = useState(false);
  const { booking, loadingStatus } = useBooking(bookingId);

  const {
    numNights,
    numGuests,
    cabins,
    startDate,
    endDate,
    hasBreakfast,
    guests: { fullName, email },
    cabinPrice,
    totalPrice,
    extrasPrice,
  } = booking;

  if (loadingStatus === StatusTypes.LOADING) return <Spinner />;

  if (!Object.keys(booking).length) return <Empty resourceName="Die Buchung" />;

  console.log(booking);

  return (
    <>
      <h2 className="text-3xl font-semibold">Check-In Buchung #{bookingId}</h2>
      <section className="bg-gray-50">
        <header className="md:flex items-center mt-5 justify-between text-gray-50 py-4 bg-indigo-500 px-8 text-xl rounded-t-md ">
          <div className="md:flex gap-2 w-[270px]">
            <MdOutlineHotel className="text-2xl" />
            <div>
              {numNights} Nächte in {cabins.name}
            </div>
          </div>
          <div>
            {formatDate(new Date(startDate))} - {formatDate(new Date(endDate))}
          </div>
        </header>
        <section>
          <div className="px-8 py-8 ">
            <div className="md:flex mb-4 gap-4">
              <div className="md:flex md:items-center">
                <MdFamilyRestroom className="text-xl text-indigo-500" />
              </div>
              <p className=" font-semibold">{fullName}</p>
              <span>•</span>
              <p>{numGuests === 1 ? "1 Gäste" : `${numGuests} Gäste`}</p>
              <span>•</span>
              <p>{email}</p>
            </div>
            <div className="md:flex gap-4 mb-6">
              <div className="flex items-center">
                <GiMeal className="text-xl text-indigo-500" />
              </div>
              <div>Frühstück inkl.</div>
              <div className="font-semibold bg-indigo-50 px-2 w-10 rounded-md">
                {hasBreakfast ? "Ja" : "Nein"}
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-yellow-100 mb-6">
              <div className="md:flex gap-4 text-yellow-800">
                <div>
                  <MdOutlineEuroSymbol className="text-xl" />
                </div>
                <p>Gesamtpreis</p>
                <p>
                  <span className=" font-semibold">{totalPrice} €</span> (
                  {cabinPrice}€ Übernachtungskosten + {extrasPrice}€ Frühstück)
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <input
                className="accent-indigo-500 w-5"
                type="checkbox"
                onChange={(paid) => setConfirmPaid(paid.target.checked)}
              />
              <p>
                Ich <span className="font-semibold">bestätige</span>, dass
                (Gastname) den Gesamtpreis von{" "}
                <span className="font-semibold">{totalPrice}€</span> beglichen
                hat.
              </p>
            </div>
          </div>
        </section>
        <footer className="flex justify-end text-gray-400 px-8">
          <p className="text-sm h-8">
            Buchung angelegt am 14.04.2022 - 14:55 Uhr
          </p>
        </footer>
      </section>
      <div className="flex justify-end mt-4">
        <Button
          type="submit"
          onClick={() => {}}
          variation="standard"
          size="lg"
          extras="mr-2 rounded-lg"
          content={"Buchung #" + bookingId + " einchecken"}
          loading={!confirmPaid}
        />
        <Button
          onClick={() => {
            navigate(-1);
          }}
          variation="inverted"
          size="lg"
          extras="rounded-lg"
          content="Zurück"
        />
      </div>
    </>
  );
}

export default CheckInBooking;
