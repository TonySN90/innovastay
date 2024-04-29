import { HiOutlineCalendarDays } from "react-icons/hi2";
import { LoadingTypes } from "../../types/GlobalTypes";
import Heading from "../../ui/Heading";
import { formatDate } from "../../utils/datesHelper";
import DashboardFilter from "./DashboardFilter";
import InfoBox from "./InfoBox";
import InfoCard from "./InfoCard";
import SalesCharts from "./SalesChart";
import useBookingsAfterDate from "./useBookingsAfterDate";
import useStats from "./useStats";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { LuBarChart4 } from "react-icons/lu";
import { TbDoorEnter } from "react-icons/tb";
import { Link } from "react-router-dom";

function DashboardLayout() {
  const { arrivalBookings, arrivalLoadingStatus } =
    useBookingsAfterDate("arrival");
  const { departureBookings, departureLoadingStatus } =
    useBookingsAfterDate("departure");
  const { recentGuests, guestsLoadingStatus } =
    useBookingsAfterDate("recentGuests");
  const {
    quantityBookings,
    sales,
    occupancy,
    checkIns,
    periodBookingsLoadingStatus,
    quantityBookingsLoadingStatus,
    salesData,
  } = useStats();

  return (
    <>
      <DbSection
        title={`Heute - ${formatDate(new Date(Date.now()))}`}
        linkText="zu den Buchungen"
      >
        <div className="w-full gap-2 flex justify-between flex-wrap">
          <div className=" flex flex-col gap-4 w-full md:w-[48%]">
            <InfoCard
              id="arrival"
              title="Anreisen"
              rowContent={
                arrivalLoadingStatus === LoadingTypes.LOADING
                  ? LoadingTypes.LOADING
                  : arrivalBookings
              }
            />
            <InfoCard
              id="departure"
              title="Abreisen"
              rowContent={
                departureLoadingStatus === LoadingTypes.LOADING
                  ? LoadingTypes.LOADING
                  : departureBookings
              }
            />
          </div>
          <div className="flex flex-col w-full md:w-[48%]">
            <InfoCard
              id="presentGuests"
              title="Gäste im Haus"
              rowContent={
                guestsLoadingStatus === LoadingTypes.LOADING
                  ? LoadingTypes.LOADING
                  : recentGuests
              }
            />
          </div>
        </div>
      </DbSection>

      <div className="flex justify-between py-4">
        <Heading title="Auf einem Blick" size="text-xl" />
        <DashboardFilter />
      </div>

      <DbSection>
        <InfoBox
          color="bg-indigo-200"
          title="Buchungen"
          content={
            quantityBookingsLoadingStatus === LoadingTypes.LOADING
              ? LoadingTypes.LOADING
              : quantityBookings
          }
        >
          <HiOutlineCalendarDays className="w-6 h-6" />
        </InfoBox>
        <InfoBox
          color="bg-green-200"
          title="Umsatz"
          content={
            periodBookingsLoadingStatus === LoadingTypes.LOADING
              ? LoadingTypes.LOADING
              : `${sales.toFixed(2)} €`
          }
        >
          <LiaMoneyBillWaveAltSolid className="w-6 h-6" />
        </InfoBox>
        <InfoBox
          color="bg-red-200"
          title="Auslastung"
          content={
            periodBookingsLoadingStatus === LoadingTypes.LOADING
              ? LoadingTypes.LOADING
              : `${occupancy} %`
          }
        >
          <LuBarChart4 className="w-6 h-6" />
        </InfoBox>
        <InfoBox
          color="bg-indigo-200"
          title="Check-Ins"
          content={
            periodBookingsLoadingStatus === LoadingTypes.LOADING
              ? LoadingTypes.LOADING
              : checkIns
          }
        >
          <TbDoorEnter className="w-6 h-6" />
        </InfoBox>
      </DbSection>

      <DbSection title="Umsatz-Statistiken">
        <span className="text-gray-400">
          Tage, an denen Einnahmen erzielt wurden
        </span>
        <SalesCharts salesData={salesData} />
      </DbSection>
    </>
  );
}

export default DashboardLayout;

function DbSection({
  children,
  title,
  linkText,
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