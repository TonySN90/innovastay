import { TbDoorEnter, TbDoorExit } from "react-icons/tb";
import { formatDate} from "../utils/datesHelper";
import { BsPeopleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import useBookingsAfterDate from "../features/dashboard/useBookingsAfterDate";
import MiniSpinner from "../ui/MiniSpinner";
import { IBookingTypes } from "../types/BookingTypes";
import { LoadingTypes } from "../types/GlobalTypes";
import { PiInfoBold } from "react-icons/pi";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { LuBarChart4 } from "react-icons/lu";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import useStats from "../features/dashboard/useStats";
import SalesCharts from "../features/dashboard/SalesChart";
import Heading from "../ui/Heading";

function Dashboard() {
  const { arrivalBookings, arrivalLoadingStatus } = useBookingsAfterDate('arrival');
  const { departureBookings, departureLoadingStatus } = useBookingsAfterDate('departure');
  const { recentGuests, guestsLoadingStatus } = useBookingsAfterDate('recentGuests');
  const { quantityBookings, sales, occupancy, checkIns, periodBookingsLoadingStatus, quantityBookingsLoadingStatus, salesData } = useStats();

  return (
    <>
      <Heading title="Dashboard" size="text-3xl"/>

      <DbSection title={`Heute - ${formatDate(new Date(Date.now()))}`} linkText="zu den Buchungen">
        <div className="w-full gap-2 flex justify-between flex-wrap">
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
        </div>
      </DbSection>

      <div className="flex justify-between py-4">
        <Heading title="Auf einem Blick" size="text-xl" />
        <DashboardFilter />
      </div>

      <DbSection>
          <DbInfoBox color="bg-indigo-200" title='Buchungen' 
            content={quantityBookingsLoadingStatus === LoadingTypes.LOADING ? LoadingTypes.LOADING : quantityBookings}>
            <HiOutlineCalendarDays className="w-6 h-6" />
          </DbInfoBox>  
          <DbInfoBox color="bg-green-200" title='Umsatz' 
            content={periodBookingsLoadingStatus === LoadingTypes.LOADING ? LoadingTypes.LOADING : `${sales.toFixed(2)} €`} >
            <LiaMoneyBillWaveAltSolid className="w-6 h-6" />
          </DbInfoBox> 
          <DbInfoBox color="bg-red-200" title='Auslastung' 
            content={periodBookingsLoadingStatus === LoadingTypes.LOADING ? LoadingTypes.LOADING : `${occupancy} %`}>
            <LuBarChart4 className="w-6 h-6" />
          </DbInfoBox>  
          <DbInfoBox color="bg-indigo-200" title='Check-Ins' 
            content={periodBookingsLoadingStatus === LoadingTypes.LOADING ? LoadingTypes.LOADING : checkIns}>
            <TbDoorEnter className="w-6 h-6" />
          </DbInfoBox>  
      </DbSection>

      <DbSection title="Umsatz-Statistiken">
        <span className="text-gray-400">Tage, an denen Einnahmen erzielt wurden</span>
          <SalesCharts salesData={salesData} />
      </DbSection>
    </>
  );
}

export default Dashboard;

function DbSection({
  children,
  title,
  linkText
}: {
  children: React.ReactNode;
  title?: string;
  linkText?: string;
}) {
  return (
    <section className="mb-6 px-12 py-6 bg-slate-50 rounded-lg shadow-md shadow-indigo-100">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">{title}</h3>
        <Link to="/bookings">
          <p className="text-indigo-500 font-semibold">{linkText}</p>
        </Link>
      </div>
      <div className="flex justify-between flex-wrap gap-4 m-auto">
        {children}
      </div>
    </section>
  );
}

function DbInfoBox({children, color, title, content}: {children: React.ReactNode, color: string, title: string, content: number | LoadingTypes}) {
  return (
    <div className="h-24 w-[48%] sm:w-[48%] md:w-[23%] bg-gray-50 rounded-md shadow-indigo-100 shadow-xl flex flex-wrap border-b-2 border-indigo-200">
      <div className="w-[40%] h-full flex justify-center items-center">
        <div className={`${color} w-14 h-14 rounded-full flex justify-center items-center`}>{children}</div>
      </div>
      <div className="w-[60%] flex flex-col justify-center">
        <div className="text-sm text-gray-500 font-semibold uppercase break-words">{title}</div>
        {content === LoadingTypes.LOADING ? <MiniSpinner alignment={"left"} /> : <div className="text-2xl">{content}</div>}
        
      </div>
    </div>
  )
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
    backgroundColor = "bg-red-200";
    textColor = "text-yellow-800";
  }
  if (id === "presentGuests") {
    border = " border-indigo-200";
    backgroundColor = "bg-indigo-200";
    textColor = "text-indigo-800";
  }

  return (
    
    <table
      className={`${border} mt-2`}
    >
      <thead className={`block rounded-t-lg py-2 px-4 ${backgroundColor} `}>
        <tr>
          <th className="text-left h-8">{title}</th>
        </tr>
      </thead>

      <tbody className="bg-gray-50 border-b-2 border-indigo-200 shadow-indigo-100 shadow-xl">
      {rowContent === LoadingTypes.LOADING
      ? <tr><td><MiniSpinner alignment="center" /></td></tr> 
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
  id: string
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
      <td className="flex justify-between py-2 px-4">
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

        {id === 'arrival' && status === "checkedIn" && <RowInfoText info="bereits eingecheckt"/>}
        {id === 'arrival' && status === "unconfirmed" &&
        <RowButton backgroundColor={backgroundColor}>
          <TbDoorEnter className={`${textColor} text-lg`} />
        </RowButton>}

        {id === 'departure' && status === "checkedOut" && <RowInfoText info="bereits ausgecheckt"/>}
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
      </td>
    </tr>
  );
}

function RowInfoText({info}: {info: string}) {
  return <p className="text-sm flex items-center italic ">{info}</p>
}

function RowButton({children, backgroundColor}: {children: React.ReactNode, backgroundColor: string}) {
  return (
    <div className={`flex justify-center items-center ${backgroundColor} rounded-full w-10 h-10 cursor-pointer`}>
      {children}
    </div>
  )
}
