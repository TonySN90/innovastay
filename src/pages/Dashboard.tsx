import { TbDoorEnter, TbDoorExit } from "react-icons/tb";
import { formatDate} from "../utils/datesHelper";
import { BsPeopleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import useArrivalBookings from "../features/dashboard/useArrivalBookings";
import MiniSpinner from "../ui/MiniSpinner";
import { IBookingTypes } from "../types/BookingTypes";
import { LoadingTypes } from "../types/GlobalTypes";
import { PiInfoBold } from "react-icons/pi";

function Dashboard() {
  const { arrivalBookings, arrivalLoadingStatus } = useArrivalBookings('arrival');
  const { departureBookings, departureLoadingStatus } = useArrivalBookings('departure');
  const { recentGuests, guestsLoadingStatus } = useArrivalBookings('recentGuests');

  return (
    <>
      <DbHeader />
      <DbSection title="Aktuelle Buchungen">test</DbSection>

      <DbSection title={`Heute - ${formatDate(new Date(Date.now()))}`}>
        <div className=" flex flex-col gap-4 w-full md:w-[48%]">
          <DbInfoCard
            id="arrival"
            title="Anreisen"
            rowContent={arrivalLoadingStatus === LoadingTypes.LOADING ? LoadingTypes.LOADING : arrivalBookings}
          />
          <DbInfoCard
            id="departure"
            title="Abreisen"
            rowContent={departureLoadingStatus === LoadingTypes.LOADING ? LoadingTypes.LOADING : departureBookings}
          />
        </div>
        <div className="flex flex-col w-full md:w-[48%]">
          <DbInfoCard
            id="presentGuests"
            title="Gäste im Haus"
            rowContent={guestsLoadingStatus === LoadingTypes.LOADING ? LoadingTypes.LOADING : recentGuests}  
            />
        </div>
      </DbSection>
    </>
  );
}

export default Dashboard;

function DbHeader() {
  return (
    <header className="w-[60%]">
      <h1 className="text-3xl font-bold">Hey Tony Heider,</h1>
      <h2 className="font-semibold text-lg mb-3 text-indigo-500">
        Willkommen in Panorama Inn´s Dashboard
      </h2>
    </header>
  );
}

function DbSection({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <section className=" my-4">
    {/* <section className="p-8 my-4 bg-gray-50 rounded-lg shadow-xl shadow-indigo-100 overflow-scroll"> */}
      <div className="mb-4 flex justify-between">
        <h3 className="text-xl font-semibold">{title}</h3>
        <Link to="/bookings">
          <p className="text-indigo-500 font-semibold">zu den Buchungen</p>
        </Link>
      </div>
      <div className="flex justify-between flex-wrap gap-4 m-auto">
        {children}
      </div>
    </section>
  );
}

function DbInfoCard({ id, title, rowContent }: { id: string; title: string, rowContent: IBookingTypes[] | LoadingTypes}) {
  let border = "";
  let backgroundColor = "";
  let textColor = "";

  if (id === "arrival") {
    border = "border-green-200";
    backgroundColor = "bg-green-200";
    textColor = "text-green-800";
  }
  if (id === "departure") {
    border = "border-yellow-200";
    backgroundColor = "bg-yellow-200";
    textColor = "text-yellow-800";
  }
  if (id === "presentGuests") {
    border = " border-indigo-200";
    backgroundColor = "bg-indigo-200";
    textColor = "text-indigo-800";
  }

  return (
    
    <table
      className={`${border}`}
    >
      <thead className={`block rounded-t-lg py-2 px-4 ${backgroundColor} `}>
        <tr>
          <th className="text-left h-8">{title}</th>
        </tr>
      </thead>

      <tbody className="bg-gray-50 shadow-lg">
      {rowContent === LoadingTypes.LOADING
      ? <tr><td><MiniSpinner /></td></tr> 
      : rowContent.length === 0 
      ? 
        <tr><td className="text-sm p-4">Keine Daten vorhanden</td></tr> 
        : Array.isArray(rowContent) && rowContent.map((el: IBookingTypes) => (
          <InfoCardRow
            id={id}
            status={el.status}
            name={el.fullName}
            bookingId={el.id}
            cabin={el.cabins.name}	
            nights={el.numNights}
            textColor={textColor}
            backgroundColor={backgroundColor}
            key={el.id}
          />
        ))}
      </tbody>
    </table>
  );
}

function InfoCardRow({
  id,
  status,
  name,
  bookingId,
  cabin,
  nights,
  textColor,
  backgroundColor,
}: {
  id: number
  status: string;
  name: string;
  bookingId: number;
  cabin: string;
  nights: number;
  textColor: string;
  backgroundColor: string;
}) {

  return (
    <tr>
      <td className="flex justify-between py-3 px-4">
        <div className="flex flex-col">
          <div className="flex gap-3">
            <div>
              <BsPeopleFill className={`${textColor} text-lg`} />
            </div>
            <span className="font-semibold text-sm">{name}</span>
          </div>
          <div className="font text-sm">
            <span >
              #{bookingId} - {cabin}
            </span>
            <span> {nights > 1 ? ` - ${nights} Nächte` : ` - ${nights} Nacht`}</span>

          </div>
        </div>

        {id === 'arrival' && status === "unconfirmed" &&
        <RowButton backgroundColor={backgroundColor}>
          <TbDoorEnter className={`${textColor} text-lg`} />
        </RowButton>}

        {id === 'departure' && status === "checkedOut" && <RowInfoText text="bereits ausgecheckt"/>}
        {id === 'departure' && status === "checkedIn" && 
        <RowButton backgroundColor={backgroundColor} >
          <TbDoorExit className={`${textColor} text-lg`} />
        </RowButton>
        }

        {id === 'presentGuests' && status === "checkedIn" && 
        <RowButton backgroundColor={backgroundColor} >
          <PiInfoBold className={`${textColor} text-lg`} /> 
        </RowButton>
        }

        
        

        {/* {status === 'checkedOut' ? <p className="text-sm flex items-center italic">bereits ausgecheckt</p> : 
          <RowButton backgroundColor={backgroundColor} >
            {status === 'checkedOut' && <TbDoorEnter className={`${textColor} text-lg cursor-pointer`} />}
            {status === 'checkedIn' && <PiInfoBold className={`${textColor} text-lg cursor-pointer`} />}
            
          </RowButton>
} */}
        
      </td>
    </tr>
  );
}

function RowInfoText({text}) {
  return <p className="text-sm flex items-center italic ">{text}</p>
}

function RowButton({children, backgroundColor}: {children: React.ReactNode, backgroundColor: string}) {
  return (
    <div className={`flex justify-center items-center ${backgroundColor} rounded-full w-10 h-10 cursor-pointer`}>
      {children}
    </div>
  )
}
