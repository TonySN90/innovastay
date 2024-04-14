import { TbDoorEnter } from "react-icons/tb";
import { formatDate } from "../utils/datesHelper";

function Dashboard() {
  return (
    <>
      <DbHeader />
      <DbSection
        title={`Was heute anliegt - ${formatDate(new Date(Date.now()))}`}
      >
        <DbInfoCard title="Anreisen" color="bg-green-200 text-green-800" />
        <DbInfoCard title="Abreisen" color="bg-yellow-200 text-yellow-800" />
        <DbInfoCard
          title="Gäste im Haus"
          color="bg-indigo-200 text-indigo-800"
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
    <section className="min-w-[300px] p-8 bg-gray-50">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="flex justify-between">{children}</div>
    </section>
  );
}

function DbInfoCard({ title, color }: { title: string; color: string }) {
  return (
    <table className="w-[300px] border-b-4 border-green-200">
      <thead className={`block rounded-t-lg py-2 px-4 ${color}`}>
        <tr>
          <th className="text-left h-8">{title}</th>
        </tr>
      </thead>
      <tbody className="bg-gray-50 shadow-lg">
        <InfoCardRow
          name="Daniel Güntherino"
          bookingId="25"
          cabin="Zimmer 1"
          nights="7 Nächte"
        />
        <InfoCardRow
          name="Daniel Güntherino"
          bookingId="25"
          cabin="Zimmer 1"
          nights="7 Nächte"
        />
      </tbody>
    </table>
  );
}

function InfoCardRow({
  name,
  bookingId,
  cabin,
  nights,
}: {
  name: string;
  bookingId: string;
  cabin: string;
  nights: string;
}) {
  return (
    <tr className="hover:bg-gray-100 border-b">
      <td>
        <div className="flex justify-between p-4 items-center">
          <div className="flex flex-col">
            <div className="flex gap-3">
              <div>
                <TbDoorEnter className="text-green-400 text-lg" />
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
          <div className="flex items-center justify-center h-10 w-10 bg-green-200 rounded-full">
            <TbDoorEnter className="text-green-800 text-lg cursor-pointer" />
          </div>
        </div>
      </td>
    </tr>
  );
}
