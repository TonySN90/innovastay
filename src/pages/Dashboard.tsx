import { TbDoorEnter } from "react-icons/tb";
import { formatDate, getToday } from "../utils/datesHelper";
import { BsPeopleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Spinner from "../ui/Spinner";
import useRecentBookings from "../features/dashboard/useRecentBookings";

function Dashboard() {
  const { recentBookings, loadingStatus } = useRecentBookings();
  console.log(recentBookings);

  // console.log(getToday() >== );

  if (loadingStatus === "loading") return <Spinner />;

  return (
    <>
      <DbHeader />
      <DbSection title={`Heute - ${formatDate(new Date(Date.now()))}`}>
        <DbInfoCard
          id="arrival"
          title="Anreisen"
          rowContent={[
            {
              name: "Daniel Güntherino",
              bookingId: "25",
              cabin: "Zimmer 1",
              nights: "7 Nächte",
            },
            {
              name: "Daniel Güntherino",
              bookingId: "25",
              cabin: "Zimmer 1",
              nights: "7 Nächte",
            },
            {
              name: "Daniel Güntherino",
              bookingId: "25",
              cabin: "Zimmer 1",
              nights: "7 Nächte",
            },
            {
              name: "Daniel Güntherino",
              bookingId: "25",
              cabin: "Zimmer 1",
              nights: "7 Nächte",
            },
          ]}
        />
        <DbInfoCard
          id="departure"
          title="Abreisen"
          rowContent={[
            {
              name: "Daniela Güntherino",
              bookingId: "25",
              cabin: "Zimmer 1",
              nights: "7 Nächte",
            },
            {
              name: "Daniela Güntherino",
              bookingId: "25",
              cabin: "Zimmer 1",
              nights: "7 Nächte",
            },
          ]}
        />
        <DbInfoCard
          id="presentGuests"
          title="Gäste im Haus"
          rowContent={[
            {
              name: "Danielo Güntherino",
              bookingId: "25",
              cabin: "Zimmer 1",
              nights: "7 Nächte",
            },
            {
              name: "Danielo Güntherino",
              bookingId: "25",
              cabin: "Zimmer 1",
              nights: "7 Nächte",
            },
            {
              name: "Danielo Güntherino",
              bookingId: "25",
              cabin: "Zimmer 1",
              nights: "7 Nächte",
            },
          ]}
        />
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
    <section className="p-8 bg-gray-50 rounded-lg shadow-xl shadow-indigo-100">
      <div className="flex items-center mb-4 justify-between">
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

function DbInfoCard({ id, title, rowContent }: { id: string; title: string }) {
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
      className={`w-full lg:min-w-[270px] lg:w-[30%] h-[75px] border-b-4 ${border}`}
    >
      <thead className={`block rounded-t-lg py-2 px-4 ${backgroundColor} `}>
        <tr>
          <th className="text-left h-8">{title}</th>
        </tr>
      </thead>
      <tbody className="bg-gray-50 shadow-lg">
        {rowContent.map((el) => (
          <InfoCardRow
            name={el.name}
            bookingId={el.bookingId}
            cabin={el.cabin}
            nights={el.nights}
            textColor={textColor}
            backgroundColor={backgroundColor}
            key={Math.random()}
          />
        ))}
      </tbody>
    </table>
  );
}

function InfoCardRow({
  name,
  bookingId,
  cabin,
  nights,
  textColor,
  backgroundColor,
}: {
  name: string;
  bookingId: string;
  cabin: string;
  nights: string;
  textColor: string;
  backgroundColor: string;
}) {
  return (
    <tr className="">
      <td className="flex justify-between p-4">
        <div className="flex flex-col">
          <div className="flex gap-3">
            <div>
              <BsPeopleFill className={`${textColor} text-lg`} />
            </div>
            <span className="font-semibold">{name}</span>
          </div>
          <div className="font text-sm">
            <span className="mr-3">
              #{bookingId} - {cabin}
            </span>
            <span> {nights}</span>
          </div>
        </div>
        <div
          className={`flex items-center justify-center h-10 w-10 ${backgroundColor} rounded-full`}
        >
          <TbDoorEnter className={`${textColor} text-lg cursor-pointer`} />
        </div>
      </td>
    </tr>
  );
}
