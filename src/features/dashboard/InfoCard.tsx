import { ITodayCardBookingTypes } from "../../types/DashboardTypes";
import { LoadingTypes } from "../../types/GlobalTypes";
import MiniSpinner from "../../ui/MiniSpinner";
import InfoCardRow from "./InfoCardRow";

function InfoCard({
  id,
  title,
  rowContent,
}: {
  id: string;
  title: string;
  rowContent: ITodayCardBookingTypes[] | LoadingTypes;
}) {
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
    <table className={`${border} mt-2`}>
      <thead className={`block rounded-t-lg py-2 px-4 ${backgroundColor} `}>
        <tr>
          <th className="text-left h-8">{title}</th>
        </tr>
      </thead>

      <tbody className="bg-card border-b-2 border-border shadow-shadow shadow-xl">
        {rowContent === LoadingTypes.LOADING ? (
          <tr>
            <td>
              <MiniSpinner alignment="center" />
            </td>
          </tr>
        ) : rowContent.length === 0 ? (
          <tr>
            <td className="text-sm p-4">Keine Daten vorhanden</td>
          </tr>
        ) : (
          Array.isArray(rowContent) &&
          rowContent.map((el: ITodayCardBookingTypes) => (
            <InfoCardRow
              id={id}
              status={el.status}
              name={el.fullName}
              bookingId={el.id}
              // @ts-expect-error Adapt Types!!!
              cabin={el.cabins.name}
              nights={el.numNights}
              textColor={textColor}
              backgroundColor={backgroundColor}
              key={el.id}
            />
          ))
        )}
      </tbody>
    </table>
  );
}

export default InfoCard;
